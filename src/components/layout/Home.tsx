import React from "react";
import GameModeTitle from "../GameModeTitle";
import GameModeButtons from "../GameModeButtons";

export default function Home() {
  return (
    <div className="w-full flex-1 h-full flex items-center justify-center px-6 transition-all duration-500 pt-24 md:pt-10">
      <div
        className="w-full max-w-4xl flex flex-col items-center justify-center transform lg:-translate-y-2
      "
      >
        <div className="mb-20">
          <GameModeTitle />
        </div>
        <GameModeButtons />
      </div>
    </div>
  );
}
