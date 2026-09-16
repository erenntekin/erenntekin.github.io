"use client";

import { useEffect, useState } from "react";

const GLYPHS = "01#%$&_+=*<>?/\\{}[]";

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

interface GlitchTextProps {
  text: string;
  className?: string;
  durationMs?: number;
}

export function GlitchText({ text, className, durationMs = 700 }: GlitchTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setDisplay(text);
      return;
    }

    const totalFrames = 18;
    const tickMs = durationMs / totalFrames;
    let frame = 0;

    const id = setInterval(() => {
      frame++;
      const lockedCount = Math.floor((frame / totalFrames) * text.length);

      setDisplay(
        text
          .split("")
          .map((char, i) => (char === " " || i < lockedCount ? char : randomGlyph()))
          .join("")
      );

      if (frame >= totalFrames) {
        clearInterval(id);
        setDisplay(text);
      }
    }, tickMs);

    return () => clearInterval(id);
  }, [text, durationMs]);

  return <span className={className}>{display}</span>;
}
