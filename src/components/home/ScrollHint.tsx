"use client";

import { motion } from "framer-motion";

export function ScrollHint({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group mt-8 flex flex-col items-center gap-2 text-muted transition-colors hover:text-accent lg:mt-9 2xl:mt-10"
    >
      <span className="relative flex h-10 w-6 items-start justify-center rounded-full border-2 border-current pt-1.5 transition-shadow group-hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.35)] 2xl:h-11 2xl:w-7">
        <motion.span
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-1.5 w-1.5 rounded-full bg-accent"
        />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest 2xl:text-xs">Scroll</span>
    </motion.button>
  );
}
