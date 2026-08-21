// Centralised canonical elements list for gameplay.
// Keeps only confirmed elements (atomic number <= 118) so UI/game logic
// doesn't accidentally include hypothetical elements like element 119.
import raw from "./elements.json";

/**
 * Shape of the fields consumed from elements.json (snake_case as shipped).
 * Notes from the actual dataset:
 * - `discovered_by` is null for one element
 * - `density` is an object ({ value, units }) for elements 100-103
 * - everything else used here is numeric or string
 */
export interface RawElement {
  name: string;
  symbol: string;
  number: number;
  category: string;
  phase: string;
  period: number;
  group: number | null;
  xpos: number;
  ypos: number;
  atomic_mass: number | null;
  density: number | { [key: string]: unknown } | null;
  discovered_by: string | null;
  melt: number | null;
}

const arr: RawElement[] = Array.isArray(raw)
  ? (raw as RawElement[])
  : ((raw as { elements?: RawElement[] }).elements ?? []);

export const canonicalElements: RawElement[] = arr.filter(
  (e) => typeof e?.number === "number" && e.number <= 118
);

export default canonicalElements;
