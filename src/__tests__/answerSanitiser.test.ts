import { sanitiseAnswer } from "../utils/answerSanitiser";

describe("sanitiseAnswer", () => {
  it("capitalises first letter and lowercases the rest", () => {
    expect(sanitiseAnswer("hElLo")).toBe("Hello");
    expect(sanitiseAnswer("oxygen")).toBe("Oxygen");
    expect(sanitiseAnswer("He")).toBe("He");
  });

  it("trims leading and trailing whitespace", () => {
    expect(sanitiseAnswer("  oxygen  ")).toBe("Oxygen");
    expect(sanitiseAnswer("\toxygen\n")).toBe("Oxygen");
  });

  it("returns an empty string for whitespace-only input", () => {
    expect(sanitiseAnswer("   ")).toBe("");
  });
});
