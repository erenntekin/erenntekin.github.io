"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { BoundaryFocus, Project } from "@/data/projects";

const AMBER = "#fbbf24";
const BONE = "#9aa3af";
const JOINT = "#f4f6f8";

// COCO keypoints of a standing figure inside the camera frame, in SVG units
const KEYPOINTS: [number, number][] = [
  [300, 62], [306, 56], [294, 56], [314, 60], [286, 60],
  [326, 94], [274, 94], [342, 132], [258, 132], [350, 168], [250, 168],
  [316, 172], [284, 172], [318, 220], [282, 220], [320, 264], [280, 264],
];
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [5, 6], [5, 7], [7, 9], [6, 8], [8, 10],
  [5, 11], [6, 12], [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
];
const LOWER_BODY = new Set([11, 12, 13, 14, 15, 16]);

// Same rule as the pipeline: the hand sits past the wrist, at 35 % of the elbow-to-wrist length
const HAND_EXTENSION = 0.35;
function handPoint(wrist: number, elbow: number): [number, number] {
  const [wx, wy] = KEYPOINTS[wrist];
  const [ex, ey] = KEYPOINTS[elbow];
  return [wx + HAND_EXTENSION * (wx - ex), wy + HAND_EXTENSION * (wy - ey)];
}
const HANDS: { wrist: number; point: [number, number] }[] = [
  { wrist: 9, point: handPoint(9, 7) },
  { wrist: 10, point: handPoint(10, 8) },
];

interface Scenario {
  label: string;
  focus?: BoundaryFocus;
  input?: string;
  action?: string;
  tradeoff?: string;
  limit?: string;
}

function shortLabel(text: string) {
  const clause = text.split(/[.,:]/)[0].trim();
  return clause.length > 42 ? `${clause.slice(0, 40).trimEnd()}...` : clause;
}

function scenariosOf(project: Project): Scenario[] {
  const limitations = project.limitations ?? [];
  if (project.boundaries && project.boundaries.length > 0) {
    return project.boundaries.map((b, i) => ({ ...b, limit: limitations[i] }));
  }
  return limitations.map((limit) => ({ label: shortLabel(limit), limit }));
}

