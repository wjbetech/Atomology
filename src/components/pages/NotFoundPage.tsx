import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24 px-4 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="opacity-80 text-sm">
        That page isn&apos;t on the periodic table.
      </p>
      <Link to="/" className="btn btn-primary rounded-full px-8">
        Back home
      </Link>
    </div>
  );
}
