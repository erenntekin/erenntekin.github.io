"use client";

import { useReducedMotion } from "framer-motion";
import type { Project, TradeOff } from "@/data/projects";
import { StaggerList } from "./StaggerList";

const ACCENT = "#f0d999";
const AMBER = "#fbbf24";

function rowsOf(project: Project): TradeOff[] {
  if (project.tradeoffs && project.tradeoffs.length > 0) return project.tradeoffs;
  return (project.limitations ?? []).map((boundary) => ({ label: "", choice: "", boundary }));
}

// A signal leaves the design choice and stops at the barrier: the point where the guarantee ends
function Barrier({ id, animate }: { id: string; animate: boolean }) {
  return (
    <svg viewBox="0 0 160 44" className="h-11 w-full" aria-hidden="true">
      <defs>
        <pattern id={`beyond-${id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={AMBER} strokeOpacity="0.22" strokeWidth="1.5" />
        </pattern>
        <linearGradient id={`signal-${id}`} gradientUnits="userSpaceOnUse" x1="4" y1="22" x2="114" y2="22">
          <stop offset="0" stopColor={ACCENT} stopOpacity="0.05" />
          <stop offset="1" stopColor={ACCENT} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect x="118" y="6" width="42" height="32" fill={`url(#beyond-${id})`} />
      <line x1="4" y1="22" x2="114" y2="22" stroke={`url(#signal-${id})`} strokeWidth="2" />
      {animate && (
        <circle r="3" cy="22" fill={ACCENT}>
          <animate attributeName="cx" values="4;112" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.85;1" dur="2.2s" repeatCount="indefinite" />
        </circle>
      )}
      <line x1="117" y1="4" x2="117" y2="40" stroke={AMBER} strokeWidth="2" style={{ filter: `drop-shadow(0 0 4px ${AMBER})` }} />
      <circle cx="117" cy="22" r="4" fill="#090b0e" stroke={AMBER} strokeWidth="1.5" />
    </svg>
  );
}

export function LimitBarriers({ project }: { project: Project }) {
  const rows = rowsOf(project);
  const reduced = useReducedMotion();
  if (rows.length === 0) return null;

  return (
    <StaggerList
      items={rows.map((row, i) => ({ row, i }))}
      keyFn={({ row }) => row.boundary}
      as="div"
      itemAs="div"
      className="mt-8 divide-y divide-border/60"
      itemClassName="py-6 first:pt-0 last:pb-0"
      renderItem={({ row, i }) => (
        <>
          {row.label && (
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
              {row.label}
            </p>
          )}
          {row.choice ? (
            <div className="mt-3 grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_150px_1fr] sm:gap-6">
              <p className="text-sm leading-relaxed text-foreground/80">{row.choice}</p>
              <div className="max-w-[220px] sm:max-w-none">
                <Barrier id={`${project.slug}-${i}`} animate={!reduced} />
              </div>
              <p className="text-sm leading-relaxed text-amber-100/90">{row.boundary}</p>
            </div>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{row.boundary}</p>
          )}
        </>
      )}
    />
  );
}
