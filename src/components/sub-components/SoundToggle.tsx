import React from "react";
import { useUIStore } from "../../store/atomologyStore";

export default function SoundToggle() {
  const soundEnabled = useUIStore((s) => s.soundEnabled);
  const setSoundEnabled = useUIStore((s) => s.setSoundEnabled);

  return (
    <label
      htmlFor="footer-sound-toggle"
      className="flex items-center gap-2 text-xs cursor-pointer"
    >
      <input
        id="footer-sound-toggle"
        type="checkbox"
        className="toggle toggle-primary toggle-sm"
        checked={soundEnabled}
        onChange={(e) => setSoundEnabled(e.target.checked)}
      />
      <span>Sound</span>
    </label>
  );
}
