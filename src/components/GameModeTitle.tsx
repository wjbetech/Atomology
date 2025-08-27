import React from "react";
import AtomsIcon from "./AtomsIcon";

export default function GameModeTitle() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <AtomsIcon className="rotate w-16 h-16" />
      <h1 className="font-serif text-4xl">Atomology</h1>
    </div>
  );
}
