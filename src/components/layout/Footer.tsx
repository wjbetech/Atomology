import React, { useEffect } from "react";
import { useUIStore, useGameStore } from "../../store/atomologyStore";
import ThemeToggle from "../ui/ThemeToggle";

type Props = {};

export default function Footer({}: Props) {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);
  const showHUD = useUIStore((s) => s.showHUD);
  const setShowHUD = useUIStore((s) => s.setShowHUD);
  const gameMode = useGameStore((s) => s.gameMode);

  // ensure document theme attribute is set on mount
  useEffect(() => {
    if (theme) setTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // (toggle handled by ThemeToggle component)

  return (
    <footer
      className="fixed left-0 right-0 bottom-0 z-[2000] bg-transparent"
      aria-label="site footer"
    >
      <div className="max-w-screen-xl mx-auto py-3 px-4 grid grid-cols-3 items-center">
        {/* Left: HUD toggle in multi/open */}
        <div className="flex items-center">
          {(gameMode === "multi" || gameMode === "open") && (
            <label
              htmlFor="footer-hud-toggle"
              className="flex items-center gap-2 text-xs cursor-pointer"
            >
              <input
                id="footer-hud-toggle"
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={showHUD}
                onChange={(e) => setShowHUD(e.target.checked)}
              />
              <span>Toggle Table HUD</span>
            </label>
          )}
        </div>

        {/* Center: @wjbetech */}
        <div className="flex items-center justify-center">
          <span className="font-medium">@wjbetech</span>
        </div>

        {/* Right: Theme toggle */}
        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
