import React from "react";
import { useState } from "react";
import { getRandomElement } from "../hooks/gameLogic.js";

console.log(getRandomElement("2"));

type Props = {};

export default function GameMode({}: Props) {
  const [gameMode, setGameMode] = useState("multiple");

  const handleClick = () => {};

  return (
    <div className="py-14 flex gap-6 justify-center">
      <button id="multiple" value="multiple" onClick={handleClick} className="btn text-lg">
        Multiple Choice
      </button>
      <button id="open" value="multiple" onClick={handleClick} className="btn text-lg">
        Open Answer
      </button>
    </div>
  );
}
