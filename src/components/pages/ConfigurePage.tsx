import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGameStore,
  useUIStore,
} from "../../store/atomologyStore";
import SoundToggle from "../sub-components/SoundToggle";
import { getElementsByDifficulty } from "../../utils/hangmanDifficulty";
import type { DifficultyLevel } from "../../utils/hangmanDifficulty";
import { DIFFICULTY_LABELS } from "../hangman/difficultyLabels";
import { shuffle } from "../../utils/shuffle";

/**
 * Session setup per the redesign: mode cards, session length, global
 * settings. Start applies everything and routes into /play.
 */

const MODES = [
  {
    id: "multi",
    name: "Multiple Choice",
    pitch: "See a symbol, pick the right name from four options.",
    win: "Finish your session length",
    accent: "#45C4FF",
  },
  {
    id: "open",
    name: "Open Answer",
    pitch: "No hints — recall the full element name yourself.",
    win: "Finish your session length",
    accent: "#35D99A",
  },
  {
    id: "hangman",
    name: "Hangman",
    pitch: "Spell hidden element names before the lives run out.",
    win: "Complete every word in the pool",
    accent: "#FFCB47",
  },
] as const;

type ModeId = (typeof MODES)[number]["id"];

const LENGTHS: Array<{ id: "q10" | "q25" | "cycle" | "endless"; label: string }> =
  [
    { id: "q10", label: "10 questions" },
    { id: "q25", label: "25 questions" },
    { id: "cycle", label: "Full cycle · 118" },
    { id: "endless", label: "Endless" },
  ];

const LAST_CONFIG_KEY = "atomology:lastConfig";
const LAST_TTL = 60 * 60 * 1000; // ~1hr per Q4

type LastConfig = {
  mode: ModeId;
  length: "q10" | "q25" | "cycle" | "endless";
  livesMode: boolean;
  educationalMode: boolean;
  savedAt: number;
};

