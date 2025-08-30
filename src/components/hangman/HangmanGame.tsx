import React, { useState, useEffect } from "react";
import { useGameStore, useUIStore } from "../../store/atomologyStore";
import InGameNavbar from "../layout/InGameNavbar";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiSparks from "../sub-components/ConfettiSparks.tsx";
import ReturnToMainButton from "../sub-components/ReturnToMainButton.tsx";
import HangmanLetters from "./HangmanLetters.tsx";
import HangmanGuessInput from "./HangmanGuessInput.tsx";
import HangmanKeyboard from "./HangmanKeyboard.tsx";
import HangmanGameOverModal from "./HangmanGameOverModal.tsx";
import { getElementsByDifficulty } from "../../utils/hangmanDifficulty";

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
  const DISPLAY_MS = 800;
  const EXIT_MS = 320;

  const soundEnabled = useUIStore((s) => s.soundEnabled);
  const setShowHUD = useUIStore((s) => s.setShowHUD);

  // richer short celebration: three-note arpeggio + bright sparkle overlay
  const playCelebration = () => {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctx();
      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.value = 0.001;
      master.connect(ctx.destination);

      // quick fade-in
      master.gain.exponentialRampToValueAtTime(0.6, now + 0.02);

      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 arpeggio
      const noteDur = 0.14;

      notes.forEach((freq, i) => {
        const t = now + i * (noteDur * 0.9);
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        // slightly detuned saw + triangle mix for warmth
        o.type = "sawtooth" as OscillatorType;
        o.frequency.value = freq;
        const o2 = ctx.createOscillator();
        o2.type = "triangle" as OscillatorType;
        o2.frequency.value = freq * 0.999;

        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.35, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + noteDur);

        o.connect(g);
        o2.connect(g);
        g.connect(master);

        o.start(t);
        o2.start(t);
        o.stop(t + noteDur + 0.02);
        o2.stop(t + noteDur + 0.02);
      });

      // sparkle overlay
      const sparkle = ctx.createOscillator();
      const sg = ctx.createGain();
      sparkle.type = "sine" as OscillatorType;
      sparkle.frequency.value = 1400;
      sg.gain.setValueAtTime(0.0001, now);
      sg.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
      sg.gain.exponentialRampToValueAtTime(
        0.0001,
        now + notes.length * noteDur
      );
      sparkle.connect(sg);
      sg.connect(master);
      sparkle.start(now);
      sparkle.stop(now + notes.length * noteDur + 0.02);

      // schedule context close
      setTimeout(() => {
        try {
          master.disconnect();
          ctx.close();
        } catch (e) {}
      }, (notes.length * noteDur + 0.2) * 1000);
    } catch (e) {
      // ignore audio errors silently
    }
  };

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

  // progress counter: compute current index and total from difficulty pool
  const pool = React.useMemo(() => {
    try {
      if (!hangmanDifficulty) return [] as any[];
      return getElementsByDifficulty(hangmanDifficulty as any);
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

  if (!hangmanWord) return null;

  // Ensure HUD is turned off when entering actual Hangman game
  React.useEffect(() => {
    setShowHUD(false);
  }, [setShowHUD]);

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
      setWordGuessResult("correct");
      // clear any existing timers
      if (resultTimeoutRef.current)
        window.clearTimeout(resultTimeoutRef.current as any);
      if (advanceTimeoutRef.current)
        window.clearTimeout(advanceTimeoutRef.current as any);
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
    setInput("");
  };

  // helper to advance to next element or finish the session
  const advanceToNext = () => {
    // add current word to guessed HUD if available
    try {
      const curr = pool[hangmanIndex];
      if (curr && curr.symbol)
        (useGameStore as any).getState().addGuessedElement(curr.symbol);
    } catch (err) {}

    const nextIndex = (hangmanIndex ?? 0) + 1;
    if (nextIndex < total) {
      setHangmanIndex && setHangmanIndex(nextIndex);
      const nextName = pool[nextIndex]?.name;
      nextName && (useGameStore as any).getState().setHangmanWord(nextName);
      // clear local UI
      setWordGuess("");
      setInput("");
      setWordGuessResult(null);
    } else {
      // finished all words -> show finished state/modal
      setShowGameOver(true);
      setDisabled(true);
    }
  };

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
      if (resultTimeoutRef.current)
        window.clearTimeout(resultTimeoutRef.current as any);
      if (advanceTimeoutRef.current)
        window.clearTimeout(advanceTimeoutRef.current as any);
      resultTimeoutRef.current = window.setTimeout(() => {
        setWordGuessResult(null);
        advanceTimeoutRef.current = window.setTimeout(() => {
          advanceToNext();
        }, EXIT_MS);
      }, DISPLAY_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessed, hangmanWord]);

  return (
    <>
      <InGameNavbar />
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
              // fully reset hangman session and restart at first item of current difficulty
              const state = (useGameStore as any).getState?.();
              const diff = state?.hangmanDifficulty ?? "all";
              try {
                const pool = getElementsByDifficulty(diff as any);
                if (pool && pool.length > 0) {
                  // reset guessed letters & incorrect count and index
                  (useGameStore as any).getState().resetHangman &&
                    (useGameStore as any).getState().resetHangman();
                  (useGameStore as any).getState().setHangmanIndex &&
                    (useGameStore as any).getState().setHangmanIndex(0);
                  // set first word in pool
                  (useGameStore as any).getState().setHangmanWord(pool[0].name);
                  // ensure difficulty kept
                  (useGameStore as any).getState().setHangmanDifficulty &&
                    (useGameStore as any).getState().setHangmanDifficulty(diff);
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
    </>
  );
}
