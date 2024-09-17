import React from "react";
import { useState, useEffect } from "react";
import { messages } from "../utils/loadingMessages";
import { useQuery } from "react-query";

interface ElementData {
  atomicNumber: number;
  name: string;
  symbol: string;
}

const fetchData = async () => {
  const response = await fetch("https://kineticzephyr.onrender.com/periodictable");
  const data = await response.json();
  return data;
};

const randomLoadingMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default async function Element({ atomicNumber, name, symbol }: ElementData) {
  const [elementData, setElementData] = useState([]);
  const [element, setElement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data } = useQuery("elementsQuery", fetchData);

  console.log(data);

  if (loading) return <p>{randomLoadingMessage()}</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="element">
      <h2>Element: </h2>
      <p>Symbol: </p>
      <p>Atomic Number: </p>
    </div>
  );
}

// https://kineticzephyr.onrender.com/periodictable
