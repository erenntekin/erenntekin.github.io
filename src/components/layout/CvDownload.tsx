"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CvOption } from "@/data/cv";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { DownloadIcon } from "@/components/icons/DownloadIcon";

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
            className="absolute right-0 top-full mt-2 min-w-[220px] rounded-lg border border-border bg-surface p-1 shadow-xl"
          >
            {options.map((option) => (
              <div
                key={option.file}
                className="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-foreground"
              >
                <span>{option.label}</span>
                <div className="flex items-center gap-1">
                  <a
                    href={option.file}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Preview ${option.label} CV`}
                    className="rounded p-1 text-muted transition-colors hover:text-accent"
                    onClick={() => setOpen(false)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={option.file}
                    download
                    aria-label={`Download ${option.label} CV`}
                    className="rounded p-1 text-muted transition-colors hover:text-accent"
                    onClick={() => setOpen(false)}
                  >
                    <DownloadIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
