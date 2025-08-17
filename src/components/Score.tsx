import React, { useState } from "react";

// routing back to main page to reset/exit game
import { Link } from "react-router-dom";

// import zustand store
import { useGameStore } from "../store/atomologyStore";
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

  if (gameStarted) {
    return (
      <>
        <div className="font-semibold my-4 flex flex-col items-center gap-2">
          <span>Score: {score}</span>
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
      </>
    );
  }
}
