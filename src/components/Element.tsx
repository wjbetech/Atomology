import React, { useState, useEffect } from "react";
import { messages } from "../utils/loadingMessages";

// data method import
import { GET } from "../data/fetch";

// zustand store
import { useGameStore } from "../store/atomologyStore";

export default function Element() {
  // get random loading message
  const randomLoadingMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const {
    element,
    setElement,
    loading,
    setLoading,
    error,
    setError,
    gameStarted,
    setGameStarted,
  } = useGameStore();

  // async GET api call
  useEffect(() => {
    // get random idx for setElementData
    const randomIndex = Math.floor(Math.random() * 119);

    // get the data for one random Element
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GET();
        const data = response.data.data[randomIndex];

        // destructure and store data
        const {
          atomic_mass: atomicMass,
          category,
          density,
          discovered_by: discoveredBy,
          melt,
          name,
          number,
          period,
          phase,
          symbol,
        } = data;

        // pass bundled data to zustand
        setElement({
          atomicMass,
          category,
          density,
          discoveredBy,
          melt,
          name,
          number,
          period,
          phase,
          symbol,
        });

        console.log(element);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (gameStarted) {
    // conditional rendering for loading and errors
    if (loading) return <p className="mt-24">{randomLoadingMessage()}</p>;
    if (error) return <p className="mt-24">Error: {error}</p>;

    return (
      <div className="border-4 p-6 border-secondary place-self-center mt-24 rounded-md shadow-md transition-all duration-1000">
        <span>{element?.number}</span>
        <h1 className="font-bold text-3xl">{element?.symbol}</h1>
      </div>
    );
  }
}
