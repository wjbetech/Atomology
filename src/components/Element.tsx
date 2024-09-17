import React from "react";
import { useState, useEffect } from "react";
import { messages } from "../utils/loadingMessages";

interface ElementData {
  atomicNumber: number;
  name: string;
  symbol: string;
}

const randomLoadingMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default async function Element({ atomicNumber, name, symbol }: ElementData) {
  const [elementData, setElementData] = useState({});
  const [element, setElement] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://kineticzephyr.onrender.com/periodictable")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setElementData(data);
      });
  }, []);

  console.log(elementData);

  if (loading) return <p>{randomLoadingMessage()}</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="element">
      <h2>Element: {element?.name}</h2>
      <p>Symbol: {element?.symbol}</p>
      <p>Atomic Number: {element?.atomicNumber}</p>
    </div>
  );
}

// https://kineticzephyr.onrender.com/periodictable
