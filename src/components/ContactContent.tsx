import React from "react";
import ContactForm from "./sub-components/ContactForm";

type Props = {};

export default function ContactContent({}: Props) {
  return (
    <div
      className="w-3/4 lg:w-1/2 mx-auto px-6 flex flex-col items-center text-center my-auto py-12 sm:py-16 md:py-20"
      style={{ WebkitOverflowScrolling: "touch" as any }}
    >
      <div className="w-full max-w-3xl">
        <ContactForm />
      </div>
    </div>
  );
}
