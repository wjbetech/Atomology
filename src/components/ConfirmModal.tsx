import React, { useEffect, useRef } from "react";

export default function ConfirmModal({
  title = "Are you sure?",
  description = "Do you want to return to the main menu?",
  onConfirm,
  onCancel,
}: {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    // focus first focusable element inside dialog
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable && focusable[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
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
      // restore focus
      previouslyFocused.current && previouslyFocused.current.focus();
    };
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="bg-content rounded-lg p-6 w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="font-bold text-lg mb-2">
          {title}
        </h2>
        <p id="confirm-desc" className="mb-4 text-gray-500">
          {description}
        </p>
        <div className="flex gap-3 justify-between w-[200px] mt-8">
          <button className="btn btn-sm btn-error w-full" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-sm btn-success w-full" onClick={onConfirm}>
            Yes, return
          </button>
        </div>
      </div>
    </div>
  );
}
