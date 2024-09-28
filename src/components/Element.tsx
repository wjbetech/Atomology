import React, { useEffect } from "react";
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
    setGameStarted,
    score,
    setAnswerElementName,
  } = useGameStore();

  // async GET api call
  useEffect(() => {
    if (!gameStarted) return;

    // get the data for one random Element
    const fetchData = async () => {
      try {
        setLoading(true);

        // call fetchUniqueElements to get answers
        const randomElements = await fetchUniqueElements(4);
        setElements(randomElements);

        // set a randomElement[x] as correct answer
        const randomCorrectIndex = Math.floor(Math.random() * 3);
        setAnswer(randomElements[randomCorrectIndex]);
        setAnswerElementName(answer && answer.name);

        setGameStarted(true);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [gameStarted, setLoading, setElements, setAnswer, setError, score]);

  if (gameStarted) {
    // conditional rendering for loading and errors
    if (loading) return <p className="mt-24">{randomLoadingMessage()}</p>;
    if (error) return <p className="mt-24">Error: {error}</p>;

    return (
      <div className="relative p-8 place-self-center rounded-lg bg-opacity-50 bg-gradient-to-rshadow-lg backdrop-blur-md transition-all duration-500 w-[125px]">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-white to-transparent blur opacity-20"></div>

        {/* Main content with number and symbol */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className="text-white drop-shadow-lg">{answer?.number}</span>
          <h1 className="font-semibold text-5xl text-white drop-shadow-lg tracking-wider">
            {answer?.symbol}
          </h1>
        </div>

        {/* Glowing animated border */}
        <div className="absolute inset-0 rounded-lg border-2 animate-pulse"></div>
      </div>
    );
  }
}
