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

// Inject JSON-LD structured data at runtime to avoid accidental rendering
// of the block in some HTML pipelines. Keep this minimal and synchronous so
// crawlers see it quickly.
try {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Atomology",
    url: "/",
  };

  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.text = JSON.stringify(ld);
  document.head.appendChild(s);
} catch (e) {
  // non-fatal — don't block app startup if head manipulation fails
  // (some strict CSP or environments may throw).
  // Only log in obvious dev contexts (localhost) to avoid noisy output in
  // production-like environments where `process` may be undefined.
  try {
    const isLocal =
      typeof location !== "undefined" &&
      /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    if (isLocal && typeof console !== "undefined") {
      console.warn("Failed to inject JSON-LD structured data", e);
    }
  } catch {
    // swallow — logging shouldn't throw
  }
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
