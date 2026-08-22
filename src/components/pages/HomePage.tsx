import { Link } from "react-router-dom";

/**
 * Front door of the redesigned app. Intentionally minimal until the
 * Home page hero ticket lands; its job is routing people onward.
 */
export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 py-24 px-4 text-center">
      <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
        Atomology
      </h1>
      <p className="opacity-80 max-w-md">
        Learn the periodic table by playing. Every element has its own light.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link
          to="/instructions"
          className="btn btn-outline rounded-full px-8"
        >
          Instructions
        </Link>
        <Link
          to="/configure"
          className="btn btn-primary rounded-full px-8"
        >
          Play!
        </Link>
      </div>
    </div>
  );
}
