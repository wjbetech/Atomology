import { useUIStore } from "../../store/atomologyStore";

export default function ThemeToggle() {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);
  const isLight = theme === "cupcake" || theme === "light";

  const onChange = (e) => {
    const checked = e.target.checked;
    setTheme(checked ? "cupcake" : "night");
  };

  const label = isLight ? "Light" : "Dark";

  const Sun = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v2m0 14v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z"
      />
    </svg>
  );

  const Moon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      />
    </svg>
  );

  return (
    <div className="flex items-center gap-2 text-xs md:text-sm">
      <span
        className={`flex items-center gap-2 text-xs md:text-sm ${
          isLight ? "text-yellow-500" : "text-gray-400"
        }`}
      >
        {isLight ? (
          <span className="text-yellow-500">{Sun}</span>
        ) : (
          <span className="text-gray-400">{Moon}</span>
        )}
        <span className="hidden sm:inline">{label}</span>
      </span>

      <input
        type="checkbox"
        checked={isLight}
        onChange={onChange}
        className={`toggle toggle-sm ${
          isLight ? "toggle-accent" : "toggle-neutral"
        }`}
        aria-label="Toggle theme"
      />
    </div>
  );
}
