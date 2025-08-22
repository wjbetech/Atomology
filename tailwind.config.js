import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode for Tailwind
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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
