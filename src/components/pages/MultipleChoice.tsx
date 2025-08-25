import React from "react";
import Element from "../sub-components/Element";
import Answer from "../Answer";
import Score from "../sub-components/Score";
import ReturnToMainButton from "../sub-components/ReturnToMainButton";
import { useGameStore } from "../../store/atomologyStore";

export default function MultipleChoice() {
  const gameStarted = useGameStore((s) => s.gameStarted);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  React.useEffect(() => {
    if (!gameStarted) setGameStarted(true);
  }, [gameStarted, setGameStarted]);
  return (
    <div className="flex flex-col min-h-screen flex-1 w-full items-center justify-start sm:justify-between">
      <div className="flex flex-col items-center justify-start sm:justify-center flex-grow pt-24 sm:pt-0">
        <Element />
        <div className="mt-6 w-full max-w-xl">
          <Answer />
        </div>
        <div className="mt-0 md:mt-4">
          <Score />
        </div>
        <div className="">
          <ReturnToMainButton />
        </div>
      </div>
    </div>
  );
}
