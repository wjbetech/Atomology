import {
  loadBests,
  saveRunIfBest,
} from "../utils/personalBests";

describe("personalBests", () => {
  beforeEach(() => localStorage.clear());

  it("treats a first run as records in every category", () => {
    const { newRecords } = saveRunIfBest({
      mode: "multi",
      length: "q10",
      score: 6,
      answered: 10,
      correct: 6,
      bestStreak: 3,
    });

    expect(newRecords).toEqual(["bestScore", "bestAccuracy", "bestStreak"]);
    const bests = loadBests("multi", "q10");
    expect(bests?.bestScore).toBe(6);
    expect(bests?.bestAccuracy).toBe(60);
    expect(bests?.bestStreak).toBe(3);
  });

  it("keeps per-mode+length boards independent", () => {
    saveRunIfBest({
      mode: "multi",
      length: "q10",
      score: 8,
      answered: 10,
      correct: 8,
      bestStreak: 5,
    });
    const other = loadBests("open", "q25");
    expect(other).toBeNull();
    expect(loadBests("multi", "q25")).toBeNull();
  });

  it("only flags the categories that actually improved", () => {
    saveRunIfBest({
      mode: "multi",
      length: "q10",
      score: 8,
      answered: 10,
      correct: 8, // 80%
      bestStreak: 5,
    });

    // worse run: nothing is a record
    const worse = saveRunIfBest({
      mode: "multi",
      length: "q10",
      score: 5,
      answered: 10,
      correct: 5, // 50%
      bestStreak: 2,
    });
    expect(worse.newRecords).toEqual([]);

    // better streak only
    const mixed = saveRunIfBest({
      mode: "multi",
      length: "q10",
      score: 7,
      answered: 10,
      correct: 7, // 70%
      bestStreak: 9,
    });
    expect(mixed.newRecords).toEqual(["bestStreak"]);
    const bests = loadBests("multi", "q10");
    expect(bests?.bestScore).toBe(8); // unchanged
    expect(bests?.bestAccuracy).toBe(80); // unchanged
    expect(bests?.bestStreak).toBe(9); // improved
  });
});
