import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useGameStore } from "../../store/atomologyStore";
import ConfirmModal from "../ConfirmModal";
import { useNavigate } from "react-router-dom";

type Props = {
  buttonClassName?: string;
  title?: string;
  description?: string;
  label?: string;
  fixed?: boolean;
};

export default function ReturnToMainButton({
  buttonClassName,
  title,
  description,
  label,
  fixed = true,
}: Props) {
  const setGameMode = useGameStore((s) => s.setGameMode);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setShowModal(false);
    try {
      localStorage.removeItem("atomology.session");
    } catch {
      /* ignore */
    }
    setGameMode("");
    setGameStarted(false);
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

  const defaultButtonClass =
    "btn btn-accent rounded-full h-10 min-h-0 text-sm whitespace-nowrap px-6 min-w-[160px]";

  const buttonElement = (
    <button
      className={buttonClassName ?? defaultButtonClass}
      onClick={() => setShowModal(true)}
    >
      {label ?? "Return to Main"}
    </button>
  );

  if (fixed) {
    return (
      <>
        {typeof document !== "undefined"
          ? createPortal(
              <div className="fixed left-1/2 transform -translate-x-1/2 bottom-[80px] md:bottom-[120px] z-[2200]">
                {buttonElement}
              </div>,
              document.body
            )
          : buttonElement}

        {showModal &&
          createPortal(
            <ConfirmModal
              title={title ?? "Return to Main Menu?"}
              description={
                description ??
                "Are you sure you want to leave this game? Your progress will be lost."
              }
              onConfirm={handleConfirm}
              onCancel={() => setShowModal(false)}
            />,
            document.body
          )}
      </>
    );
  }

  return (
    <>
      {buttonElement}

      {showModal && (
        <ConfirmModal
          title={title ?? "Return to Main Menu?"}
          description={
            description ??
            "Are you sure you want to leave this game? Your progress will be lost."
          }
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}
