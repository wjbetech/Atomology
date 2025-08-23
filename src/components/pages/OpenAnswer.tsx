import React from "react";
import { useGameStore } from "../../store/atomologyStore";
import Element from "../sub-components/Element";
import Answer from "../Answer";
import Score from "../sub-components/Score";
import ReturnToMainButton from "../sub-components/ReturnToMainButton";

export default function OpenAnswer() {
  const gameStarted = useGameStore((s) => s.gameStarted);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  React.useEffect(() => {
    if (!gameStarted) setGameStarted(true);
  }, [gameStarted, setGameStarted]);
  return (
    <div className="flex flex-col min-h-screen flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-center justify-center flex-grow">
        <Element />
        <div className="mt-6 w-full max-w-md px-4">
          <Answer />
        </div>
      </div>
      {/* fixed bottom bar for controls on open answer screen */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs mx-auto px-4 flex flex-col items-center gap-2">
          <Score />
          <ReturnToMainButton />
        </div>
      </div>
    </div>
  );
}
