import React from "react";
import { useGameStore } from "../../store/atomologyStore";
import Element from "../sub-components/Element";
import Answer from "../Answer";
import Score from "../sub-components/Score";
import ReturnToMainButton from "../sub-components/ReturnToMainButton";

export default function OpenAnswer() {
  const gameStarted = useGameStore((s) => s.gameStarted);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  const isEndless = useGameStore((s) => s.sessionLength === "endless");
  const finishRun = useGameStore((s) => s.finishRun);
  const livesMode = useGameStore((s) => s.livesMode);
  const questionsAnswered = useGameStore((s) => s.questionsAnswered);
  const correctCount = useGameStore((s) => s.correctCount);
  const livesLeft = Math.max(0, 3 - (questionsAnswered - correctCount));
  React.useEffect(() => {
    if (!gameStarted) setGameStarted(true);
  }, [gameStarted, setGameStarted]);
  return (
    <div className="flex flex-col min-h-screen flex-1 w-full items-center justify-start sm:justify-between">
      <div className="flex flex-col items-center justify-start sm:justify-center flex-grow pt-32 sm:pb-0 sm:mb-[15rem]">
        <Element />
        <div className="mt-6 w-full max-w-md px-4">
          <Answer />
        </div>
        <div className="mt-20">
          <Score />
        </div>
      </div>
      {/* fixed bottom bar for controls on open answer screen */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs mx-auto px-4 flex flex-col items-center gap-2">
          {livesMode && (
            <p
              className="font-mono text-xs tracking-[0.3em] text-strontium"
              aria-label={`${livesLeft} lives remaining`}
            >
              LIVES {"● ".repeat(livesLeft)}
              {"○ ".repeat(3 - livesLeft)}
            </p>
          )}
          {isEndless && (
            <button
              type="button"
              onClick={() => finishRun("finished")}
              className="btn btn-outline rounded-pill px-8 border-argon/60 text-argon hover:bg-argon/10"
            >
              Finish session
            </button>
          )}
          <ReturnToMainButton />
        </div>
      </div>
    </div>
  );
}
