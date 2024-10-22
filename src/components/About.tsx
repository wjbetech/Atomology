import React from "react";

import arrow from "../assets/arrow-left.svg";

type Props = {};

export default function About({}: Props) {
  return (
    <div className="flex flex-col gap-y-10 w-[500px] text-center text-lg place-self-center">
      <p>
        The idea for Atomology formed from a penchant for the game Wordle, and
        my participation in the Seoul Tech Impact Hackathon hosted in September
        of 2024.
      </p>
      <p>
        I wanted to create a game that would gently tease the players knowledge,
        without the burden of complexity or unnecessary competitiveness -
        something I think that Wordle also does brilliantly.
      </p>
      <p>
        I hope that players feel they can "drop in" to playing Atomology, give
        it a few rounds, get the dopamine hit they were craving, and then put it
        down or close it away without a sense of missing out, compulsion to
        continue, or over-disappointment if they happened to guess the element
        incorrectly.
      </p>
      <p>Have fun everyone!</p>
      <div className="flex justify-center">
        <a href="/" className="flex flex-row">
          <img className="" width={20} height={20} src={arrow}></img> Back
        </a>
      </div>
    </div>
  );
}
