import { create } from "zustand";
import { gameElements, getElementByName } from "../data/elements";
import { shuffle } from "../utils/shuffle";

// define the shape of items inside ElementType array & for answer
export interface ElementType {
  atomicMass: number;
  category: string;
  density: number;
  discoveredBy: string | null;
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
  error: string | null;
  gameStarted: boolean;
  answer: ElementType | null;
  answerElementName: ElementType["name"] | null;
  playerAnswer: string | null;
  guessedElements: string[];
  // Names still to be shown as the correct answer this cycle (multi/open)
  answerQueue: string[];
  // Hangman mode state
  hangmanWord: string | null;
  hangmanGuessedLetters: string[];
  hangmanIncorrectGuesses: number;
  hangmanMaxAttempts: number;
  hangmanIndex: number;
  hangmanDifficulty: string | null;
  hangmanPool: string[];
  // Actions
  setGameMode: (mode: string) => void;
  setScore: (update: number | ((prevScore: number) => number)) => void;
  setElements: (elements: ElementType[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setGameStarted: (gameStarted: boolean) => void;
  setAnswer: (answer: ElementType | null) => void;
  setAnswerElementName: (name: ElementType["name"] | null) => void;
  // Hangman actions
  setHangmanWord: (word: string) => void;
  guessHangmanLetter: (letter: string) => void;
  resetHangman: () => void;
  setHangmanIndex: (index: number) => void;
  setHangmanDifficulty: (difficulty: string | null) => void;
  setHangmanPool: (pool: string[]) => void;
}

export interface GameState {
  setPlayerAnswer: (answer: string | null) => void;
  resetAnswerInput: () => void;
  addGuessedElement: (symbol: string) => void;
  resetGuessedElements: () => void;
  returnToMain: () => void;
  /** Builds the next round from the no-repeat queue and sets elements/answer. */
  generateNextRound: () => void;
  /** Empties the queue so the next round starts a fresh shuffled cycle. */
  resetAnswerQueue: () => void;
}

export interface uiSlice {
  theme: string;
  setTheme: (theme: string) => void;
  showHUD: boolean;
  setShowHUD: (show: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
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
        guessedElements: s.guessedElements,
        answerQueue: s.answerQueue,
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
    elements: persisted?.elements ?? [],
    loading: false,
    error: null,
    gameStarted: persisted?.gameStarted ?? false,
    answer: persisted?.answer ?? null,
    playerAnswer: persisted?.playerAnswer ?? null,
    answerElementName: persisted?.answerElementName ?? "",
    guessedElements: persisted?.guessedElements ?? [],
    answerQueue: persisted?.answerQueue ?? [],
    // Hangman state
    hangmanWord: null,
    hangmanGuessedLetters: [],
    hangmanIncorrectGuesses: 0,
    hangmanMaxAttempts: 10,
    hangmanIndex: 0,
    hangmanDifficulty: null,
    hangmanPool: [],

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
    setHangmanPool: (pool) => set({ hangmanPool: pool }),

    addGuessedElement: (symbol) => {
      if (get().guessedElements.includes(symbol)) return;
      set((state) => ({
        guessedElements: [...state.guessedElements, symbol],
      }));
      persist();
    },
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
    setScore: (update) => {
      set((state) => ({
        score: typeof update === "function" ? update(state.score) : update,
      }));
      persist();
    },
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
    resetAnswerInput: () =>
      set({
        playerAnswer: "",
      }),
    returnToMain: () => {
      try {
        localStorage.removeItem("atomology.session");
      } catch {
        // ignore storage errors (restricted contexts)
      }
      set({
        gameMode: "",
        gameStarted: false,
        score: 0,
        playerAnswer: "",
        answerElementName: "",
        guessedElements: [],
        elements: [],
        answer: null,
        answerQueue: [],
        hangmanWord: null,
        hangmanGuessedLetters: [],
        hangmanIncorrectGuesses: 0,
        hangmanIndex: 0,
        hangmanDifficulty: null,
        hangmanPool: [],
      });
    },
    resetAnswerQueue: () => {
      set({ answerQueue: [] });
      persist();
    },
    generateNextRound: () => {
      const state = get();
      // Drop any persisted names that no longer resolve (stale sessions),
      // then refill with a full shuffled cycle when exhausted.
      let queue = state.answerQueue.filter((n) => !!getElementByName(n));
      if (queue.length === 0) {
        queue = shuffle(gameElements.map((e) => e.name));
      }

      const [correctName, ...rest] = queue;
      const correct = getElementByName(correctName);
      if (!correct) return;

      const options: ElementType[] = [correct];
      while (options.length < 4) {
        const candidate =
          gameElements[Math.floor(Math.random() * gameElements.length)];
        if (!options.some((o) => o.name === candidate.name)) {
          options.push(candidate);
        }
      }

      set({
        answerQueue: rest,
        elements: shuffle(options),
        answer: correct,
        answerElementName: correct.name,
      });
      persist();
    },
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
  // HUD visibility persisted in localStorage
  showHUD: (() => {
    try {
      const stored =
        typeof window !== "undefined" &&
        typeof window.localStorage !== "undefined"
          ? localStorage.getItem("atomology.showHUD")
          : null;
      return stored ? stored === "1" : true;
    } catch (err) {
      return true;
    }
  })(),
  setShowHUD: (show: boolean) => {
    set({ showHUD: show });
    try {
      localStorage.setItem("atomology.showHUD", show ? "1" : "0");
    } catch (err) {}
  },
  // sound enabled toggle persisted in localStorage
  soundEnabled: (() => {
    try {
      const stored =
        typeof window !== "undefined" &&
        typeof window.localStorage !== "undefined"
          ? localStorage.getItem("atomology.soundEnabled")
          : null;
      return stored ? stored === "1" : true;
    } catch (err) {
      return true;
    }
  })(),
  setSoundEnabled: (enabled: boolean) => {
    set({ soundEnabled: enabled });
    try {
      localStorage.setItem("atomology.soundEnabled", enabled ? "1" : "0");
    } catch (err) {}
  },
}));
