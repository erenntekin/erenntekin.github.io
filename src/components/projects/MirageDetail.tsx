"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { MirageScanWalkthrough } from "./MirageScanWalkthrough";
import { MirageThreatModel } from "./MirageThreatModel";
import { MirageAttackMatrix } from "./MirageAttackMatrix";
import { ZoomableVideo } from "./ZoomableVideo";
import { motion, AnimatePresence } from "framer-motion";

interface Stage {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
}

const STAGES: Stage[] = [
  { id: "overview", number: "01", label: "Overview · Stack", shortLabel: "Overview" },
  { id: "threat", number: "02", label: "Threat Model", shortLabel: "Threats" },
  { id: "engine", number: "03", label: "Offensive Engine", shortLabel: "Engine" },
  { id: "matrix", number: "04", label: "Attack Matrix", shortLabel: "Matrix" },
  { id: "boundaries", number: "05", label: "Limits · Roadmap", shortLabel: "Roadmap" },
];

const LIMITATIONS = [
  {
    number: "01",
    title: "Needs to see the tool calls",
    description:
      "The oracles judge the real tool calls an agent makes. A closed chat that hides them can still be probed, but a tool call cannot be confirmed from the text alone.",
  },
  {
    number: "02",
    title: "Scripted attacks",
    description:
      "The 19 probes are fixed scripts. An LLM re-aims them at the target's own tools, but it does not invent brand-new techniques or react turn by turn.",
  },
  {
    number: "03",
    title: "Defence at the boundary",
    description:
      "The generated guardrails wrap the agent's input, its tool calls and its output. They do not change the model's own weights.",
  },
  {
    number: "04",
    title: "Real targets, real damage",
    description:
      "Against a live system, an attack that works really runs. A deleted account stays deleted. MIRAGE opens a fresh session between probes, but it cannot roll a remote target back.",
  },
];

