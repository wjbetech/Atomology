import React from "react";
import canonicalElements from "../../data/elements";

interface PeriodicTableHUDProps {
  guessed: Set<string>;
  current: string;
  /** When true, render without absolute offsets so HUD fits in a modal */
  inModal?: boolean;
}

// Get max group and period for table size
type Element = (typeof canonicalElements)[0];
const elements: Element[] = canonicalElements as Element[];
const maxX = Math.max(
  ...elements.map((e) =>
    typeof e.xpos !== "undefined" ? e.xpos : e.group || 0
  )
);
const maxY = Math.max(
  ...elements.map((e) =>
    typeof e.ypos !== "undefined" ? e.ypos : e.period || 0
  )
);

export const PeriodicTableHUD: React.FC<PeriodicTableHUDProps> = ({
  guessed,
  current,
  inModal = false,
}) => {
  // Build a 2D array for the table
  const table: (Element | null)[][] = Array.from({ length: maxY }, () =>
    Array(maxX).fill(null)
  );

  elements.forEach((e) => {
    const x = typeof e.xpos !== "undefined" ? e.xpos : e.group;
    const y = typeof e.ypos !== "undefined" ? e.ypos : e.period;
    if (x && y) {
      table[y - 1][x - 1] = e;
    }
  });

  const containerStyle: React.CSSProperties = inModal
    ? {
        position: "relative",
        zIndex: 1000,
        margin: 0,
        display: "flex",
        justifyContent: "center",
      }
    : {
        position: "absolute",
        top: "-2rem",
        left: "-2rem",
        zIndex: 1000,
        margin: "1rem",
      };

  return (
    <div
      className={
        inModal
          ? "overflow-hidden w-full flex justify-center"
          : "overflow-x-auto"
      }
      style={containerStyle}
    >
      <table
        className="border-separate mx-auto table-fixed w-max"
        style={
          inModal
            ? {
                borderSpacing: "0px 4px",
                maxWidth: "420px",
                paddingTop: "10px",
                paddingBottom: "20px",
              }
            : undefined
        }
      >
        <tbody>
          {table.map((row, y) => (
            <tr key={y}>
              {row.map((el, x) => {
                if (el) {
                  // control exact cell size in modal with inline styles to avoid
                  // extra horizontal/vertical gaps. Use small pixel sizes so the
                  // table packs tightly.
                  const cellSize = inModal ? 15 : undefined; // px for small boxes
                  const boxClass = inModal
                    ? "rounded-sm border border-primary-content dark:border-primary block w-full h-full box-border"
                    : "w-8 h-8 md:w-10 md:h-10 rounded-sm border border-primary-content dark:border-primary flex items-center justify-center";
                  const bgClass = guessed.has(el.symbol)
                    ? "bg-green-400"
                    : "bg-transparent";
                  return (
                    <td
                      key={x}
                      className="text-center align-middle py-[0px] px-0"
                      style={
                        cellSize
                          ? {
                              width: cellSize,
                              minWidth: cellSize,
                              height: cellSize,
                            }
                          : undefined
                      }
                    >
                      <span
                        className={boxClass + " " + bgClass}
                        title={el.name}
                      />
                    </td>
                  );
                }

                // empty placeholder cell
                const emptySize = inModal ? 12 : undefined;
                return (
                  <td
                    key={x}
                    className="text-center align-middle py-[8px] px-2"
                    style={
                      emptySize
                        ? {
                            width: emptySize,
                            minWidth: emptySize,
                            height: emptySize,
                          }
                        : undefined
                    }
                  >
                    <span
                      className={
                        inModal
                          ? "block w-full h-full"
                          : "inline-block w-6 h-6 md:h-8 md:w-8"
                      }
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
