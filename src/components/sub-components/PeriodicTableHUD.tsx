import React from "react";
import canonicalElements from "../../data/elements";

interface PeriodicTableHUDProps {
  guessed: Set<string>;
  current: string;
}

// Get max group and period for table size
type Element = (typeof canonicalElements)[0];
const elements: Element[] = canonicalElements as Element[];
const maxGroup = Math.max(...elements.map((e) => e.group || 0));
const maxPeriod = Math.max(...elements.map((e) => e.period || 0));

export const PeriodicTableHUD: React.FC<PeriodicTableHUDProps> = ({
  guessed,
  current,
}) => {
  // Build a 2D array for the table
  const table: (Element | null)[][] = Array.from({ length: maxPeriod }, () =>
    Array(maxGroup).fill(null)
  );
  elements.forEach((e) => {
    if (e.period && e.group) {
      table[e.period - 1][e.group - 1] = e;
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
