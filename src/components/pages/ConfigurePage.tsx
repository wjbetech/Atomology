import { useNavigate } from "react-router-dom";
import GameModeButtons from "../GameModeButtons";

/**
 * Session setup. The full settings + mode-card design lands with the
 * Configure page ticket; meanwhile the mode starter keeps the game
 * reachable end-to-end.
 */
export default function ConfigurePage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 py-24 px-4 text-center">
      <h1 className="text-2xl md:text-4xl font-bold">Configure your session</h1>
      <p className="opacity-80 max-w-md text-sm">
        Full settings arrive with the Configure ticket — pick a mode to start
        playing now.
      </p>
      <GameModeButtons onStart={() => navigate("/play")} />
    </div>
  );
}
