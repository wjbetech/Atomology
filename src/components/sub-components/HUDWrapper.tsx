import React, { useState } from "react";
import { PeriodicTableHUD } from "./PeriodicTableHUD";
import { useGameStore } from "../../store/atomologyStore";

const HUDWrapper = (props) => {
  const [showHUD, setShowHUD] = useState(true);
  const guessedElements = useGameStore((state) => state.guessedElements);
  const gameStarted = useGameStore((state) => state.gameStarted);
  return (
    <>
      {gameStarted && showHUD && (
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
      {gameStarted && (
        <div
          style={{
            position: "fixed",
            bottom: "0.5rem",
            left: "0.5rem",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-sm"
            checked={showHUD}
            onChange={() => setShowHUD((v) => !v)}
            id="hud-toggle"
          />
          <label
            htmlFor="hud-toggle"
            className="ml-2 select-none cursor-pointer text-content text-xs"
          >
            Periodic table HUD
          </label>
        </div>
      )}
    </>
  );
};

export default HUDWrapper;
