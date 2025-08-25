import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiSparks from "./ConfettiSparks";
import { messages } from "../../utils/loadingMessages";

// zustand store
import { useGameStore } from "../../store/atomologyStore";

// API hook
import { fetchUniqueElements } from "../../hooks/uniqueElements";

export default function Element() {
  // get random loading message
  const randomLoadingMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const {
    setElements,
    loading,
    setLoading,
    error,
    setError,
    gameStarted,
    answer,
    setAnswer,
    setAnswerElementName,
    playerAnswer,
    setPlayerAnswer,
    fetchTrigger,
  } = useGameStore();

  const [celebrate, setCelebrate] = useState(false);
  const [prefetching, setPrefetching] = useState(false);
  const [nextElements, setNextElements] = useState(null);
  const [nextAnswer, setNextAnswer] = useState(null);
  const swapTimerRef = React.useRef<number | null>(null);

  // trigger celebration when player answers correctly
  useEffect(() => {
    if (playerAnswer && answer && playerAnswer === answer.name) {
      setCelebrate(true);
      const t = window.setTimeout(() => setCelebrate(false), 1200);
      return () => window.clearTimeout(t);
    }
  }, [playerAnswer, answer]);

  // async GET api call
  useEffect(() => {
    if (!gameStarted) return;

    // get the data for one random Element
    const fetchData = async () => {
      try {
        setLoading(true);

        // call fetchUniqueElements to get answers
        const randomElements = await fetchUniqueElements(4);
        // Pick the correct answer and set all state in one go
        const randomCorrectIndex = Math.floor(
          Math.random() * randomElements.length
        );
        const correctElement = randomElements[randomCorrectIndex];

        // Set all state together to ensure sync
        setElements(randomElements);
        setAnswer(correctElement);
        setAnswerElementName(correctElement.name);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [gameStarted, fetchTrigger]);

  // Prefetch next elements when the user answers correctly, then swap after 2s
  useEffect(() => {
    if (!(playerAnswer && answer && playerAnswer === answer.name)) return;
    if (prefetching) return;

    let cancelled = false;
    const doPrefetch = async () => {
      try {
        setPrefetching(true);
        const randomElements = await fetchUniqueElements(4);
        if (cancelled) return;
        const randomCorrectIndex = Math.floor(
          Math.random() * randomElements.length
        );
        const correctElement = randomElements[randomCorrectIndex];
        setNextElements(randomElements as any);
        setNextAnswer(correctElement as any);

        // swap after 2s to allow celebration
        swapTimerRef.current = window.setTimeout(() => {
          // apply prepared next round
          setElements(randomElements as any);
          setAnswer(correctElement as any);
          setAnswerElementName(correctElement.name);
          // clear playerAnswer so UI resets
          setPlayerAnswer("");
          setPrefetching(false);
        }, 2000) as unknown as number;
      } catch (err) {
        // ignore prefetch errors
        setPrefetching(false);
      }
    };

    doPrefetch();
    return () => {
      cancelled = true;
      if (swapTimerRef.current) {
        window.clearTimeout(swapTimerRef.current);
      }
    };
  }, [playerAnswer, answer]);

  if (gameStarted) {
    // conditional rendering for loading and errors
    if (loading) return <p className="mt-24">{randomLoadingMessage()}</p>;
    if (error) return <p className="mt-24">Error: {error}</p>;

    return (
      <div className="relative place-self-center">
        {/* Confetti/sparks celebration effect overlays the entire element box */}
        <ConfettiSparks trigger={celebrate} />
        <div className="relative p-4 md:p-6 lg:p-8 rounded-lg bg-opacity-50 bg-gradient-to-rshadow-lg backdrop-blur-md transition-all duration-500 xs:w-[40px] xs:h-[40px] lg:w-[100px] lg:h-[100px] *:overflow-hidden">
          {/* static blurred background */}
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-black to-transparent blur opacity-20"></div>

          {/* glow overlay separate from content so border doesn't scale */}
          <AnimatePresence>
            {celebrate && (
              <motion.div
                key="glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 pointer-events-none rounded-lg"
              >
                <div
                  style={{ boxShadow: "0 12px 32px rgba(34,197,94,0.18)" }}
                  className="w-full h-full rounded-lg"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content scaled independently */}
          <motion.div
            animate={celebrate ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative z-10 flex flex-col items-center justify-center"
            style={{ willChange: "transform" }}
          >
            <span className="drop-shadow-lg">{answer?.number}</span>
            <h1 className="font-semibold text-5xl drop-shadow-lg tracking-wider">
              {answer?.symbol}
            </h1>
          </motion.div>

          {/* Glowing animated border (not scaled) */}
          <div className="absolute inset-0 rounded-lg border-2 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return null;
}
