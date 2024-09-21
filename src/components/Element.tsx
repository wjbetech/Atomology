import React, { useState, useEffect } from "react";
import { messages } from "../utils/loadingMessages";

// data method import
import { GET } from "../data/fetch";

// zustand store
import { useGameStore } from "../store/atomologyStore";

export default function Element() {
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

  // get random loading message
  const randomLoadingMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  // async GET api call
  useEffect(() => {
    // get random idx for setElementData
    const randomIndex = Math.floor(Math.random() * 119);
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GET();
        // console.log(response.data.data[randomIndex]);
        const elementInformation = ({
          atomic_mass: atomicMass,
          category,
          density,
          name,
          number,
          period,
          phase,
          symbol,
        } = response.data.data[randomIndex]);
        setElementData(response.data.data[5].data);
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
      <div className="border-4 p-6 border-secondary w-[15%] place-self-center mt-24 rounded-md shadow-md transition-all duration-1000">
        {/* <span></span> */}
        <h1 className="font-bold text-3xl">{}</h1>
      </div>
    );
  }
}
