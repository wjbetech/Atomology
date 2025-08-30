import React from "react";
import { PeriodicTableHUD } from "./PeriodicTableHUD";
import { useGameStore, useUIStore } from "../../store/atomologyStore";

const HUDWrapper = (props) => {
  const showHUD = useUIStore((s) => s.showHUD);
  const setShowHUD = useUIStore((s) => s.setShowHUD);
  const guessedElements = useGameStore((state) => state.guessedElements);
  const gameStarted = useGameStore((state) => state.gameStarted);
  const gameMode = useGameStore((state) => state.gameMode);

  return (
    <>
      {gameStarted &&
        showHUD &&
        gameMode !== "hangman" &&
        (() => {
          const isDesktop =
            typeof window !== "undefined" &&
            typeof window.matchMedia === "function" &&
            window.matchMedia("(min-width: 640px)").matches;

          if (isDesktop) {
            return (
              <div
                style={{
                  position: "fixed",
                  top: "1rem",
                  left: "1rem",
                  zIndex: 1000,
                  transform: "scale(0.38)",
                  transformOrigin: "top left",
                }}
              >
                <PeriodicTableHUD
                  guessed={new Set(guessedElements)}
                  current={""}
                />
              </div>
            );
          }

          return (
            <div
              className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/50 overflow-x-hidden"
              onClick={() => setShowHUD(false)}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="bg-base-100 w-full max-w-[90vw] sm:max-w-sm mx-4 rounded-lg p-3 shadow-lg z-[4100]"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: "80vh" }}
              >
                <div
                  className="rounded-md border-2 border-white p-1 bg-base-100 max-w-full sm:max-w-sm mx-auto overflow-hidden box-border"
                  style={{ maxWidth: "min(420px, 90vw)" }}
                >
                  <div className="flex justify-end mb-2">
                    <button
                      type="button"
                      onClick={() => setShowHUD(false)}
                      className="btn btn-ghost btn-sm"
                      aria-label="Close HUD"
                    >
                      Close
                    </button>
                  </div>

                  <div className="max-h-[60vh] overflow-auto flex items-center justify-center">
                    <div
                      className="w-full flex justify-center"
                      style={{ boxSizing: "border-box" }}
                    >
                      <div className="w-full max-w-[420px] px-1">
                        <PeriodicTableHUD
                          guessed={new Set(guessedElements)}
                          current={""}
                          inModal
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
};

export default HUDWrapper;
