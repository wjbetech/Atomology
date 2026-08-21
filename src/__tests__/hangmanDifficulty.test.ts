import { getElementsByDifficulty } from "../utils/hangmanDifficulty";

// Mock the canonical list with deliberately out-of-order atomic numbers so
// the sort inside getElementsByDifficulty is actually exercised.
jest.mock("../data/elements", () => ({
  __esModule: true,
  default: [
    { number: 5, name: "Boron", symbol: "B" },
    { number: 2, name: "Helium", symbol: "He" },
    { number: 10, name: "Neon", symbol: "Ne" },
    { number: 1, name: "Hydrogen", symbol: "H" },
    { number: 7, name: "Nitrogen", symbol: "N" },
    { number: 4, name: "Beryllium", symbol: "Be" },
    { number: 9, name: "Fluorine", symbol: "F" },
    { number: 6, name: "Carbon", symbol: "C" },
    { number: 8, name: "Oxygen", symbol: "O" },
    { number: 3, name: "Lithium", symbol: "Li" },
  ],
}));

const EXPECTED_ORDER = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryllium",
  "Boron",
  "Carbon",
  "Nitrogen",
  "Oxygen",
  "Fluorine",
  "Neon",
];

describe("getElementsByDifficulty", () => {
  it("returns the 10 easiest elements sorted by atomic number", () => {
    const pool = getElementsByDifficulty("easy10");
    expect(pool.map((e) => e.name)).toEqual(EXPECTED_ORDER);
  });

  it("returns the first 20 (or fewer if pool smaller) for easy20", () => {
    const pool = getElementsByDifficulty("easy20");
    expect(pool).toHaveLength(10);
    expect(pool[0].name).toBe("Hydrogen");
  });

  it("returns all elements sorted by atomic number for 'all'", () => {
    const pool = getElementsByDifficulty("all");
    expect(pool).toHaveLength(10);
    expect(pool.map((e) => e.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });
});
