// Centralised canonical elements list for gameplay.
// Keeps only confirmed elements (atomic number <= 118) so UI/game logic
// doesn't accidentally include hypothetical elements like element 119.
import raw from "./elements.json";

const arr: any[] = Array.isArray(raw) ? raw : raw.elements ?? [];

export const canonicalElements = arr.filter(
  (e) => typeof e?.number === "number" && e.number <= 118
);

export default canonicalElements;
