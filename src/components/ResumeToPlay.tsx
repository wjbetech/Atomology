import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGameStore } from "../store/atomologyStore";

/**
 * Refresh-resume: if a run is active but the browser reloaded onto another
 * route (e.g. "/"), send the player back into the game.
 */
export default function ResumeToPlay() {
  const gameStarted = useGameStore((s) => s.gameStarted);
  const gameMode = useGameStore((s) => s.gameMode);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const midRun = gameStarted && gameMode !== "";
    const offGame =
      location.pathname !== "/play" && location.pathname !== "/results";
    if (midRun && offGame) {
      navigate("/play", { replace: true });
    }
  }, [gameStarted, gameMode, location.pathname, navigate]);

  return null;
}
