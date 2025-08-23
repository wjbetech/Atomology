import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../store/atomologyStore";

// routing back to main page to reset/exit game
import { Link } from "react-router-dom";

// import zustand store
// ...existing code...
import ConfirmModal from "../ConfirmModal";
import { useNavigate } from "react-router-dom";
import ReturnToMainButton from "./ReturnToMainButton";

export default function Score() {
  const {
    score,
    setScore,
    gameStarted,
    setGameStarted,
    resetAnswerInput,
    resetGuessedElements,
  } = useGameStore();

  const handleGameMode = () => {
    // clear persisted session and navigate home
    localStorage.removeItem("atomology.session");
    setGameStarted(false);
    setScore(0);
    resetAnswerInput();
    resetGuessedElements();
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const onConfirm = () => {
    handleGameMode();
    setShowConfirm(false);
    navigate("/");
  };

  // Arrow celebration state
  const { answer, playerAnswer } = useGameStore();
  const [showArrow, setShowArrow] = useState(false);
  useEffect(() => {
    if (playerAnswer && answer && playerAnswer === answer.name) {
      setShowArrow(true);
      const t = setTimeout(() => setShowArrow(false), 1200);
      return () => clearTimeout(t);
    }
  }, [playerAnswer, answer]);

  // Score scaling animation state
  const [scoreBump, setScoreBump] = useState(false);
  const prevScore = useRef(score);
  useEffect(() => {
    if (
      playerAnswer &&
      answer &&
      playerAnswer === answer.name &&
      score > prevScore.current
    ) {
      setScoreBump(true);
      const t = setTimeout(() => setScoreBump(false), 1200);
      prevScore.current = score;
      return () => clearTimeout(t);
    }
    prevScore.current = score;
  }, [score, playerAnswer, answer]);

  if (gameStarted) {
    return (
      <>
        {/* Arrow animation removed as requested */}
        <div className="font-semibold my-2 flex flex-col items-center gap-2 relative place-content-center place-items-center">
          <div className="flex flex-col items-center justify-center w-full place-content-center place-items-center">
            <div className="relative inline-block">
              <div className="flex justify-center m-auto place-content-center place-items-center">
                <motion.span
                  className="text-md lg:text-xl font-bold text-center block mb-2"
                  animate={
                    scoreBump ? { scale: [1, 1.25, 0.95, 1] } : { scale: 1 }
                  }
                  transition={{
                    duration: 1.2,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeOut",
                  }}
                >
                  Score: {score}
                </motion.span>
              </div>
            </div>
          </div>
          {showConfirm && (
            <ConfirmModal
              title="Return to main menu?"
              description="This will end your current session. Are you sure?"
              onConfirm={onConfirm}
              onCancel={() => setShowConfirm(false)}
            />
          )}
        </div>
      </>
    );
  }
}
