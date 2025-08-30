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
          "btn btn-sm md:btn-md btn-outline border-2 rounded-full mt-10 flex items-center justify-center gap-0.5" +
          className
        }
      >
        <FiArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap ml-0.5 leading-none pr-1">
          {label}
        </span>
      </button>
    </div>
  );
}
