import React from "react";
import { FiArrowLeft } from "react-icons/fi";

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
          "inline-flex items-center justify-center rounded-pill px-6 py-2.5 border border-hairline text-specimen hover:bg-bench active:scale-[0.98] transition-all gap-1.5 mt-10 " +
          className
        }
      >
        <FiArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap ml-0.5 leading-none pr-1">{label}</span>
      </button>
    </div>
  );
}
