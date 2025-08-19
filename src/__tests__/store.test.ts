import { act } from "react-dom/test-utils";
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
