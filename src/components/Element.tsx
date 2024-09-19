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
        console.log(elementData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // conditional rendering for loading and errors
  if (loading) return <p className="mt-24">{randomLoadingMessage()}</p>;
  if (error) return <p className="mt-24">Error: {error}</p>;

  return (
    <div className="border-4 p-6 border-secondary w-[15%] place-self-center mt-24 rounded-md">
      <span>{dummyData.atomicNumber}</span>
      <h1 className="font-bold text-3xl">{dummyData.elementSymbol}</h1>
    </div>
  );
}
