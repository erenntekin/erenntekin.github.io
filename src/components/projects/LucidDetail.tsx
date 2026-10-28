"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { LucidPipeline } from "./LucidPipeline";
import { LucidFeatures } from "./LucidFeatures";
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
  { id: "pipeline", number: "02", label: "Defense Pipeline", shortLabel: "Pipeline" },
  { id: "features", number: "03", label: "Features in Action", shortLabel: "Features" },
  { id: "video", number: "04", label: "Demonstration", shortLabel: "Video" },
  { id: "boundaries", number: "05", label: "Limits · Roadmap", shortLabel: "Roadmap" },
];

const LIMITATIONS = [
  {
    number: "01",
    title: "Schema-Bound Validation",
    description:
      "Strict parameter constraints reject unexpected inputs unless explicitly allowed in the policy schema.",
  },
  {
    number: "02",
    title: "Operator Confirmation Hooks",
    description:
      "Human-in-the-loop gating requires client-side asynchronous confirmation hooks to avoid blocking interactive flows.",
  },
  {
    number: "03",
    title: "Application-Boundary Scope",
    description:
      "Guardrails enforce safety at the execution boundary around tools, without altering the model's underlying weights.",
  },
];

const ROADMAP = [
  {
    number: "01",
    title: "Distributed Token Bucket",
    description:
      "Implement distributed rate limiting and state coordination for multi-instance deployments.",
  },
  {
    number: "02",
    title: "Schema Auto-Generation",
    description:
      "Automatically derive parameter constraints and type rules directly from OpenAPI specifications.",
  },
  {
    number: "03",
    title: "Local Semantic Intent Filter",
    description:
      "Integrate a lightweight local embedding model to detect ambiguous adversarial intentions with near-zero latency.",
  },
];

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function LucidDetail({ project }: { project: Project }) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const heroSrc = project.media.video ?? "/projects/lucid/film.mp4";

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

        <span className="font-mono text-[11px] text-muted">
          Stage {currentStage.number} of 0{STAGES.length} · {currentStage.label}
        </span>
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
                  layoutId="lucid-stage-active-pill"
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
                    AI Guardrails
                  </span>
                  <div className="flex items-center gap-1.5">
                    <GitHubIcon className="h-3.5 w-3.5 text-accent" />
                    <span>Code: Private · on request</span>
                  </div>
                </div>
              </div>

              {/* 2-Column Split: Compact Video on Left, Clean Linear Stack on Right */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                {/* Left: Compact Demo Video (Click to enlarge) (7 cols) */}
                <div className="lg:col-span-7">
                  <ZoomableVideo src={heroSrc} className="block w-full">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/10 bg-[#060911] shadow-xl">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/projects/lucid/poster.jpg"
                        src={heroSrc}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </ZoomableVideo>
                </div>

                {/* Right: Categorized Stack (Museum Plaque with Corner Brackets) (5 cols) */}
                <div className="relative rounded-sm border border-border/80 bg-surface/30 p-5 backdrop-blur-sm sm:p-6 lg:col-span-5">
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
            </motion.div>
          )}

          {/* STAGE 02: DEFENSE PIPELINE */}
          {activeStageIndex === 1 && (
            <motion.div
              key="stage-pipeline"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
                  Runtime Defense Pipeline
                </h2>
                <p className="mt-1.5 font-sans text-sm text-foreground/80">
                  Four sequential checkpoints intercepting prompts, tool dispatches, and outputs.
                </p>
              </div>

              <div className="mt-6">
                <LucidPipeline />
              </div>
            </motion.div>
          )}

          {/* STAGE 03: FEATURES IN ACTION */}
          {activeStageIndex === 2 && (
            <motion.div
              key="stage-features"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
                  Features in Action
                </h2>
              </div>

              <div className="mt-6">
                <LucidFeatures />
              </div>
            </motion.div>
          )}

          {/* STAGE 04: DEMONSTRATION */}
          {activeStageIndex === 3 && (
            <motion.div
              key="stage-video"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
                  Demonstration Video
                </h2>
                <p className="mt-1.5 font-sans text-sm text-foreground/80">
                  {project.media.videoNote ??
                    "Demonstration video showcasing zero-trust tool interception, human approval gating, and circuit breaker enforcement."}
                </p>
              </div>

              <div className="mx-auto max-w-3xl overflow-hidden rounded-sm border border-white/10 bg-black shadow-xl">
                <div className="aspect-video w-full">
                  <video
                    controls
                    playsInline
                    preload="auto"
                    poster={project.media.videoPoster ?? "/projects/lucid/poster.jpg"}
                    className="h-full w-full object-contain bg-black"
                    src={project.media.video ?? "/projects/lucid/film.mp4"}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
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
                  Trade-offs · Roadmap
                </h2>
                <p className="mt-1.5 font-sans text-sm text-foreground/80">
                  Known constraints and planned improvements.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Limitations */}
                <div className="relative rounded-sm border border-border/80 bg-surface/30 p-5 sm:p-6 backdrop-blur-sm">
                  <Corner className="top-0 left-0 border-t-2 border-l-2" />
                  <Corner className="top-0 right-0 border-t-2 border-r-2" />
                  <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
                  <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400/90 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                    <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-amber-400">
                      Limitations
                    </h3>
                  </div>

                  <div className="mt-5 space-y-4 divide-y divide-border/50">
                    {LIMITATIONS.map((item) => (
                      <div key={item.number} className="pt-4 first:pt-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xs text-amber-400/80 font-medium">
                            {item.number}.
                          </span>
                          <h4 className="font-sans text-sm font-semibold text-foreground">
                            {item.title}
                          </h4>
                        </div>
                        <p className="mt-1 font-sans text-xs sm:text-[13px] leading-relaxed text-foreground/75">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roadmap */}
                <div className="relative rounded-sm border border-border/80 bg-surface/30 p-5 sm:p-6 backdrop-blur-sm">
                  <Corner className="top-0 left-0 border-t-2 border-l-2" />
                  <Corner className="top-0 right-0 border-t-2 border-r-2" />
                  <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
                  <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" />
                    <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-accent">
                      Roadmap
                    </h3>
                  </div>

                  <div className="mt-5 space-y-4 divide-y divide-border/50">
                    {ROADMAP.map((item) => (
                      <div key={item.number} className="pt-4 first:pt-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xs text-accent font-medium">
                            {item.number}.
                          </span>
                          <h4 className="font-sans text-sm font-semibold text-foreground">
                            {item.title}
                          </h4>
                        </div>
                        <p className="mt-1 font-sans text-xs sm:text-[13px] leading-relaxed text-foreground/75">
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
