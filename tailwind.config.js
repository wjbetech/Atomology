import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode for Tailwind
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Spectral Dark design language (DESIGN.md).
      // Inert until consumed by the application pass (#47): no component
      // references these tokens yet, so screens render exactly as before.
      colors: {
        void: "#060A12",
        bench: "#0D1522",
        slide: "#131E30",
        hairline: "#1F2C42",
        specimen: "#E9F1FA",
        annotation: "#8FA3BC",
        sodium: "#FFCB47",
        copper: "#35D99A",
        strontium: "#FF5470",
        argon: "#45C4FF",
        calcium: "#FF8A5C",
      },
      fontFamily: {
        display: ['"Michroma"', "sans-serif"],
        body: ['"Atkinson Hyperlegible"', "sans-serif"],
        data: ['"IBM Plex Mono"', "monospace"],
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
