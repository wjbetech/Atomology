import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  // Track wrong answers that have been disabled for the current round
  const [disabledAnswers, setDisabledAnswers] = useState<Set<string>>(
    new Set()
  );

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
    // ignore if already disabled
    if (disabledAnswers.has(selectedAnswer)) return;

    if (answer && selectedAnswer === answer.name) {
      setScore((prevScore: number) => prevScore + 1);
      setInput("");
      // reset disabled answers for next round
      setDisabledAnswers(new Set());
      setFetchTrigger();
    } else {
      // add this wrong answer to the disabled set for the round
      setDisabledAnswers((prev) => new Set(prev).add(selectedAnswer));
      setShowIncorrect(true);
      setTimeout(() => setShowIncorrect(false), 4000);
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
    } else {
      setShowIncorrect(true);
      setTimeout(() => setShowIncorrect(false), 4000);
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
            // Disabled state: any previously chosen wrong answer stays disabled for the round
            const isThisDisabled = disabledAnswers.has(e.name);
            let btnClass =
              "btn btn-outline rounded-full transition-all duration-300";
            if (isCorrect && playerAnswer === e.name)
              btnClass += " bg-green-200 border-green-500 animate-pulse";
            if (isThisDisabled)
              btnClass +=
                " bg-gray-100 border-red-300 text-gray-500 opacity-80 cursor-not-allowed ring-1 ring-red-200";
            return (
              <button
                onClick={handleMultiSubmit}
                className={btnClass}
                value={e.name}
                id="answer"
                key={e.name}
                disabled={isThisDisabled}
              >
                <span>{idx + 1}.</span>
                {e.name}
              </button>
            );
          })}
          <div
            className="label relative flex items-center justify-center"
            style={{ minHeight: "24px", height: "24px" }}
          >
            <AnimatePresence>
              {showIncorrect && !loading ? (
                <motion.span
                  key="incorrect"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="label-text-alt text-red-500 pt-2 font-semibold text-[16px] absolute inset-x-0 top-3 text-center whitespace-nowrap"
                >
                  Incorrect, try again!
                </motion.span>
              ) : null}

              {!loading && isCorrect ? (
                <motion.span
                  key="correct"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="label-text-alt text-green-600 pt-2 font-semibold text-[16px] absolute inset-x-0 top-3 text-center whitespace-nowrap"
                >
                  Correct!
                </motion.span>
              ) : null}
            </AnimatePresence>
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
          <div
            className="label relative flex items-center justify-center"
            style={{ minHeight: "24px" }}
          >
            <AnimatePresence>
              {!loading && isIncorrect ? (
                <motion.span
                  key="open-incorrect"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="label-text-alt text-red-500 pt-2 font-semibold text-[16px] absolute inset-x-0 top-3 text-center whitespace-nowrap"
                >
                  Incorrect, try again!
                </motion.span>
              ) : null}

              {!loading && isCorrect ? (
                <motion.span
                  key="open-correct"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="label-text-alt text-green-600 pt-2 font-semibold text-[16px] absolute inset-x-0 top-3 text-center whitespace-nowrap"
                >
                  Correct!
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
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
