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
      <div className="flex flex-col items-center justify-start sm:justify-center flex-grow pt-[8rem] sm:pt-0">
        <Element />
        <div className=" w-full max-w-full lg:max-w-4xl xl:max-w-6xl px-4">
          <div className="pt-8 md:pt-0">
            <Answer />
            <Score />
          </div>
        </div>
        <div className="">
          <ReturnToMainButton />
        </div>
      </div>
    </div>
  );
}
