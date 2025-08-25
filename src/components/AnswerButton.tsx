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

  let btnClass =
    "btn btn-primary rounded-full shadow-sm transition-all duration-300 w-full py-2 sm:py-3 md:py-2 px-6 sm:px-8 md:px-14 lg:px-16 xl:px-18 flex items-center justify-center gap-3 text-base md:text-lg lg:text-xl h-auto min-h-[48px] sm:min-h-[56px] md:min-h-[52px] max-h-[110px] sm:max-h-[90px] md:max-h-[80px] overflow-hidden";

  if (isPickedWrong) {
    // Incorrect answer: force error border + half opacity and make it disabled
    btnClass =
      "btn btn-outline btn-content rounded-full shadow-sm transition-all duration-300 w-full py-2 sm:py-3 md:py-2 px-6 sm:px-8 md:px-14 lg:px-16 xl:px-18 flex items-center justify-center gap-3 text-base md:text-lg lg:text-xl h-auto min-h-[48px] sm:min-h-[56px] md:min-h-[52px] max-h-[110px] sm:max-h-[90px] md:max-h-[80px] overflow-hidden !border-2 !border-error opacity-50 btn-disabled";
  } else if (disabled) {
    // For generic disabled, use DaisyUI's btn-disabled to get the standard disabled look/behavior.
    btnClass += " btn-disabled";
  } else if (isRoundLocked && isCorrect) {
    btnClass += " !border-2 bg-green-800 text-white border-green-900";
  } else if (isSelected && isCorrect) {
    btnClass +=
      " !border-2 bg-green-200 dark:bg-green-900 border-green-500 dark:border-green-700 animate-pulse";
  }

  return (
    <button
      onClick={onClick}
      className={`${btnClass} answer-btn`}
      value={label}
      id={`answer=${idx}`}
      disabled={effectiveDisabled}
    >
      <span className="flex-1 flex items-center font-semibold text-base md:text-lg lg:text-xl leading-tight">
        <span className="mr-3 text-content font-bold flex-shrink-0 text-sm md:text-base">
          {idx + 1}.
        </span>
        <span className="break-words flex align-middle">{label}</span>
      </span>
    </button>
  );
}