function PipelineSchematic({ focus, animate }: { focus?: BoundaryFocus; animate: boolean }) {
  const lower = focus === "lower-body";
  const hands = focus === "hands";
  const worker = focus === "worker";
  const dimmed = (i: number) => lower && LOWER_BODY.has(i);

  return (
    <svg viewBox="0 0 480 300" className="h-auto w-full" role="img" aria-label="Vision pipeline schematic">
      <defs>
        <pattern id="occlusion-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={AMBER} strokeOpacity="0.25" strokeWidth="2" />
        </pattern>
      </defs>

      {/* camera and its frustum */}
      <rect x="34" y="136" width="40" height="28" rx="5" fill="none" stroke={BONE} strokeOpacity="0.7" />
      <circle cx="74" cy="150" r="7" fill="none" stroke={BONE} strokeOpacity="0.7" />
      <line x1="81" y1="150" x2="160" y2="20" stroke={BONE} strokeOpacity="0.25" strokeDasharray="3 4" />
      <line x1="81" y1="150" x2="160" y2="290" stroke={BONE} strokeOpacity="0.25" strokeDasharray="3 4" />
      <text x="54" y="182" textAnchor="middle" className="fill-muted font-mono" fontSize="9">CAM</text>

      {/* frame */}
      <rect x="160" y="20" width="300" height="270" rx="6" fill="none" stroke={BONE} strokeOpacity="0.35" />
      <text x="168" y="34" className="fill-muted font-mono" fontSize="9">FRAME · 17 KP</text>

      {/* face blur: what the screen shows, never what the models see */}
      {Array.from({ length: 16 }).map((_, i) => (
        <rect
          key={i}
          x={286 + (i % 4) * 7}
          y={46 + Math.floor(i / 4) * 7}
          width="7"
          height="7"
          fill={JOINT}
          fillOpacity={0.06 + ((i * 7) % 5) * 0.025}
        />
      ))}

      {/* lower body occlusion */}
      <motion.g initial={false} animate={{ opacity: lower ? 1 : 0 }} transition={{ duration: 0.35 }}>
        <rect x="200" y="196" width="220" height="90" fill="url(#occlusion-hatch)" />
        <line x1="200" y1="196" x2="420" y2="196" stroke={AMBER} strokeDasharray="4 4" />
        <text x="410" y="210" textAnchor="end" fill={AMBER} className="font-mono" fontSize="9">conf &lt; 0.75</text>
      </motion.g>

      {/* skeleton */}
      {EDGES.map(([a, b]) => {
        const off = dimmed(a) || dimmed(b);
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={KEYPOINTS[a][0]}
            y1={KEYPOINTS[a][1]}
            x2={KEYPOINTS[b][0]}
            y2={KEYPOINTS[b][1]}
            initial={false}
            animate={{ stroke: off ? AMBER : BONE, strokeOpacity: off ? 0.45 : 0.75 }}
            strokeDasharray={off ? "3 4" : undefined}
            strokeWidth="1.5"
          />
        );
      })}
      {KEYPOINTS.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          initial={false}
          animate={{ fill: dimmed(i) ? AMBER : JOINT, opacity: dimmed(i) ? 0.4 : 0.9 }}
          transition={{ duration: 0.35 }}
        />
      ))}

      {/* held object and projected hands */}
      <motion.rect
        x="230"
        y="160"
        width="30"
        height="52"
        rx="3"
        fill="none"
        initial={false}
        animate={{ stroke: hands ? AMBER : BONE, strokeOpacity: hands ? 1 : 0.5 }}
        strokeDasharray={hands ? "4 3" : undefined}
      />
      <text x="230" y="224" className="font-mono" fontSize="9" fill={hands ? AMBER : BONE}>bottle</text>
      {HANDS.map(({ wrist, point }) => (
        <g key={wrist}>
          <line
            x1={KEYPOINTS[wrist][0]}
            y1={KEYPOINTS[wrist][1]}
            x2={point[0]}
            y2={point[1]}
            stroke={hands ? AMBER : BONE}
            strokeOpacity="0.6"
            strokeDasharray="2 3"
          />
          <motion.circle
            cx={point[0]}
            cy={point[1]}
            fill="none"
            stroke={hands ? AMBER : BONE}
            strokeWidth="1.5"
            initial={false}
            animate={hands && animate ? { r: [4, 8, 4] } : { r: 4 }}
            transition={hands && animate ? { duration: 1.4, repeat: Infinity } : { duration: 0.3 }}
          />
        </g>
      ))}

      {/* face worker, a separate process */}
      <motion.path
        d="M 286 74 C 230 110, 150 190, 126 222"
        fill="none"
        strokeDasharray="3 4"
        initial={false}
        animate={{ stroke: worker ? AMBER : BONE, strokeOpacity: worker ? 0.9 : 0.3 }}
      />
      <motion.rect
        x="14"
        y="222"
        width="124"
        height="58"
        rx="8"
        fill="none"
        initial={false}
        animate={{ stroke: worker ? AMBER : BONE, strokeOpacity: worker ? 1 : 0.45 }}
      />
      <text x="24" y="240" className="font-mono" fontSize="9" fill={worker ? AMBER : JOINT}>FACE WORKER</text>
      <text x="24" y="252" className="fill-muted font-mono" fontSize="8">CPU · 1 process</text>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.rect
          key={i}
          x={24 + i * 17}
          y="261"
          width="12"
          height="9"
          rx="2"
          initial={false}
          animate={
            worker && animate
              ? { fill: AMBER, opacity: [0.15, 0.9, 0.15] }
              : { fill: worker ? AMBER : BONE, opacity: worker ? 0.6 : 0.25 }
          }
          transition={worker && animate ? { duration: 1.6, repeat: Infinity, delay: i * 0.18 } : { duration: 0.3 }}
        />
      ))}
    </svg>
  );
}

