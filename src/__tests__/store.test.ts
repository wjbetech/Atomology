import { act } from "react";
import { useGameStore } from "../store/atomologyStore";

describe("useGameStore guessedElements", () => {
  beforeEach(() => {
    // clear localStorage and reset store
    localStorage.clear();
    const {
      setElements,
      setAnswer,
      setAnswerElementName,
      setPlayerAnswer,
      setGameMode,
      setGameStarted,
    } = useGameStore.getState();
    // reset core fields
    useGameStore.setState({
      guessedElements: [],
      score: 0,
    });
  });

  it("adds and resets guessed elements", () => {
    act(() => {
      useGameStore.getState().addGuessedElement("H");
    });
    expect(useGameStore.getState().guessedElements).toContain("H");

    act(() => {
      useGameStore.getState().resetGuessedElements();
    });
    expect(useGameStore.getState().guessedElements).toHaveLength(0);
  });
});

describe("returnToMain", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("resets all session state and clears persisted storage", () => {
    // seed a dirty mid-game state across every mode
    useGameStore.setState({
      gameMode: "hangman",
      gameStarted: true,
      score: 9,
      playerAnswer: "Gold",
      answerElementName: "Silver",
      guessedElements: ["H", "He"],
      elements: [{ number: 1 }] as any,
      answer: { number: 1 } as any,
      hangmanWord: "Helium",
      hangmanGuessedLetters: ["h"],
      hangmanIncorrectGuesses: 4,
      hangmanIndex: 2,
      hangmanPool: ["Helium", "Hydrogen"],
      hangmanDifficulty: "easy10",
    });
    localStorage.setItem(
      "atomology.session",
      JSON.stringify({ score: 9 })
    );

    useGameStore.getState().returnToMain();

    const s = useGameStore.getState();
    expect(s.gameMode).toBe("");
    expect(s.gameStarted).toBe(false);
    expect(s.score).toBe(0);
    expect(s.playerAnswer).toBe("");
    expect(s.guessedElements).toEqual([]);
    expect(s.elements).toEqual([]);
    expect(s.answer).toBeNull();
    expect(s.hangmanWord).toBeNull();
    expect(s.hangmanGuessedLetters).toEqual([]);
    expect(s.hangmanIncorrectGuesses).toBe(0);
    expect(s.hangmanIndex).toBe(0);
    expect(s.hangmanDifficulty).toBeNull();
    expect(s.hangmanPool).toEqual([]);
    expect(localStorage.getItem("atomology.session")).toBeNull();
  });
});

describe("hangmanPool", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("setHangmanPool stores the shuffled word pool", () => {
    useGameStore.getState().setHangmanPool(["Oxygen", "Gold", "Iron"]);
    expect(useGameStore.getState().hangmanPool).toEqual([
      "Oxygen",
      "Gold",
      "Iron",
    ]);
  });
});
