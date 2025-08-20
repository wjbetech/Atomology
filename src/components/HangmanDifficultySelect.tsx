import React from "react";
import { useGameStore } from "../store/atomologyStore";
import {
  getElementsByDifficulty,
  DifficultyLevel,
} from "../utils/hangmanDifficulty";

const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy10: "10 Easiest Elements",
  easy20: "20 Easiest Elements",
  all: "All Elements",
};

export default function HangmanDifficultySelect() {
  const setHangmanDifficulty = useGameStore((s) => s.setHangmanDifficulty);
  const setHangmanWord = useGameStore((s) => s.setHangmanWord);
  const [selected, setSelected] = React.useState<DifficultyLevel>("easy10");

  const handleStart = () => {
    setHangmanDifficulty(selected);
    const pool = getElementsByDifficulty(selected);
    const random = pool[Math.floor(Math.random() * pool.length)];
    setHangmanWord(random.name);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <h2 className="text-xl font-bold mb-2">Select Difficulty</h2>
      <select
        className="select select-bordered w-64 mb-2"
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
        className="btn btn-primary btn-sm rounded-full w-64"
        onClick={handleStart}
      >
        Start
      </button>
    </div>
  );
}
