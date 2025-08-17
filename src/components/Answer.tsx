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
  const [showIncorrect, setShowIncorrect] = useState(false);

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
    // game logic
    const selectedAnswer = e.currentTarget.value;
    setPlayerAnswer(selectedAnswer);

    if (answer && selectedAnswer === answer.name) {
      setScore((prevScore: number) => prevScore + 1);
      setInput("");
      setFetchTrigger();
    } else {
      setShowIncorrect(true);
      setTimeout(() => setShowIncorrect(false), 6000);
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
    // Visual feedback state
    const isCorrect = playerAnswer === answerElementName && playerAnswer !== "";
    const isIncorrect =
      playerAnswer !== answerElementName && playerAnswer !== "";

    if (gameStarted && gameMode === "multi" && !loading) {
      return (
        <div className="my-10 w-[200px] flex flex-col gap-y-2">
          {elements.map((e, idx) => {
            // Muted/disabled for incorrect
            const isThisIncorrect = isIncorrect && playerAnswer === e.name;
            let btnClass =
              "btn btn-outline rounded-full transition-all duration-300";
            if (isCorrect && playerAnswer === e.name)
              btnClass += " bg-green-200 border-green-500 animate-pulse";
            if (isThisIncorrect)
              btnClass +=
                " bg-gray-100 border-red-300 text-gray-500 opacity-80 cursor-not-allowed ring-1 ring-red-200";
            return (
              <button
                onClick={handleMultiSubmit}
                className={btnClass}
                value={e.name}
                id="answer"
                key={e.name}
                disabled={isThisIncorrect}
              >
                <span>{idx + 1}.</span>
                {e.name}
              </button>
            );
          })}
          <div className="label" style={{ minHeight: "24px", height: "24px" }}>
            {showIncorrect && !loading ? (
              <span
                className="label-text-alt text-red-500 relative pt-2 font-semibold text-[16px] m-auto animate-shake"
                style={{ position: "absolute" }}
              >
                Incorrect, try again!
              </span>
            ) : null}
            {!loading && isCorrect ? (
              <span className="label-text-alt text-green-600 relative pt-2 font-semibold text-[16px] m-auto animate-pulse">
                Correct!
              </span>
            ) : null}
          </div>
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
            className={`rounded-full input input-bordered placeholder:text-gray-400/50 placeholder:italic transition-all duration-300 ${
              isCorrect ? "bg-green-200 border-green-500 animate-pulse" : ""
            } ${isIncorrect ? "bg-red-200 border-red-500 shake" : ""}`}
            onChange={handleChange}
            placeholder="What's that element..."
          />
          {!loading && isIncorrect ? (
            <div className="label" style={{ minHeight: "24px" }}>
              <span className="label-text-alt text-red-500 relative pt-2 font-semibold text-[16px] m-auto animate-shake">
                Incorrect, try again!
              </span>
            </div>
          ) : null}
          {!loading && isCorrect ? (
            <div className="label" style={{ minHeight: "24px" }}>
              <span className="label-text-alt text-green-600 relative pt-2 font-semibold text-[16px] m-auto animate-pulse">
                Correct!
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
