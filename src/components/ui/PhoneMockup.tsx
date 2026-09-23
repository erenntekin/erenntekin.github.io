"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  playbackRate?: number;
}

export function PhoneMockup({ src, alt, className, playbackRate }: PhoneMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = VIDEO_EXTENSIONS.test(src);

  useEffect(() => {
    if (videoRef.current && playbackRate) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate, src]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`h-full w-fit rounded-[1.25rem] border-4 border-border bg-black p-1 shadow-2xl shadow-black/50 ${className ?? ""}`}
    >
      <div className="relative h-full overflow-hidden rounded-[0.9rem]">
        <div className="absolute left-1/2 top-0 z-10 h-3 w-16 -translate-x-1/2 rounded-b-lg bg-black" />
        {isVideo ? (
          <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-auto select-none object-contain"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="h-full w-auto select-none object-contain"
          />
        )}
      </div>
    </motion.div>
  );
}