function readLastConfig(): LastConfig | null {
  try {
    const raw = localStorage.getItem(LAST_CONFIG_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LastConfig;
    if (!parsed?.savedAt || Date.now() - parsed.savedAt > LAST_TTL) {
      localStorage.removeItem(LAST_CONFIG_KEY);
      return null;
    }
    if (!["multi", "open", "hangman"].includes(parsed.mode)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function ConfigurePage() {
  const navigate = useNavigate();
  const gameMode = useGameStore((s) => s.gameMode);
  const setGameMode = useGameStore((s) => s.setGameMode);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  const setPlayerAnswer = useGameStore((s) => s.setPlayerAnswer);
  const resetHangman = useGameStore((s) => s.resetHangman);
  const setHangmanDifficulty = useGameStore((s) => s.setHangmanDifficulty);
  const sessionLength = useGameStore(
    (s) => s.sessionLength
  ) as "q10" | "q25" | "cycle" | "endless";
  const setSessionLength = useGameStore((s) => s.setSessionLength);

  const educationalMode = useUIStore((s) => s.educationalMode);
  const setEducationalMode = useUIStore((s) => s.setEducationalMode);
  const showHUD = useUIStore((s) => s.showHUD);
  const setShowHUD = useUIStore((s) => s.setShowHUD);
  const livesMode = useGameStore((s) => s.livesMode);
  const setLivesMode = useGameStore((s) => s.setLivesMode);

  // P1-06: Preselect from 1hr TTL lastConfig if present, else from persisted gameMode
  const [selected, setSelected] = useState<ModeId | null>(() => {
    const last = readLastConfig();
    if (last) return last.mode;
    return gameMode === "multi" || gameMode === "open" || gameMode === "hangman"
      ? (gameMode as ModeId)
      : null;
  });

  // P1-07: Hangman difficulty lives on Configure now (conditional row)
  const hangmanDifficulty = useGameStore((s) => s.hangmanDifficulty) as DifficultyLevel | null;
  const setHangmanDifficultyRaw = useGameStore((s) => s.setHangmanDifficulty);
  const [hangmanLevel, setHangmanLevel] = useState<DifficultyLevel>(
    (hangmanDifficulty as DifficultyLevel) || "all"
  );

  const handleSelectMode = (id: ModeId) => {
    setSelected(id);
    if (id === "hangman" && hangmanDifficulty) {
      setHangmanLevel(hangmanDifficulty as DifficultyLevel);
    }
  };

  // Hydrate other settings from lastConfig once on mount (TTL-checked)
  useEffect(() => {
    const last = readLastConfig();
    if (!last) return;
    const { setSessionLength: setLen, setShowHUD, setEducationalMode: setEdu, setLivesMode: setLives } =
      // use store directly to avoid stale closures
      {
        setSessionLength: useGameStore.getState().setSessionLength,
        setShowHUD: useUIStore.getState().setShowHUD,
        setEducationalMode: useUIStore.getState().setEducationalMode,
        setLivesMode: useGameStore.getState().setLivesMode,
      };
    setLen(last.length);
    setLives(last.livesMode);
    setEdu(last.educationalMode);
    // showHUD not part of lastConfig TTL per spec, keep as-is
  }, []);

  const persistLastConfig = (mode: ModeId) => {
    const payload: LastConfig = {
      mode,
      length: useGameStore.getState().sessionLength as LastConfig["length"],
      livesMode: useGameStore.getState().livesMode,
      educationalMode: useUIStore.getState().educationalMode,
      savedAt: Date.now(),
    };
    try {
      localStorage.setItem(LAST_CONFIG_KEY, JSON.stringify(payload));
    } catch {}
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(LAST_CONFIG_KEY);
    } catch {}
    setSelected(null);
    setHangmanLevel("all");
    useGameStore.getState().setSessionLength("q25");
    useGameStore.getState().setLivesMode(false);
    useUIStore.getState().setEducationalMode(false);
  };

  // P1-05: Single-gate — Configure is the only place to pick mode+length.
  // Session Length pills already call setSessionLength directly, so Start
  // just consumes the current store value and navigates to /play with no
  // interstitial. Verified no post-configure page remains.
  const start = () => {
    if (!selected) return;
    if (selected === "hangman") {
      // P1-07: Configure now owns difficulty — create the shuffled pool here
      // so /play renders immediately with no interstitial (P1-01 hotfix retained).
      resetHangman();
      setHangmanDifficultyRaw(hangmanLevel);
      const pool = shuffle(getElementsByDifficulty(hangmanLevel)).map((e) => e.name);
      const st = useGameStore.getState();
      st.setHangmanPool(pool);
      st.setHangmanIndex(0);
      if (pool[0]) st.setHangmanWord(pool[0]);
    } else {
      resetHangman();
      useGameStore.getState().resetRunProgress();
      useGameStore.getState().resetAnswerQueue();
      useGameStore.getState().generateNextRound();
      setPlayerAnswer("");
    }
    // sessionLength already set via pills; just persist the whole config for 1hr (P1-06)
    persistLastConfig(selected);
    setGameMode(selected);
    setGameStarted(true);
    navigate("/play");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 my-auto pt-[calc(var(--site-navbar-height)_+_2.5rem)] pb-24 md:pb-28">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-annotation mb-3">
        Configure
      </p>
      <h1 className="font-display text-specimen text-2xl md:text-4xl tracking-wide mb-8">
        SET UP A SESSION
      </h1>

      {/* Modes */}
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-annotation mb-4">
        Choose your mode
      </p>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {MODES.map((mode) => {
          const active = selected === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => handleSelectMode(mode.id)}
              aria-pressed={active}
              className={`text-left rounded-md border p-5 transition-colors duration-200 ${
                active
                  ? ""
                  : "border-hairline hover:border-annotation/40"
              }`}
              style={
                active
                  ? { borderColor: mode.accent, backgroundColor: `${mode.accent}0D` }
                  : undefined
              }
            >
              <h2 className="font-bold text-specimen">{mode.name}</h2>
              <p className="text-sm text-annotation mt-1 leading-snug">
                {mode.pitch}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-annotation">
                Win: <span className="text-specimen/90 normal-case">{mode.win}</span>
              </p>
            </button>
          );
        })}
      </div>

      {/* Session length */}
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-annotation mb-4">
        Session length
      </p>
      <div
        role="radiogroup"
        aria-label="Session length"
        className="flex flex-wrap gap-3 mb-10"
      >
        {LENGTHS.map((len) => {
          const active = sessionLength === len.id;
          return (
            <button
              key={len.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSessionLength(len.id)}
              className={`rounded-pill px-5 py-2 text-sm border transition-all ${
                active
                  ? "bg-sodium/15 border-sodium text-sodium"
                  : "border-hairline text-annotation hover:border-annotation/40"
              }`}
            >
              {len.label}
            </button>
          );
        })}
      </div>

      {/* Hangman difficulty — only when Hangman is selected (P1-07) */}
      {selected === "hangman" && (
        <>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-annotation mb-4">
            Hangman difficulty
          </p>
          <div
            role="radiogroup"
            aria-label="Hangman difficulty"
            className="flex flex-wrap gap-3 mb-10"
          >
            {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => {
              const active = hangmanLevel === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setHangmanLevel(key as DifficultyLevel)}
                  className={`rounded-pill px-5 py-2 text-sm border transition-all ${
                    active
                      ? "bg-sodium/15 border-sodium text-sodium"
                      : "border-hairline text-annotation hover:border-annotation/40"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Global settings */}
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-annotation mb-4">
        Settings
      </p>
      <div className="rounded-md border border-hairline bg-bench divide-y divide-hairline mb-12">
        <div className="flex items-center justify-between p-4">
          <span className="text-specimen text-sm">Sound effects</span>
          <SoundToggle />
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <span className="text-specimen text-sm">Periodic-table HUD</span>
            <p className="text-xs text-annotation mt-0.5">
              Track learned elements during quiz modes
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-sm"
            checked={showHUD}
            onChange={(e) => setShowHUD(e.target.checked)}
            aria-label="Periodic table HUD"
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <span className="text-specimen text-sm">
              Educational mode{" "}
              <span className="font-mono text-[10px] uppercase text-copper">
                new
              </span>
            </span>
            <p className="text-xs text-annotation mt-0.5">
              After each correct answer, read about the element before moving on
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-accent toggle-sm"
            checked={educationalMode}
            onChange={(e) => setEducationalMode(e.target.checked)}
            aria-label="Educational mode"
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <span className="text-specimen text-sm">Arcade lives</span>
            <p className="text-xs text-annotation mt-0.5">
              Quiz modes: three wrong answers end the run
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={livesMode}
            onChange={(e) => setLivesMode(e.target.checked)}
            aria-label="Arcade lives"
          />
        </div>
      </div>

      {/* Start + Reset (P1-06) */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          disabled={!selected}
          onClick={start}
          className={`inline-flex items-center justify-center rounded-pill px-16 py-3 font-semibold text-lg transition-all active:scale-[0.98] ${
            selected
              ? "bg-sodium text-[#1C1917] hover:brightness-110 active:brightness-95 shadow-[0_0_28px_rgba(255,203,71,0.25)]"
              : "bg-bench text-annotation opacity-50 cursor-not-allowed"
          }`}
        >
          {selected ? "Start!" : "Choose a mode to start"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center rounded-pill px-4 py-1.5 text-sm text-annotation hover:text-specimen hover:bg-bench active:scale-[0.98] transition-all"
        >
          Reset to defaults
        </button>
        <p className="font-mono text-[10px] text-annotation/70">
          Remembers your last mode + length for ~1 hour
        </p>
      </div>
    </div>
  );
}
