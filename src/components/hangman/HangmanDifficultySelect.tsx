import React from "react";
import { useGameStore, useUIStore } from "../../store/atomologyStore";
import ReturnToMainButton from "../sub-components/ReturnToMainButton";
import {
  getElementsByDifficulty,
  DifficultyLevel,
} from "../../utils/hangmanDifficulty";

const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy10: "10 Easiest Elements",
  easy20: "20 Easiest Elements",
  all: "All Elements",
};

export default function HangmanDifficultySelect() {
  const setHangmanDifficulty = useGameStore((s) => s.setHangmanDifficulty);
  const setHangmanWord = useGameStore((s) => s.setHangmanWord);
  const setHangmanIndex = useGameStore((s) => s.setHangmanIndex);
  const setShowHUD = useUIStore((s) => s.setShowHUD);
  const [selected, setSelected] = React.useState<DifficultyLevel>("easy10");

  // Fisher-Yates shuffle
  function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const handleStart = () => {
    setHangmanDifficulty(selected);
    const pool = shuffle(getElementsByDifficulty(selected));
    // Store the shuffled pool in sessionStorage for this session
    sessionStorage.setItem(
      "hangmanPool",
      JSON.stringify(pool.map((e) => e.name))
    );
    setHangmanIndex(0);
    setHangmanWord(pool[0].name);
  };

  // ensure HUD is turned off when entering hangman difficulty selection
  React.useEffect(() => {
    setShowHUD(false);
  }, [setShowHUD]);

  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[16rem] mx-auto">
        <h2 className="text-xl font-bold mb-2 hangman-select-title">
          Select Difficulty
        </h2>
        <div className="w-full max-w-[20rem] px-6 sm:px-0">
          <div className="dropdown w-full">
            <button
              tabIndex={0}
              className="btn justify-between btn-content w-full rounded-full mb-2"
              aria-haspopup="listbox"
            >
              {DIFFICULTY_LABELS[selected]}
              <svg
                className="ml-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              role="listbox"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-full mt-2"
              aria-label="Select difficulty"
            >
              {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => (
                <li key={key} role="option">
                  <button
                    className="w-full text-left rounded-md px-3 py-2 hover:bg-base-200"
                    onClick={() => setSelected(key as DifficultyLevel)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="btn btn-sm btn-success text-white rounded-full w-full text-content"
          onClick={handleStart}
        >
          Start
        </button>
        <div className="mt-4">
          <ReturnToMainButton />
        </div>
      </div>
    </div>
  );
}
