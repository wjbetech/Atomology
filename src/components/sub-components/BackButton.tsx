import React from "react";

type Props = {
  to?: string;
  label?: string;
  className?: string;
};

export default function BackButton({
  to = "/",
  label = "Back",
  className = "",
}: Props) {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => (window.location.href = to)}
        aria-label="Back to home"
        className={
          "btn btn-outline border-2 rounded-full mt-10 flex items-center pr-6 " +
          className
        }
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15 18L9 12l6-6"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{label}</span>
      </button>
    </div>
  );
}
