import React from "react";

type Props = {};

export default function Faq({}: Props) {
  return (
    <div className="flex flex-col gap-y-10 width-[1000px]">
      <h1 className="text-xl font-bold">FAQ</h1>

      <section className="items-start w-[500px] text-left flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <span className="text-left font-bold text-xl">
            How do I play the game?
          </span>
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
          <span className="text-left font-bold text-xl">
            Are you planning on implementing x-feature?
          </span>
          <p>
            I will happily look at any requests for features sent to
            wjbetech@gmail.com. My only caveat for now is that I want to
            maintain the <span className="italic">uncompetitiveness</span> of
            the game.
          </p>
        </div>
      </section>
    </div>
  );
}