// Generic view for projects without a pipeline schematic: one sector per known limit
function EnvelopeSchematic({ count, active, animate }: { count: number; active: number; animate: boolean }) {
  const cx = 150;
  const cy = 150;
  const outer = 128;
  const angle = (i: number) => (i / count) * Math.PI * 2 - Math.PI / 2;
  // rounded so the server and the browser render the same path strings
  const round = (v: number) => Math.round(v * 100) / 100;
  const point = (a: number, r: number): [number, number] => [round(cx + Math.cos(a) * r), round(cy + Math.sin(a) * r)];
  const wedge = (i: number) => {
    const a0 = angle(i) - Math.PI / count + 0.04;
    const a1 = angle(i) + Math.PI / count - 0.04;
    const [x0, y0] = point(a0, outer);
    const [x1, y1] = point(a1, outer);
    const [ix1, iy1] = point(a1, 52);
    const [ix0, iy0] = point(a0, 52);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M ${ix0} ${iy0} L ${x0} ${y0} A ${outer} ${outer} 0 ${large} 1 ${x1} ${y1} L ${ix1} ${iy1} A 52 52 0 ${large} 0 ${ix0} ${iy0} Z`;
  };

  return (
    <svg viewBox="0 0 300 300" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label="System envelope">
      {[52, 90, outer].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={BONE} strokeOpacity="0.25" strokeDasharray="3 5" />
      ))}
      {Array.from({ length: count }).map((_, i) => (
        <motion.path
          key={i}
          d={wedge(i)}
          initial={false}
          animate={{ fill: i === active ? AMBER : BONE, fillOpacity: i === active ? 0.16 : 0.03 }}
          stroke={i === active ? AMBER : "none"}
          strokeOpacity="0.6"
        />
      ))}
      {Array.from({ length: count }).map((_, i) => {
        const [x, y] = point(angle(i), outer + 12);
        return (
          <text key={i} x={x} y={y + 3} textAnchor="middle" className="font-mono" fontSize="9" fill={i === active ? AMBER : BONE}>
            {String(i + 1).padStart(2, "0")}
          </text>
        );
      })}
      <motion.circle
        key={active}
        r="4"
        fill={AMBER}
        initial={{ cx, cy, opacity: 1 }}
        animate={
          animate
            ? { cx: [cx, point(angle(active), outer)[0]], cy: [cy, point(angle(active), outer)[1]], opacity: [1, 0.2] }
            : { cx: point(angle(active), outer - 20)[0], cy: point(angle(active), outer - 20)[1] }
        }
        transition={animate ? { duration: 1.6, repeat: Infinity, ease: "easeOut" } : { duration: 0 }}
      />
      <text x={cx} y={cy + 3} textAnchor="middle" className="fill-muted font-mono" fontSize="9">NOMINAL</text>
    </svg>
  );
}

function ReadoutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border/60 pt-3 first:border-t-0 first:pt-0">
      <p className="font-mono text-[10px] tracking-widest text-muted uppercase">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-foreground/90">{value}</p>
    </div>
  );
}

export function SystemBoundaryViewer({ project }: { project: Project }) {
  const scenarios = scenariosOf(project);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  if (scenarios.length === 0) return null;

  const current = scenarios[Math.min(active, scenarios.length - 1)];
  const hasSchematic = scenarios.some((s) => s.focus);

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface/20">
      <div className="flex flex-wrap gap-2 border-b border-border/70 p-3 sm:p-4" role="group" aria-label="Boundary scenarios">
        {scenarios.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left font-mono text-xs transition-colors ${
                on
                  ? "border-amber-400/60 bg-amber-400/10 text-amber-200"
                  : "border-border text-muted hover:border-amber-400/40 hover:text-foreground"
              }`}
            >
              <span className={on ? "text-amber-400" : "text-muted/70"}>{String(i + 1).padStart(2, "0")}</span>
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {hasSchematic ? (
            <PipelineSchematic focus={current.focus} animate={!reduced} />
          ) : (
            <EnvelopeSchematic count={scenarios.length} active={active} animate={!reduced} />
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase">
            <span className="flex items-center gap-2 text-amber-300">
              <span className={`h-1.5 w-1.5 rounded-full bg-amber-400 ${reduced ? "" : "animate-pulse"}`} />
              Boundary active
            </span>
            <span className="text-muted">
              {String(active + 1).padStart(2, "0")} / {String(scenarios.length).padStart(2, "0")}
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-4 space-y-3 rounded-xl border border-border/70 bg-background/60 p-4"
            >
              {current.input && <ReadoutRow label="Sensor input" value={current.input} />}
              {current.action && <ReadoutRow label="System action" value={current.action} />}
              {current.tradeoff && <ReadoutRow label="Engineering trade-off" value={current.tradeoff} />}
              {current.limit && <ReadoutRow label={current.input ? "Documented limit" : "Known limit"} value={current.limit} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
