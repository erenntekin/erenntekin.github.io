"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealOnMountProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  blur?: boolean;
}

export function RevealOnMount({ children, delay = 0, className, blur = false }: RevealOnMountProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, filter: blur ? "blur(6px)" : "blur(0px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: blur ? 0.7 : 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
