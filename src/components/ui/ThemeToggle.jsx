import { useUIStore } from "../../store/atomologyStore";

export default function ThemeToggle() {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);
  const isLight = theme === "cupcake" || theme === "light";

  const onChange = (e) => {
    const checked = e.target.checked;
    setTheme(checked ? "cupcake" : "night");
  };

  return (
    <input
      type="checkbox"
      checked={isLight}
      onChange={onChange}
      className={`toggle toggle-sm ${
        isLight ? "toggle-accent" : "toggle-neutral"
      }`}
      aria-label="Toggle theme"
    />
  );
}
