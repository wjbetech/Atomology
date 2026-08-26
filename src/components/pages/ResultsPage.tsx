import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGameStore } from "../../store/atomologyStore";
import LeaderboardPanel from "../LeaderboardPanel";
import {
  saveRunIfBest,
  type BestCategory,
} from "../../utils/personalBests";

/**
 * End-of-run celebration per DESIGN.md: spectral photon burst, run stats
 * as specimen cards, and two exits (Play again → /configure, Home → /).
 */

const ACCENTS = ["#FFCB47", "#35D99A", "#FF5470", "#45C4FF", "#FF8A5C"];

const MODE_LABELS: Record<string, string> = {
  multi: "Multiple Choice",
  open: "Open Answer",
  hangman: "Hangman",
};

const LENGTH_LABELS: Record<string, string> = {
  q10: "10 questions",
  q25: "25 questions",
  cycle: "Full cycle · 118",
  endless: "Endless",
};

function PhotonBurst() {
  const reduce = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        x: Math.cos((i / 28) * Math.PI * 2) * (90 + ((i * 37) % 80)),
        y: Math.sin((i / 28) * Math.PI * 2) * (60 + ((i * 23) % 70)),
        color: ACCENTS[i % ACCENTS.length],
        size: 4 + ((i * 13) % 6),
        delay: (i % 7) * 0.04,
      })),
    []
  );

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-24"
      style={{ zIndex: 0 }}
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size}px ${p.color}`,
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0], x: p.x, y: p.y + 40, scale: [0.4, 1.1, 0.5] }}
          transition={{ duration: 1.3, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
  isRecord = false,
}: {
  label: string;
  value: string;
  accent?: string;
  isRecord?: boolean;
}) {
  return (
    <div
      className={`relative rounded-md border px-6 py-5 text-center min-w-[120px] ${
        isRecord
          ? "border-sodium/70 bg-sodium/10"
          : "border-hairline bg-bench"
      }`}
    >
      {isRecord && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.18em] bg-void border border-sodium/60 text-sodium rounded-pill px-2 py-0.5 whitespace-nowrap">
          New best
        </span>
      )}
      <p
        className="font-display text-3xl md:text-4xl"
        style={{ color: accent ?? "#E9F1FA" }}
      >
        {value}
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-annotation mt-2">
        {label}
      </p>
    </div>
  );
}

export default function ResultsPage() {
  const lastRun = useGameStore((s) => s.lastRun);
  const reduce = useReducedMotion();

  // Record the run against local bests exactly once per mount.
  const recorded = useMemo(() => {
    if (!lastRun) return null;
    return saveRunIfBest({
      mode: lastRun.mode,
      length: lastRun.length,
      score: lastRun.score,
      answered: lastRun.answered,
      correct: lastRun.correct,
      bestStreak: lastRun.bestStreak,
    });
  }, [lastRun]);

  const newRecords = recorded?.newRecords ?? [];

  if (!lastRun) {
    // Direct visit without a finished run.
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24 px-4 text-center">
        <h1 className="font-display text-specimen text-2xl tracking-wide">
          NO RUN YET
        </h1>
        <p className="text-annotation text-sm max-w-sm">
          Finish a session and your results will land here — score, accuracy,
          streaks and all.
        </p>
        <Link to="/configure" className="inline-flex items-center justify-center rounded-pill px-8 py-2.5 bg-sodium text-[#1C1917] font-semibold hover:brightness-110 active:brightness-95 active:scale-[0.98] transition-all">
          Start one now
        </Link>
      </div>
    );
  }

  const accuracy =
    lastRun.answered > 0
      ? Math.round((lastRun.correct / lastRun.answered) * 100)
      : 0;
  const perfect = lastRun.answered > 0 && lastRun.correct === lastRun.answered;
  const modeLabel = MODE_LABELS[lastRun.mode] ?? lastRun.mode;
  const lengthLabel = LENGTH_LABELS[lastRun.length] ?? lastRun.length;

  return (
    <div className="relative w-full max-w-2xl mx-auto px-6 py-16 text-center overflow-hidden">
      {!reduce && <PhotonBurst />}

      {/* signature emission strip */}
      <motion.div
        aria-hidden
        className="flex justify-center gap-[3px] h-5 mb-8"
        initial={false}
      >
        {["#FFCB47", "#35D99A", "#FF5470", "#45C4FF", "#FF8A5C"].map(
          (c, i) => (
            <motion.span
              key={c}
              className="h-full rounded-full"
              style={{ width: `${12 - i}%`, backgroundColor: c, originX: 0 }}
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              animate={reduce ? undefined : { scaleX: 1, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            />
          )
        )}
      </motion.div>

      <p className="font-mono text-xs uppercase tracking-[0.35em] text-annotation mb-4">
        {modeLabel} · {lengthLabel}
      </p>

      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="font-display text-specimen text-3xl md:text-5xl tracking-wide mb-3"
      >
        RUN COMPLETE
      </motion.h1>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mb-10"
      >
        {perfect ? (
          <span className="text-sodium font-bold">
            Flawless — every single answer correct!
          </span>
        ) : lastRun.endedBy === "lives" ? (
          <span className="text-strontium font-bold">
            Out of lives — the lab got you at {lastRun.correct} elements.
          </span>
        ) : lastRun.endedBy === "finished" ? (
          <span className="text-annotation">Session ended on your call. Solid work.</span>
        ) : (
          <span className="text-annotation">
            You lit up {lastRun.correct} of {lastRun.answered} elements.
          </span>
        )}
      </motion.p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <StatCard
          label="Score"
          value={String(lastRun.score)}
          accent="#FFCB47"
          isRecord={newRecords.includes("bestScore" as BestCategory)}
        />
        <StatCard
          label="Accuracy"
          value={`${accuracy}%`}
          accent="#35D99A"
          isRecord={newRecords.includes("bestAccuracy" as BestCategory)}
        />
        <StatCard
          label="Best streak"
          value={String(lastRun.bestStreak)}
          accent="#45C4FF"
          isRecord={newRecords.includes("bestStreak" as BestCategory)}
        />
      </div>

      {/* Global board: ranked modes only, never blocks the page */}
      {lastRun.mode !== "hangman" && lastRun.length !== "endless" && (
        <LeaderboardPanel
          mode={lastRun.mode}
          length={lastRun.length}
          score={lastRun.score}
          answered={lastRun.answered}
          correct={lastRun.correct}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
        <Link
          to="/configure"
          className="inline-flex items-center justify-center rounded-pill px-10 py-2.5 bg-sodium text-[#1C1917] font-semibold hover:brightness-110 active:brightness-95 active:scale-[0.98] transition-all"
        >
          Play again
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-pill px-10 py-2.5 border border-argon/60 text-argon hover:bg-argon/10 active:scale-[0.98] transition-all"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
