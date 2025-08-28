import React from "react";
import BackButton from "./sub-components/BackButton";

type Props = {};

export default function FaqContent({}: Props) {
  return (
    <div
      className="w-3/4 lg:w-1/2 mx-auto px-6 flex flex-col items-center text-center my-auto py-12 sm:py-16 md:py-20"
      style={{ WebkitOverflowScrolling: "touch" as any }}
    >
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-8 text-center align-middle">
          <h3 className="text-center text-xl font-serif font-semibold mt-8 mb-10 underline decoration-2 underline-offset-4">
            FAQ
          </h3>
          <div className="flex-1 flex flex-col justify-center items-center text-center text-base md:text-lg gap-y-6">
            <div className="flex flex-col gap-y-4 max-w-[48rem] mx-auto">
              <span className="font-bold text-lg">How do I play the game?</span>
              <p>
                On the home, or main page, you can select either multiple choice
                or open answer methods to play Atomology.
              </p>
              <p>
                Multiple Choice will provide four possible answers for you to
                choose from, while Open Answer will allow you to freely type in
                what you think the element being shown to you is.
              </p>
            </div>

            <div className="flex flex-col gap-y-4 max-w-[48rem] mx-auto">
              <span className="font-bold text-lg">
                Are you planning on implementing x feature?
              </span>
              <p>
                I will happily look at any requests for features sent to
                wjbetech@gmail.com. My only caveat for now is that I want to
                maintain the <span className="italic">uncompetitiveness</span>{" "}
                of the game.
              </p>
            </div>
          </div>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
