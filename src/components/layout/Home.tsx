import React from "react";
import GameModeTitle from "../GameModeTitle";
import GameModeButtons from "../GameModeButtons";

export default function Home() {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center transition-all duration-500 place-self-center"
      style={{ minHeight: 320 }}
    >
      <GameModeTitle />
      <GameModeButtons />
    </div>
  );
}
