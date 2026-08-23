/**
 * Local personal bests, keyed by mode + session length.
 * Fully local (localStorage) — clearing site data resets them; no sync.
 */

export interface PersonalBests {
  bestScore: number;
  bestAccuracy: number; // 0-100
  bestStreak: number;
}

export type BestCategory = keyof PersonalBests;

export interface RunForBests {
  mode: string;
  length: string;
  score: number;
  answered: number;
  correct: number;
  bestStreak: number;
}

const STORAGE_KEY = "atomology.bests";

function keyFor(mode: string, length: string): string {
  return `${mode}:${length}`;
}

function loadAll(): Record<string, PersonalBests> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, PersonalBests>) : {};
  } catch {
    return {};
  }
}

function saveAll(all: Record<string, PersonalBests>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // storage unavailable — bests simply don't persist
  }
}

export function loadBests(mode: string, length: string): PersonalBests | null {
  return loadAll()[keyFor(mode, length)] ?? null;
}

/**
 * Compare a finished run against the stored bests for its mode+length,
 * update any beaten categories, and report which were records.
 */
export function saveRunIfBest(
  run: RunForBests
): { bests: PersonalBests; newRecords: BestCategory[] } {
  const all = loadAll();
  const key = keyFor(run.mode, run.length);
  const prev = all[key];
  const accuracy =
    run.answered > 0 ? Math.round((run.correct / run.answered) * 100) : 0;

  const next: PersonalBests = {
    bestScore: Math.max(prev?.bestScore ?? 0, run.score),
    bestAccuracy: Math.max(prev?.bestAccuracy ?? 0, accuracy),
    bestStreak: Math.max(prev?.bestStreak ?? 0, run.bestStreak),
  };

  const newRecords: BestCategory[] = [];
  if (!prev || run.score > prev.bestScore) newRecords.push("bestScore");
  if (!prev || accuracy > prev.bestAccuracy)
    newRecords.push("bestAccuracy");
  if (!prev || run.bestStreak > prev.bestStreak)
    newRecords.push("bestStreak");

  all[key] = next;
  saveAll(all);
  return { bests: next, newRecords };
}
