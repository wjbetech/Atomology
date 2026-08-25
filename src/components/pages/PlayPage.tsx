import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import MultipleChoice from "./MultipleChoice";
import OpenAnswer from "./OpenAnswer";
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

  // P1-07: Configure now owns difficulty; Play just renders the game.
  // P1-01 hotfix retained: if a run lands here without a word (legacy
  // persisted state or direct /play), auto-init with the stored or default
  // difficulty so the element always loads.
  useEffect(() => {
    if (gameStarted && gameMode === "hangman" && !hangmanWord) {
      const st = useGameStore.getState();
      const diff = (st.hangmanDifficulty as string) || "all";
      if (!st.hangmanDifficulty) st.setHangmanDifficulty(diff);
      const pool = st.hangmanPool.length
        ? st.hangmanPool
        : shuffle(getElementsByDifficulty(diff as any)).map((e) => e.name);
      if (!st.hangmanPool.length) {
        st.setHangmanPool(pool);
        st.setHangmanIndex(0);
      }
      const word = pool[st.hangmanIndex ?? 0] || pool[0];
      if (word) st.setHangmanWord(word);
    }
  }, [gameStarted, gameMode, hangmanWord, hangmanDifficulty]);

  if (gameStarted && gameMode === "hangman") {
    if (hangmanWord) {
      return <HangmanGame />;
    }
    // Word is being auto-initialized above — avoid flicker to /configure
    return null;
  }

  // No configured run: send the player back to session setup.
  return <Navigate to="/configure" replace />;
}
