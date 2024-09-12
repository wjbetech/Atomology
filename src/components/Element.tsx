import React from "react";
import { useState, useEffect } from "react";

interface ElementData {
  atomicNumber: string | number;
  name: string;
  symbol: string;
}

const dummyElement: ElementData = {
  atomicNumber: "12",
  name: "Carbon",
  symbol: "C"
};

export default function Element({ atomicNumber, name, symbol }: ElementData) {
  const [element, setElement] = useState<ElementData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<false | null>(null);

  return (
    <div className="">
      {loading && <div>Loading...</div>}
      {error && <div>Error occurred: {error}</div>}
      {dummyElement && (
        <div className="border-2 border-accent h-[200px] place-items-center text-center align-middle justify-center w-[200px] m-auto flex flex-col rounded-sm">
          <h1 className="text-5xl">{dummyElement.atomicNumber}</h1>
        </div>
      )}
    </div>
  );
}
