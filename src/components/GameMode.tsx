import React from "react";
import { useState } from "react";

// import zustand store
import { useGameStore } from "../store/atomologyStore";

export default function GameMode() {
  const { gameMode, setGameMode } = useGameStore();

  console.log(gameMode);

  return (
    <div className="mt-32 flex flex-col gap-4 justify-center">
      <h1 className="graduate-regular text-5xl">Atomology</h1>
      <div className="flex justify-center gap-6">
        <button
          id="multiple"
          value="multiple"
          onClick={() => {
            if (gameMode === "open") {
              setGameMode("multi");
            }
          }}
          className="btn text-lg"
        >
          Multiple Choice
        </button>
        <button
          id="open"
          value="multiple"
          onClick={() => {
            if (gameMode === "multi") {
              setGameMode("open");
            }
          }}
          className="btn text-lg"
        >
          Open Answer
        </button>
      </div>
    </div>
  );
}
