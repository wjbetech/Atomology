import { Navigate } from "react-router-dom";
import MultipleChoice from "./MultipleChoice";
import OpenAnswer from "./OpenAnswer";
import HangmanDifficultySelect from "../hangman/HangmanDifficultySelect";
import HangmanGame from "../hangman/HangmanGame";
import { useGameStore } from "../../store/atomologyStore";

/**
 * The single in-game route. Renders whichever mode is configured; if a run
 * is somehow active with no mode set, sends the player back to Configure.
 */
export default function PlayPage() {
  const gameMode = useGameStore((s) => s.gameMode);
  const hangmanDifficulty = useGameStore((s) => s.hangmanDifficulty);
  const hangmanWord = useGameStore((s) => s.hangmanWord);
  const gameStarted = useGameStore((s) => s.gameStarted);

  if (gameStarted && gameMode === "multi") {
    return <MultipleChoice />;
  }

  if (gameStarted && gameMode === "open") {
    return <OpenAnswer />;
  }

  if (gameStarted && gameMode === "hangman") {
    if (!hangmanDifficulty) {
      return <HangmanDifficultySelect />;
    }
    if (hangmanWord) {
      return <HangmanGame />;
    }
  }

  // No configured run: send the player back to session setup.
  return <Navigate to="/configure" replace />;
}
