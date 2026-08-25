import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import atoms from "../../assets/atoms.svg";

/**
 * The front door. Grounded in DESIGN.md: Spectral Dark hero with the
 * restored spinning atom (src/assets/atoms.svg, Q2 A) replacing the
 * SPECTRUM blobs (Q8 A), plus two CTAs. Drifting tiles remain until
 * P2-05 removes them.
 */

// P1-04: Restored exact spinning atom (Q2 A) replaces SPECTRUM blobs
// (Q8 A). SPECTRUM kept as comment for reference if needed:
// const SPECTRUM = [...] // removed per inbox 25/08/2026

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
        {/* P1-04: spinning atom (exact src/assets/atoms.svg, 18s linear, respects reduced-motion) */}
        <motion.div
          aria-hidden
          className="flex justify-center mb-10"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <motion.img
            src={atoms}
            alt=""
            className="w-24 h-24 md:w-28 md:h-28 select-none pointer-events-none"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={
              reduce
                ? undefined
                : { duration: 18, repeat: Infinity, ease: "linear" }
            }
            draggable={false}
          />
        </motion.div>

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
            className="btn border-0 rounded-pill px-12 py-3 font-semibold text-lg bg-sodium text-void hover:brightness-110 shadow-[0_0_28px_rgba(255,203,71,0.25)] transition-all"
            style={{ transformOrigin: "center" }}
          >
            Play!
          </Link>
          <Link
            to="/instructions"
            className="btn btn-outline rounded-pill px-10 py-3 border-argon/60 text-argon hover:bg-argon/10 hover:border-argon transition-all"
          >
            Instructions
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
