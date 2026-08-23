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
    <div className="w-full flex justify-center mb-2 mt-4 px-6 sm:px-0">
      <div className="flex flex-wrap justify-center gap-x-1 gap-y-2 w-full max-w-[420px] px-6 sm:px-0">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((L) => {
          const l = L.toLowerCase();
          const used = guessed.includes(l);
          const inWord = hangmanWord.toLowerCase().includes(l);

          const base =
            "inline-flex items-center justify-center w-8 h-9 text-sm font-semibold rounded-sm transition-colors";

          const classes = used
            ? inWord
              ? base + " bg-copper text-void border-0 disabled:opacity-100"
              : // struck-out picks: strontium wash, clearly 'spent'
                base +
                " bg-strontium/20 text-strontium/80 border-0 opacity-60"
            : base +
              " bg-slide text-specimen border border-hairline" +
              " hover:bg-hairline cursor-pointer disabled:opacity-60 active:scale-[0.94] motion-reduce:active:scale-100 transition-transform";

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
