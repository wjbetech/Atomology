import React, { useRef } from "react";
import ReturnToMainButton from "../sub-components/ReturnToMainButton";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../../hooks/useFocusTrap";

export default function HangmanGameOverModal({
  onRestart,
  onReturn,
}: {
  onRestart: () => void;
  onReturn: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(dialogRef, onReturn);

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className="bg-[#0b1220] border border-red-300 rounded-lg p-6 w-[90%] max-w-md shadow-lg text-center"
      >
        <h3 className="text-lg font-bold mb-2 text-red-400">Game Over!</h3>
        <p className="text-gray-400 mb-4">You&apos;ve run out of lives.</p>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            className="btn btn-sm btn-success w-full light:border-content border-2"
            onClick={() => {
              onRestart();
            }}
          >
            Restart Hangman
          </button>
          <div>
            {/* Use shared ReturnToMainButton but keep error styling */}
            <ReturnToMainButton
              buttonClassName="btn btn-sm btn-error w-full light:border-content"
              title="Return to Main Menu?"
              description="Are you sure you want to leave this game? Your progress will be lost."
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
