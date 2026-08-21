import { fetchUniqueElements } from "../hooks/uniqueElements";
import { GET } from "../data/fetch";
import type { ElementType } from "../store/atomologyStore";

jest.mock("../data/fetch", () => ({
  GET: jest.fn(),
}));

const mockedGet = GET as jest.Mock;

function makeElement(overrides: Record<string, unknown> = {}) {
  return {
    name: "Hydrogen",
    symbol: "H",
    number: 1,
    period: 1,
    group: 1,
    phase: "Gas",
    atomic_mass: 1.008,
    category: "diatomic nonmetal",
    density: 0.09,
    discovered_by: "Henry Cavendish",
    ...overrides,
  };
}

describe("fetchUniqueElements", () => {
  it("normalises phase to lowercase", async () => {
    mockedGet.mockResolvedValue({ elements: [makeElement()] });

    const result: ElementType[] = await fetchUniqueElements(1);

    expect(result).toHaveLength(1);
    expect(result[0].phase).toBe("gas");
  });

  it("falls back to empty string when phase is missing", async () => {
    mockedGet.mockResolvedValue({
      elements: [makeElement({ phase: undefined })],
    });

    const result: ElementType[] = await fetchUniqueElements(1);

    expect(result[0].phase).toBe("");
  });
});
