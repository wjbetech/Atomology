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
function safeStorageCheck({ storage, key, validator }) {
  try {
    const raw = storage.getItem(key);
    if (!raw) return;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // corrupted JSON — remove it
      try {
        storage.removeItem(key);
      } catch (removeErr) {
        // If removal fails, log a warning so developers can inspect
        // (browsers can throw on storage access in restricted contexts)
        console.warn(
          `Failed to remove corrupted storage key: ${key}`,
          removeErr
        );
      }
      return;
    }

    try {
      if (validator(parsed)) {
        storage.removeItem(key);
      }
    } catch (err) {
      // any error during validation/removal should be surfaced in dev logs
      console.warn(`Storage validation failed for key: ${key}`, err);
    }
  } catch (err) {
    // Accessing storage itself may throw (e.g. in some private modes or strict
    // environments). Log at debug level and continue.
    console.warn(`Unable to access storage for key: ${key}`, err);
  }
}

safeStorageCheck({
  storage: sessionStorage,
  key: "hangmanPool",
  validator: (parsed) => Array.isArray(parsed) && parsed.length > 118,
});

safeStorageCheck({
  storage: localStorage,
  key: "atomology.session",
  validator: (parsed) =>
    parsed && Array.isArray(parsed.elements) && parsed.elements.length > 118,
});

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
