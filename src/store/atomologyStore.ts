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
  answerElementName: ElementType["name"] | null;
  playerAnswer: string | null;
  fetchTrigger: number;
  guessedElements: string[];
  // Hangman mode state
  hangmanWord: string | null;
  hangmanGuessedLetters: string[];
  hangmanIncorrectGuesses: number;
  hangmanMaxAttempts: number;
  hangmanIndex: number;
  hangmanDifficulty: string | null;
  // Actions
  setGameMode: (mode: string) => void;
  setScore: (update: number | ((prevScore: number) => number)) => void;
  setElements: (elements: ElementType[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setGameStarted: (gameStarted: boolean) => void;
  setAnswer: (answer: ElementType | null) => void;
  setAnswerElementName: (name: ElementType["name"] | null) => void;
  // Hangman actions
  setHangmanWord: (word: string) => void;
  guessHangmanLetter: (letter: string) => void;
  resetHangman: () => void;
  setHangmanIndex: (index: number) => void;
  setHangmanDifficulty: (difficulty: string) => void;
}

export interface GameState {
  setPlayerAnswer: (answer: string | null) => void;
  setFetchTrigger: () => void;
  resetAnswerInput: () => void;
  addGuessedElement: (symbol: string) => void;
  resetGuessedElements: () => void;
}

export interface uiSlice {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useGameStore = create<GameState>((set, get) => {
  // helper to load persisted session
  const loadSession = (): Partial<GameState> | null => {
    try {
      const raw = localStorage.getItem("atomology.session");
      if (!raw) return null;
      return JSON.parse(raw) as Partial<GameState>;
    } catch (err) {
      return null;
    }
  };

  // helper to persist selected parts of the state
  const persist = () => {
    try {
      const s = get();
      const toSave = {
        score: s.score,
        elements: s.elements,
        answer: s.answer,
        answerElementName: s.answerElementName,
        playerAnswer: s.playerAnswer,
        gameMode: s.gameMode,
        gameStarted: s.gameStarted,
      };
      localStorage.setItem("atomology.session", JSON.stringify(toSave));
    } catch (err) {
      // ignore persistence errors
    }
  };

  const persisted = loadSession();

  return {
    gameMode: persisted?.gameMode ?? "multi",
    score: persisted?.score ?? 0,
    elements: (persisted?.elements as any) ?? [],
    loading: false,
    error: false,
    gameStarted: persisted?.gameStarted ?? false,
    answer: (persisted?.answer as any) ?? null,
    playerAnswer: (persisted?.playerAnswer as any) ?? null,
    answerElementName: (persisted?.answerElementName as any) ?? "",
    fetchTrigger: 0,
    guessedElements: [],
    // Hangman state
    hangmanWord: null,
    hangmanGuessedLetters: [],
    hangmanIncorrectGuesses: 0,
    hangmanMaxAttempts: 10,
    hangmanIndex: 0,
    hangmanDifficulty: null,

    // Hangman actions
    setHangmanWord: (word) =>
      set({
        hangmanWord: word,
        hangmanGuessedLetters: [],
        hangmanIncorrectGuesses: 0,
      }),
    guessHangmanLetter: (letter) =>
      set((state) => {
        if (!state.hangmanWord || state.hangmanGuessedLetters.includes(letter))
          return {};
        const isCorrect = state.hangmanWord
          .toLowerCase()
          .includes(letter.toLowerCase());
        const newGuessed = [
          ...state.hangmanGuessedLetters,
          letter.toLowerCase(),
        ];
        const newIncorrect = isCorrect
          ? state.hangmanIncorrectGuesses
          : state.hangmanIncorrectGuesses + 1;
        return {
          hangmanGuessedLetters: newGuessed,
          hangmanIncorrectGuesses: newIncorrect,
        };
      }),
    resetHangman: () =>
      set({
        hangmanWord: null,
        hangmanGuessedLetters: [],
        hangmanIncorrectGuesses: 0,
        hangmanIndex: 0,
      }),
    setHangmanIndex: (index) => set({ hangmanIndex: index }),
    setHangmanDifficulty: (difficulty) =>
      set({ hangmanDifficulty: difficulty }),

    addGuessedElement: (symbol) =>
      set((state) => {
        if (state.guessedElements.includes(symbol)) return {};
        const updated = [...state.guessedElements, symbol];
        persist();
        return { guessedElements: updated };
      }),
    resetGuessedElements: () => {
      set({ guessedElements: [] });
      persist();
    },
    setPlayerAnswer: (playerAnswer) => {
      set({ playerAnswer: playerAnswer });
      persist();
    },
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setGameMode: (mode) => {
      set({ gameMode: mode });
      persist();
    },
    setScore: (update) =>
      set((state) => {
        const next =
          typeof update === "function" ? update(state.score) : update;
        const ret = { score: next } as any;
        // update then persist
        persist();
        return ret;
      }),
    setElements: (elements) => {
      set({ elements });
      persist();
    },
    setAnswerElementName: (name) => {
      set({ answerElementName: name });
      persist();
    },
    setGameStarted: (gameStarted) => {
      set({ gameStarted });
      persist();
    },
    setAnswer: (answer) => {
      set({ answer });
      persist();
    },
    setFetchTrigger: () =>
      set((state) => ({ fetchTrigger: state.fetchTrigger + 1 })),
    resetAnswerInput: () =>
      set({
        playerAnswer: "",
      }),
  } as GameState;
});

export const useUIStore = create<uiSlice>((set) => ({
  // prefer persisted theme, otherwise use system preference -> map light to 'cupcake'
  theme: (() => {
    try {
      const stored =
        typeof window !== "undefined" &&
        typeof window.localStorage !== "undefined"
          ? localStorage.getItem("atomology.theme")
          : null;
      let initial = stored
        ? stored
        : typeof window !== "undefined" &&
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "cupcake";
      // normalize friendly names: map legacy values to the theme tokens
      if (initial === "light") initial = "cupcake";
      if (initial === "dark") initial = "night";
      try {
        if (typeof document !== "undefined")
          document.documentElement.setAttribute("data-theme", initial);
      } catch (err) {}
      return initial;
    } catch (err) {
      return "cupcake";
    }
  })(),
  setTheme: (theme) => {
    // normalize: 'light' -> 'cupcake', 'dark' -> 'night'
    const t =
      theme === "light" ? "cupcake" : theme === "dark" ? "night" : theme;
    set({ theme: t });
    try {
      document.documentElement.setAttribute("data-theme", t);
      // Set Tailwind dark mode class for dark theme
      if (t === "night") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (err) {}
    try {
      localStorage.setItem("atomology.theme", t);
    } catch (err) {}
  },
}));
