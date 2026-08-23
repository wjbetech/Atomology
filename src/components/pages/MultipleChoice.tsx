import React from "react";
import Element from "../sub-components/Element";
import Answer from "../Answer";
import Score from "../sub-components/Score";
import ReturnToMainButton from "../sub-components/ReturnToMainButton";
import { useGameStore } from "../../store/atomologyStore";

export default function MultipleChoice() {
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
    <>
      <div className="flex flex-col min-h-screen flex-1 w-full items-center justify-start sm:justify-between">
        <div className="flex flex-col items-center justify-start sm:justify-center flex-grow pt-[8rem] sm:pt-0">
          <Element />
          <div className=" w-full max-w-full lg:max-w-4xl xl:max-w-6xl px-4">
            <div className="pt-8 md:pt-0">
              <Answer />
              <Score />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
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
    </>
  );
}
