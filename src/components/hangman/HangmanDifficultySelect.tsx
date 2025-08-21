import React from "react";
import { useGameStore } from "../../store/atomologyStore";
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

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold mb-2 hangman-select-title">
        Select Difficulty
      </h2>
      <select
        className="select select-bordered rounded-full w-64 mb-2"
        value={selected}
        onChange={(e) => setSelected(e.target.value as DifficultyLevel)}
      >
        {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <button
        className="btn btn-primary btn-md rounded-full w-64 mb-2"
        onClick={handleStart}
      >
        Start
      </button>
      <div className="mt-4">
        <ReturnToMainButton />
      </div>
    </div>
  );
}
