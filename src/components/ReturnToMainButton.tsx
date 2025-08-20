import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useGameStore } from "../store/atomologyStore";
import ConfirmModal from "./ConfirmModal";
import { useNavigate } from "react-router-dom";

export default function ReturnToMainButton() {
  const setGameMode = useGameStore((s) => s.setGameMode);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setShowModal(false);
    // clear persisted session and reset game state, then navigate home
    try {
      localStorage.removeItem("atomology.session");
    } catch {}
    setGameMode("");
    setGameStarted(false);
    // attempt to reset score and input state if available on store
    const state = (useGameStore as any).getState?.();
    if (state) {
      if (typeof state.setScore === "function") state.setScore(0);
      if (typeof state.resetAnswerInput === "function")
        state.resetAnswerInput();
      if (typeof state.resetGuessedElements === "function")
        state.resetGuessedElements();
    }
    navigate("/");
  };

  return (
    <>
      <button
        className="btn btn-outline rounded-full h-10 min-h-0 text-sm whitespace-nowrap px-6 min-w-[160px]"
        onClick={() => setShowModal(true)}
      >
        Return to Main
      </button>
      {showModal &&
        createPortal(
          <ConfirmModal
            title="Return to Main Menu?"
            description="Are you sure you want to leave this game? Your progress will be lost."
            onConfirm={handleConfirm}
            onCancel={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  );
}
