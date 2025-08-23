// Utility to get the N easiest elements by atomic number for Hangman mode
import canonicalElements from "../data/elements";

export type DifficultyLevel = "easy10" | "easy20" | "all";

export function getElementsByDifficulty(level: DifficultyLevel) {
  // elementsData is likely { elements: ElementType[] }
  const arr = Array.isArray(canonicalElements)
    ? canonicalElements
    : canonicalElements;
  const sorted = [...arr].sort((a, b) => a.atomicNumber - b.atomicNumber);
  if (level === "easy10") return sorted.slice(0, 10);
  if (level === "easy20") return sorted.slice(0, 20);
  return sorted;
}
