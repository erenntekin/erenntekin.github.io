"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealOnMountProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RevealOnMount({ children, delay = 0, className }: RevealOnMountProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
