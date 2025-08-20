import React from "react";
import atoms from "../assets/atoms.svg";

export default function GameModeTitle() {
  return (
    <div className="flex flex-col items-center mb-4 md:mb-6 lg:mb-10">
      <img src={atoms} alt="atoms" className="rotate w-16 h-16" />
      <h1 className="font-serif text-4xl mb-2">Atomology</h1>
    </div>
  );
}
