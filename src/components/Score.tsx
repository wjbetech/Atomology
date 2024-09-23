import React from "react";

// routing back to main page to reset/exit game
import { Link } from "react-router-dom";

// import zustand store
import { useGameStore } from "../store/atomologyStore";

export default function Score() {
  const { score, setScore, gameStarted, setGameStarted } = useGameStore();

  const handleGameMode = () => {
    setGameStarted(false);
    setScore(0);
  };

  if (gameStarted) {
    return (
      <>
        <div className="absolute inset-x-0 bottom-6 flex flex-col gap-2">
          <span>Current Score: {score}</span>
          <Link
            onClick={handleGameMode}
            to="/"
            className="btn btn-outline w-[15%] rounded-full place-self-center"
          >
            Return to Main
          </Link>
        </div>
      </>
    );
  }
}
