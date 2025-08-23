import { Link, useLocation } from "react-router-dom";
import { useGameStore, useUIStore } from "../../store/atomologyStore";
import { getElementsByDifficulty } from "../../utils/hangmanDifficulty";

type Props = {};

export default function Navbar({}: Props) {
  const location = useLocation();
  const gameMode = useGameStore((s) => s.gameMode);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const hangmanDifficulty = useGameStore((s) => s.hangmanDifficulty);
  const hangmanIndex = (useGameStore as any)(
    (s) => (s as any).hangmanIndex ?? 0
  );
  const hangmanIncorrect = useGameStore((s) => s.hangmanIncorrectGuesses);
  const hangmanMaxAttempts = useGameStore((s) => s.hangmanMaxAttempts);
  const theme = useUIStore((s) => s.theme);
  const isDark = theme === "dark" || theme === "night";

  // compute pool total and current for hangman
  let total = 0;
  try {
    if (hangmanDifficulty) {
      const pool = getElementsByDifficulty(hangmanDifficulty as any);
      total = pool.length;
    }
  } catch (err) {
    total = 0;
  }

  const current = total > 0 ? hangmanIndex + 1 : 0;

  // Color interpolation: green (#22c55e) to red (#ef4444)
  function getLivesColor(lives: number, max: number) {
    // If max is 6 (default), use a fixed bright palette for each remaining value
    const rem = Math.max(0, Math.min(max, Math.round(lives)));
    if (max === 6) {
      const palette = [
        "#ff1744", // 0 - very vivid red
        "#ff3d00", // 1
        "#ff7043", // 2
        "#ffcc33", // 3 - bright amber
        "#ccff33", // 4 - lime
        "#66ff66", // 5 - light green
        "#00e676", // 6 - vivid green
      ];
      return palette[rem] ?? palette[0];
    }

    // If max is 10, use an 11-step palette with red at low, orange mid, green high
    if (max === 10) {
      const palette = [
        "#ff1744", // 0 - red
        "#ff3d00", // 1
        "#ff7043", // 2
        "#ff8a33", // 3
        "#ffb347", // 4 - orange
        "#ffcc33", // 5 - amber
        "#ffdd55", // 6 - yellowish
        "#ccff33", // 7 - lime
        "#9cff3a", // 8 - greenish
        "#66ff66", // 9 - light green
        "#00e676", // 10 - vivid green
      ];
      return palette[rem] ?? palette[0];
    }

    // Fallback: brighter interpolation for non-standard max values
    const percent = Math.max(0, Math.min(1, lives / max));
    const green = { r: 56, g: 230, b: 120 };
    const red = { r: 255, g: 90, b: 90 };
    const r = Math.round(green.r * percent + red.r * (1 - percent));
    const g = Math.round(green.g * percent + red.g * (1 - percent));
    const b = Math.round(green.b * percent + red.b * (1 - percent));
    return `rgb(${r},${g},${b})`;
  }

  // If we're actively in hangman mode, show game header
  if (gameMode === "hangman" && gameStarted) {
    return (
      <nav
        className="p-4 flex fixed inset-x-0 w-full items-start justify-between bg-transparent"
        style={{
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        <div className="px-4">
          <div className="bg-transparent px-3 py-3 rounded-full text-lg md:text-xl font-semibold text-center">
            <div
              className={
                "text-base md:text-lg lg:text-xl uppercase tracking-wider hangman-level " +
                (isDark ? "text-gray-300" : "text-gray-800")
              }
            >
              LEVEL:
            </div>
            <div className="font-bold text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
              {total > 0 ? `${current}/${total}` : "--/--"}
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-lg text-center hangman-title">
          Hangman Mode
        </div>
        <div className="px-4">
          <div className="text-right text-lg md:text-xl font-semibold">
            <span
              className={
                "text-base md:text-lg lg:text-xl uppercase tracking-wider block " +
                (isDark ? "text-gray-300" : "text-gray-800")
              }
            >
              LIVES:
            </span>
            <span
              className="inline-block font-extrabold text-2xl md:text-4xl lg:text-5xl xl:text-6xl px-3"
              style={{
                color: getLivesColor(
                  Math.max(0, hangmanMaxAttempts - hangmanIncorrect),
                  hangmanMaxAttempts
                ),
                textShadow: "0 1px 0 rgba(0,0,0,0.25)",
              }}
            >
              {Math.max(0, hangmanMaxAttempts - hangmanIncorrect)}
            </span>
          </div>
        </div>
      </nav>
    );
  }

  // default navbar with links
  return (
    <>
      <nav
        className="p-6 flex fixed inset-x-0 w-full items-start justify-between gap-4 bg-transparent z-[2000]"
        style={{
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
          zIndex: 2000,
        }}
      >
        <div className="flex gap-4">
          {location.pathname !== "/" && <Link to="/">Main</Link>}
          {location.pathname !== "/about" && <Link to="/about">About</Link>}
          {location.pathname !== "/faq" && <Link to="/faq">FAQ</Link>}
        </div>
      </nav>
    </>
  );
}
