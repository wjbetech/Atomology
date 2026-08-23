import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiSparks from "./ConfettiSparks";

// zustand store
import { useGameStore } from "../../store/atomologyStore";
import { accentForCategory } from "../../utils/spectral";

export default function Element() {
  const { gameStarted, answer, playerAnswer } = useGameStore();

  const [celebrate, setCelebrate] = useState(false);
  // anchor in viewport coords for ConfettiSparks
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const swapTimerRef = React.useRef<number | null>(null);

  // trigger celebration when player answers correctly
  useEffect(() => {
    if (playerAnswer && answer && playerAnswer === answer.name) {
      setCelebrate(true);
      // compute anchor (center of the element box) for anchored confetti
      try {
        const el = boxRef.current;
        if (el && typeof window !== "undefined") {
          const rect = el.getBoundingClientRect();
          setAnchor({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      } catch {
        setAnchor(null);
      }

      const t = window.setTimeout(() => {
        setCelebrate(false);
        // clear anchor after celebration ends
        setAnchor(null);
      }, 1200);
      return () => window.clearTimeout(t);
    }
  }, [playerAnswer, answer]);

  // Load the first round when a game starts.
  useEffect(() => {
    if (!gameStarted) return;
    useGameStore.getState().generateNextRound();
  }, [gameStarted]);

  // Advance to the next queued round after the celebration window
  useEffect(() => {
    if (!(playerAnswer && answer && playerAnswer === answer.name)) return;

    swapTimerRef.current = window.setTimeout(() => {
      useGameStore.getState().generateNextRound();
      // clear playerAnswer so UI resets
      useGameStore.getState().setPlayerAnswer("");
    }, 2000);

    return () => {
      if (swapTimerRef.current !== null) {
        window.clearTimeout(swapTimerRef.current);
      }
    };
  }, [playerAnswer, answer]);

  if (gameStarted) {
    const accent = accentForCategory(answer?.category);
    return (
      <div className="place-self-center py-8">
        {/* Confetti/sparks celebration effect overlays the entire element box */}
        <ConfettiSparks trigger={celebrate} anchor={anchor} />
        <div
          ref={boxRef}
          className="relative p-4 md:p-6 lg:p-8 rounded-md bg-bench border border-hairline transition-all duration-500"
          style={{ borderTopColor: accent }}
        >
          {/* emission strip: this element's own light */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ backgroundColor: accent, opacity: celebrate ? 1 : 0.55 }}
          />
          {/* corner measurement ticks (specimen slide frame) */}
          <span aria-hidden className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-hairline" />
          <span aria-hidden className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-hairline" />
          <span aria-hidden className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-hairline" />
          <span aria-hidden className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-hairline" />

          {/* glow overlay separate from content so border doesn't scale */}
          <AnimatePresence>
            {celebrate && (
              <motion.div
                key="glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 pointer-events-none rounded-md"
              >
                <div
                  style={{ boxShadow: "0 0 40px rgba(53,217,154,0.35)" }}
                  className="w-full h-full rounded-md"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content scaled independently */}
          <motion.div
            animate={celebrate ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative z-10 flex flex-col items-center justify-center h-[74px] md:h-[100px]"
            style={{ willChange: "transform" }}
          >
            <span className="font-mono text-xs text-annotation">
              {answer?.number}
            </span>
            <h1 className="font-display text-sodium text-3xl md:text-4xl lg:text-5xl drop-shadow-lg tracking-[0.15em]">
              {answer?.symbol}
            </h1>
          </motion.div>

          {/* Glowing animated border (not scaled) */}
          <div
            className="absolute inset-0 rounded-md border animate-pulse pointer-events-none"
            style={{ borderColor: accent }}
          ></div>
        </div>
      </div>
    );
  }

  return null;
}
