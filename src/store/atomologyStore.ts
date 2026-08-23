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
  gameStarted: boolean;
  answer: ElementType | null;
  answerElementName: ElementType["name"] | null;
  playerAnswer: string | null;
  guessedElements: string[];
  // Names still to be shown as the correct answer this cycle (multi/open)
  answerQueue: string[];
  /** Run length chosen on Configure; consumed by the win-states ticket. */
  sessionLength: "q10" | "q25" | "cycle" | "endless";
  // Current-run progress (quiz modes)
  questionsAnswered: number;
  correctCount: number;
  currentStreak: number;
  bestStreak: number;
  /** Set when a run ends; Results reads this. */
  lastRun: {
    mode: string;
    length: "q10" | "q25" | "cycle" | "endless";
    score: number;
    answered: number;
    correct: number;
    bestStreak: number;
    endedBy: "completed" | "finished";
  } | null;
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
  setGameStarted: (gameStarted: boolean) => void;
  setSessionLength: (length: "q10" | "q25" | "cycle" | "endless") => void;
  /** Records one quiz attempt and updates streak/progress. */
  recordAnswer: (wasCorrect: boolean) => void;
  /** Ends the current run: builds lastRun and stops the session. */
  finishRun: (endedBy?: "completed" | "finished") => void;
  resetRunProgress: () => void;
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
  /** When on, a correct answer opens the element's info page first. */
  educationalMode: boolean;
  setEducationalMode: (enabled: boolean) => void;
  /** Name of the element whose info page is currently open (transient). */
  eduInfoName: string | null;
  /** Registered continuation for whatever opened the info page. */
  eduExit: (() => void) | null;
  openEduInfo: (name: string, exit: () => void) => void;
  /** Closes the info page and runs the registered continuation. */
  closeEduInfo: () => void;
}

export const useGameStore = create<GameState>((set, get) => {
  // helper to load persisted session
  const loadSession = (): Partial<GameState> | null => {
    try {
      const raw = localStorage.getItem("atomology.session");
      if (!raw) return null;
      return JSON.parse(raw) as Partial<GameState>;
    } catch {
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
        sessionLength: s.sessionLength,
        lastRun: s.lastRun,
      };
      localStorage.setItem("atomology.session", JSON.stringify(toSave));
    } catch {
      // ignore persistence errors
    }
  };

  const persisted = loadSession();

  return {
    gameMode: persisted?.gameMode ?? "multi",
    score: persisted?.score ?? 0,
    elements: persisted?.elements ?? [],
    gameStarted: persisted?.gameStarted ?? false,
    answer: persisted?.answer ?? null,
    playerAnswer: persisted?.playerAnswer ?? null,
    answerElementName: persisted?.answerElementName ?? "",
    guessedElements: persisted?.guessedElements ?? [],
    answerQueue: persisted?.answerQueue ?? [],
    sessionLength: persisted?.sessionLength ?? "q25",
    questionsAnswered: 0,
    correctCount: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastRun: null,
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
    setSessionLength: (length) => {
      set({ sessionLength: length });
      persist();
    },
    recordAnswer: (wasCorrect) => {
      set((state) => ({
        questionsAnswered: state.questionsAnswered + 1,
        correctCount: state.correctCount + (wasCorrect ? 1 : 0),
        currentStreak: wasCorrect ? state.currentStreak + 1 : 0,
        bestStreak: Math.max(
          state.bestStreak,
          wasCorrect ? state.currentStreak + 1 : 0
        ),
      }));
      // Finite sessions end the moment their limit is reached.
      const s = get();
      const limits = { q10: 10, q25: 25, cycle: 118 } as const;
      if (
        s.sessionLength !== "endless" &&
        s.questionsAnswered >= limits[s.sessionLength]
      ) {
        get().finishRun("completed");
      }
    },
    finishRun: (endedBy = "completed") => {
      const s = get();
      set({
        lastRun: {
          mode: s.gameMode,
          length: s.sessionLength,
          score: s.score,
          answered: s.questionsAnswered,
          correct: s.correctCount,
          bestStreak: s.bestStreak,
          endedBy,
        },
        gameStarted: false,
      });
      persist();
    },
    resetRunProgress: () => {
      set({
        questionsAnswered: 0,
        correctCount: 0,
        currentStreak: 0,
        bestStreak: 0,
        lastRun: null,
      });
      persist();
    },

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
    setGameStarted: (gameStarted) => {
      set({ gameStarted });
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
        questionsAnswered: 0,
        correctCount: 0,
        currentStreak: 0,
        bestStreak: 0,
        lastRun: null,
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

export const useUIStore = create<uiSlice>((set, get) => ({
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
      } catch {}
      return initial;
    } catch {
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
    } catch {}
    try {
      localStorage.setItem("atomology.theme", t);
    } catch {}
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
    } catch {
      return true;
    }
  })(),
  setShowHUD: (show: boolean) => {
    set({ showHUD: show });
    try {
      localStorage.setItem("atomology.showHUD", show ? "1" : "0");
    } catch {}
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
    } catch {
      return true;
    }
  })(),
  setSoundEnabled: (enabled: boolean) => {
    set({ soundEnabled: enabled });
    try {
      localStorage.setItem("atomology.soundEnabled", enabled ? "1" : "0");
    } catch {}
  },
  // educational mode defaults off; behaviour ships with the info-page ticket
  educationalMode: (() => {
    try {
      return localStorage.getItem("atomology.educationalMode") === "1";
    } catch {
      return false;
    }
  })(),
  setEducationalMode: (enabled: boolean) => {
    set({ educationalMode: enabled });
    try {
      localStorage.setItem("atomology.educationalMode", enabled ? "1" : "0");
    } catch {}
  },
  eduInfoName: null,
  eduExit: null,
  openEduInfo: (name, exit) => set({ eduInfoName: name, eduExit: exit }),
  closeEduInfo: () => {
    const exit = get().eduExit;
    set({ eduInfoName: null, eduExit: null });
    // run the continuation after state has cleared
    exit?.();
  },
}));
