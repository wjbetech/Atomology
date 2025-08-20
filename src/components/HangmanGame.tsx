import React, { useState } from "react";
import { useGameStore } from "../store/atomologyStore";

export default function HangmanGame() {
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
        className="border-b-2 border-gray-400 w-6 inline-block text-center mx-1 text-2xl"
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
    <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-xs mx-auto">
      <form
        onSubmit={handleGuess}
        className="flex gap-2 w-full justify-center mb-2"
      >
        <input
          type="text"
          inputMode="text"
          maxLength={1}
          className="input input-bordered w-16 text-center text-xl h-10 rounded-full"
          value={input}
          onChange={(e) =>
            setInput(e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 1))
          }
          autoFocus
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm rounded-full h-10 min-h-0 px-4"
        >
          Guess
        </button>
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
          className="input input-bordered w-32 text-center text-xs h-10 rounded-full placeholder:text-xs"
          placeholder="element"
          value={wordGuess}
          onChange={(e) => setWordGuess(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-outline btn-xs rounded-full h-10 min-h-0 px-4"
        >
          Guess Word
        </button>
      </form>
      {wordGuessResult === "correct" && (
        <div className="text-green-600 font-bold">Correct! 🎉</div>
      )}
      {wordGuessResult === "incorrect" && (
        <div className="text-red-500 font-bold">Incorrect</div>
      )}
      <div className="text-sm">Guessed: {guessed.join(", ")}</div>
      <div className="text-sm">
        Lives left: <span className="font-bold">{maxAttempts - incorrect}</span>
      </div>
      <button
        className="btn btn-outline btn-sm rounded-full w-full mt-4"
        onClick={() => {
          setGameMode("");
          setGameStarted(false);
        }}
      >
        Return to Main
      </button>
    </div>
  );
}