const ROADMAP = [
  {
    number: "01",
    title: "Adaptive multi-turn attacks",
    description:
      "Go past the scripted crescendo to attacks that read the agent's replies and adjust over a long chat.",
  },
  {
    number: "02",
    title: "CI/CD security gating",
    description:
      "Run a scan on every pull request, and block the merge when the resilience score drops.",
  },
  {
    number: "03",
    title: "Multi-agent audits",
    description:
      "Test privilege escalation across several agents that hand untrusted data to one another.",
  },
];

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function MirageDetail({ project }: { project: Project }) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const heroSrc = "/projects/mirage/preview.mp4";
  const fullVideoSrc = project.media.video ?? "/projects/mirage/film.mp4";

  // Support ArrowLeft and ArrowRight keyboard navigation between stages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveStageIndex((prev) => Math.min(prev + 1, STAGES.length - 1));
      } else if (e.key === "ArrowLeft") {
        setActiveStageIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentStage = STAGES[activeStageIndex];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Top Header: Framed Back link & Stage Breadcrumb */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-surface/30 px-3 py-1.5 font-sans text-xs font-medium text-muted transition-colors hover:border-border hover:bg-surface/60 hover:text-foreground"
        >
          <span>←</span>
          <span>Back to projects</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[11px] text-muted sm:inline">
            Stage {currentStage.number} of 0{STAGES.length} · {currentStage.label}
          </span>
          <Link
            href="/projects/mirage/docs"
            className="inline-flex items-center gap-1.5 rounded-sm border border-accent/40 bg-accent/10 px-3 py-1.5 font-sans text-xs font-medium text-accent transition-colors hover:bg-accent/20"
          >
            <span>Documentation</span>
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* Modern Architectural Stage Navigation Bar */}
      <nav className="mt-5 flex items-center justify-between gap-1 overflow-x-auto rounded-sm border border-border/80 bg-surface/30 p-1.5 backdrop-blur-sm">
        {STAGES.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStageIndex(idx)}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-sm px-3 py-2 font-sans text-xs transition-all ${
                isActive
                  ? "bg-surface font-semibold text-foreground shadow-sm"
                  : "text-muted hover:text-foreground/90"
              }`}
            >
              <span
                className={`font-mono text-[10px] ${
                  isActive ? "text-accent" : "text-muted/60"
                }`}
              >
                {stage.number}
              </span>
              <span className="hidden sm:inline">{stage.label}</span>
              <span className="sm:hidden">{stage.shortLabel}</span>
              {isActive && (
                <motion.span
                  layoutId="mirage-stage-active-pill"
                  className="absolute inset-0 rounded-sm border border-accent/40 pointer-events-none"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Stage Content Frame (Self-contained, spacious, and airy) */}
      <div className="mt-8 min-h-[520px]">
        <AnimatePresence mode="wait">
          {/* STAGE 01: OVERVIEW & STACK */}
          {activeStageIndex === 0 && (
            <motion.div
              key="stage-overview"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Header: Title, Status, Tagline, Code availability */}
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h1 className="font-serif text-2xl font-semibold text-accent sm:text-3xl">
                    {project.title}
                  </h1>

                  <div className="flex items-center gap-1.5 font-sans text-xs font-medium text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
                    Completed
                  </div>
                </div>

                <p className="mt-2.5 text-sm leading-relaxed text-foreground/80 sm:text-base">
                  {project.tagline}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3 font-sans text-xs text-muted">
                  <span className="rounded-sm border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
                    AI Security
                  </span>
                  <span className="rounded-sm border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
                    AI Red Teaming
                  </span>
                  <div className="flex items-center gap-1.5">
                    <GitHubIcon className="h-3.5 w-3.5 text-accent" />
                    <span>Code: Private · on request</span>
                  </div>
                </div>
              </div>

              {/* 2-Column Split: Compact Video on Left, Clean Linear Stack on Right */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
                {/* Left: Compact Demo Video (Click to enlarge) (7 cols) */}
                <div className="lg:col-span-7 lg:flex lg:flex-col">
                  <p className="mb-2 text-center font-mono text-[10px] tracking-widest uppercase text-accent">
                    Demonstration · MIRAGE vs the MyBelly agent
                  </p>
                  <ZoomableVideo src={fullVideoSrc} className="block w-full">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/10 bg-[#060911] shadow-xl">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/projects/mirage/poster.jpg"
                        src={heroSrc}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </ZoomableVideo>
                </div>

                {/* Right: Stack plaque, aligned to the video frame and matching its height (5 cols) */}
                <div className="lg:col-span-5 lg:flex lg:flex-col">
                  {/* Invisible twin of the video title, so the plaque starts at the video frame, not the title */}
                  <p
                    aria-hidden
                    className="invisible mb-2 hidden text-center font-mono text-[10px] tracking-widest uppercase text-accent lg:block"
                  >
                    Demonstration · MIRAGE vs the MyBelly agent
                  </p>
                  <div className="relative rounded-sm border border-border/80 bg-surface/30 p-5 backdrop-blur-sm sm:p-6 lg:flex-1">
                  <Corner className="top-0 left-0 border-t-2 border-l-2" />
                  <Corner className="top-0 right-0 border-t-2 border-r-2" />
                  <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
                  <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

                  <p className="font-mono text-[10px] tracking-widest uppercase text-accent">
                    Technology Stack
                  </p>

                  <dl className="mt-4 space-y-3 font-sans text-xs">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        Languages
                      </dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          Python
                        </span>
                      </dd>
                    </div>

                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        Models
                      </dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          Llama 3
                        </span>
                      </dd>
                    </div>

                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        Frameworks
                      </dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          Pydantic
                        </span>
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          Typer
                        </span>
                      </dd>
                    </div>

                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        Standards
                      </dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          OWASP LLM Top 10
                        </span>
                      </dd>
                    </div>
                  </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 02: THREAT MODEL */}
          {activeStageIndex === 1 && (
            <motion.div
              key="stage-threat"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
                  Threat Model
                </h2>
                <p className="mt-1.5 font-sans text-sm text-foreground/80">
                  Who comes after the agent, and how they get in.
                </p>
              </div>

              <div className="mt-6">
                <MirageThreatModel />
              </div>
            </motion.div>
          )}

          {/* STAGE 03: OFFENSIVE ENGINE */}
          {activeStageIndex === 2 && (
            <motion.div
              key="stage-engine"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
                  Offensive Engine
                </h2>
                <p className="mt-1.5 font-sans text-sm text-foreground/80">
                  Follow a single scan, from first contact to the generated fix.
                </p>
              </div>

              <div className="mt-6">
                <MirageScanWalkthrough />
              </div>
            </motion.div>
          )}

          {/* STAGE 04: ATTACK MATRIX */}
          {activeStageIndex === 3 && (
            <motion.div
              key="stage-matrix"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
                  Attack Matrix
                </h2>
                <p className="mt-1.5 font-sans text-sm text-foreground/80">
                  Nineteen attacks, sorted by severity. Pick one to see how it works.
                </p>
              </div>

              <div className="mt-6">
                <MirageAttackMatrix />
              </div>
            </motion.div>
          )}

          {/* STAGE 05: LIMITS & ROADMAP */}
          {activeStageIndex === 4 && (
            <motion.div
              key="stage-boundaries"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
                  Limits · Roadmap
                </h2>
                <p className="mt-1.5 font-sans text-sm text-foreground/80">
                  Known constraints and planned improvements.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Column 1: Limitations */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400/90 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                    <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-amber-400">
                      Limitations
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {LIMITATIONS.map((item) => (
                      <div
                        key={item.number}
                        className="relative rounded-sm border border-border/80 bg-surface/30 p-4 sm:p-5 backdrop-blur-sm transition-colors hover:border-amber-400/40"
                      >
                        <Corner className="top-0 left-0 border-t-2 border-l-2" />
                        <Corner className="top-0 right-0 border-t-2 border-r-2" />
                        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
                        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xs font-medium text-amber-400/80">
                            {item.number}.
                          </span>
                          <h4 className="font-sans text-sm font-semibold text-foreground">
                            {item.title}
                          </h4>
                        </div>
                        <p className="mt-1.5 font-sans text-xs leading-relaxed text-foreground/75 sm:text-[13px]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Roadmap */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" />
                    <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-accent">
                      Roadmap
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {ROADMAP.map((item) => (
                      <div
                        key={item.number}
                        className="relative rounded-sm border border-border/80 bg-surface/30 p-4 sm:p-5 backdrop-blur-sm transition-colors hover:border-accent/40"
                      >
                        <Corner className="top-0 left-0 border-t-2 border-l-2" />
                        <Corner className="top-0 right-0 border-t-2 border-r-2" />
                        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
                        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xs font-medium text-accent">
                            {item.number}.
                          </span>
                          <h4 className="font-sans text-sm font-semibold text-foreground">
                            {item.title}
                          </h4>
                        </div>
                        <p className="mt-1.5 font-sans text-xs leading-relaxed text-foreground/75 sm:text-[13px]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Stage Transition Controller */}
      <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-6 font-sans text-xs">
        {activeStageIndex > 0 ? (
          <button
            type="button"
            onClick={() => setActiveStageIndex((prev) => prev - 1)}
            className="flex items-center gap-1.5 rounded-sm border border-border/80 bg-surface/40 px-3.5 py-1.5 font-medium text-foreground/80 transition-colors hover:border-border hover:bg-surface/70 hover:text-foreground"
          >
            <span>←</span>
            <span>Previous: {STAGES[activeStageIndex - 1].shortLabel}</span>
          </button>
        ) : (
          <div className="h-8 w-28 opacity-0 pointer-events-none" />
        )}

        {activeStageIndex < STAGES.length - 1 ? (
          <button
            type="button"
            onClick={() => setActiveStageIndex((prev) => prev + 1)}
            className="flex items-center gap-1.5 rounded-sm border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-medium text-accent transition-colors hover:bg-accent/20"
          >
            <span>Next: {STAGES[activeStageIndex + 1].shortLabel}</span>
            <span>→</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setActiveStageIndex(0)}
            className="flex items-center gap-1.5 rounded-sm border border-border bg-surface/40 px-3.5 py-1.5 font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            <span>Return to Overview</span>
            <span>↺</span>
          </button>
        )}
      </div>
    </div>
  );
}
