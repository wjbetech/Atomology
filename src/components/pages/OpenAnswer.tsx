import { useGameStore } from "../../store/atomologyStore";
import Score from "../sub-components/Score";

export default function OpenAnswer() {
  const gameStarted = useGameStore((s) => s.gameStarted);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  if (!gameStarted) setGameStarted(true);
  return (
    <div className="flex flex-col min-h-full flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-4">Open Answer Mode</h2>
        {/* Add open answer UI here */}
      </div>
      <div className="w-full max-w-xs mx-auto pb-4">
        <Score />
      </div>
    </div>
  );
}
