"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  useMotionValueEvent,
  animate,
  type MotionValue,
} from "framer-motion";
import type { Project } from "@/data/projects";
import { ProjectCarouselCard } from "@/components/projects/ProjectCarouselCard";

const SIZE_TIERS = {
  mobile: { cardWidth: 260, radius: 300, containerHeight: 460, sceneScale: 0.85 },
  desktop: { cardWidth: 520, radius: 560, containerHeight: 540, sceneScale: 0.9 },
  large: { cardWidth: 660, radius: 700, containerHeight: 620, sceneScale: 0.92 },
} as const;
type SizeTier = keyof typeof SIZE_TIERS;
const TILT_DEG = -16;
const PERSPECTIVE = 1400;
const IDLE_SPEED = 8; // deg/s, only while nothing is hovered
const HOLD_MS = 2500; // how long a clicked project stays centered before drifting again
const SPAWN_MS = 450; // fixed materialize/dematerialize duration, independent of rotation speed

function useSizeTier(): SizeTier {
  const [tier, setTier] = useState<SizeTier>("desktop");
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const largeQuery = window.matchMedia("(min-width: 1536px)");
    const update = () => {
      setTier(mobileQuery.matches ? "mobile" : largeQuery.matches ? "large" : "desktop");
    };
    update();
    mobileQuery.addEventListener("change", update);
    largeQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      largeQuery.removeEventListener("change", update);
    };
  }, []);
  return tier;
}

function nearestIndex(rotation: number, anglePer: number, count: number) {
  const raw = Math.round(rotation / anglePer) % count;
  return raw < 0 ? raw + count : raw;
}

export function ProjectCarousel3D({ projects }: { projects: Project[] }) {
  const tier = useSizeTier();
  const { cardWidth, radius, containerHeight, sceneScale } = SIZE_TIERS[tier];
  const rotation = useMotionValue(0);
  const anglePer = 360 / projects.length;
  const centering = useRef(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [frontIndex, setFrontIndex] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  useMotionValueEvent(rotation, "change", (r) => {
    const idx = nearestIndex(r, anglePer, projects.length);
    setFrontIndex((prev) => (prev === idx ? prev : idx));
  });

  useAnimationFrame((_, delta) => {
    if (reducedMotion || centering.current) return;
    rotation.set(rotation.get() + IDLE_SPEED * (delta / 1000));
  });

  function centerOn(targetAngle: number) {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    const current = rotation.get();
    const target = targetAngle + Math.round((current - targetAngle) / 360) * 360;
    centering.current = true;
    const travelMs = 500;
    animate(rotation, target, { type: "tween", duration: travelMs / 1000, ease: "easeInOut" });
    resumeTimeout.current = setTimeout(() => {
      centering.current = false;
    }, travelMs + HOLD_MS);
  }

  function goTo(steps: number) {
    const nearest = Math.round(rotation.get() / anglePer) * anglePer;
    centerOn(nearest + steps * anglePer);
  }

  return (
    <div className="relative mx-auto flex w-full max-w-5xl items-center gap-1 px-4 sm:gap-2 2xl:max-w-7xl">
      <button
        type="button"
        onClick={() => goTo(-1)}
        aria-label="Previous project"
        className="-translate-y-6 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent transition-colors hover:bg-accent/10"
      >
        ←
      </button>

      <div
        style={{ height: containerHeight, perspective: PERSPECTIVE, transform: `scale(${sceneScale})` }}
        className="relative flex-1"
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${TILT_DEG}deg) translateZ(-${radius}px)`,
          }}
        >
          {projects.map((project, i) => (
            <CarouselItem
              key={project.slug}
              project={project}
              angle={i * anglePer}
              rotation={rotation}
              cardWidth={cardWidth}
              radius={radius}
              tier={tier}
              isFront={i === frontIndex}
              onSelect={() => centerOn(i * anglePer)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => goTo(1)}
        aria-label="Next project"
        className="-translate-y-6 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent transition-colors hover:bg-accent/10"
      >
        →
      </button>
    </div>
  );
}

function CarouselItem({
  project,
  angle,
  rotation,
  cardWidth,
  radius,
  tier,
  isFront,
  onSelect,
}: {
  project: Project;
  angle: number;
  rotation: MotionValue<number>;
  cardWidth: number;
  radius: number;
  tier: SizeTier;
  isFront: boolean;
  onSelect: () => void;
}) {
  const transform = useTransform(rotation, (r) => {
    const diff = normalizeAngle(angle - r);
    const scale = 1 - Math.min(Math.abs(diff) / 180, 1) * 0.4;
    return `translate(-50%, -50%) rotateY(${diff}deg) translateZ(${radius}px) scale(${scale})`;
  });
  const zIndex = useTransform(rotation, (r) => {
    const diff = normalizeAngle(angle - r);
    return Math.round((1 - Math.abs(diff) / 180) * 100);
  });

  return (
    <motion.div
      style={{ transform, zIndex, width: cardWidth }}
      className="absolute left-0 top-0"
    >
      <motion.button
        type="button"
        onClick={onSelect}
        aria-label={`Show ${project.title}`}
        animate={{ opacity: isFront ? 0 : 1, scale: isFront ? 0.5 : 1 }}
        transition={{ duration: SPAWN_MS / 1000, ease: "easeInOut" }}
        style={{ pointerEvents: isFront ? "none" : "auto" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      >
        <span className="block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_16px_4px_rgba(34,211,238,0.5)]" />
      </motion.button>
      <motion.div
        animate={{ opacity: isFront ? 1 : 0 }}
        transition={{ duration: SPAWN_MS / 1000, ease: "easeInOut" }}
        style={{ pointerEvents: isFront ? "auto" : "none" }}
      >
        <ProjectCarouselCard project={project} size={tier} onSelect={onSelect} />
      </motion.div>
    </motion.div>
  );
}

function normalizeAngle(deg: number) {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}
