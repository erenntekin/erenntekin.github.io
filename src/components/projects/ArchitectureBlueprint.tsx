"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import type { BlueprintNode, BlueprintPhase, Project } from "@/data/projects";

function shortLabel(text: string) {
  const words = text.replace(/[.,:].*$/, "").split(/\s+/);
  return words.length > 4 ? `${words.slice(0, 4).join(" ")}...` : words.join(" ");
}

// Projects without a detailed blueprint: their stack as the current chain, one roadmap item per phase
function genericPhases(project: Project): BlueprintPhase[] {
  const base: BlueprintNode[] = project.stack.slice(0, 3).map((tech) => ({ id: tech, label: tech }));
  const roadmap = project.roadmap ?? [];
  return [
    { label: "Current", summary: project.summary, nodes: base, impact: [] },
    ...roadmap.map((item, i) => ({
      label: `Phase ${String(i + 1).padStart(2, "0")}`,
      summary: item,
      nodes: [...base, { id: `next-${i}`, label: shortLabel(item), detail: "Planned" }],
      impact: [],
    })),
  ];
}

function FramesGlyph({ animate }: { animate: boolean }) {
  return (
    <div className="mt-2 flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          className="h-2.5 w-2 rounded-[2px] bg-amber-400"
          initial={false}
          animate={animate ? { opacity: [0.15, 1, 0.15] } : { opacity: 0.6 }}
          transition={animate ? { duration: 1.5, repeat: Infinity, delay: i * 0.15 } : undefined}
        />
      ))}
      <span className="ml-1 font-mono text-[9px] text-muted">t-4..t</span>
    </div>
  );
}

function MeshGlyph() {
  return (
    <svg viewBox="0 0 60 24" className="mt-2 h-5 w-14" aria-hidden="true">
      <path d="M 8 18 L 30 6 L 52 18 Z" fill="none" stroke="#fbbf24" strokeOpacity="0.6" strokeDasharray="2 2" />
      {[
        [8, 18],
        [30, 6],
        [52, 18],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#fbbf24" />
      ))}
    </svg>
  );
}

function NodeCard({ node, isNew, animate }: { node: BlueprintNode; isNew: boolean; animate: boolean }) {
  const container = node.kind === "container";
  return (
    <div
      className={`relative h-full rounded-xl border px-3 py-3 ${
        isNew ? "border-amber-400/60 bg-amber-400/[0.06]" : "border-border bg-background/60"
      } ${container ? "border-dashed" : ""}`}
    >
      {isNew && (
        <span className="absolute -top-2 right-2 rounded-full bg-amber-400 px-1.5 py-px font-mono text-[8px] font-semibold tracking-wider text-black">
          NEW
        </span>
      )}
      <p className="text-xs leading-snug font-medium text-foreground sm:text-[13px]">{node.label}</p>
      {node.detail && <p className="mt-1 font-mono text-[10px] leading-snug text-muted">{node.detail}</p>}
      {node.kind === "frames" && <FramesGlyph animate={animate} />}
      {node.kind === "mesh" && <MeshGlyph />}
      {container && node.contains && (
        <div className="mt-2 flex flex-wrap gap-1">
          {node.contains.map((item) => (
            <span key={item} className="rounded border border-border px-1.5 py-0.5 font-mono text-[9px] text-foreground/80">
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// A data pulse running along the link between two nodes
function LinkLine({ animate }: { animate: boolean }) {
  return (
    <div className="relative mx-auto h-6 w-px bg-border sm:mx-0 sm:h-px sm:w-6 lg:w-8">
        {animate && (
          <>
            <motion.span
              className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent sm:hidden"
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent sm:block"
              animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}
    </div>
  );
}

const MORPH = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

export function ArchitectureBlueprint({ project }: { project: Project }) {
  const phases = project.blueprint && project.blueprint.length > 0 ? project.blueprint : genericPhases(project);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const animate = !reduced;
  if (phases.length === 0) return null;

  const phase = phases[active];
  const currentIds = new Set(phases[0].nodes.map((n) => n.id));

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface/20">
      <div className="border-b border-border/70 p-3 sm:p-4">
        <LayoutGroup id={`phases-${project.slug}`}>
          <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-background/60 p-1" role="group" aria-label="Phases">
            {phases.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`relative flex-1 rounded-lg px-3 py-2 font-mono text-xs whitespace-nowrap transition-colors ${
                    on ? "text-accent-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId={`phase-pill-${project.slug}`}
                      className="absolute inset-0 rounded-lg bg-accent"
                      transition={{ duration: animate ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative">{p.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={phase.label}
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={animate ? { opacity: 0 } : undefined}
            transition={{ duration: 0.2 }}
            className="mt-3 text-sm text-foreground/80"
          >
            {phase.summary}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="p-4 sm:p-6">
        <LayoutGroup id={`nodes-${project.slug}`}>
          <div className="flex flex-col items-stretch sm:flex-row">
            <AnimatePresence mode="popLayout" initial={false}>
              {phase.nodes.flatMap((node, i) => [
                i > 0 ? (
                  <motion.div
                    key={`link-${node.id}`}
                    layout={animate}
                    initial={animate ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    exit={animate ? { opacity: 0 } : undefined}
                    transition={MORPH}
                    className="flex-none self-stretch sm:self-center"
                    aria-hidden="true"
                  >
                    <LinkLine animate={animate} />
                  </motion.div>
                ) : null,
                <motion.div
                  key={node.id}
                  layout={animate}
                  initial={animate ? { opacity: 0, scale: 0.92 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={animate ? { opacity: 0, scale: 0.92 } : undefined}
                  transition={MORPH}
                  className={`min-w-0 flex-1 ${node.kind === "container" ? "sm:flex-[2]" : ""}`}
                >
                  <NodeCard node={node} isNew={!currentIds.has(node.id)} animate={animate} />
                </motion.div>,
              ])}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        {phase.impact.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {phase.impact.map((item) => (
              <div key={item.label} className="rounded-xl border border-border/70 bg-background/60 px-4 py-3">
                <p className="font-mono text-[10px] tracking-widest text-muted uppercase">{item.label}</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`${phase.label}-${item.value}`}
                    initial={animate ? { opacity: 0, y: 4 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={animate ? { opacity: 0, y: -4 } : undefined}
                    transition={{ duration: 0.25 }}
                    className="mt-1 flex flex-wrap items-baseline gap-x-2 font-mono text-sm"
                  >
                    {item.from && (
                      <>
                        <span className="text-muted line-through decoration-muted/50">{item.from}</span>
                        <span className="text-amber-400" aria-label="becomes">→</span>
                      </>
                    )}
                    <span className={item.from ? "text-amber-200" : "text-foreground"}>{item.value}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
