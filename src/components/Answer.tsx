import React, { useState } from "react";
import { useGameStore } from "../store/atomologyStore";

export default function Answer() {
  const { gameMode, gameStarted, elements } = useGameStore();
  const { input, setInput } = useState("");

  console.log(elements);

  const handleMultiButtonSubmit = () => {
    console.log("you clicked a multi choice button!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    console.log("you submitted your guess!");
  };

  if (elements.length === 4) {
    if (gameStarted && gameMode === "multi") {
      return (
        <div className="my-10 flex flex-col gap-y-2 w-[200px]">
          {elements.map((e, idx) => {
            return (
              <button
                onClick={handleMultiButtonSubmit}
                className="btn btn-outline rounded-full"
                key={e.name}
              >
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
            value={input}
            className="rounded-full mt-[100px] input input-bordered placeholder:text-gray-400/50 placeholder:italic"
            onChange={handleChange}
            onSubmit={handleSubmit}
            placeholder="What's that element..."
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
