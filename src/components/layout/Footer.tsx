import React, { useEffect } from "react";
import { useUIStore } from "../../store/atomologyStore";
import ThemeToggle from "../sub-components/ThemeToggle";

export default function Footer() {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);

  // ensure document theme attribute is set on mount
  useEffect(() => {
    if (theme) setTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sound and HUD settings live on the Configure page; the footer keeps
  // only the site-wide theme switch.
  return (
    <footer
      className="fixed bottom-0 z-[3000] bg-bench/90 backdrop-blur w-full border-t border-hairline"
      aria-label="site footer"
      style={{ height: "var(--site-footer-height)" }}
    >
      <div className="max-w-screen mx-auto h-full flex items-center justify-end gap-4 pb-2 px-4">
        <ThemeToggle />
      </div>
    </footer>
  );
}
