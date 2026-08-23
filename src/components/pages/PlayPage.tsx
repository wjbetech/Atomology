import { Navigate } from "react-router-dom";
import MultipleChoice from "./MultipleChoice";
import OpenAnswer from "./OpenAnswer";
import HangmanDifficultySelect from "../hangman/HangmanDifficultySelect";
import HangmanGame from "../hangman/HangmanGame";
import { useGameStore } from "../../store/atomologyStore";

/**
 * The single in-game route. Renders whichever mode is configured; when a
 * run finishes (limit reached or Finish pressed) routes to /results.
 */
export default function PlayPage() {
  const gameMode = useGameStore((s) => s.gameMode);
  const hangmanDifficulty = useGameStore((s) => s.hangmanDifficulty);
  const hangmanWord = useGameStore((s) => s.hangmanWord);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const lastRun = useGameStore((s) => s.lastRun);

  if (lastRun) {
    return <Navigate to="/results" replace />;
  }

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
