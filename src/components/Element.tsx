import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { messages } from "../utils/loadingMessages";

// zustand store
import { useGameStore } from "../store/atomologyStore";

// API hook
import { fetchUniqueElements } from "../hooks/uniqueElements";

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
          // store setter available via useGameStore; call directly to avoid importing again
          // useGameStore.getState().setPlayerAnswer(""); // avoid direct getState here
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
      <div className="relative p-8 place-self-center rounded-lg bg-opacity-50 bg-gradient-to-rshadow-lg backdrop-blur-md transition-all duration-500 w-[125px]">
        <AnimatePresence>
          {celebrate && (
            <motion.div
              key="arrow"
              // fill parent and center arrow so it originates from element center
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{
                opacity: 1,
                // rise from center upward only
                y: -180,
                // no rotation — arrow rises straight up
                scale: [1, 1.25],
              }}
              exit={{ opacity: 0, y: -220, scale: 1.3 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* solid green spiralling arrow (shaft + head) */}
              <svg
                width="36"
                height="56"
                viewBox="0 0 36 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                className="drop-shadow-lg"
              >
                <rect
                  x="15"
                  y="12"
                  width="6"
                  height="28"
                  rx="3"
                  fill="#16A34A"
                />
                <polygon points="18,0 6,18 30,18" fill="#16A34A" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

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
        >
          <span className="drop-shadow-lg">{answer?.number}</span>
          <h1 className="font-semibold text-5xl drop-shadow-lg tracking-wider">
            {answer?.symbol}
          </h1>
        </motion.div>

        {/* Glowing animated border (not scaled) */}
        <div className="absolute inset-0 rounded-lg border-2 animate-pulse"></div>
      </div>
    );
  }

  return null;
}
