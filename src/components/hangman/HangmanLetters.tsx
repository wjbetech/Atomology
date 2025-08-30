import React, { useEffect, useRef, useState } from "react";
import ConfettiSparks from "../sub-components/ConfettiSparks";

export default function HangmanLetters({
  display,
  celebrate = false,
}: {
  display: React.ReactNode;
  celebrate?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setAnchor({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }, [display]);

  return (
    <div
      ref={ref}
      className="relative flex flex-wrap justify-center min-h-[48px] px-6 sm:px-0"
    >
      {/* Confetti/celebration anchored to the letters container (portal) */}
      <ConfettiSparks trigger={celebrate} anchor={anchor} />
      {display}
    </div>
  );
}
