import { useEffect, useRef } from "react";

/**
 * Modal focus behaviour shared by all dialogs:
 * - focuses the first focusable element on open
 * - Escape triggers `onEscape`
 * - Tab/Shift+Tab cycle within the dialog
 * - focus returns to the previously focused element on close
 */
export function useFocusTrap(
  dialogRef: React.RefObject<HTMLElement | null>,
  onEscape: () => void
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onEscape();
      }
      if (e.key === "Tab") {
        const nodes = focusable ? Array.from(focusable) : [];
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEscape]);
}
