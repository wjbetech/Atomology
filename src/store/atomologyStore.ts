import { create } from "zustand";

interface GameState {
  gameMode: string;
  score: number;
  element: {
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
  } | null;
  loading: boolean;
  error: boolean;
  gameStarted: boolean;
  setGameMode: (mode: string) => void;
  setScore: (score: number) => void;
  setElement: (element: GameState["element"]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setGameStarted: (gameStarted: boolean) => void;
}

interface uiSlice {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameMode: "multi",
  score: 0,
  element: null,
  loading: false,
  error: false,
  gameStarted: false,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setGameMode: (mode) => set({ gameMode: mode }),
  setScore: (score) => set({ score }),
  setElement: (element) => set({ element }),
  setGameStarted: (gameStarted) => set({ gameStarted }),
}));

export const useUIStore = create<uiSlice>((set) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),
}));
