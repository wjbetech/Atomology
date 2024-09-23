import React from "react";
import { useGameStore } from "../store/atomologyStore";

export default function Answer() {
  const {
    gameMode,
    setGameMode,
    gameStarted,
    setGameStarted,
    elements,
    answer,
  } = useGameStore();

  console.log(elements);

  if (gameStarted && gameMode === "multi") {
    return (
      <div className="my-10 flex flex-col gap-y-2 w-[200px]">
        {elements.map((e) => {
          return (
            <button className="btn btn-outline rounded-full" key={e.period}>
              {e.name}
            </button>
          );
        })}
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
