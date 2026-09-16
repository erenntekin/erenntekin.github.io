"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CvOption } from "@/data/cv";

export function CvDownload({ options }: { options: CvOption[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
        aria-expanded={open}
      >
        Resume
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 min-w-[180px] rounded-lg border border-border bg-surface p-1 shadow-xl"
          >
            {options.map((option) => (
              <a
                key={option.file}
                href={option.file}
                target="_blank"
                rel="noreferrer"
                className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface-hover hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {option.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
