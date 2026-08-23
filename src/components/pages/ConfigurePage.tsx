import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGameStore,
  useUIStore,
} from "../../store/atomologyStore";
import SoundToggle from "../sub-components/SoundToggle";

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
    symbol: "Ar",
  },
  {
    id: "open",
    name: "Open Answer",
    pitch: "No hints — recall the full element name yourself.",
    win: "Finish your session length",
    accent: "#35D99A",
    symbol: "Au",
  },
  {
    id: "hangman",
    name: "Hangman",
    pitch: "Spell hidden element names before the lives run out.",
    win: "Complete every word in the pool",
    accent: "#FFCB47",
    symbol: "He",
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

  // Preselect a persisted mode if there is one; otherwise nothing is chosen.
  const [selected, setSelected] = useState<ModeId | null>(
    gameMode === "multi" || gameMode === "open" || gameMode === "hangman"
      ? (gameMode as ModeId)
      : null
  );

  const start = () => {
    if (!selected) return;
    if (selected === "hangman") {
      resetHangman();
      setHangmanDifficulty(null);
    } else {
      resetHangman();
      useGameStore.getState().resetRunProgress();
      useGameStore.getState().resetAnswerQueue();
      useGameStore.getState().generateNextRound();
      setPlayerAnswer("");
    }
    setSessionLength(sessionLength);
    setGameMode(selected);
    setGameStarted(true);
    navigate("/play");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-14">
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
              onClick={() => setSelected(mode.id)}
              aria-pressed={active}
              className={`relative text-left rounded-md border bg-bench p-5 transition-all duration-200 ${
                active
                  ? "border-transparent shadow-[0_0_24px_rgba(69,196,255,0.15)]"
                  : "border-hairline hover:border-annotation/40"
              }`}
              style={active ? { borderColor: mode.accent } : undefined}
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-md"
                style={{
                  backgroundColor: mode.accent,
                  opacity: active ? 1 : 0.35,
                }}
              />
              <p
                className="font-display text-3xl mb-3"
                style={{ color: mode.accent }}
              >
                {mode.symbol}
              </p>
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
      </div>

      {/* Start */}
      <div className="flex justify-center">
        <button
          type="button"
          disabled={!selected}
          onClick={start}
          className={`btn border-0 rounded-pill px-16 py-3 font-semibold text-lg transition-all ${
            selected
              ? "bg-sodium text-void hover:brightness-110 shadow-[0_0_28px_rgba(255,203,71,0.25)]"
              : "btn-disabled bg-bench text-annotation opacity-50"
          }`}
        >
          {selected ? "Start!" : "Choose a mode to start"}
        </button>
      </div>
    </div>
  );
}
