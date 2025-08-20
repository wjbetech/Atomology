import React from "react";
import GameModeTitle from "./GameModeTitle";
import GameModeButtons from "./GameModeButtons";
import { useGameStore } from "../store/atomologyStore";

export default function GameMode() {
  const { gameStarted } = useGameStore();

  if (gameStarted) return null;

  return (
    // fixed height container to avoid any jumps when child components render
    <div
      className="flex flex-col items-center transition-all duration-500 mt-24"
      style={{ minHeight: 320 }}
    >
      <GameModeTitle />
      <GameModeButtons />
    </div>
  );
}
