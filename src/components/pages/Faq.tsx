import React from "react";
import Layout from "../layout/Layout";

// ...existing code...

type Props = {};

export default function Faq({}: Props) {
  return (
    <Layout>
      <div className="flex flex-col gap-y-10 w-full max-w-2xl mx-auto text-center px-4">
        <h1 className="text-2xl font-bold mb-10">FAQ</h1>

        <section className="items-start w-full max-w-xl flex flex-col gap-y-8 mx-auto">
          <div className="flex flex-col gap-y-4">
            <span className="t font-bold text-xl">How do I play the game?</span>
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
            <a
              href="/"
              className="flex flex-row items-center text-slate-700 hover:text-slate-900"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 12H18M6 12L11 7M6 12L11 17"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
