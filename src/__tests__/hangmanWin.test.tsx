import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HangmanGame from "../components/hangman/HangmanGame";
import { useGameStore } from "../store/atomologyStore";

describe("HangmanGame completion", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows the win screen when all words are completed", () => {
    useGameStore.setState({
      gameStarted: true,
      gameMode: "hangman",
      hangmanDifficulty: "easy10",
      hangmanPool: ["He"],
      hangmanWord: "He",
      hangmanGuessedLetters: [],
      hangmanIncorrectGuesses: 0,
      hangmanIndex: 0,
    });

    render(
      <MemoryRouter>
        <HangmanGame />
      </MemoryRouter>
    );

    // reveal every letter of the only word
    act(() => {
      useGameStore.getState().guessHangmanLetter("h");
    });
    act(() => {
      useGameStore.getState().guessHangmanLetter("e");
    });

    // auto-advance: DISPLAY_MS (800) then EXIT_MS (320)
    act(() => {
      jest.advanceTimersByTime(1300);
    });

    expect(screen.getByText("Congratulations!")).toBeTruthy();
    expect(screen.queryByText("Game Over!")).toBeNull();
  });

  it("still shows the game-over modal when lives run out", () => {
    useGameStore.setState({
      gameStarted: true,
      gameMode: "hangman",
      hangmanDifficulty: "easy10",
      hangmanPool: ["He"],
      hangmanWord: "He",
      hangmanGuessedLetters: [],
      hangmanIncorrectGuesses: 9,
      hangmanIndex: 0,
    });

    render(
      <MemoryRouter>
        <HangmanGame />
      </MemoryRouter>
    );

    act(() => {
      useGameStore.getState().guessHangmanLetter("z");
    });

    expect(screen.getByText("Game Over!")).toBeTruthy();
    expect(screen.queryByText("Congratulations!")).toBeNull();
  });
});
