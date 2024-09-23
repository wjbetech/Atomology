import { create } from "zustand";

// define the shape of items inside ElementType array & for answer
export interface ElementType {
  atomicMass: number;
  category: string;
  density: number;
  discoveredBy: string;
  melt: number | null;
  name: string;
  number: number;
  period: number;
  phase: string;
  symbol: string;
}

export interface GameState {
  gameMode: string;
  score: number;
  elements: ElementType[]; // now that elements contains four, it should be shaped as array
  loading: boolean;
  error: boolean;
  gameStarted: boolean;
  answer: ElementType | null; // and now answer will be an item of shape ElementType or null
  setGameMode: (mode: string) => void;
  setScore: (score: number) => void;
  setElements: (elements: ElementType[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setGameStarted: (gameStarted: boolean) => void;
  setAnswer: (answer: ElementType | null) => void;
}

export interface uiSlice {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameMode: "multi",
  score: 0,
  elements: [],
  loading: false,
  error: false,
  gameStarted: false,
  answer: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setGameMode: (mode) => set({ gameMode: mode }),
  setScore: (score) => set({ score }),
  setElements: (elements) => set({ elements }),
  setGameStarted: (gameStarted) => set({ gameStarted }),
  setAnswer: (answer) => set({ answer }),
}));

export const useUIStore = create<uiSlice>((set) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),
}));
