import React, { useEffect, useState } from "react";
import AnswerButton from "./AnswerButton";
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
    addGuessedElement,
  } = useGameStore();
  const [input, setInput] = useState("");
  // unified message state: 'none' | 'incorrect' | 'correct'
  const [message, setMessage] = useState<"none" | "incorrect" | "correct">(
    "none"
  );
  // timer ref used to cancel and prevent overlapping messages
  const messageTimer = React.useRef<number | null>(null);
  // Track wrong answers that have been disabled for the current round
  const [disabledAnswers, setDisabledAnswers] = useState<Set<string>>(
    new Set()
  );
  // When true the round is locked because the correct answer was picked;
  // used to disable all buttons and show the deep-green celebration style.
  const [answeredCorrect, setAnsweredCorrect] = useState(false);

  useEffect(() => {
    if (!gameStarted) {
      setInput("");
    }
  }, [gameStarted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const showMessage = (type: "incorrect" | "correct", duration = 3000) => {
    // cancel any existing message timer
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
      messageTimer.current = null;
    }
    setMessage(type);
    // schedule clear
    messageTimer.current = window.setTimeout(() => {
      setMessage("none");
      messageTimer.current = null;
    }, duration) as unknown as number;
  };

  // Handle multi-choice button click
  const handleMultiSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedAnswer = e.currentTarget.value;
    setPlayerAnswer(selectedAnswer);
    // ignore if already disabled or the round is already locked
    if (disabledAnswers.has(selectedAnswer) || answeredCorrect) return;

    if (answer && selectedAnswer === answer.name) {
      setScore((prevScore: number) => prevScore + 1);
      setInput("");
      // Add guessed element symbol to HUD
      if (answer.symbol) addGuessedElement(answer.symbol);
      // lock the round: disable all buttons and show celebration style
      setAnsweredCorrect(true);
      // show correct message (this cancels any 'incorrect' message instantly)
      showMessage("correct", 2000);
      // clear disabled answers and unlock after celebration (2s)
      setTimeout(() => {
        setDisabledAnswers(new Set());
        setAnsweredCorrect(false);
        // clear player answer in store so next round's UI doesn't mark it incorrect
        setPlayerAnswer("");
        // trigger a fresh fetch for the next round
        setFetchTrigger();
      }, 2000);
    } else {
      // add this wrong answer to the disabled set for the round
      setDisabledAnswers((prev) => new Set(prev).add(selectedAnswer));
      showMessage("incorrect", 4000);
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
      // Add guessed element symbol to HUD
      if (answer.symbol) addGuessedElement(answer.symbol);
      // lock round and show deep-green celebration; clear disabled after celebration
      setAnsweredCorrect(true);
      showMessage("correct", 2000);
      setTimeout(() => {
        setDisabledAnswers(new Set());
        setAnsweredCorrect(false);
        // clear player answer in store so next round's UI doesn't mark it incorrect
        setPlayerAnswer("");
        // trigger a fresh fetch for the next round
        setFetchTrigger();
      }, 2000);
    } else {
      showMessage("incorrect", 4000);
    }
  };

  // cleanup message timer on unmount
  useEffect(() => {
    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
        messageTimer.current = null;
      }
    };
  }, []);

  if (elements.length === 4) {
    // Visual feedback state
    const isCorrect = playerAnswer === answerElementName && playerAnswer !== "";
    const isIncorrect =
      playerAnswer !== answerElementName && playerAnswer !== "";

    if (gameStarted && gameMode === "multi" && !loading) {
      return (
        <>
          <div className="w-full lg:mb-10 px-4 lg:px-20 lg:max-w-none mx-auto grid grid-cols-2 justify-center gap-3">
            {elements.map((e, idx) => {
              const wasPickedWrong = disabledAnswers.has(e.name);
              const isThisDisabled = wasPickedWrong || answeredCorrect;
              const isCorrectBtn = !!answer && e.name === answer.name;
              const isSelected = playerAnswer === e.name;
              return (
                <AnswerButton
                  key={e.name}
                  idx={idx}
                  label={e.name}
                  disabled={isThisDisabled}
                  isCorrect={isCorrectBtn}
                  isPickedWrong={wasPickedWrong}
                  isRoundLocked={answeredCorrect}
                  isSelected={isSelected && isCorrect}
                  onClick={handleMultiSubmit}
                />
              );
            })}
          </div>
          {/* Feedback popup hoisted below the grid */}
          <div className="flex justify-center items-center w-full py-10 h-[40px]">
            {/* screen-reader live region; kept visually hidden but updates when message changes */}
            <span className="sr-only text-xl" role="status" aria-live="polite">
              {message === "incorrect"
                ? "Incorrect, try again!"
                : message === "correct"
                ? "Correct!"
                : ""}
            </span>
            <AnimatePresence>
              {message === "incorrect" && !loading ? (
                <motion.span
                  key="incorrect"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="label-text-alt text-red-500 font-semibold text-lg text-center whitespace-nowrap"
                  style={{ willChange: "transform, opacity" }}
                >
                  Incorrect, try again!
                </motion.span>
              ) : null}

              {!loading && message === "correct" ? (
                <motion.span
                  key="correct"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="label-text-alt text-green-600 font-semibold text-lg text-center whitespace-nowrap"
                  style={{ willChange: "transform, opacity" }}
                >
                  Correct!
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
        </>
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
              {!loading && message === "incorrect" ? (
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

              {!loading && message === "correct" ? (
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
