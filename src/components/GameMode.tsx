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
    <div className="flex flex-col gap-8 justif items-center transition-all duration-1000 mt-24 max-h-screen overflow-auto">
      <img src={atoms} alt="" className="rotate w-16 h-16" />
      <h1 className="font-serif text-5xl mb-8">Atomology</h1>
      <div className="flex flex-col gap-5 justify-center w-full max-w-md mx-auto mt-12">
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
          className="btn btn-outline btn-sm lg:btn-md border-2 font-[400] rounded-full w-full h-12"
        >
          Multiple Choice
        </button>
        <button
          id="open"
          value="open"
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
          className="btn btn-outline btn-sm lg:btn-md border-2 font-[400] rounded-full w-full h-12"
        >
          Open Answer
        </button>
        <button
          id="hangman"
          value="hangman"
          onClick={() => {
            setGameMode("hangman");
            setGameStarted(true);
            setPlayerAnswer("");
          }}
          className="btn btn-outline btn-sm lg:btn-md border-2 font-[400] rounded-full w-full h-12"
        >
          Hangman Mode
        </button>
      </div>
    </div>
  );
}
