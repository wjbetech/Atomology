import React, { useState, useEffect } from "react";
import { useGameStore } from "../store/atomologyStore";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiSparks from "./ConfettiSparks";
import ReturnToMainButton from "./ReturnToMainButton";

export default function HangmanGame() {
  // Color interpolation: green (#22c55e) to red (#ef4444)
  function getLivesColor(lives: number, max: number) {
    const percent = Math.max(0, Math.min(1, lives / max));
    // Interpolate between green and red
    const r = Math.round(34 * percent + 239 * (1 - percent));
    const g = Math.round(197 * percent + 68 * (1 - percent));
    const b = Math.round(94 * percent + 68 * (1 - percent));
    return `rgb(${r},${g},${b})`;
  }
  const hangmanWord = useGameStore((s) => s.hangmanWord);
  const guessed = useGameStore((s) => s.hangmanGuessedLetters);
  const incorrect = useGameStore((s) => s.hangmanIncorrectGuesses);
  const maxAttempts = useGameStore((s) => s.hangmanMaxAttempts);
  const guessLetter = useGameStore((s) => s.guessHangmanLetter);
  const setGameMode = useGameStore((s) => s.setGameMode);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  const [input, setInput] = useState("");
  const [wordGuess, setWordGuess] = useState("");
  const [wordGuessResult, setWordGuessResult] = useState<string | null>(null);

  // For animating lives left
  const [prevIncorrect, setPrevIncorrect] = useState(incorrect);
  const [livesAnimKey, setLivesAnimKey] = useState(0);
  useEffect(() => {
    if (incorrect !== prevIncorrect) {
      setLivesAnimKey((k) => k + 1);
      setPrevIncorrect(incorrect);
    }
  }, [incorrect, prevIncorrect]);

  if (!hangmanWord) return null;

  // Build display for blanks and correct letters, all capitalized
  const display = hangmanWord.split("").map((char, i) => {
    if (char === " ")
      return (
        <span key={i} className="mx-1">
          {" "}
        </span>
      );
    const upper = char.toUpperCase();
    return (
      <span
        key={i}
        className="border-b-2 border-gray-400 w-5 inline-block text-center mx-0.5 text-lg"
      >
        {guessed.includes(char.toLowerCase()) ? upper : ""}
      </span>
    );
  });

  // Handle letter input
  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const letter = input.trim().toLowerCase();
    if (!letter || letter.length !== 1 || guessed.includes(letter)) return;
    guessLetter(letter);
    setInput("");
  };

  const handleWordGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordGuess.trim()) return;
    if (wordGuess.trim().toLowerCase() === hangmanWord.toLowerCase()) {
      setWordGuessResult("correct");
      // Optionally: trigger win logic here
    } else {
      setWordGuessResult("incorrect");
    }
    setWordGuess("");
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-xs mx-auto relative">
      <ConfettiSparks trigger={wordGuessResult === "correct"} />
      {/* Label above letter input */}
      <div className="w-full flex justify-center mb-1">
        <label className="text-center text-base font-semibold text-gray-400">
          Enter a letter
        </label>
      </div>
      <form
        onSubmit={handleGuess}
        className="flex gap-2 w-full justify-center mb-2"
      >
        <input
          type="text"
          inputMode="text"
          maxLength={1}
          pattern="[a-zA-Z]"
          className="w-32 text-center text-xl h-10 rounded-full bg-gray-900/80 text-white border border-gray-500 focus:border-blue-400 placeholder-gray-400"
          value={input}
          onChange={(e) => {
            // Only allow a single letter (a-z or A-Z)
            const val = e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 1);
            setInput(val);
          }}
          autoFocus
        />
      </form>
      <div className="flex flex-wrap justify-center mb-2 min-h-[48px]">
        {display}
      </div>
      <form
        onSubmit={handleWordGuess}
        className="flex gap-2 w-full justify-center mt-2"
      >
        <input
          type="text"
          inputMode="text"
          className="input input-bordered w-32 text-center text-xs h-10 rounded-full placeholder:italic placeholder:text-xs"
          placeholder="Element"
          value={wordGuess}
          onChange={(e) => setWordGuess(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-outline btn-xs rounded-full h-12 min-h-0 px-6 text-base"
        >
          Guess
        </button>
      </form>
      {wordGuessResult && (
        <>
          {wordGuessResult === "correct" ? (
            <div className="text-green-600 font-bold">Correct! 🎉</div>
          ) : (
            <div className="text-red-500 font-bold">Incorrect</div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            Answer: <span className="font-semibold">{hangmanWord}</span>
          </div>
          <button
            className="btn btn-primary btn-sm rounded-full mt-3 px-6"
            onClick={() => {
              setWordGuessResult(null);
              setInput("");
              setWordGuess("");
              // TODO: Add logic to move to the next element (advance game state)
            }}
          >
            Next Element
          </button>
        </>
      )}
      <div className="w-full flex flex-col items-center my-2">
        <span className="text-xs text-gray-400 mb-3 tracking-wide uppercase font-semibold">
          Used Letters
        </span>
        <div className="flex flex-wrap gap-2 justify-center min-h-[32px]">
          {guessed.length === 0 ? (
            <span className="text-gray-400 italic">None yet</span>
          ) : (
            guessed.map((letter) => (
              <span
                key={letter}
                className="bg-gray-200 text-gray-700 rounded-full px-2.5 py-1 text-sm font-bold border border-gray-400 shadow-sm"
              >
                {letter.toUpperCase()}
              </span>
            ))
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-center mb-8">
        <span className="text-xs text-gray-400 mb-1 tracking-wide uppercase font-semibold">
          Lives left
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={livesAnimKey}
            initial={{ scale: 1 }}
            animate={{ scale: [1.2, 0.95, 1.1, 1] }}
            exit={{ scale: 1 }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.7, 1] }}
            className="font-extrabold text-4xl md:text-5xl drop-shadow-lg select-none"
            style={{
              color: getLivesColor(maxAttempts - incorrect, maxAttempts),
            }}
          >
            {maxAttempts - incorrect}
          </motion.span>
        </AnimatePresence>
      </div>
      <ReturnToMainButton />
    </div>
  );
}
