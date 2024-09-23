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

        setGameStarted(true);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [gameStarted, setLoading, setElements, setAnswer, setError]);

  if (gameStarted) {
    // conditional rendering for loading and errors
    if (loading) return <p className="mt-24">{randomLoadingMessage()}</p>;
    if (error) return <p className="mt-24">Error: {error}</p>;

    return (
      <div className="border-4 p-6 border-secondary place-self-center mt-24 rounded-md shadow-md transition-all duration-1000">
        <span>{answer?.number}</span>
        <h1 className="font-bold text-3xl">{answer?.symbol}</h1>
      </div>
    );
  }
}
