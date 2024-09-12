import React from "react";
import { useState, useEffect } from "react";

interface ElementData {
  atomicNumber: string | number;
  name: string;
  symbol: string;
}

export default function Element({ atomicNumber, name, symbol }: ElementData) {
  const [element, setElement] = useState<ElementData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<false | null>(null);

  return <div>Element</div>;
}
