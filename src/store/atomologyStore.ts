import { create } from "zustand";

interface GameState {
  gameMode: string;
  score: number;
  element: object | null;
  setGameMode: (mode: string) => void;
  setScore: (score: number) => void;
  setElement: (element: object) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameMode: "multiple-choice",
  score: 0,
  element: null,
  setGameMode: (mode) => set({ gameMode: mode }),
  setScore: (score) => set({ score }),
  setElement: (element) => set({ element }),
}));
