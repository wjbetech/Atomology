import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/atomologyStore";

// routing back to main page to reset/exit game
import { Link } from "react-router-dom";

// import zustand store
// ...existing code...
import ConfirmModal from "./ConfirmModal";
import { useNavigate } from "react-router-dom";

export default function Score() {
  const { score, setScore, gameStarted, setGameStarted, resetAnswerInput } =
    useGameStore();

  const handleGameMode = () => {
    // clear persisted session and navigate home
    localStorage.removeItem("atomology.session");
    setGameStarted(false);
    setScore(0);
    resetAnswerInput();
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

  const scoreRef = useRef<HTMLSpanElement>(null);
  const [arrowTop, setArrowTop] = useState<number | null>(null);

  useEffect(() => {
    if (showArrow && scoreRef.current) {
      const rect = scoreRef.current.getBoundingClientRect();
      setArrowTop(window.scrollY + rect.top - 56); // 56px above the score
    }
  }, [showArrow, scoreRef]);

  if (gameStarted) {
    return (
      <>
        {/* Arrow animation removed as requested */}
        <div className="font-semibold my-4 flex flex-col items-center gap-2 relative place-content-center place-items-center">
          <div className="flex flex-col items-center justify-center w-full place-content-center place-items-center">
            <div className="relative inline-block">
              <div className="flex justify-center m-auto place-content-center place-items-center">
                <span
                  ref={scoreRef}
                  className="text-md lg:text-xl font-bold text-center block mb-2"
                >
                  Score: {score}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              className="btn btn-outline w-full sm:w-auto sm:min-w-[175px] rounded-full self-center"
            >
              Return to Main
            </button>
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
