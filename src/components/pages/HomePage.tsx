import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * The front door. Grounded in DESIGN.md: a dark-lab hero where the
 * signature emission-line spectrum draws itself in, drifting element
 * tiles float like specimens, and two CTAs route people onward.
 */

// Deterministic spectrum barcode: [width%, accent key, opacity]
// hues follow DESIGN.md accents
const ACCENTS: Record<string, string> = {
  sodium: "#FFCB47",
  copper: "#35D99A",
  strontium: "#FF5470",
  argon: "#45C4FF",
  calcium: "#FF8A5C",
};

const SPECTRUM: Array<[number, keyof typeof ACCENTS, number]> = [
  [3, "strontium", 0.9],
  [1.5, "sodium", 0.7],
  [5, "argon", 0.95],
  [2, "copper", 0.6],
  [4, "calcium", 0.8],
  [1, "argon", 0.5],
  [6, "sodium", 0.9],
  [2.5, "strontium", 0.65],
  [3.5, "copper", 0.85],
  [1.2, "calcium", 0.55],
  [4.5, "argon", 0.9],
  [2, "sodium", 0.7],
  [5.5, "strontium", 0.85],
  [1.8, "copper", 0.6],
  [3, "calcium", 0.75],
  [6.5, "sodium", 0.95],
  [2.2, "argon", 0.6],
  [1.4, "strontium", 0.5],
  [4, "copper", 0.8],
  [2.8, "sodium", 0.7],
];

// Drifting specimen tiles: real symbols, coloured by category accent.
const TILES = [
  { symbol: "H", cls: "text-copper", top: "12%", left: "8%", delay: 0 },
  { symbol: "He", cls: "text-argon", top: "22%", left: "78%", delay: 1.2 },
  { symbol: "Li", cls: "text-strontium", top: "64%", left: "14%", delay: 0.6 },
  { symbol: "Ca", cls: "text-calcium", top: "70%", left: "84%", delay: 1.8 },
  { symbol: "Fe", cls: "text-argon", top: "40%", left: "90%", delay: 0.3 },
  { symbol: "Cl", cls: "text-sodium", top: "80%", left: "48%", delay: 2.4 },
];

export default function HomePage() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.55, ease: "easeOut" as const },
        };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden px-6 min-h-[calc(var(--vh,1vh)*100-var(--site-navbar-height)-var(--site-footer-height))]">
      {/* spectrum-readout background grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #1F2C42 0 1px, transparent 1px 56px)",
        }}
      />

      {/* drifting specimen tiles */}
      {!reduce &&
        TILES.map((tile) => (
          <motion.span
            key={tile.symbol}
            aria-hidden
            className={`absolute font-display text-6xl md:text-8xl ${tile.cls} opacity-[0.08] select-none pointer-events-none`}
            style={{ top: tile.top, left: tile.left }}
            animate={{ y: [-10, 10] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: tile.delay,
            }}
          >
            {tile.symbol}
          </motion.span>
        ))}

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* signature: emission-line spectrum drawing in */}
        <motion.div
          aria-hidden
          className="flex justify-center gap-[3px] h-6 mb-10 overflow-visible"
          initial={false}
        >
          {SPECTRUM.map(([w, color, opacity], i) => (
            <motion.span
              key={i}
              className="h-full rounded-full"
              style={{
                width: `${w}%`,
                backgroundColor: ACCENTS[color],
                opacity,
                originX: 0,
              }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={reduce ? undefined : { scaleX: 1 }}
              transition={{ delay: 0.15 + i * 0.045, duration: 0.45 }}
            />
          ))}
        </motion.div>

        <motion.p
          {...rise(0.1)}
          className="font-mono text-xs uppercase tracking-[0.35em] text-annotation mb-6"
        >
          Element 001–118 · Learn by play
        </motion.p>

        <motion.h1
          {...rise(0.25)}
          className="font-display text-specimen text-3xl sm:text-5xl md:text-6xl tracking-[0.18em]"
        >
          ATOMOLOGY
        </motion.h1>

        <motion.p
          {...rise(0.45)}
          className="mt-6 text-lg md:text-xl text-specimen/90 font-bold"
        >
          Every element has its own light.
        </motion.p>
        <motion.p {...rise(0.55)} className="mt-3 text-annotation">
          Three quick games turn the periodic table into something you never
          forget.
        </motion.p>

        <motion.div
          {...rise(0.7)}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/configure"
            className="btn border-0 rounded-pill px-12 min-h-12 inline-flex items-center justify-center leading-none font-semibold text-lg bg-sodium text-void hover:brightness-110 shadow-[0_0_28px_rgba(255,203,71,0.25)] transition-all"
            style={{ transformOrigin: "center" }}
          >
            Play!
          </Link>
          <Link
            to="/instructions"
            className="btn btn-outline rounded-pill px-10 min-h-12 inline-flex items-center justify-center leading-none border-argon/60 text-argon hover:bg-argon/10 hover:border-argon transition-all"
          >
            Instructions
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
