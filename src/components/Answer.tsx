import React from "react";
import { useGameStore } from "../store/atomologyStore";

export default function Answer() {
  const { gameMode, setGameMode, gameStarted, setGameStarted } = useGameStore();

  if (gameStarted) {
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
