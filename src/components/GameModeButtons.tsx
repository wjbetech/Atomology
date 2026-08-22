import React from "react";
import { useGameStore } from "../store/atomologyStore";

export default function GameModeButtons({
  onStart,
}: {
  /** Called after a mode has been started (e.g. to navigate to /play). */
  onStart?: () => void;
}) {
  const { setGameMode, setPlayerAnswer, setGameStarted, resetHangman } =
    useGameStore();

  const start = (mode: "multi" | "open" | "hangman") => {
    if (mode === "hangman") {
      resetHangman();
      useGameStore.getState().setHangmanDifficulty(null);
    } else {
      setPlayerAnswer("");
    }
    setGameMode(mode);
    setGameStarted(true);
    onStart?.();
  };

  return (
    <div className="flex flex-col gap-5 justify-center w-full max-w-md mx-auto">
      <button
        id="multiple"
        value="multiple"
        onClick={() => start("multi")}
        className="btn btn-primary btn-md lg:btn-lg rounded-full"
      >
        Multiple Choice
      </button>

      <button
        id="open"
        value="open"
        onClick={() => start("open")}
        className="btn btn-secondary btn-md lg:btn-lg rounded-full"
      >
        Open Answer
      </button>

      <button
        id="hangman"
        value="hangman"
        onClick={() => start("hangman")}
        className="btn btn-warning btn-md lg:btn-lg rounded-full"
      >
        Hangman Mode
      </button>
    </div>
  );
}
