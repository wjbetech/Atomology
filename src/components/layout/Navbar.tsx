import { Link } from "react-router-dom";
import { useGameStore } from "../../store/atomologyStore";
import ThemeToggle from "../sub-components/ThemeToggle";
import {
  getElementsByDifficulty,
  asDifficultyLevel,
} from "../../utils/hangmanDifficulty";

function getLivesColor(lives: number, max: number) {
  const rem = Math.max(0, Math.min(max, Math.round(lives)));
  if (max === 6) {
    const palette = [
      "#ff1744",
      "#ff3d00",
      "#ff7043",
      "#ffcc33",
      "#ccff33",
      "#66ff66",
      "#00e676",
    ];
    return palette[rem] ?? palette[0];
  }
  if (max === 10) {
    const palette = [
      "#ff1744",
      "#ff4000",
      "#ff6f00",
      "#ff9d00",
      "#ffbf00",
      "#dbc60b",
      "#d4db0b",
      "#b7ff00",
      "#91ff00",
      "#51ff00",
      "#00ff0d",
    ];
    return palette[rem] ?? palette[0];
  }
  const percent = Math.max(0, Math.min(1, lives / max));
  const green = { r: 56, g: 230, b: 120 };
  const red = { r: 255, g: 90, b: 90 };
  const r = Math.round(green.r * percent + red.r * (1 - percent));
  const g = Math.round(green.g * percent + red.g * (1 - percent));
  const b = Math.round(green.b * percent + red.b * (1 - percent));
  return `rgb(${r},${g},${b})`;
}

// Single navbar for the whole app. It decides what to show based on game
// state: the in-game header while playing, site links otherwise.
export default function Navbar() {
  const gameMode = useGameStore((s) => s.gameMode);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const hangmanDifficulty = useGameStore((s) => s.hangmanDifficulty);
  const hangmanIndex = useGameStore((s) => s.hangmanIndex ?? 0);
  const hangmanIncorrect = useGameStore((s) => s.hangmanIncorrectGuesses);
  const hangmanMaxAttempts = useGameStore((s) => s.hangmanMaxAttempts);

  const prettyMode =
    gameMode === "multi"
      ? "Multiple Choice"
      : gameMode === "open"
      ? "Open Answer"
      : gameMode === "hangman"
      ? "Hangman"
      : "";

  const inActiveGame =
    gameStarted && ["multi", "open", "hangman"].includes(gameMode);

  let total = 0;
  try {
    if (gameMode === "hangman") {
      total = getElementsByDifficulty(
        asDifficultyLevel(hangmanDifficulty)
      ).length;
    }
  } catch {
    total = 0;
  }
  const current = total > 0 ? hangmanIndex + 1 : 0;

  if (inActiveGame && gameMode === "hangman") {
    return (
      <nav
        className="fixed inset-x-0 top-0 w-full flex items-center justify-between px-4 py-2"
        style={{
          height: "calc(var(--site-navbar-height) + 20px)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
          zIndex: 3000,
        }}
      >
        <div className="flex items-center pl-3">
          <div className="bg-transparent rounded-full text-lg md:text-xl font-semibold text-center">
            <div
              className={
                "text-base md:text-lg lg:text-xl uppercase tracking-wider hangman-level mt-1 " +
                "text-specimen/80"
              }
            >
              LEVEL:
            </div>
            <div className="font-bold text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
              {total > 0 ? `${current}/${total}` : "--/--"}
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center h-full flex items-center">
          <div className="font-serif font-semibold text-lg text-center hangman-title">
            {prettyMode}
          </div>
        </div>

        <div className="px-4">
          <div className="text-right text-lg md:text-xl font-semibold">
            <span
              className={
                "text-base md:text-lg lg:text-xl uppercase tracking-wider block mt-1 " +
                "text-specimen/80"
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

  if (inActiveGame) {
    return (
      <nav
        className="fixed inset-x-0 top-0 w-full z-[3000] flex items-center justify-between gap-4 p-4"
        style={{
          height: "var(--site-navbar-height)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
          zIndex: 3000,
        }}
      >
        <div className="px-4" />

        <div className="absolute left-1/2 transform -translate-x-1/2 h-full flex items-center">
          <div className="font-serif font-semibold text-lg">{prettyMode}</div>
        </div>

        <div className="px-4" />
      </nav>
    );
  }

  // default navbar with links
  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 w-full bg-bench/90 backdrop-blur z-[3000] flex items-center justify-between gap-4 p-4 border-b border-hairline"
        style={{
          height: "var(--site-navbar-height)",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
          zIndex: 3000,
        }}
      >
        <div className="px-4" />

        <div className="absolute left-1/2 transform -translate-x-1/2 h-full flex items-center">
          <div className="flex gap-4 text-sm">
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="h-full flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
