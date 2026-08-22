import { useGameStore } from "../store/atomologyStore";
import { useNavigate } from "react-router-dom";

/**
 * Recovery UI shown by the ErrorBoundary after a render crash.
 * Offers two manual exits: reset to the main menu, or full page reload.
 */
export default function ErrorFallback({
  onReset,
  onReloadPage = () => window.location.reload(),
}: {
  onReset: () => void;
  onReloadPage?: () => void;
}) {
  const returnToMain = useGameStore((s) => s.returnToMain);
  const navigate = useNavigate();

  const handleReturnToMain = () => {
    returnToMain();
    onReset();
    navigate("/");
  };

  return (
    <div
      role="alert"
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-base-100 text-base-content p-4"
    >
      <div className="max-w-md w-full rounded-lg border border-error/40 bg-base-200 p-6 text-center shadow-lg">
        <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
        <p className="mb-6 opacity-80">
          An unexpected error interrupted the game. Your progress may be lost.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            className="btn btn-primary rounded-full"
            onClick={handleReturnToMain}
          >
            Return to Main
          </button>
          <button
            type="button"
            className="btn btn-outline rounded-full"
            onClick={onReloadPage}
          >
            Reload page
          </button>
        </div>
      </div>
    </div>
  );
}
