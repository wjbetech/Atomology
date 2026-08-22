// Centralised canonical elements list for gameplay.
// Keeps only confirmed elements (atomic number <= 118) so UI/game logic
// doesn't accidentally include hypothetical elements like element 119.
import raw from "./elements.json";
import type { ElementType } from "../store/atomologyStore";

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

// Convert a raw dataset entry to the normalised game shape used by the store.
export function toElementType(raw: RawElement): ElementType {
  return {
    atomicMass: raw.atomic_mass ?? 0,
    category: raw.category,
    density: typeof raw.density === "number" ? raw.density : 0,
    discoveredBy: raw.discovered_by,
    melt: raw.melt,
    name: raw.name,
    number: raw.number,
    period: raw.period,
    phase: (raw.phase || "").toLowerCase(),
    symbol: raw.symbol,
  };
}

/** All 118 elements in the normalised game shape. */
export const gameElements: ElementType[] = canonicalElements.map(
  toElementType
);

const gameElementsByName = new Map(gameElements.map((e) => [e.name, e]));

export function getElementByName(name: string): ElementType | undefined {
  return gameElementsByName.get(name);
}

export default canonicalElements;
