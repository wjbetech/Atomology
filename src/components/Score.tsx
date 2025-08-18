import React, { useState, useEffect } from "react";
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

  if (gameStarted) {
    return (
      <>
        <div className="font-semibold my-4 flex flex-col items-center gap-2 relative place-content-center place-items-center">
          <div className="flex flex-col items-center justify-center w-full place-content-center place-items-center">
            <div className="relative inline-block">
              <AnimatePresence>
                {showArrow && (
                  <motion.div
                    key="arrow"
                    className="absolute m-auto -top-8 flex items-center justify-center z-20 place-content-center place-items-center"
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: -32, scale: [1, 1.25] }}
                    exit={{ opacity: 0, y: -48, scale: 1.3 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    <svg
                      width="36"
                      height="56"
                      viewBox="0 0 36 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                      className="drop-shadow-lg"
                    >
                      <rect
                        x="15"
                        y="12"
                        width="6"
                        height="28"
                        rx="3"
                        fill="#16A34A"
                      />
                      <polygon points="18,0 6,18 30,18" fill="#16A34A" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex justify-center m-auto place-content-center place-items-center">
                <span className="text-md lg:text-xl font-bold text-center block mb-2">
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
