import { useGameStore } from "../../store/atomologyStore";
import Score from "../sub-components/Score";
import ReturnToMainButton from "../sub-components/ReturnToMainButton";

export default function OpenAnswer() {
  const gameStarted = useGameStore((s) => s.gameStarted);
  const setGameStarted = useGameStore((s) => s.setGameStarted);
  if (!gameStarted) setGameStarted(true);
  return (
    <div className="flex flex-col min-h-screen flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-4">Open Answer Mode</h2>
        {/* Add open answer UI here */}
      </div>
      {/* fixed bottom bar for controls on open answer screen */}
      <div className="fixed left-0 right-0 bottom-4 z-40 flex justify-center">
        <div className="w-full max-w-xs mx-auto px-4 flex flex-col items-center gap-2">
          <Score />
          <ReturnToMainButton fixed={false} />
        </div>
      </div>
    </div>
  );
}
