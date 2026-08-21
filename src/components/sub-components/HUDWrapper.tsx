import React, { useEffect, useState } from "react";
import { PeriodicTableHUD } from "./PeriodicTableHUD";
import { useGameStore, useUIStore } from "../../store/atomologyStore";

const DESKTOP_QUERY = "(min-width: 640px)";

const HUDWrapper = () => {
  const showHUD = useUIStore((s) => s.showHUD);
  const guessedElements = useGameStore((state) => state.guessedElements);
  const gameStarted = useGameStore((state) => state.gameStarted);
  const gameMode = useGameStore((state) => state.gameMode);

  // Track the desktop breakpoint reactively so resizing/rotating updates
  // the HUD without needing an unrelated re-render.
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    setIsDesktop(mq.matches);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!gameStarted || !showHUD || gameMode === "hangman" || !isDesktop) {
    return null;
  }

  return (
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
  );
};

export default HUDWrapper;
