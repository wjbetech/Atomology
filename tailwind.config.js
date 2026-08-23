import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode for Tailwind
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Spectral Dark design language (DESIGN.md). Values resolve through
      // CSS variables (index.css) so token classes theme automatically:
      // dark lab by default, Daylight Lab under [data-theme="cupcake"].
      colors: {
        void: "var(--at-void)",
        bench: "var(--at-bench)",
        slide: "var(--at-slide)",
        hairline: "var(--at-hairline)",
        specimen: "var(--at-specimen)",
        annotation: "var(--at-annotation)",
        sodium: "var(--at-sodium)",
        copper: "var(--at-copper)",
        strontium: "var(--at-strontium)",
        argon: "var(--at-argon)",
        calcium: "var(--at-calcium)",
      },
      fontFamily: {
        display: ['"Michroma"', "sans-serif"],
        body: ['"Atkinson Hyperlegible"', "sans-serif"],
        data: ['"IBM Plex Mono"', "monospace"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "22px",
        pill: "999px",
      },
      transitionTimingFunction: {
        squish: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["cupcake", "dark", "night", "winter"],
    base: true,
    styled: true,
    utils: true,
    // use the data-theme attribute on elements (e.g., <html data-theme="cupcake">)
    themeRoot: "[data-theme]",
  },
};
