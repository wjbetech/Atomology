import React from "react";

interface AnswerButtonProps {
  idx: number;
  label: string;
  disabled: boolean;
  isCorrect: boolean;
  isPickedWrong: boolean;
  isRoundLocked: boolean;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Shared geometry for every state so swaps stay purely chromatic.
const BASE =
  "btn btn-outline rounded-pill shadow-sm transition-all duration-200 motion-reduce:transition-none w-full py-2 sm:py-3 md:py-2 px-6 sm:px-8 md:px-14 lg:px-16 flex items-center justify-center gap-3 text-base md:text-lg h-auto min-h-[48px] sm:min-h-[52px] max-h-[110px] overflow-hidden active:scale-[0.97] motion-reduce:active:scale-100 hover:-translate-y-px motion-reduce:hover:translate-y-0";

export default function AnswerButton({
  idx,
  label,
  disabled,
  isCorrect,
  isPickedWrong,
  isRoundLocked,
  isSelected,
  onClick,
}: AnswerButtonProps) {
  // If a wrong answer has been picked, treat the button as disabled so it can't be clicked again.
  const effectiveDisabled = !!disabled || !!isPickedWrong;

  let btnClass = `${BASE} border-hairline text-specimen hover:border-annotation/50`;

  if (isRoundLocked && isCorrect) {
    // the winning answer glows copper
    btnClass = `${BASE} !border-2 border-copper bg-copper/20 text-copper shadow-[0_0_24px_rgba(53,217,154,0.35)]`;
  } else if (isSelected && isCorrect) {
    btnClass = `${BASE} !border-2 border-copper bg-copper/10 text-copper`;
  } else if (isPickedWrong) {
    // Incorrect answer: strontium strike-out, half opacity, disabled
    btnClass = `${BASE} !border-2 !border-strontium text-strontium opacity-50 line-through decoration-2 btn-disabled`;
  } else if (disabled) {
    // For generic disabled, use DaisyUI's btn-disabled to get the standard disabled look/behavior.
    btnClass += " btn-disabled";
  }

  return (
    <button
      onClick={onClick}
      className={`${btnClass} answer-btn`}
      value={label}
      id={`answer-${idx}`}
      disabled={effectiveDisabled}
    >
      <span className="flex-1 flex items-center font-semibold text-base md:text-lg leading-tight">
        <span className="mr-3 font-mono text-annotation font-bold flex-shrink-0 text-sm">
          {idx + 1}.
        </span>
        <span className="break-words flex align-middle">{label}</span>
      </span>
    </button>
  );
}
