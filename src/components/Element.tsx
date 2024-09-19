import React, { useEffect } from "react";
import { useState } from "react";
import { messages } from "../utils/loadingMessages";

// data method import
import { GET } from "../data/fetch";

// zustand store
import { useGameStore } from "../store/atomologyStore";

interface ElementData {
  atomicNumber: number;
  elementName: string;
  elementSymbol: string;
}

const dummyData = {
  atomicNumber: 1,
  elementName: "Hydrogen",
  elementSymbol: "H",
};

const randomLoadingMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default function Element({
  atomicNumber,
  elementName,
  elementSymbol,
}: ElementData) {
  const [elementData, setElementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // async GET api call
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GET();
        setElementData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // conditional rendering for loading and errors
  if (loading) return <p>{randomLoadingMessage()}</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="element">
      <h2>Element: {dummyData.elementName}</h2>
      <p>Symbol: {dummyData.elementSymbol}</p>
      <p>Atomic Number: {dummyData.atomicNumber}</p>
    </div>
  );
}
