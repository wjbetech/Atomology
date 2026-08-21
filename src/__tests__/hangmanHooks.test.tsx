import { render, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HangmanGame from "../components/hangman/HangmanGame";
import { useGameStore } from "../store/atomologyStore";

describe("HangmanGame hooks safety", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({
      gameStarted: true,
      gameMode: "hangman",
      hangmanDifficulty: "easy10",
      hangmanWord: "Helium",
      hangmanGuessedLetters: [],
      hangmanIncorrectGuesses: 0,
      hangmanIndex: 0,
    });
  });

  it("does not crash when the word is cleared while mounted", () => {
    const { unmount } = render(
      <MemoryRouter>
        <HangmanGame />
      </MemoryRouter>
    );

    expect(() => {
      act(() => {
        useGameStore.setState({ hangmanWord: null });
      });
    }).not.toThrow();

    unmount();
  });
});
