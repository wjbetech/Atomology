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
    "btn btn-primary rounded-full overflow-hidden shadow-sm transition-all duration-300 w-full min-h-12 h-auto flex items-center justify-center gap-2 px-3 sm:px-5 md:px-8 text-base md:text-lg lg:text-xl whitespace-nowrap overflow-hidden";

  if (isPickedWrong) {
    // Incorrect answer: force error border + half opacity and make it disabled
    btnClass =
      "btn btn-outline btn-content rounded-full overflow-hidden shadow-sm transition-all duration-300 w-full min-h-12 h-auto flex items-center justify-center gap-2 px-3 sm:px-5 md:px-8 text-base md:text-lg lg:text-xl whitespace-nowrap" +
      " !border-2 !border-error opacity-50 btn-disabled";
  } else if (disabled) {
    // For generic disabled, use DaisyUI's btn-disabled to get the standard disabled look/behavior.
    btnClass += " btn-disabled";
  } else if (isRoundLocked && isCorrect) {
    btnClass += " !border-2 bg-green-800 text-white border-green-900";
  } else if (isSelected && isCorrect) {
    btnClass +=
      " !border-2 bg-green-200 dark:bg-green-900 border-green-500 dark:border-green-700 animate-pulse";
  } else {
    // Use a neutral gray border for unchosen answers in both light and dark themes
    btnClass += " !border-2 !border-gray-400 dark:!border-gray-400";
  }

  return (
    <button
      onClick={onClick}
      className={`${btnClass} answer-btn`}
      value={label}
      id={`answer=${idx}`}
      disabled={effectiveDisabled}
      style={{ minWidth: 0 }}
    >
      <span className="flex-1 flex items-center font-semibold text-base md:text-lg lg:text-xl truncate overflow-hidden">
        <span className="mr-2 text-content text-base md:text-lg lg:text-xl font-bold flex-shrink-0">
          {idx + 1}.
        </span>
        <span className="truncate">{label}</span>
      </span>
    </button>
  );
}
