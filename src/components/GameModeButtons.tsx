import React from "react";
import { useGameStore } from "../store/atomologyStore";

export default function GameModeButtons() {
  const { setGameMode, setPlayerAnswer, setGameStarted } = useGameStore();

  return (
    <div className="flex flex-col gap-5 justify-center w-full max-w-md mx-auto mt-4 md:mt-6 mb-4 md:mb-6 lg:mb-10">
      <button
        id="multiple"
        value="multiple"
        onClick={() => {
          setGameMode("multi");
          setPlayerAnswer("");
          setGameStarted(true);
        }}
        className="btn btn-outline btn-sm lg:btn-md border-2 font-[400] rounded-full w-full h-10 text-sm"
      >
        Multiple Choice
      </button>
      <button
        id="open"
        value="open"
        onClick={() => {
          setGameMode("open");
          setPlayerAnswer("");
          setGameStarted(true);
        }}
        className="btn btn-outline btn-sm lg:btn-md border-2 font-[400] rounded-full w-full h-10 text-sm"
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
        className="btn btn-outline btn-sm lg:btn-md border-2 font-[400] rounded-full w-full h-10 text-sm"
      >
        Hangman Mode
      </button>
    </div>
  );
}
