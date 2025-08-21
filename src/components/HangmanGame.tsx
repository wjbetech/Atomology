import React, { useState, useEffect } from "react";
import { useGameStore } from "../store/atomologyStore";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiSparks from "./sub-components/ConfettiSparks";
import ReturnToMainButton from "./sub-components/ReturnToMainButton";
import HangmanLetters from "./hangman/HangmanLetters";
import HangmanGuessInput from "./hangman/HangmanGuessInput";
import HangmanKeyboard from "./hangman/HangmanKeyboard";
import HangmanGameOverModal from "./hangman/HangmanGameOverModal";
import { getElementsByDifficulty } from "../utils/hangmanDifficulty";

export default function HangmanGame() {
  const hangmanWord = useGameStore((s) => s.hangmanWord);
  const hangmanDifficulty = useGameStore((s) => s.hangmanDifficulty);
  const hangmanIndex = useGameStore((s) => (s as any).hangmanIndex ?? 0);
  const setHangmanIndex = useGameStore((s) => (s as any).setHangmanIndex);
  const guessed = useGameStore((s) => s.hangmanGuessedLetters);
  const incorrect = useGameStore((s) => s.hangmanIncorrectGuesses);
  const maxAttempts = useGameStore((s) => s.hangmanMaxAttempts);
  const guessLetter = useGameStore((s) => s.guessHangmanLetter);
  const setGameMode = useGameStore((s) => s.setGameMode);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  const [input, setInput] = useState("");
  const [wordGuess, setWordGuess] = useState("");
  const [wordGuessResult, setWordGuessResult] = useState<string | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const resultTimeoutRef = React.useRef<number | null>(null);
  const advanceTimeoutRef = React.useRef<number | null>(null);
  const advancingRef = React.useRef<boolean>(false);

  // Trigger game over when incorrect guesses reach maxAttempts
  useEffect(() => {
    if (incorrect >= maxAttempts) {
      setShowGameOver(true);
      setDisabled(true);
    }
  }, [incorrect, maxAttempts]);

  // Use the shuffled pool from sessionStorage if available
  const pool = React.useMemo(() => {
    try {
      const stored = sessionStorage.getItem("hangmanPool");
      if (stored) {
        // reconstruct as array of names
        return JSON.parse(stored);
      }
      if (!hangmanDifficulty) return [] as any[];
      return getElementsByDifficulty(hangmanDifficulty as any).map(
        (e) => e.name
      );
    } catch (err) {
      return [] as any[];
    }
  }, [hangmanDifficulty]);
  const total = pool.length;
  const current = total > 0 ? hangmanIndex + 1 : 0;

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
      if (resultTimeoutRef.current)
        window.clearTimeout(resultTimeoutRef.current as any);
      if (advanceTimeoutRef.current)
        window.clearTimeout(advanceTimeoutRef.current as any);
    };
  }, []);

  // Auto-complete: if all unique letters are guessed, trigger correct and advance
  function handleAdvance() {
    if (advancingRef.current) return;
    advancingRef.current = true;
    setWordGuessResult("correct");
    const DISPLAY_MS = 800;
    const EXIT_MS = 320;
    if (resultTimeoutRef.current)
      window.clearTimeout(resultTimeoutRef.current as any);
    if (advanceTimeoutRef.current)
      window.clearTimeout(advanceTimeoutRef.current as any);
    resultTimeoutRef.current = window.setTimeout(() => {
      setWordGuessResult(null);
      advanceTimeoutRef.current = window.setTimeout(() => {
        const nextIndex = (hangmanIndex ?? 0) + 1;
        if (nextIndex < total) {
          setHangmanIndex && setHangmanIndex(nextIndex);
          const nextName = pool[nextIndex];
          if (nextName) {
            (useGameStore as any).getState().setHangmanWord(nextName);
          }
        } else {
          setShowGameOver(true);
          setDisabled(true);
        }
        // allow future advances
        advancingRef.current = false;
      }, EXIT_MS);
    }, DISPLAY_MS);
  }

  // determine if every unique alphabetic letter in the current word has been guessed
  const isWordComplete = React.useMemo(() => {
    if (!hangmanWord) return false;
    const letters = Array.from(
      new Set(
        hangmanWord
          .replace(/[^a-zA-Z]/g, "")
          .toLowerCase()
          .split("")
      )
    );
    if (letters.length === 0) return false;
    return letters.every((l) => guessed.includes(l));
  }, [hangmanWord, guessed]);

  // track previous completion to only trigger on the rising edge
  const prevCompleteRef = React.useRef<boolean>(false);
  useEffect(() => {
    if (!hangmanWord || disabled || showGameOver) {
      prevCompleteRef.current = false;
      return;
    }
    if (isWordComplete && !prevCompleteRef.current && !advancingRef.current) {
      handleAdvance();
    }
    prevCompleteRef.current = isWordComplete;
  }, [isWordComplete, hangmanWord, disabled, showGameOver]);

  // UI-facing guess wrapper: predicts completion using current guessed + new letter
  const guessAndCheck = (letter: string) => {
    if (!hangmanWord) return;
    const l = letter.toLowerCase();
    if (guessed.includes(l)) return;

    const unique = Array.from(
      new Set(
        hangmanWord
          .replace(/[^a-zA-Z]/g, "")
          .toLowerCase()
          .split("")
      )
    );
    const nextGuessed = [...guessed, l];
    const willComplete =
      unique.length > 0 && unique.every((c) => nextGuessed.includes(c));

    // call store action to register guess
    guessLetter(l);

    // if this guess will complete the word, trigger advance (guarded)
    if (willComplete && !advancingRef.current) {
      // small timeout so UI shows last letter before confetti
      window.setTimeout(() => {
        handleAdvance();
      }, 40);
    }
  };
  const totalGuesses = incorrect + guessed.length;
  const remainingAttempts = Math.max(0, maxAttempts - incorrect);

  if (!hangmanWord) return null;

  // Build display for blanks and correct letters, all capitalized
  const display = hangmanWord.split("").map((char, i) => {
    if (char === " ") return <span key={i} className="w-3 inline-block" />;
    const upper = char.toUpperCase();
    const revealed = guessed.includes(char.toLowerCase());
    return (
      <span
        key={i}
        className={
          "inline-flex items-center justify-center w-9 h-9 mx-0.5 text-lg font-semibold rounded-sm border-2 transition-colors duration-200 " +
          (revealed
            ? "bg-green-700 border-green-700 text-white"
            : "border-gray-400 text-transparent bg-transparent")
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
      handleAdvance();
    } else {
      setWordGuessResult("incorrect");
    }
    // keep the guess visible for the result display
    setInput("");
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-[420px] mx-auto relative">
      <ConfettiSparks trigger={wordGuessResult === "correct"} />

      {/* Group display, input, and keyboard with equal vertical spacing */}
      <div className="w-full flex flex-col items-center gap-6">
        <HangmanLetters display={display} />

        <HangmanGuessInput
          wordGuess={wordGuess}
          setWordGuess={setWordGuess}
          handleWordGuess={handleWordGuess}
          disabled={disabled}
        />

        <HangmanKeyboard
          guessed={guessed}
          hangmanWord={hangmanWord}
          guessLetter={guessAndCheck}
          disabled={disabled}
        />
      </div>

      <AnimatePresence>
        {wordGuessResult && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col items-center"
          >
            {wordGuessResult === "correct" ? (
              <div className="text-green-600 font-bold text-sm">
                Correct! 🎉
              </div>
            ) : (
              <div className="text-red-500 font-bold text-sm">Incorrect</div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              Answer: <span className="font-semibold">{hangmanWord}</span>
            </div>
            <button
              className="btn btn-primary rounded-full w-32 h-10 min-h-0 mt-3 text-sm"
              onClick={() => {
                handleAdvance();
                setInput("");
                setWordGuess("");
              }}
            >
              Next Element
            </button>
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
            // fully reset hangman session and restart at first item of current difficulty
            const state = (useGameStore as any).getState?.();
            const diff = state?.hangmanDifficulty ?? "all";
            try {
              const stored = sessionStorage.getItem("hangmanPool");
              let pool: string[] = [];
              if (stored) {
                pool = JSON.parse(stored);
              } else {
                pool = getElementsByDifficulty(diff as any).map((e) => e.name);
              }
              if (pool && pool.length > 0) {
                // reset guessed letters & incorrect count and index
                (useGameStore as any).getState().resetHangman &&
                  (useGameStore as any).getState().resetHangman();
                (useGameStore as any).getState().setHangmanIndex &&
                  (useGameStore as any).getState().setHangmanIndex(0);
                // set first word in pool
                (useGameStore as any).getState().setHangmanWord(pool[0]);
                // ensure difficulty kept
                (useGameStore as any).getState().setHangmanDifficulty &&
                  (useGameStore as any).getState().setHangmanDifficulty(diff);
                // re-store pool for session
                sessionStorage.setItem("hangmanPool", JSON.stringify(pool));
              } else {
                // fallback reset only
                (useGameStore as any).getState().resetHangman &&
                  (useGameStore as any).getState().resetHangman();
              }
            } catch (err) {
              // fallback reset only
              (useGameStore as any).getState().resetHangman &&
                (useGameStore as any).getState().resetHangman();
            }
            // clear local UI inputs
            setWordGuess("");
            setInput("");
            setWordGuessResult(null);
            setShowGameOver(false);
            setDisabled(false);
          }}
          onReturn={() => {
            // clear session and navigate to main via store
            try {
              localStorage.removeItem("atomology.session");
            } catch {}
            (useGameStore as any).getState().setGameMode("");
            (useGameStore as any).getState().setGameStarted(false);
            setShowGameOver(false);
            setDisabled(true);
          }}
        />
      )}
    </div>
  );
}
