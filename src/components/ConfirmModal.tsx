import React, { useRef } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

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
  useFocusTrap(dialogRef, onCancel);

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/40 p-4 sm:p-0"
      onClick={onCancel}
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="bg-[#101a2c] border border-blue-900 rounded-lg p-4 sm:p-6  mx-auto box-border shadow-lg max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="font-bold text-lg mb-2">
          {title}
        </h2>
        <p id="confirm-desc" className="mb-4 text-gray-500">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            className="text-white btn btn-sm btn-error w-full sm:w-[45%]"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm btn-success text-white w-full sm:w-[45%]"
            onClick={onConfirm}
          >
            Yes, return
          </button>
        </div>
      </div>
    </div>
  );
}
