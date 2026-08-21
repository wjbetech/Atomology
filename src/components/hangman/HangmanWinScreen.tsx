import { useEffect, useState } from "react";
import ConfettiSparks from "../sub-components/ConfettiSparks";
import ReturnToMainButton from "../sub-components/ReturnToMainButton";
import { DIFFICULTY_LABELS } from "./difficultyLabels";
import type { DifficultyLevel } from "../../utils/hangmanDifficulty";

export default function HangmanWinScreen({
  difficulty,
  totalWords,
  livesRemaining,
  onPlayAgain,
}: {
  difficulty: DifficultyLevel;
  totalWords: number;
  livesRemaining: number;
  onPlayAgain: () => void;
}) {
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    try {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 3;
      setAnchor({ x, y });
    } catch {
      setAnchor(null);
    }
  }, []);

  const perfect = livesRemaining === 10;

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
      <ConfettiSparks trigger={true} anchor={anchor} />
      <h2 className="text-3xl md:text-4xl font-bold text-green-600 hangman-select-title">
        Congratulations!
      </h2>
      <p className="text-lg font-semibold hangman-select-title">
        You completed every element
        {difficulty ? ` at ${DIFFICULTY_LABELS[difficulty] ?? difficulty}` : ""}.
      </p>
      <div className="flex gap-6 text-sm md:text-base hangman-select-title">
        <span>
          Words solved: <strong>{totalWords}</strong>
        </span>
        <span>
          Lives remaining: <strong>{livesRemaining}</strong>
        </span>
        {perfect && (
          <span className="font-bold text-green-600">Flawless run!</span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          className="btn btn-success rounded-full text-white"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
        <ReturnToMainButton
          fixed={false}
          label="Return to Main"
          buttonClassName="btn btn-outline rounded-full"
        />
      </div>
    </div>
  );
}
