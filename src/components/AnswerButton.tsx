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
    "btn btn-outline btn-primary !border-2 !border-primary rounded-full overflow-hidden shadow-sm transition-all duration-300 w-full min-h-12 h-auto flex items-center justify-center gap-2 px-3 sm:px-5 md:px-8 text-base md:text-lg lg:text-xl whitespace-nowrap";
  if (isRoundLocked && isCorrect) {
    btnClass += " bg-green-800 text-white border-green-900";
  } else if (isPickedWrong) {
    btnClass +=
      "!bg-gray-400 !border-red-300 text-gray-500 opacity-80 cursor-not-allowed ring-1 ring-red-200";
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
      style={{ minWidth: 0 }}
    >
      <span className="flex-1 flex items-center font-semibold text-base md:text-lg lg:text-xl truncate">
        <span className="mr-2 text-content text-base md:text-lg lg:text-xl font-bold flex-shrink-0">
          {idx + 1}.
        </span>
        <span className="truncate">{label}</span>
      </span>
    </button>
  );
}
