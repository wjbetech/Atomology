import React from "react";
import { useGameStore } from "../store/atomologyStore";

export default function Answer() {
  const { gameMode, setGameMode, gameStarted, setGameStarted } = useGameStore();

  if (gameStarted && gameMode === "multi") {
    return (
      <div className="my-10 flex flex-col gap-y-2 w-[200px]">
        <button className="btn btn-outline rounded-full px-4">answer 1</button>
        <button className="btn btn-outline rounded-full px-4 w-full">
          answer 2
        </button>
        <button className="btn btn-outline rounded-full px-4 w-full">
          answer 3
        </button>
        <button className="btn btn-outline rounded-full px-4 w-full">
          answer 4
        </button>
      </div>
    );
  }

  if (gameStarted && gameMode === "open") {
    return (
      <div>
        <input
          type="text"
          name="answer"
          id="answer"
          className="rounded-full mt-[100px] input input-bordered"
        />
      </div>
    );
  }

  return (
    <div className="my-8">
      <span>Get started by picking a game mode!</span>
    </div>
  );
}
