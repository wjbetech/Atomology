import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import atoms from "../../assets/atoms.svg";

/**
 * The front door. Grounded in DESIGN.md: clean warm-paper hero with the
 * restored spinning atom (src/assets/atoms.svg, Q2 A), title, tagline
 * and two CTAs. P2-05: drifting specimen tiles and the spectrum grid
 * background are gone — nothing floats behind the hero.
 */

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
          className="mt-6 text-lg md:text-xl text-specimen/80 font-light tracking-wide"
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
            className="btn border-0 rounded-pill px-12 min-h-12 inline-flex items-center justify-center leading-none font-semibold text-lg bg-sodium text-[#1C1917] hover:brightness-110 transition-all"
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
