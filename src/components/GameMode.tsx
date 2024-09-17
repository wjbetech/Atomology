import React from "react";
import { useState } from "react";
// import { getRandomElement } from "../hooks/gameLogic.js";

// console.log(getRandomElement("2"));

type Props = {};

export default function GameMode({}: Props) {
  const [gameMode, setGameMode] = useState<"multiple" | "open">("multiple");

  const handleSetMultiple = () => {
    if (gameMode === "open") {
      setGameMode("multiple");
    } else return;
  };

  const handleSetOpen = () => {
    if (gameMode === "multiple") {
      setGameMode("open");
    } else return;
  };

  console.log(gameMode);

  return (
    <div className="my-32 flex flex-col gap-4 justify-center">
      <h1 className="graduate-regular text-5xl">Atomology</h1>
      <div className="flex justify-center gap-6">
        <button
          id="multiple"
          value="multiple"
          onClick={handleSetMultiple}
          className="btn text-lg"
        >
          Multiple Choice
        </button>
        <button
          id="open"
          value="multiple"
          onClick={handleSetOpen}
          className="btn text-lg"
        >
          Open Answer
        </button>
      </div>
    </div>
  );
}
