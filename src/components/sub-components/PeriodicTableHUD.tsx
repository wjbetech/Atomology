import React from "react";
import canonicalElements from "../../data/elements";

interface PeriodicTableHUDProps {
  guessed: Set<string>;
  current: string;
}

// Get max group and period for table size
type Element = (typeof canonicalElements)[0];
const elements: Element[] = canonicalElements as Element[];
// Prefer explicit xpos/ypos (present in the data) for layout so lanthanides
// and actinides don't collide in the main period/group cells. Fall back to
// group/period when xpos/ypos are missing.
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

  return (
    <div
      className="overflow-x-auto"
      style={{
        position: "absolute",
        top: "-2rem",
        left: "-2rem",
        zIndex: 1000,
        margin: "1rem",
      }}
    >
      <table className="border-separate border-spacing-1 mx-auto">
        <tbody>
          {table.map((row, y) => (
            <tr key={y}>
              {row.map((el, x) => (
                <td key={x} className="w-8 h-8 text-center align-middle">
                  {el ? (
                    <span
                      className={
                        `w-8 h-8 rounded border border-primary-content dark:border-primary flex items-center justify-center ` +
                        (guessed.has(el.symbol)
                          ? "bg-green-400"
                          : "bg-transparent")
                      }
                      title={el.name}
                    >
                      {/* Empty box, white outline only or filled if guessed */}
                    </span>
                  ) : (
                    <span className="inline-block w-8 h-8" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
