import React from "react";

export default function HangmanLetters({
  display,
}: {
  display: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap justify-center mb-2 min-h-[48px]">
      {display}
    </div>
  );
}
