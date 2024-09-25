import React, { useState } from "react";
import { useGameStore } from "../store/atomologyStore";

// sanitiser hook
import { sanitiseAnswer } from "../utils/answerSanitiser";

export default function Answer() {
  const { answer, setScore, gameMode, gameStarted, elements } = useGameStore();
  const [input, setInput] = useState("");

  console.log(elements);

  const handleMultiButtonSubmit = () => {
    console.log("you clicked a multi choice button!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("you submitted your guess!");

    // game logic
    const inputElement = e.currentTarget.elements.namedItem(
      "answer"
    ) as HTMLInputElement;
    const givenAnswer = sanitiseAnswer(inputElement?.value);

    if (answer && givenAnswer == answer.name) {
      setScore((prevScore: number) => prevScore + 1);
    }
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="answer"
            id="answer"
            value={input}
            className="rounded-full mt-[100px] input input-bordered placeholder:text-gray-400/50 placeholder:italic"
            onChange={handleChange}
            placeholder="What's that element..."
          />
        </form>
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
