import { useGameStore } from "../store/atomologyStore";

describe("session persistence writes fresh state", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({ score: 0, guessedElements: [] });
  });

  it("setScore persists the NEW score, not the previous one", () => {
    useGameStore.getState().setScore(0);
    useGameStore.getState().setScore((p: number) => p + 5);

    expect(useGameStore.getState().score).toBe(5);
    const saved = JSON.parse(
      localStorage.getItem("atomology.session") || "{}"
    );
    expect(saved.score).toBe(5);
  });

  it("setScore with a direct value persists immediately", () => {
    useGameStore.getState().setScore(7);

    const saved = JSON.parse(
      localStorage.getItem("atomology.session") || "{}"
    );
    expect(saved.score).toBe(7);
  });
});
