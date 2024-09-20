import { create } from "zustand";

interface GameState {
  gameMode: string;
  score: number;
  element: object | null;
  loading: boolean;
  error: boolean;
  setGameMode: (mode: string) => void;
  setScore: (score: number) => void;
  setElement: (element: object) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
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
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setGameMode: (mode) => set({ gameMode: mode }),
  setScore: (score) => set({ score }),
  setElement: (element) => set({ element }),
}));

export const useUIStore = create<uiSlice>((set) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),
}));
