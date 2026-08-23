import React from "react";

export default function HangmanGuessInput({
  wordGuess,
  setWordGuess,
  handleWordGuess,
  disabled = false,
}: {
  wordGuess: string;
  setWordGuess: (v: string) => void;
  handleWordGuess: (e: React.FormEvent) => void;
  disabled?: boolean;
}) {
  return (
    <div className="w-full flex justify-center px-6 sm:px-0">
      <form
        onSubmit={(e) => {
          if (disabled) return e.preventDefault();
          return handleWordGuess(e);
        }}
        className="flex flex-col sm:flex-row items-center w-full max-w-xl px-6 sm:px-0"
      >
        <input
          id="element-guess"
          type="text"
          inputMode="text"
          placeholder="the element is..."
          className="flex-1 w-full text-center text-lg leading-10 rounded-pill bg-slide text-specimen border border-hairline focus:border-argon px-4 placeholder:text-sm placeholder:italic placeholder:text-annotation/70"
          value={wordGuess}
          onChange={(e) => setWordGuess(e.target.value)}
          disabled={disabled}
        />
      </form>
    </div>
  );
}
