import React from "react";

type Props = {};

export default function HomeContent({}: Props) {
  return (
    <div
      className="w-3/4 lg:w-1/2 mx-auto px-6 flex flex-col my-auto py-12 sm:py-16 md:py-20"
      style={{ WebkitOverflowScrolling: "touch" as any }}
    >
      <div className="flex flex-col gap-y-8">
        <h3 className="text-center text-xl font-serif font-semibold mt-8 mb-10 underline decoration-2 underline-offset-4">
          About Atomology
        </h3>
        <div className="flex-1 flex flex-col justify-center items-center text-center text-base md:text-lg gap-y-6">
          <p>
            The idea for Atomology formed from a penchant for the game Wordle,
            and my participation in the Seoul Tech Impact Hackathon hosted in
            September of 2024.
          </p>
          <p>
            I wanted to create a game that would gently tease the players
            knowledge, without the burden of complexity or unnecessary
            competitiveness - something I think that Wordle also does
            brilliantly.
          </p>
          <p>
            I hope that players feel they can "drop in" to playing Atomology,
            give it a few rounds, get the dopamine hit they were craving, and
            then put it down or close it away without a sense of missing out,
            compulsion to continue, or over-disappointment if they happened to
            guess the element incorrectly.
          </p>
          <p>Have fun everyone!</p>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            aria-label="Back to home"
            className="btn btn-outline border-2 rounded-full mt-10 flex items-center   pr-6"
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
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
