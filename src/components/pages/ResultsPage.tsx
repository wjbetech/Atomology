import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGameStore } from "../../store/atomologyStore";

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
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-md border border-hairline bg-bench px-6 py-5 text-center min-w-[120px]">
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
        <Link to="/configure" className="btn border-0 rounded-pill px-8 bg-sodium text-void font-semibold hover:brightness-110">
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
        ) : lastRun.endedBy === "finished" ? (
          <span className="text-annotation">Session ended on your call. Solid work.</span>
        ) : (
          <span className="text-annotation">
            You lit up {lastRun.correct} of {lastRun.answered} elements.
          </span>
        )}
      </motion.p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <StatCard label="Score" value={String(lastRun.score)} accent="#FFCB47" />
        <StatCard label="Accuracy" value={`${accuracy}%`} accent="#35D99A" />
        <StatCard label="Best streak" value={String(lastRun.bestStreak)} accent="#45C4FF" />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/configure"
          className="btn border-0 rounded-pill px-10 bg-sodium text-void font-semibold hover:brightness-110"
        >
          Play again
        </Link>
        <Link
          to="/"
          className="btn btn-outline rounded-pill px-10 border-argon/60 text-argon hover:bg-argon/10"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
