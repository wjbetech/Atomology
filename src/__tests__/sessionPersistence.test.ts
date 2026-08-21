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

  it("addGuessedElement persists the symbol in guessedElements", () => {
    useGameStore.getState().addGuessedElement("H");

    const saved = JSON.parse(
      localStorage.getItem("atomology.session") || "{}"
    );
    expect(saved.guessedElements).toContain("H");
  });
});

describe("session restore on load", () => {
  it("restores guessedElements from a persisted session", async () => {
    localStorage.clear();
    localStorage.setItem(
      "atomology.session",
      JSON.stringify({
        score: 3,
        gameMode: "multi",
        gameStarted: true,
        elements: [],
        answer: null,
        answerElementName: null,
        playerAnswer: "",
        guessedElements: ["H", "He"],
      })
    );

    jest.resetModules();
    const { useGameStore: freshStore } = await import("../store/atomologyStore");

    expect(freshStore.getState().guessedElements).toEqual(["H", "He"]);
    expect(freshStore.getState().score).toBe(3);
  });
});
