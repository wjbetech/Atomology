import { sanitiseAnswer } from "../utils/answerSanitiser";

describe("sanitiseAnswer", () => {
  it("capitalises first letter and lowercases the rest", () => {
    expect(sanitiseAnswer("hElLo")).toBe("Hello");
    expect(sanitiseAnswer("oxygen")).toBe("Oxygen");
    expect(sanitiseAnswer("He")).toBe("He");
  });
});
