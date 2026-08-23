/**
 * Server-side sanity checks for leaderboard submissions.
 * Pure logic so the API route and tests share one source of truth.
 */

export interface ScoreSubmission {
  nickname: string;
  mode: string;
  length: string;
  answered: number;
  correct: number;
  /** Transport-only; bounded separately by maxScoreFor(). */
  score?: number;
}

export interface CleanSubmission {
  nickname: string;
  mode: string;
  length: string;
  answered: number;
  correct: number;
}

export type ValidateResult =
  | { ok: true; clean: CleanSubmission }
  | { ok: false; error: string };

const MODES = new Set(["multi", "open"]);
// Endless has no fixed ceiling, so it is excluded from boards by design.
const LENGTH_LIMITS: Record<string, number> = { q10: 10, q25: 25, cycle: 118 };
const NICKNAME_RE = /^[A-Za-z0-9 _-]{3,12}$/;

export function validateScoreSubmission(
  input: Partial<ScoreSubmission>
): ValidateResult {
  const nickname = String(input.nickname ?? "").trim();
  if (!NICKNAME_RE.test(nickname)) {
    return {
      ok: false,
      error: "Nickname must be 3-12 characters (letters, digits, spaces, - _)",
    };
  }

  const mode = String(input.mode ?? "");
  if (!MODES.has(mode)) {
    return { ok: false, error: "Unknown mode" };
  }

  const length = String(input.length ?? "");
  if (!(length in LENGTH_LIMITS)) {
    return { ok: false, error: "Endless runs are not ranked" };
  }

  const answered = Number(input.answered);
  const correct = Number(input.correct);
  if (
    !Number.isInteger(answered) ||
    !Number.isInteger(correct) ||
    answered < 1 ||
    correct < 0
  ) {
    return { ok: false, error: "Invalid attempt counts" };
  }

  const limit = LENGTH_LIMITS[length];
  if (answered > limit) {
    return { ok: false, error: "More answers than the session allows" };
  }
  if (correct > answered) {
    return { ok: false, error: "Correct count exceeds attempts" };
  }

  const score = Number(input.score);
  // In this game score increments exactly with each correct answer, so
  // an honest submission always has score === correct.
  if (!Number.isInteger(score) || score !== correct) {
    return { ok: false, error: "Impossible score" };
  }

  return {
    ok: true,
    clean: { nickname, mode, length, answered, correct },
  };
}

/** Theoretical maximum score for a mode+length — used to bound `score`. */
export function maxScoreFor(length: string): number {
  return LENGTH_LIMITS[length] ?? -1;
}
