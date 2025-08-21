import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUIStore } from "../../store/atomologyStore";

type Props = {};

export default function Footer({}: Props) {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);

  // ensure document theme attribute is set on mount
  useEffect(() => {
    if (theme) setTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Deterministically set theme from the checkbox checked state so
  // we always write daisyUI tokens ('cupcake' for light, 'night' for dark).
  const onToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setTheme(checked ? "cupcake" : "night");
  };

  const isLight = theme === "cupcake" || theme === "light";
  const themeLabel =
    theme === "night" ? "Dark" : theme === "cupcake" ? "Light" : theme;
  const icon = theme === "night" ? "🌙" : "☀️";

  return (
    <div className="pb-6 flex flex-row gap-10 justify-center relative">
      <Link to="https://github.com/wjbetech">@wjbetech</Link>

      {/* Theme toggle positioned bottom-right of footer */}
      <div className="absolute right-2 bottom-2">
        <label className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {icon} {themeLabel}
          </span>
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={isLight}
            onChange={onToggleChange}
            aria-label="Toggle theme"
          />
        </label>
      </div>
    </div>
  );
}
