import React from "react";
import ContactForm from "./sub-components/ContactForm";
import BackButton from "./sub-components/BackButton";

type Props = {};

export default function ContactContent({}: Props) {
  return (
    <div
      className="w-full lg:w-3/4 mx-auto px-6 flex flex-col items-center text-center my-auto py-12 sm:py-16 md:py-20"
      style={{ WebkitOverflowScrolling: "touch" as any }}
    >
      <div className="w-full max-w-3xl">
        <ContactForm />
        <div className="mt-8">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
