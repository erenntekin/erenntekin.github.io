"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Hero } from "@/components/home/Hero";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { getAllProjects } from "@/lib/projectData";

const projects = getAllProjects();

const WHEEL_THRESHOLD = 12;
const TOUCH_THRESHOLD = 40;
const LOCK_MS = 700;
const EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";

export default function Home() {
  const [page, setPage] = useState<0 | 1>(0);
  const pageRef = useRef(page);
  pageRef.current = page;
  const lockedRef = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const goTo = useCallback((next: 0 | 1) => {
    if (lockedRef.current || next === pageRef.current) return;
    lockedRef.current = true;
    setPage(next);
    window.setTimeout(() => {
      lockedRef.current = false;
    }, LOCK_MS);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    function onWheel(e: WheelEvent) {
      const current = pageRef.current;
      if (current === 0 && e.deltaY > 0) {
        e.preventDefault();
        if (e.deltaY > WHEEL_THRESHOLD) goTo(1);
      } else if (current === 1 && e.deltaY < 0) {
        e.preventDefault();
        if (e.deltaY < -WHEEL_THRESHOLD) goTo(0);
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      const delta = touchStartY.current - e.touches[0].clientY;
      const current = pageRef.current;
      if ((current === 0 && delta > 0) || (current === 1 && delta < 0)) {
        e.preventDefault();
      }
    }

    function onTouchEnd(e: TouchEvent) {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      const current = pageRef.current;
      if (current === 0 && delta > TOUCH_THRESHOLD) {
        goTo(1);
      } else if (current === 1 && delta < -TOUCH_THRESHOLD) {
        goTo(0);
      }
    }

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo]);

  return (
    <div className="flex flex-1 flex-col">
      <div ref={stageRef} className="relative h-[calc(100vh-72px)] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            opacity: page === 0 ? 1 : 0,
            transform: page === 0 ? "translateY(0) scale(1)" : "translateY(-80px) scale(0.92)",
            pointerEvents: page === 0 ? "auto" : "none",
            transition: `opacity 650ms ${EASE}, transform 650ms ${EASE}`,
          }}
        >
          <Hero onAdvance={() => goTo(1)} />
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            opacity: page === 1 ? 1 : 0,
            transform: page === 1 ? "translateY(0)" : "translateY(80px)",
            pointerEvents: page === 1 ? "auto" : "none",
            transition: `opacity 650ms ${EASE}, transform 650ms ${EASE}`,
          }}
        >
          <ProjectShowcase projects={projects} />
        </div>
      </div>
    </div>
  );
}
