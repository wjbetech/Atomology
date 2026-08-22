import {
  toElementType,
  getElementByName,
  gameElements,
} from "../data/elements";
import type { RawElement } from "../data/elements";

function makeRaw(overrides: Partial<RawElement> = {}): RawElement {
  return {
    name: "Hydrogen",
    symbol: "H",
    number: 1,
    category: "diatomic nonmetal",
    phase: "Gas",
    period: 1,
    group: 1,
    xpos: 1,
    ypos: 1,
    atomic_mass: 1.008,
    density: 0.09,
    discovered_by: "Henry Cavendish",
    melt: 13.99,
    ...overrides,
  };
}

describe("toElementType", () => {
  it("maps snake_case dataset fields to the game shape", () => {
    const el = toElementType(makeRaw());
    expect(el).toEqual({
      atomicMass: 1.008,
      category: "diatomic nonmetal",
      density: 0.09,
      discoveredBy: "Henry Cavendish",
      melt: 13.99,
      name: "Hydrogen",
      number: 1,
      period: 1,
      phase: "gas",
      symbol: "H",
    });
  });

  it("normalises phase to lowercase", () => {
    expect(toElementType(makeRaw({ phase: "Gas" })).phase).toBe("gas");
    expect(toElementType(makeRaw({ phase: "" })).phase).toBe("");
  });

  it("coerces object-shaped densities to 0 and keeps numeric ones", () => {
    // elements 100-103 ship { value, units } objects in the dataset
    const weird = toElementType(
      makeRaw({ density: { value: 9.9, units: "g/cm3" } })
    );
    expect(weird.density).toBe(0);
    expect(toElementType(makeRaw({ density: 12.5 })).density).toBe(12.5);
  });
});

describe("gameElements / getElementByName", () => {
  it("contains all 118 canonical elements", () => {
    expect(gameElements).toHaveLength(118);
  });

  it("looks elements up by exact name", () => {
    expect(getElementByName("Helium")?.symbol).toBe("He");
    expect(getElementByName("helium")).toBeUndefined();
    expect(getElementByName("Unobtainium")).toBeUndefined();
  });
});
