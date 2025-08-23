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
    <div className="w-full flex justify-center mt-2">
      <form
        onSubmit={(e) => {
          if (disabled) return e.preventDefault();
          return handleWordGuess(e);
        }}
        className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl"
      >
        <input
          id="element-guess"
          type="text"
          inputMode="text"
          placeholder="the element is..."
          className="flex-1 w-full text-center text-lg h-10 leading-10 py-0 rounded-full bg-neutral-100 dark:bg-primary-content  text-white border border-gray-500 focus:border-blue-400 px-4 placeholder:text-sm placeholder:italic placeholder:text-gray-400"
          value={wordGuess}
          onChange={(e) => setWordGuess(e.target.value)}
          disabled={disabled}
        />
      </form>
    </div>
  );
}
