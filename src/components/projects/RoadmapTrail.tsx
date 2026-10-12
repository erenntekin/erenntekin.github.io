"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";

const ACCENT = "#f0d999";
const AMBER = "#fbbf24";
const LINE = "#333a46";

// Relative heights of the waypoints, from the sketch: down, up, peak, then the flag
const RELIEF: Record<number, number[]> = {
  1: [0.5],
  2: [0.7, 0.3],
  3: [0.55, 0.85, 0.25],
  4: [0.42, 0.85, 0.18, 0.6],
  5: [0.42, 0.85, 0.58, 0.15, 0.62],
};

interface Waypoint {
  label: string;
  status: string;
  deliverable: string;
  goal?: string;
  impact?: { label: string; value: string; from?: string }[];
}

function waypointsOf(project: Project): Waypoint[] {
  const detail = project.roadmapDetail ?? [];
  const current: Waypoint = {
    label: "Current V1",
    status: project.status === "ongoing" ? "In progress" : "Shipped",
    deliverable: project.summary,
    ...detail[0],
  };
  return [
    current,
    ...(project.roadmap ?? []).map((item, i) => ({
      label: `Phase ${String(i + 1).padStart(2, "0")}`,
      status: "Planned",
      deliverable: item,
      ...detail[i + 1],
    })),
  ];
}

function relief(count: number) {
  return RELIEF[count] ?? Array.from({ length: count }, (_, i) => (i % 2 === 0 ? 0.35 : 0.75));
}

function Flag({ x, y }: { x: number; y: number }) {
  return (
    <g aria-hidden="true">
      <line x1={x} y1={y} x2={x} y2={y - 46} stroke={ACCENT} strokeWidth="1.5" />
      <path d={`M ${x} ${y - 46} L ${x - 26} ${y - 38} L ${x} ${y - 30} Z`} fill={ACCENT} fillOpacity="0.9" />
      <path d={`M ${x - 9} ${y - 41} L ${x - 17} ${y - 38}`} stroke="#090b0e" strokeOpacity="0.5" strokeWidth="1" />
    </g>
  );
}

function Trail({
  points,
  waypoints,
  active,
  onSelect,
  animate,
  vertical,
}: {
  points: [number, number][];
  waypoints: Waypoint[];
  active: number;
  onSelect: (i: number) => void;
  animate: boolean;
  vertical: boolean;
}) {
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const last = points.length - 1;
  const width = vertical ? 300 : 800;
  const height = vertical ? points.length * 120 + 40 : 220;

  const onKey = (i: number) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(i);
    }
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full overflow-visible" role="group" aria-label="Roadmap trail">
      <path d={path} fill="none" stroke={LINE} strokeWidth="2" />
      <path d={path} fill="none" stroke={ACCENT} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 8" />
      {animate &&
        [0, 1.4, 2.8].map((delay) => (
          <circle key={delay} r="3" fill={ACCENT}>
            <animateMotion dur="4.2s" begin={`${delay}s`} repeatCount="indefinite" path={path} />
            <animate attributeName="opacity" values="0;1;1;0" dur="4.2s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}

      <Flag x={points[last][0] + (vertical ? 0 : 0)} y={points[last][1] - 14} />

      {points.map(([x, y], i) => {
        const wp = waypoints[i];
        const on = i === active;
        const current = i === 0;
        const final = i === last;
        const r = final ? 14 : current ? 12 : 10;
        // labels sit on the open side of the trail: above low points, below high ones
        const below = vertical ? false : y < height * 0.5;
        const lx = vertical ? (x > width / 2 ? x - 26 : x + 26) : x;
        const ly = vertical ? y + 4 : below ? y + r + 22 : y - r - (final ? 52 : 14);
        const anchor = vertical ? (x > width / 2 ? "end" : "start") : "middle";
        return (
          <g
            key={wp.label}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${wp.label}: ${wp.deliverable}`}
            onClick={() => onSelect(i)}
            onMouseEnter={() => onSelect(i)}
            onFocus={() => onSelect(i)}
            onKeyDown={onKey(i)}
            className="cursor-pointer outline-none"
          >
            <circle cx={x} cy={y} r={r + 14} fill="transparent" />
            {current && animate && (
              <circle cx={x} cy={y} r={r} fill="none" stroke={ACCENT} strokeOpacity="0.6">
                <animate attributeName="r" values={`${r};${r + 14}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.6;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <motion.circle
              cx={x}
              cy={y}
              r={r}
              initial={false}
              animate={{
                fill: current ? ACCENT : "#090b0e",
                stroke: on ? AMBER : ACCENT,
                strokeWidth: on ? 3 : 2,
              }}
              style={{ filter: on || current ? `drop-shadow(0 0 8px ${ACCENT})` : undefined }}
            />
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              className="font-mono"
              fontSize={vertical ? 12 : 12}
              letterSpacing="1.5"
              fill={on ? AMBER : ACCENT}
            >
              {wp.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function RoadmapTrail({ project }: { project: Project }) {
  const waypoints = waypointsOf(project);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  if (waypoints.length < 2) return null;

  const heights = relief(waypoints.length);
  const n = waypoints.length;
  const horizontal: [number, number][] = heights.map((h, i) => [70 + (i * 660) / (n - 1), 16 + h * 170]);
  const vertical: [number, number][] = heights.map((h, i) => [60 + h * 180, 50 + i * 120]);
  const wp = waypoints[active];

  return (
    <div className="mt-8">
      <div className="hidden sm:block">
        <Trail points={horizontal} waypoints={waypoints} active={active} onSelect={setActive} animate={!reduced} vertical={false} />
      </div>
      <div className="mx-auto max-w-[340px] sm:hidden">
        <Trail points={vertical} waypoints={waypoints} active={active} onSelect={setActive} animate={!reduced} vertical />
      </div>

      <div className="mt-6 border-l-2 border-amber-400/70 pl-5" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: 6 }}
            transition={{ duration: 0.25 }}
          >
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] tracking-widest uppercase">
              <span className="text-amber-300">{wp.label}</span>
              <span className="text-muted">{wp.status}</span>
              <span className="text-muted/60">
                {active + 1} / {n}
              </span>
            </p>
            <p className="mt-2 max-w-2xl font-serif text-xl leading-snug text-foreground sm:text-2xl">{wp.deliverable}</p>
            {wp.goal && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70">{wp.goal}</p>}
            {wp.impact && wp.impact.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {wp.impact.map((item) => (
                  <div key={item.label}>
                    <p className="font-mono text-[10px] tracking-widest text-muted uppercase">{item.label}</p>
                    <p className="mt-1 font-mono text-sm">
                      {item.from && (
                        <>
                          <span className="text-muted line-through decoration-muted/50">{item.from}</span>
                          <span className="px-2 text-amber-400">→</span>
                        </>
                      )}
                      <span className={item.from ? "text-amber-200" : "text-foreground"}>{item.value}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
