import React from "react";
import { useState } from "react";

import atoms from "../assets/atoms.svg";

// import zustand store
import { useGameStore } from "../store/atomologyStore";

export default function GameMode() {
  const {
    gameMode,
    setGameMode,
    gameStarted,
    setGameStarted,
    setPlayerAnswer,
  } = useGameStore();

  console.log(gameMode);

  if (gameStarted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 justif items-center transition-all duration-1000">
      <img src={atoms} alt="" className="rotate w-16 h-16" />
      <h1 className="font-serif text-5xl">Atomology</h1>
      <div className="flex gap-4 lg:gap-6 justify-center">
        <button
          id="multiple"
          value="multiple"
          onClick={() => {
            if (gameMode === "open") {
              setGameStarted(true);
              setPlayerAnswer("");
              setGameMode("multi");
            }
            if (gameStarted === false) {
              setGameStarted(true);
            }
          }}
          className="btn btn-outline btn-md w-1/2 lg:btn-lg border-2 font-[400] rounded-full"
        >
          Multiple Choice
        </button>
        <button
          id="open"
          value="multiple"
          onClick={() => {
            if (gameMode === "multi") {
              setGameStarted(true);
              setPlayerAnswer("");
              setGameMode("open");
            }
            if (gameStarted === false) {
              setGameStarted(true);
            }
          }}
          className="btn btn-outline w-1/2 btn-md lg:btn-lg border-2 font-[400] rounded-full"
        >
          Open Answer
        </button>
      </div>
    </div>
  );
}
