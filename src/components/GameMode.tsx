import React from "react";
import { useState } from "react";

type Props = {};

const handleClick = () => {};

export default function GameMode({}: Props) {
  const [gameMode, setGameMode] = useState("multiple");

  return (
    <div className="p-8 flex gap-4 justify-center">
      <button value={gameMode} onClick={handleClick} className="btn text-lg">
        Multiple Choice
      </button>
      <button value={gameMode} onClick={handleClick} className="btn text-lg">
        Open Answer
      </button>
    </div>
  );
}
