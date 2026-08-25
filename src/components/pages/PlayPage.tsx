import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import MultipleChoice from "./MultipleChoice";
import OpenAnswer from "./OpenAnswer";
import HangmanDifficultySelect from "../hangman/HangmanDifficultySelect";
import HangmanGame from "../hangman/HangmanGame";
import { useGameStore } from "../../store/atomologyStore";
import { getElementsByDifficulty } from "../../utils/hangmanDifficulty";
import { shuffle } from "../../utils/shuffle";

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

  // P1-01: Hangman hotfix — ensure an element always loads. If the run
  // arrives without a word (old persisted state or direct /play), auto-init
  // with the default pool so the game renders instead of blank/redirect.
  useEffect(() => {
    if (gameStarted && gameMode === "hangman" && !hangmanWord) {
      const state = useGameStore.getState();
      const diff = state.hangmanDifficulty || "all";
      if (!state.hangmanDifficulty) state.setHangmanDifficulty(diff);
      const pool = state.hangmanPool.length
        ? state.hangmanPool
        : shuffle(getElementsByDifficulty(diff as any)).map((e) => e.name);
      if (!state.hangmanPool.length) {
        state.setHangmanPool(pool);
        state.setHangmanIndex(0);
      }
      const word = pool[state.hangmanIndex ?? 0] || pool[0];
      if (word) state.setHangmanWord(word);
    }
  }, [gameStarted, gameMode, hangmanWord, hangmanDifficulty]);

  if (gameStarted && gameMode === "hangman") {
    if (!hangmanDifficulty && !hangmanWord) {
      // Still show difficulty select for legacy persisted runs where
      // neither difficulty nor word is set — P1-07 will remove this.
      return <HangmanDifficultySelect />;
    }
    if (hangmanWord) {
      return <HangmanGame />;
    }
    // Word is being auto-initialized above — render nothing briefly
    return null;
  }

  // No configured run: send the player back to session setup.
  return <Navigate to="/configure" replace />;
}
