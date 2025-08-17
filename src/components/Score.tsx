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
        <div className="font-semibold bottom-6 flex flex-col gap-2">
          <span>Score: {score}</span>
          <button
            onClick={() => setShowConfirm(true)}
            className="btn btn-outline w-[15%] min-w-[175px] rounded-full place-self-center"
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
