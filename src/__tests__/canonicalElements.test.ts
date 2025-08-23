import canonicalElements from "../data/elements";

describe("canonicalElements", () => {
  it("contains 118 confirmed elements", () => {
    expect(Array.isArray(canonicalElements)).toBe(true);
    expect(canonicalElements).toHaveLength(118);
  });
});
