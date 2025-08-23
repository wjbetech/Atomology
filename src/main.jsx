import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// set --vh to avoid viewport unit flicker on some mobile browsers
function setVh() {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
}
setVh();
window.addEventListener("resize", setVh);

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

// Startup sanity: remove stale persisted hangman or session data that reference
// an out-of-date elements pool (e.g. 119 entries). This avoids showing 1/119
// progress when the code now uses the canonical 118-element list.
try {
  const hp = sessionStorage.getItem("hangmanPool");
  if (hp) {
    try {
      const parsed = JSON.parse(hp);
      if (Array.isArray(parsed) && parsed.length > 118) {
        sessionStorage.removeItem("hangmanPool");
      }
    } catch {
      sessionStorage.removeItem("hangmanPool");
    }
  }
} catch (err) {}

try {
  const as = localStorage.getItem("atomology.session");
  if (as) {
    try {
      const parsed = JSON.parse(as);
      // if persisted elements array exists and is longer than canonical, clear session
      if (
        parsed &&
        Array.isArray(parsed.elements) &&
        parsed.elements.length > 118
      ) {
        localStorage.removeItem("atomology.session");
      }
    } catch {
      localStorage.removeItem("atomology.session");
    }
  }
} catch (err) {}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
