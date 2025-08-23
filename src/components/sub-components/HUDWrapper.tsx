import React from "react";
import { PeriodicTableHUD } from "./PeriodicTableHUD";
import { useGameStore, useUIStore } from "../../store/atomologyStore";

const HUDWrapper = (props) => {
  const showHUD = useUIStore((s) => s.showHUD);
  const guessedElements = useGameStore((state) => state.guessedElements);
  const gameStarted = useGameStore((state) => state.gameStarted);
  const gameMode = useGameStore((state) => state.gameMode);
  return (
    <>
      {gameStarted && showHUD && gameMode !== "hangman" && (
        <div
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 1000,
            transform: "scale(0.38)",
            transformOrigin: "top left",
          }}
        >
          <PeriodicTableHUD guessed={new Set(guessedElements)} current={""} />
        </div>
      )}
    </>
  );
};

export default HUDWrapper;
