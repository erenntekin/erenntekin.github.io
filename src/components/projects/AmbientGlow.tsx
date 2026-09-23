"use client";

import { motion } from "framer-motion";

export function AmbientGlow() {
  return (
    <motion.div
      aria-hidden
      animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.45, 0.25] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] sm:h-[380px] sm:w-[380px]"
      style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 55%, transparent), transparent 70%)" }}
    />
  );
}
