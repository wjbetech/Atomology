import React from "react";

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
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-gray-800 rounded-lg p-6 w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p className="mb-4 text-gray-500">{description}</p>
        <div className="flex gap-3 justify-between w-[200px] mt-8">
          <button className="btn btn-sm btn-error w-full" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-sm btn-success w-full" onClick={onConfirm}>
            Yes, return!
          </button>
        </div>
      </div>
    </div>
  );
}
