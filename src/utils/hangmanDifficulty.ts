// Utility to get the N easiest elements by atomic number for Hangman mode
import canonicalElements from "../data/elements";

export type DifficultyLevel = "easy10" | "easy20" | "all";

// Persisted difficulty is stored as a plain string; coerce unknown values
// to the widest pool instead of trusting them.
export function asDifficultyLevel(
  value: string | null | undefined
): DifficultyLevel {
  return value === "easy10" || value === "easy20" ? value : "all";
}

export function getElementsByDifficulty(level: DifficultyLevel) {
  const sorted = [...canonicalElements].sort((a, b) => a.number - b.number);
  if (level === "easy10") return sorted.slice(0, 10);
  if (level === "easy20") return sorted.slice(0, 20);
  return sorted;
}
