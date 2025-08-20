import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useGameStore } from "../store/atomologyStore";
import ConfirmModal from "./ConfirmModal";

export default function ReturnToMainButton() {
  const setGameMode = useGameStore((s) => s.setGameMode);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    setShowModal(false);
    setGameMode("");
    setGameStarted(false);
  };

  return (
    <>
      <div className="fixed bottom-20 inset-x-0 flex justify-center z-30">
        <button
          className="btn btn-outline btn-sm lg:btn-md w-40 rounded-full"
          onClick={() => setShowModal(true)}
        >
          Return to Main
        </button>
      </div>
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
