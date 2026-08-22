import { Link } from "react-router-dom";
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

  // No configured run: send the player to session setup.
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24 px-4 text-center">
      <h1 className="text-2xl font-bold">Nothing in progress</h1>
      <p className="opacity-80 text-sm max-w-sm">
        Head to the Configure page to pick a mode and start a session.
      </p>
      <Link to="/configure" className="btn btn-primary rounded-full px-8">
        Go to Configure
      </Link>
    </div>
  );
}
