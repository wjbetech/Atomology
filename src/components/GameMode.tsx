import React from "react";
import { useState } from "react";

import atoms from "../assets/atoms.svg";

// import zustand store
import { useGameStore } from "../store/atomologyStore";

export default function GameMode() {
  const { gameMode, setGameMode } = useGameStore();

  console.log(gameMode);

  return (
    <div className="mt-32 flex flex-col gap-8 justify-center">
      <img src={atoms} alt="" className="w-16 h-16 m-auto" />
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
          className="btn btn-outline px-8 font-[400] rounded-full"
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
          className="btn btn-outline px-8 font-[400] rounded-full"
        >
          Open Answer
        </button>
      </div>
    </div>
  );
}
