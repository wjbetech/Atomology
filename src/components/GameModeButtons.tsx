import React from "react";
import { useGameStore } from "../store/atomologyStore";

export default function GameModeButtons() {
  const { setGameMode, setPlayerAnswer, setGameStarted, resetHangman } =
    useGameStore();

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
        className="btn btn-primary btn-md lg:btn-lg rounded-full"
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
        className="btn btn-primary btn-md lg:btn-lg rounded-full"
      >
        Open Answer
      </button>

      <button
        id="hangman"
        value="hangman"
        onClick={() => {
          resetHangman && resetHangman();
          try {
            (useGameStore as any).getState?.().setHangmanDifficulty(null);
          } catch {}
          setGameMode("hangman");
          setGameStarted(true);
          setPlayerAnswer("");
        }}
        className="btn btn-primary btn-md lg:btn-lg rounded-full"
      >
        Hangman Mode
      </button>
    </div>
  );
}
