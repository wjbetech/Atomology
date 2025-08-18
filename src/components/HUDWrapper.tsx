import React, { useState } from "react";
import { PeriodicTableHUD } from "./PeriodicTableHUD";
import { useGameStore } from "../store/atomologyStore";

const HUDWrapper = (props) => {
  const [showHUD, setShowHUD] = useState(true);
  const guessedElements = useGameStore((state) => state.guessedElements);
  return (
    <>
      {showHUD && (
        <div style={{ transform: "scale(0.38)", transformOrigin: "top left" }}>
          <PeriodicTableHUD guessed={new Set(guessedElements)} current={""} />
        </div>
      )}
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
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
          className="ml-2 select-none cursor-pointer text-white text-xs"
        >
          Periodic table HUD
        </label>
      </div>
    </>
  );
};

export default HUDWrapper;
