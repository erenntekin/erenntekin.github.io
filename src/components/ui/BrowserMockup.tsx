"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface BrowserMockupProps {
  src: string;
  alt: string;
  className?: string;
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

export function BrowserMockup({ src, alt, className }: BrowserMockupProps) {
  const isVideo = VIDEO_EXTENSIONS.test(src);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const cleanUrl = alt.toLowerCase().includes("ghostnet")
    ? "ghostnet.live"
    : alt.toLowerCase().includes("genai")
    ? "genai-docs.app"
    : alt.toLowerCase().includes("coldeye")
    ? "coldeye.local"
    : "app.internal";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`flex h-full w-full max-w-full flex-col overflow-hidden rounded-xl border border-border/80 bg-surface shadow-2xl shadow-black/60 transition-all ${className ?? ""}`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-border/70 bg-surface/90 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-amber-500/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
        </div>
        <div className="flex items-center rounded-md border border-white/5 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] text-muted/80">
          <span className="max-w-[130px] truncate sm:max-w-[180px]">{cleanUrl}</span>
        </div>
        <div className="w-6" />
      </div>
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          src={src}
          className="w-full flex-1 select-none object-cover object-top"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="w-full flex-1 select-none object-cover object-top"
        />
      )}
    </motion.div>
  );
}
