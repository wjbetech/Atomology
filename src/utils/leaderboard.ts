/**
 * Client helpers for the global leaderboard.
 * The backend is optional — every call degrades gracefully.
 */

export interface LeaderboardRow {
  nickname: string;
  score: number;
  accuracy: number;
  answered: number;
  created_at: string;
}

export async function fetchTopScores(
  mode: string,
  length: string,
  signal?: AbortSignal
): Promise<LeaderboardRow[]> {
  const res = await fetch(
    `/api/scores/top?mode=${encodeURIComponent(mode)}&length=${encodeURIComponent(length)}`,
    { signal }
  );
  if (!res.ok) throw new Error(`Leaderboard unavailable (${res.status})`);
  const data = (await res.json()) as { top: LeaderboardRow[] };
  return data.top ?? [];
}

export interface SubmitPayload {
  nickname: string;
  mode: string;
  length: string;
  score: number;
  answered: number;
  correct: number;
}

export async function submitScore(payload: SubmitPayload): Promise<void> {
  const res = await fetch("/api/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `Submit failed (${res.status})`);
  }
}
