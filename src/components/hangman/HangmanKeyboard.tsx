import React from "react";

export default function HangmanKeyboard({
  guessed,
  hangmanWord,
  guessLetter,
  disabled = false,
}: {
  guessed: string[];
  hangmanWord: string;
  guessLetter: (l: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="w-full flex justify-center mb-2 mt-4">
      <div className="flex flex-wrap justify-center gap-x-1 gap-y-2 w-full max-w-[420px]">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((L) => {
          const l = L.toLowerCase();
          const used = guessed.includes(l);
          const inWord = hangmanWord.toLowerCase().includes(l);

          const base =
            "inline-flex items-center justify-center w-8 h-9 text-sm font-semibold rounded-sm transition-colors";

          const classes = used
            ? inWord
              ? base + " bg-green-700 text-white border-0 disabled:opacity-100"
              :
                // keep the existing light-theme look, but in dark mode use a semi-transparent
                // error background so incorrect picks read as 'picked' more clearly.
                base +
                  " bg-gray-400/50 text-gray-700 border-0 opacity-60 dark:bg-error/60 dark:text-white"
            : base +
              // use theme tokens for normal/hover states so dark/light behave consistently
              " bg-base-200 text-base-content dark:bg-slate-700 dark:text-white" +
              " hover:bg-base-300 dark:hover:bg-slate-600 cursor-pointer disabled:opacity-60";

          return (
            <button
              key={L}
              aria-label={`Guess ${L}`}
              disabled={used || disabled}
              onClick={() => {
                if (!used && !disabled) guessLetter(l);
              }}
              className={classes + " light:border-content"}
            >
              {L}
            </button>
          );
        })}
      </div>
    </div>
  );
}
