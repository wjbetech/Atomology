import React from "react";

// import zustand store
import { useGameStore } from "../store/atomologyStore";

export default function Score() {
  const { score, setScore } = useGameStore();

  return (
    <div className="absolute inset-x-0 bottom-6">Current Score: {score}</div>
  );
}
