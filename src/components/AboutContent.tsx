import React from "react";
import { Link } from "react-router-dom";
import BackButton from "./sub-components/BackButton";

export default function AboutContent() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 my-auto py-16 flex flex-col items-center text-center">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-annotation mb-3">
        About — Atomology
      </p>
      <h1 className="font-display text-specimen text-3xl md:text-4xl tracking-wide mb-10">
        ABOUT
      </h1>

      <div className="flex flex-col gap-y-6 text-base md:text-lg text-specimen/90 leading-relaxed max-w-prose">
        <p>
          The idea for Atomology formed from a penchant for the game Wordle, and my participation in the Seoul Tech
          Impact Hackathon hosted in September of 2024.
        </p>
        <p>
          I wanted to create a game that would gently tease the players knowledge, without the burden of complexity or
          unnecessary competitiveness - something I think that Wordle also does brilliantly.
        </p>
        <p>
          I hope that players feel they can &ldquo;drop in&rdquo; to playing Atomology, give it a few rounds, get the
          dopamine hit they were craving, and then put it down or close it away without a sense of missing out,
          compulsion to continue, or over-disappointment if they happened to guess the element incorrectly.
        </p>
        <p>Have fun everyone!</p>
      </div>

      <div aria-hidden className="flex justify-center gap-2 my-12 self-stretch">
        <span className="h-0.5 w-10 rounded-full bg-sodium/70" />
        <span className="h-0.5 w-4 rounded-full bg-copper/70" />
        <span className="h-0.5 w-16 rounded-full bg-argon/70" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/configure"
          className="inline-flex items-center justify-center rounded-pill px-12 min-h-12 leading-none font-semibold text-lg bg-sodium text-[#1C1917] hover:brightness-110 active:brightness-95 active:scale-[0.98] transition-all"
        >
          Play!
        </Link>
        <Link
          to="/instructions"
          className="inline-flex items-center justify-center rounded-pill px-10 min-h-12 leading-none border border-argon/60 text-argon hover:bg-argon/10 hover:border-argon active:scale-[0.98] transition-all"
        >
          Instructions
        </Link>
      </div>

      <BackButton />
    </div>
  );
}
