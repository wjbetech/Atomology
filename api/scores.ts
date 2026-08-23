/**
 * Leaderboard API — Vercel Serverless Function.
 *
 *   POST /api/scores   { nickname, mode, length, score, answered, correct }
 *   GET  /api/scores/top?mode=multi&length=q10   → top 10 rows
 *
 * Requires DATABASE_URL (Neon Postgres free tier via the Vercel
 * Marketplace). See README "Leaderboard setup".
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "pg";
import {
  maxScoreFor,
  validateScoreSubmission,
} from "../src/utils/scoreGuard";

let pool: Pool | null = null;
function db() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 1,
    });
  }
  return pool;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "GET") return handleTop(req, res);
  if (req.method === "POST") return handleSubmit(req, res);
  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}

async function handleTop(req: VercelRequest, res: VercelResponse) {
  const mode = String(req.query.mode ?? "");
  const length = String(req.query.length ?? "");
  if (!maxScoreFor(length)) {
    // also rejects unknown lengths and endless
    return res.status(400).json({ error: "Unknown mode or unranked length" });
  }
  try {
    const { rows } = await db().query(
      `SELECT nickname, score,
              ROUND((correct::numeric / NULLIF(answered,0)) * 100)::int AS accuracy,
              answered, created_at
         FROM scores
        WHERE mode = $1 AND length = $2
        ORDER BY score DESC, accuracy DESC, created_at ASC
        LIMIT 10`,
      [mode, length]
    );
    return res.status(200).json({ top: rows });
  } catch (err) {
    console.error("leaderboard GET failed", err);
    return res.status(500).json({ error: "Leaderboard unavailable" });
  }
}

async function handleSubmit(req: VercelRequest, res: VercelResponse) {
  const check = validateScoreSubmission({
    ...(req.body ?? {}),
    score: Number(req.body?.score),
  });
  if (!check.ok) {
    return res.status(400).json({ error: check.error });
  }

  try {
    const { rows } = await db().query(
      `INSERT INTO scores (nickname, mode, length, score, answered, correct)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING id, created_at`,
      [
        check.clean.nickname,
        check.clean.mode,
        check.clean.length,
        Number(req.body?.score),
        check.clean.answered,
        check.clean.correct,
      ]
    );
    return res.status(201).json({ ok: true, id: rows[0].id });
  } catch (err) {
    console.error("leaderboard POST failed", err);
    return res.status(500).json({ error: "Could not save score" });
  }
}
