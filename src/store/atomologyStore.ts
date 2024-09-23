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
  elements: ElementType[];
  loading: boolean;
  error: boolean;
  gameStarted: boolean;
  answer: ElementType | null;
  setGameMode: (mode: string) => void;
  setScore: (update: number | ((prevScore: number) => number)) => void;
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
  setScore: (update) =>
    set((state) => ({
      score: typeof update === "function" ? update(state.score) : update,
    })),
  setElements: (elements) => set({ elements }),
  setGameStarted: (gameStarted) => set({ gameStarted }),
  setAnswer: (answer) => set({ answer }),
}));

export const useUIStore = create<uiSlice>((set) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),
}));
