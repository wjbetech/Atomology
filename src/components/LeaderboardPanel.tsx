import { useEffect, useState } from "react";
import {
  fetchTopScores,
  submitScore,
  type LeaderboardRow,
} from "../utils/leaderboard";

interface Props {
  mode: string;
  length: string;
  score: number;
  answered: number;
  correct: number;
}

type BoardState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; rows: LeaderboardRow[] };

/**
 * Global leaderboard panel for the Results page (ranked modes only).
 * Fetch failures degrade to a retry state and never block the page.
 */
export default function LeaderboardPanel({
  mode,
  length,
  score,
  answered,
  correct,
}: Props) {
  const [board, setBoard] = useState<BoardState>({ status: "loading" });
  const [nickname, setNickname] = useState("");
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setBoard({ status: "loading" });
    fetchTopScores(mode, length)
      .then((rows) => !cancelled && setBoard({ status: "ready", rows }))
      .catch(() => !cancelled && setBoard({ status: "error" }));
    return () => {
      cancelled = true;
    };
  }, [mode, length, reloadKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");
    setSubmitError(null);
    try {
      await submitScore({
        nickname: nickname.trim(),
        mode,
        length,
        score,
        answered,
        correct,
      });
      setSubmitState("done");
      setReloadKey((k) => k + 1); // refresh the board with the new entry
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Submit failed");
      setSubmitState("error");
    }
  };

  return (
    <section className="mt-14 w-full max-w-md mx-auto rounded-md border border-hairline bg-bench p-6 text-left">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-argon mb-4">
        Global board · {length}
      </p>

      {board.status === "loading" && (
        <p className="text-annotation text-sm animate-pulse">Loading board…</p>
      )}

      {board.status === "error" && (
        <div className="text-sm">
          <p className="text-strontium mb-2">
            The global board couldn&apos;t be reached.
          </p>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="btn btn-outline btn-sm rounded-pill border-argon/50 text-argon"
          >
            Retry
          </button>
        </div>
      )}

      {board.status === "ready" && (
        <>
          {board.rows.length === 0 ? (
            <p className="text-annotation text-sm mb-4">
              No ranked scores yet — be the first name on the board.
            </p>
          ) : (
            <ol className="mb-5 space-y-1">
              {board.rows.map((row, i) => (
                <li
                  key={`${row.nickname}-${row.created_at}`}
                  className="flex items-center gap-3 font-mono text-sm py-1 border-b border-hairline/60 last:border-0"
                >
                  <span className="w-6 text-annotation">{i + 1}.</span>
                  <span className="flex-1 truncate text-specimen">
                    {row.nickname}
                  </span>
                  <span className="text-annotation text-xs">
                    {row.accuracy}%
                  </span>
                  <span className="w-10 text-right text-sodium font-bold">
                    {row.score}
                  </span>
                </li>
              ))}
            </ol>
          )}

          {submitState === "done" ? (
            <p className="text-copper text-sm">Score submitted — you&apos;re on the board!</p>
          ) : submitState !== "submitting" ? null : (
            <p className="text-annotation text-sm animate-pulse">Submitting…</p>
          )}

          {submitState === "idle" && (
            <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Your name (3–12)"
                aria-label="Nickname for the leaderboard"
                maxLength={12}
                className="flex-1 min-w-0 rounded-pill bg-slide border border-hairline px-4 py-2 text-sm text-specimen focus:border-argon outline-none placeholder:text-annotation/60"
              />
              <button
                type="submit"
                className="btn btn-sm border-0 rounded-pill px-5 bg-sodium/15 text-sodium border-sodium/40 hover:bg-sodium hover:text-void transition-colors"
              >
                Submit score
              </button>
            </form>
          )}
          {submitError && (
            <p className="text-strontium text-xs mt-2">{submitError}</p>
          )}
          {submitState === "error" && (
            <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                aria-label="Nickname for the leaderboard"
                maxLength={12}
                className="hidden"
              />
              <button
                type="submit"
                className="btn btn-sm btn-outline rounded-pill border-strontium/60 text-strontium"
              >
                Try submitting again
              </button>
            </form>
          )}
        </>
      )}
    </section>
  );
}
