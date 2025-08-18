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
  let btnClass =
    "btn btn-outline border-2 rounded-full overflow-hidden shadow-sm transition-all duration-300 w-full h-14 lg:h-14 flex items-center gap-3 lg:gap-2 px-4 lg:px-8 text-sm lg:text-base";
  if (isRoundLocked && isCorrect) {
    btnClass += " bg-green-800 text-white border-green-900";
  } else if (isPickedWrong) {
    btnClass +=
      " bg-gray-100 border-red-300 text-gray-500 opacity-80 cursor-not-allowed ring-1 ring-red-200";
  } else if (disabled) {
    btnClass +=
      " bg-gray-100 border-gray-300 text-gray-500 opacity-80 cursor-not-allowed ring-1 ring-gray-200";
  } else if (isSelected && isCorrect) {
    btnClass += " bg-green-200 border-green-500 animate-pulse";
  }
  return (
    <button
      onClick={onClick}
      className={btnClass}
      value={label}
      id="answer"
      disabled={disabled}
    >
      <span className="font-semibold w-6 lg:w-4 text-left text-sm lg:text-base">
        {idx + 1}.
      </span>
      <span className="text-left truncate text-sm lg:text-base">{label}</span>
    </button>
  );
}
