import React, { useEffect, useState } from "react";
import { useGameStore } from "../store/atomologyStore";

// sanitiser hook
import { sanitiseAnswer } from "../utils/answerSanitiser";

export default function Answer() {
  const {
    loading,
    answer,
    setScore,
    gameMode,
    gameStarted,
    elements,
    playerAnswer,
    setPlayerAnswer,
    answerElementName,
    setFetchTrigger,
  } = useGameStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!gameStarted) {
      setInput("");
    }
  }, [gameStarted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const handleMultiSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("you submitted your guess!");

    // game logic
    const selectedAnswer = e.currentTarget.value;
    setPlayerAnswer(selectedAnswer);

    if (answer && selectedAnswer === answer.name) {
      setScore((prevScore: number) => prevScore + 1);
      setInput("");
      setFetchTrigger();
    }
  };

  const handleOpenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("you submitted your guess!");

    // game logic
    const inputElement = e.currentTarget.elements.namedItem(
      "answer"
    ) as HTMLInputElement;
    const givenAnswer = sanitiseAnswer(inputElement?.value);
    setPlayerAnswer(givenAnswer);

    if (answer && givenAnswer == answer.name) {
      setScore((prevScore: number) => prevScore + 1);
      setInput("");
      setFetchTrigger();
    }
  };

  if (elements.length === 4) {
    if (gameStarted && gameMode === "multi" && !loading) {
      return (
        <div className="my-10 w-[200px] flex flex-col gap-y-2">
          {elements.map((e, idx) => {
            return (
              <button
                onClick={handleMultiSubmit}
                className="btn btn-outline rounded-full"
                value={e.name}
                id="answer"
                key={e.name}
              >
                <span>{idx + 1}.</span>
                {e.name}
              </button>
            );
          })}
          {!loading &&
          playerAnswer !== answerElementName &&
          playerAnswer !== "" ? (
            <div className="label" style={{ minHeight: "24px" }}>
              <span className="label-text-alt text-red-500 relative pt-2 font-semibold text-[16px] m-auto">
                Incorrect, try again!
              </span>
            </div>
          ) : null}
        </div>
      );
    }

    if (gameStarted && gameMode === "open") {
      return (
        <form className="form-control" onSubmit={handleOpenSubmit}>
          <input
            type="text"
            name="answer"
            id="answer"
            value={input}
            className="rounded-full input input-bordered placeholder:text-gray-400/50 placeholder:italic"
            onChange={handleChange}
            placeholder="What's that element..."
          />
          {!loading &&
          playerAnswer !== answerElementName &&
          playerAnswer !== "" ? (
            <div className="label" style={{ minHeight: "24px" }}>
              <span className="label-text-alt text-red-500 relative pt-2 font-semibold text-[16px] m-auto">
                Incorrect, try again!
              </span>
            </div>
          ) : null}
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
