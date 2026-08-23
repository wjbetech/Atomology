import React, { useState, useEffect } from "react";
import { useGameStore, useUIStore } from "../../store/atomologyStore";
import { motion, AnimatePresence } from "framer-motion";
import ReturnToMainButton from "../sub-components/ReturnToMainButton.tsx";
import HangmanLetters from "./HangmanLetters.tsx";
import HangmanGuessInput from "./HangmanGuessInput.tsx";
import HangmanKeyboard from "./HangmanKeyboard.tsx";
import HangmanGameOverModal from "./HangmanGameOverModal.tsx";
import HangmanWinScreen from "./HangmanWinScreen.tsx";
import canonicalElements from "../../data/elements";
import {
  getElementsByDifficulty,
  asDifficultyLevel,
} from "../../utils/hangmanDifficulty";
import { shuffle } from "../../utils/shuffle";
import { playCelebration } from "../../utils/audio";

export default function HangmanGame() {
  const hangmanWord = useGameStore((s) => s.hangmanWord);
  const hangmanPool = useGameStore((s) => s.hangmanPool);
  const hangmanDifficulty = useGameStore((s) => s.hangmanDifficulty);
  const hangmanIndex = useGameStore((s) => s.hangmanIndex ?? 0);
  const setHangmanIndex = useGameStore((s) => s.setHangmanIndex);
  const guessed = useGameStore((s) => s.hangmanGuessedLetters);
  const incorrect = useGameStore((s) => s.hangmanIncorrectGuesses);
  const maxAttempts = useGameStore((s) => s.hangmanMaxAttempts);
  const guessLetter = useGameStore((s) => s.guessHangmanLetter);
  const [wordGuess, setWordGuess] = useState("");
  const [wordGuessResult, setWordGuessResult] = useState<string | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const resultTimeoutRef = React.useRef<number | null>(null);
  const advanceTimeoutRef = React.useRef<number | null>(null);
  const DISPLAY_MS = 800;
  const EXIT_MS = 320;

  const soundEnabled = useUIStore((s) => s.soundEnabled);
  const setShowHUD = useUIStore((s) => s.setShowHUD);

  // Play celebration when the word guess result becomes correct
  useEffect(() => {
    if (wordGuessResult === "correct" && soundEnabled) {
      playCelebration();
    }
  }, [wordGuessResult, soundEnabled]);

  // Trigger game over when incorrect guesses reach maxAttempts
  useEffect(() => {
    if (incorrect >= maxAttempts) {
      setShowGameOver(true);
      setDisabled(true);
    }
  }, [incorrect, maxAttempts]);

  // progress counter: the shuffled pool set at session start defines both
  // the word order and the total
  const pool = hangmanPool;
  const total = pool.length;

  // keyboard support: press A-Z to guess letters
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (disabled || showGameOver) return;
      const active = document.activeElement as HTMLElement | null;
      if (active) {
        const tag = active.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || active.isContentEditable)
          return;
      }
      const k = e.key;
      if (!k || k.length !== 1) return;
      const m = k.match(/^[a-zA-Z]$/);
      if (!m) return;
      if (e.repeat) return; // ignore held keys
      const letter = k.toLowerCase();
      if (guessed.includes(letter)) return;
      // only allow letters that exist in alphabet pool
      if (/[a-z]/.test(letter)) {
        guessLetter(letter);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [disabled, showGameOver, guessed, guessLetter]);

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (resultTimeoutRef.current !== null)
        window.clearTimeout(resultTimeoutRef.current);
      if (advanceTimeoutRef.current !== null)
        window.clearTimeout(advanceTimeoutRef.current);
    };
  }, []);

  // Ensure HUD is turned off when entering actual Hangman game
  React.useEffect(() => {
    setShowHUD(false);
  }, [setShowHUD]);

  // Auto-advance when all letters have been revealed via guessed letters
  React.useEffect(() => {
    if (!hangmanWord) return;
    if (disabled || showGameOver) return;

    // compute unique letters in the word (ignore spaces and non-letters)
    const letters = hangmanWord
      .toLowerCase()
      .split("")
      .filter((c) => /[a-z]/.test(c));
    const unique = Array.from(new Set(letters));
    if (unique.length === 0) return;

    const allRevealed = unique.every((ch) => guessed.includes(ch));
    if (allRevealed && wordGuessResult !== "correct") {
      // mark correct and use the same timed flow as a typed correct guess
      setWordGuessResult("correct");
      if (resultTimeoutRef.current !== null)
        window.clearTimeout(resultTimeoutRef.current);
      if (advanceTimeoutRef.current !== null)
        window.clearTimeout(advanceTimeoutRef.current);
      resultTimeoutRef.current = window.setTimeout(() => {
        setWordGuessResult(null);
        advanceTimeoutRef.current = window.setTimeout(() => {
          advanceToNext();
        }, EXIT_MS);
      }, DISPLAY_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessed, hangmanWord]);

  // start a fresh shuffled session at the same difficulty
  const handlePlayAgain = () => {
    const state = useGameStore.getState();
    const freshPool = shuffle(
      getElementsByDifficulty(asDifficultyLevel(state.hangmanDifficulty))
    ).map((e) => e.name);
    state.setHangmanPool(freshPool);
    state.resetHangman();
    state.setHangmanWord(freshPool[0]);
    setWordGuess("");
    setWordGuessResult(null);
    setShowWin(false);
    setDisabled(false);
  };

  if (!hangmanWord) return null;

  if (showWin) {
    return (
      <>
        <HangmanWinScreen
          difficulty={asDifficultyLevel(hangmanDifficulty)}
          totalWords={total}
          livesRemaining={Math.max(0, maxAttempts - incorrect)}
          onPlayAgain={handlePlayAgain}
        />
      </>
    );
  }

  // Build display for blanks and correct letters, all capitalized
  const display = hangmanWord.split("").map((char, i) => {
    if (char === " ") return <span key={i} className="w-3 inline-block" />;
    const upper = char.toUpperCase();
    const revealed = guessed.includes(char.toLowerCase());
    return (
      <span
        key={i}
        className={
          "inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 mx-0.5 text-base sm:text-lg font-semibold rounded-sm border-2 transition-colors duration-200 " +
          (revealed
            ? "bg-copper border-copper text-void"
            : "border-hairline text-transparent bg-transparent")
        }
        aria-hidden={!revealed}
      >
        {revealed ? upper : "\u00A0"}
      </span>
    );
  });

  // Handle word-guess form submission
  const handleWordGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const guess = wordGuess.trim();
    if (!guess) return;
    if (guess.toLowerCase() === hangmanWord.toLowerCase()) {
      setWordGuessResult("correct");
      // clear any existing timers
      if (resultTimeoutRef.current !== null)
        window.clearTimeout(resultTimeoutRef.current);
      if (advanceTimeoutRef.current !== null)
        window.clearTimeout(advanceTimeoutRef.current);
      // after DISPLAY_MS, clear the result so AnimatePresence exit runs
      resultTimeoutRef.current = window.setTimeout(() => {
        setWordGuessResult(null);
        // after exit animation, advance to next
        advanceTimeoutRef.current = window.setTimeout(() => {
          advanceToNext();
        }, EXIT_MS);
      }, DISPLAY_MS);
    } else {
      setWordGuessResult("incorrect");
    }
    // keep the guess visible for the result display
  };

  // helper to advance to next element or finish the session
  const advanceToNext = () => {
    // add current word's symbol to the guessed HUD if available
    try {
      const currentName = pool[hangmanIndex];
      const currentEl = canonicalElements.find(
        (e) => e.name === currentName
      );
      if (currentEl?.symbol)
        useGameStore.getState().addGuessedElement(currentEl.symbol);
    } catch {}

    const nextIndex = (hangmanIndex ?? 0) + 1;
    if (nextIndex < total) {
      setHangmanIndex(nextIndex);
      const nextName = pool[nextIndex];
      if (nextName) useGameStore.getState().setHangmanWord(nextName);
      // clear local UI
      setWordGuess("");
      setWordGuessResult(null);
    } else {
      // finished all words -> celebrate with the win screen
      setShowWin(true);
      setDisabled(true);
    }
  };

  return (
    <>
      <div className="w-full flex-1 flex flex-col items-center gap-4 mt-6 max-w-[420px] mx-auto relative">
        {/* Group display, input, and keyboard with equal vertical spacing */}
        <div className="w-full flex flex-1 flex-col items-center justify-center gap-3">
          <HangmanLetters
            display={display}
            celebrate={wordGuessResult === "correct"}
          />

          <HangmanGuessInput
            wordGuess={wordGuess}
            setWordGuess={setWordGuess}
            handleWordGuess={handleWordGuess}
            disabled={disabled}
          />

          <HangmanKeyboard
            guessed={guessed}
            hangmanWord={hangmanWord}
            guessLetter={guessLetter}
            disabled={disabled}
          />
        </div>

        <AnimatePresence>
          {wordGuessResult === "incorrect" && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col items-center"
            >
              <div className="text-red-500 font-bold text-sm">Incorrect</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Return button fixed near bottom center of viewport (72px above bottom) */}
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-[72px] z-50 pointer-events-auto">
          <ReturnToMainButton />
        </div>
        {showGameOver && (
          <HangmanGameOverModal
            onRestart={() => {
              // replay the same shuffled pool from the start
              const state = useGameStore.getState();
              const sessionPool: string[] = state?.hangmanPool ?? [];
              if (sessionPool.length > 0) {
                useGameStore.getState().resetHangman();
                useGameStore.getState().setHangmanIndex(0);
                useGameStore.getState()
                  .setHangmanWord(sessionPool[0]);
              } else {
                useGameStore.getState().resetHangman();
              }
              // clear local UI inputs
              setWordGuess("");
              setWordGuessResult(null);
              setShowGameOver(false);
              setDisabled(false);
            }}
            onReturn={() => {
              // single reset action clears session, score, HUD and hangman state
              useGameStore.getState().returnToMain();
              setShowGameOver(false);
              setDisabled(true);
            }}
          />
        )}
      </div>
    </>
  );
}
