import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["garden", "dim"],
    lightTheme: "garden",
    darkTheme: "dim",
    base: true,
    styled: true,
    utils: true,
    themeRoot: ":root"
  }
};
