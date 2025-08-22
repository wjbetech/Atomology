import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function HangmanGameOverModal({
  onRestart,
  onReturn,
}: {
  onRestart: () => void;
  onReturn: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable && focusable[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onReturn();
      }
      if (e.key === "Tab") {
        // basic focus trap
        const nodes = focusable ? Array.from(focusable) : [];
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current && previouslyFocused.current.focus();
    };
  }, [onReturn]);

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
        <p className="text-gray-400 mb-4">You've run out of lives.</p>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            className="btn btn-sm btn-success w-full light:border-content border-2"
            onClick={() => {
              onRestart();
            }}
          >
            Restart Hangman
          </button>
          <button
            className="btn btn-sm btn-error w-full light:border-content"
            onClick={() => {
              onReturn();
            }}
          >
            Return to Main
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
