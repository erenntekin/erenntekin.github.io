"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePlayWhenVisible } from "@/lib/usePlayWhenVisible";

interface BrowserMockupProps {
  src: string;
  alt: string;
  className?: string;
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

export function BrowserMockup({ src, alt, className }: BrowserMockupProps) {
  const isVideo = VIDEO_EXTENSIONS.test(src);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  usePlayWhenVisible(videoRef);
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

  const isGhostNet = alt.toLowerCase().includes("ghostnet") || src.toLowerCase().includes("ghostnet");
  const isGenAI = alt.toLowerCase().includes("genai") || src.toLowerCase().includes("genai");
  const isColdEye = alt.toLowerCase().includes("coldeye") || src.toLowerCase().includes("coldeye");
  const isMirage = alt.toLowerCase().includes("mirage") || src.toLowerCase().includes("mirage");
  const isLucid = alt.toLowerCase().includes("lucid") || src.toLowerCase().includes("lucid");

  const cleanUrl = isGhostNet
    ? "ghostnet.live"
    : isGenAI
    ? "genai-docs.app"
    : isColdEye
    ? "coldeye.local"
    : isMirage
    ? "mirage.security"
    : isLucid
    ? "lucid.firewall"
    : "app.internal";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`flex flex-col overflow-hidden rounded-xl border border-white/15 bg-[#10141d] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.9)] transition-all ${className ?? "h-full w-full max-w-full"}`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#151a26] px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center rounded-md border border-white/10 bg-black/40 px-3 py-0.5 font-mono text-[10px] text-zinc-300">
          <span className="max-w-[140px] truncate sm:max-w-[200px]">{cleanUrl}</span>
        </div>
        <div className="w-6" />
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#0a0d14] p-1 sm:p-1.5">
        {isVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            src={src}
            className="h-full w-full select-none object-cover object-center"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="h-full w-full select-none object-contain object-top"
          />
        )}
      </div>
    </motion.div>
  );
}
