import React from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

// Simple green sparks/confetti burst for celebration
export default function ConfettiSparks({
  trigger,
  anchor,
}: {
  trigger: boolean;
  // anchor in viewport coordinates to position fixed portal
  anchor?: { x: number; y: number } | null;
}) {
  if (!trigger) return null;
  // 18 sparks, random directions, random color/size
  const colors = [
    "bg-green-400",
    "bg-green-500",
    "bg-lime-400",
    "bg-emerald-400",
    "bg-green-300",
    "bg-lime-300",
  ];
  const sparks = Array.from({ length: 18 });
  // Randomly choose direction: 1 (clockwise) or -1 (counterclockwise)
  const direction = Math.random() < 0.5 ? 1 : -1;

  const confetti = (
    <div
      className="pointer-events-none"
      style={{
        position: anchor ? "fixed" : "absolute",
        left: anchor ? `${anchor.x}px` : "50%",
        top: anchor ? `${anchor.y}px` : "50%",
        transform: anchor ? "translate(-50%,-50%)" : "translate(-50%,-50%)",
        zIndex: 9999,
        width: 0,
        height: 0,
        overflow: "visible",
      }}
    >
      {sparks.map((_, i) => {
        // Multiply angle by direction for clockwise/counterclockwise
        const angle =
          direction * ((i / sparks.length) * 2 * Math.PI + Math.random() * 0.2);
        const radius = 140 + Math.random() * 40;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const size = 2 + Math.random() * 2.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        // Randomize initial position within a small circle (0-24px from center)
        const initialRadius = Math.random() * 24;
        const initialAngle = angle + (Math.random() - 0.5) * 0.5; // small random offset
        const initialX = Math.cos(initialAngle) * initialRadius;
        const initialY = Math.sin(initialAngle) * initialRadius;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: initialX, y: initialY, scale: 0.7 }}
            animate={{
              opacity: [1, 1, 0],
              x,
              y,
              scale: [1, 1.2, 0.8],
              rotate: (angle * 180) / Math.PI + Math.random() * 60,
            }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className={`rounded-full shadow-lg ${color}`}
            style={{
              width: `${size * 6}px`,
              height: `${size * 6}px`,
              willChange: "transform, opacity",
              position: "absolute",
              left: 0,
              top: 0,
            }}
          />
        );
      })}
    </div>
  );

  // If document exists and anchor provided, port to body so it's not clipped
  if (typeof document !== "undefined") {
    return createPortal(confetti, document.body);
  }
  return confetti;
}
