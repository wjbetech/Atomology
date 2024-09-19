import React from "react";
import { useState } from "react";
import { messages } from "../utils/loadingMessages";

interface ElementData {
  atomicNumber: number;
  name: string;
  symbol: string;
}

const dummyData = {
  atomicNumber: 1,
  name: "Hydrogen",
  symbol: "H"
};

const randomLoadingMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default function Element({ atomicNumber, name, symbol }: ElementData) {
  const [elementData, setElementData] = useState([]);
  const [element, setElement] = useState(dummyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (loading) return <p>{randomLoadingMessage()}</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="element">
      <h2>Element: ${dummyData.name}</h2>
      <p>Symbol: ${dummyData.symbol}</p>
      <p>Atomic Number: ${dummyData.atomicNumber}</p>
    </div>
  );
}

// https://kineticzephyr.onrender.com/periodictable
