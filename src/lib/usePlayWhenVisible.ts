"use client";

import { useEffect, type RefObject } from "react";

// Plays a looping preview video only while it is on screen. Off-screen previews kept decoding
// in the background and made the demo film further down the page stutter.
export function usePlayWhenVisible(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [ref]);
}
