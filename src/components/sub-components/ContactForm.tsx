import React from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";

export default function ContactForm() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <h3 className="text-center text-xl font-serif font-semibold mt-8 mb-10 underline decoration-2 underline-offset-4">
        Contact
      </h3>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-300 text-center md:text-left">
        I'm always open to collaboration opportunities, constructive feedback,
        bug reports, and suggestions for new game modes. Use the form below to
        get in touch — or email me directly!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <aside className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
          <div>
            <p className="mb-3 text-sm">
              <a href="mailto:wjbetech@gmail.com" className="link">
                wjbetech@gmail.com
              </a>
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a
                href="https://github.com/wjbetech"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.236 1.912 1.236 3.222 0 4.61-2.807 5.62-5.48 5.92.43.37.815 1.096.815 2.21 0 1.596-.015 2.884-.015 3.277 0 .32.216.694.825.576C20.565 21.796 24 17.298 24 12 24 5.37 18.63 0 12 0z" />
                </svg>
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.57 2.163-2.724-.949.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.722 0-4.928 2.206-4.928 4.928 0 .386.045.762.127 1.124C7.69 8.094 4.066 6.13 1.64 3.161c-.423.722-.666 1.561-.666 2.475 0 1.708.869 3.215 2.188 4.099-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.376 4.6 3.416-1.68 1.318-3.809 2.103-6.102 2.103-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.634.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.79-1.75-1.763s.784-1.763 1.75-1.763 1.75.79 1.75 1.763-.783 1.763-1.75 1.763zm13.5 10.268h-3v-4.5c0-1.085-.022-2.48-1.512-2.48-1.513 0-1.745 1.181-1.745 2.401v4.579h-3v-9h2.881v1.234h.041c.401-.76 1.379-1.562 2.84-1.562 3.037 0 3.6 2.002 3.6 4.604v5.724z" />
                </svg>
              </a>
            </div>
          </div>
        </aside>

        <section>
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const name = (form.elements.namedItem("name") as HTMLInputElement)
                .value;
              const email = (
                form.elements.namedItem("email") as HTMLInputElement
              ).value;
              const message = (
                form.elements.namedItem("message") as HTMLTextAreaElement
              ).value;
              const body = encodeURIComponent(
                `From: ${name} <${email}>\n\n${message}`
              );
              window.location.href = `mailto:wjbetech@gmail.com?subject=${encodeURIComponent(
                "Contact from atomology"
              )}&body=${body}`;
            }}
          >
            <label className="sr-only" htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Your name"
              className="input input-bordered w-full rounded-full"
              required
            />

            <label className="sr-only" htmlFor="email">
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full rounded-full"
              required
            />

            <label className="sr-only" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              className="textarea textarea-bordered w-full rounded-lg h-40"
              rows={6}
              required
            />

            <div className="mt-2">
              <button
                type="submit"
                className="btn btn-success rounded-full btn-sm w-full py-2 text-white dark:text-black"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
