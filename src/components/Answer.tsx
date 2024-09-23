import React from "react";
import { useGameStore } from "../store/atomologyStore";

export default function Answer() {
  const { gameMode, gameStarted, elements } = useGameStore();

  console.log(elements);

  if (elements.length === 4) {
    if (gameStarted && gameMode === "multi") {
      return (
        <div className="my-10 flex flex-col gap-y-2 w-[200px]">
          {elements.map((e, idx) => {
            return (
              <button className="btn btn-outline rounded-full" key={e.name}>
                <span>{idx + 1}.</span>
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
  }

  if (!gameMode || !gameStarted) {
    return (
      <div className="my-8">
        <span>Get started by picking a game mode!</span>
      </div>
    );
  }
}
