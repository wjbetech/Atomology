import React from "react";
import { useGameStore } from "../store/atomologyStore";

export default function Answer() {
  const { gameStarted, setGameStarted } = useGameStore();

  if (gameStarted) {
    return (
      <div>
        <input
          type="text"
          name="answer"
          id="answer"
          className=" rounded-full mt-[100px] p-2"
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
