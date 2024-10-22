import React from "react";

import arrow from "../assets/arrow-left.svg";

type Props = {};

export default function Faq({}: Props) {
  return (
    <div className="flex flex-col gap-y-10 width-[1000px] text-center justify-center items-center">
      <h1 className="text-2xl font-bold mb-10">FAQ</h1>

      <section className="items-start w-[500px] flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <span className="t font-bold text-xl">How do I play the game?</span>
          <p>
            On the home, or main page, you can select either multiple choice or
            open answer methods to play Atomology.
          </p>
          <p>
            Multiple Choice will provide four possible answers for you to choose
            from, while Open Answer will allow you to freely type in what you
            think the element being shown to you is.
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          <span className="font-bold text-xl">
            Are you planning on implementing{" "}
            <span className="italic">x feature?</span>
          </span>
          <p>
            I will happily look at any requests for features sent to
            wjbetech@gmail.com. My only caveat for now is that I want to
            maintain the <span className="italic">uncompetitiveness</span> of
            the game.
          </p>
        </div>
        <div className="flex justify-center m-auto">
          <a href="/" className="flex flex-row">
            <img className="" width={20} height={20} src={arrow}></img> Back
          </a>
        </div>
      </section>
    </div>
  );
}
