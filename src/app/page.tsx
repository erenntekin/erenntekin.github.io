"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/home/Hero";

const WHEEL_THRESHOLD = 15;
const TOUCH_THRESHOLD = 40;

export default function Home() {
  const router = useRouter();
  const navigatedRef = useRef(false);

  const navigateToProjects = () => {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    router.push("/projects");
  };

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (e.deltaY > WHEEL_THRESHOLD) {
        navigateToProjects();
      }
    }

    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (delta > TOUCH_THRESHOLD) {
        navigateToProjects();
      }
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[calc(100vh-140px)]">
      <Hero onAdvance={navigateToProjects} />
    </div>
  );
}
