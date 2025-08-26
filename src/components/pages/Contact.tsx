import React from "react";
import Layout from "../layout/Layout";
import ContactForm from "../sub-components/ContactForm";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        <ContactForm />
      </div>

      <div className="mt-10 md:mt-14 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline rounded-full border-2 btn-sm gap-2 px-6 sm:px-8"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>
    </Layout>
  );
}
