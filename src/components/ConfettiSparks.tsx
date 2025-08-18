import React from "react";
import { motion } from "framer-motion";

// Simple green sparks/confetti burst for celebration
export default function ConfettiSparks({ trigger }: { trigger: boolean }) {
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
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {sparks.map((_, i) => {
        const angle = (i / sparks.length) * 2 * Math.PI + Math.random() * 0.2;
        const radius = 90 + Math.random() * 30; // wider, more random
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const size = 2 + Math.random() * 2.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.7 }}
            animate={{
              opacity: [1, 1, 0],
              x,
              y,
              scale: [1, 1.2, 0.8],
              rotate: (angle * 180) / Math.PI + Math.random() * 60,
            }}
            transition={{ duration: 1.1, delay: 0.03 * i, ease: "easeOut" }}
            className={`rounded-full shadow-lg ${color}`}
            style={{ width: `${size * 6}px`, height: `${size * 6}px` }}
          />
        );
      })}
    </div>
  );
}
