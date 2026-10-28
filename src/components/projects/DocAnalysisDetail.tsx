"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { DocAnalysisPipeline } from "./DocAnalysisPipeline";
import { DocAnalysisFeatures } from "./DocAnalysisFeatures";
import { ZoomableImage } from "./ZoomableImage";
import { motion, AnimatePresence } from "framer-motion";

interface Stage {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
}

const STAGES: Stage[] = [
  { id: "overview", number: "01", label: "Overview · Stack", shortLabel: "Overview" },
  { id: "pipeline", number: "02", label: "System Pipeline", shortLabel: "Pipeline" },
  { id: "features", number: "03", label: "Features in Action", shortLabel: "Features" },
  { id: "status", number: "04", label: "Project Status", shortLabel: "Status" },
];

interface StatusItem {
  id: string;
  title: string;
  phase: "done" | "next" | "planned";
  phaseLabel: string;
  description: string;
}

const STATUS_ITEMS: StatusItem[] = [
  {
    id: "docs",
    title: "Document Ingestion and Trash",
    phase: "done",
    phaseLabel: "Completed",
    description:
      "Uploads multi-format files, extracts raw text, and provides a two-stage recoverable trash bin to prevent accidental data loss.",
  },
  {
    id: "search",
    title: "Typo-Tolerant Search",
    phase: "done",
    phaseLabel: "Completed",
    description:
      "OpenSearch integration that finds documents by file name, author, or content, even with spelling mistakes.",
  },
  {
    id: "ontologies",
    title: "Domain Ontologies",
    phase: "done",
    phaseLabel: "Completed",
    description:
      "Custom knowledge models with entity categories, directional rules, and server-side safeguards preventing broken links.",
  },
  {
    id: "rag",
    title: "Semantic RAG and Document Chat",
    phase: "done",
    phaseLabel: "Completed",
    description:
      "Splits text into chunks, locates the most relevant passages via vector search, and writes grounded answers with source citations.",
  },
  {
    id: "graphrag",
    title: "GraphRAG and Knowledge Graph",
    phase: "next",
    phaseLabel: "Next Sprint",
    description:
      "Connecting document text passages directly to ontology entities to form a knowledge graph for cross-document reasoning.",
  },
  {
    id: "agents",
    title: "Multi-Document AI Agents",
    phase: "planned",
    phaseLabel: "Planned",
    description:
      "Autonomous agents that decompose complex research questions and coordinate queries across several files simultaneously.",
  },
];

function TitleWithAmpersand({ text }: { text: string }) {
  const parts = text.split(" & ");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="font-sans font-normal text-current"> &amp; </span>}
        </span>
      ))}
    </>
  );
}

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function DocAnalysisDetail({ project }: { project: Project }) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const heroImageSrc = project.media.cover ?? "/projects/genai-document-analysis/documents-list.png";

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
                  layoutId="doc-stage-active-pill"
                  className="absolute inset-0 rounded-sm border border-accent/40 pointer-events-none"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Stage Content Frame */}
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

                  <div className="flex items-center gap-1.5 font-sans text-xs font-medium text-amber-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.7)]" />
                    Ongoing
                  </div>
                </div>

                <p className="mt-2.5 text-sm leading-relaxed text-foreground/80 sm:text-base">
                  {project.tagline}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3 font-sans text-xs text-muted">
                  <span className="rounded-sm border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
                    Generative AI
                  </span>
                  <span className="rounded-sm border border-border/80 bg-surface/40 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                    Updated: October 2026
                  </span>
                  <div className="flex items-center gap-1.5">
                    <GitHubIcon className="h-3.5 w-3.5 text-accent" />
                    <span>Code: Private · on request</span>
                  </div>
                </div>
              </div>

              {/* 2-Column Split: Hero Image on Left, Clean Linear Stack on Right */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                {/* Left: Complete Interface Preview (Object-contain, never cropped) (7 cols) */}
                <div className="lg:col-span-7">
                  <ZoomableImage
                    src={heroImageSrc}
                    alt={project.title}
                    className="block w-full"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/10 bg-[#060911] shadow-xl flex items-center justify-center p-2.5">
                      <img
                        src={heroImageSrc}
                        alt={project.title}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </ZoomableImage>
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
                          Java
                        </span>
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          TypeScript
                        </span>
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          SQL
                        </span>
                      </dd>
                    </div>

                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        Frameworks
                      </dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          Spring Boot
                        </span>
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          React
                        </span>
                      </dd>
                    </div>

                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        Libraries
                      </dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          Spring AI
                        </span>
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          Apache Tika
                        </span>
                      </dd>
                    </div>

                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        Database & Storage
                      </dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          OpenSearch
                        </span>
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          PostgreSQL
                        </span>
                        <span className="rounded-sm border border-border/70 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                          SeaweedFS
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 02: SYSTEM PIPELINE */}
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
                  System Pipeline
                </h2>
              </div>

              <div className="mt-6">
                <DocAnalysisPipeline />
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
                <DocAnalysisFeatures />
              </div>
            </motion.div>
          )}

          {/* STAGE 04: PROJECT STATUS */}
          {activeStageIndex === 3 && (
            <motion.div
              key="stage-status"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
                  Project Status
                </h2>
              </div>

              {/* Clean linear progress board with clear phase indicators */}
              <div className="space-y-3">
                {STATUS_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="relative rounded-sm border border-border/80 bg-surface/30 p-4 sm:p-5 backdrop-blur-sm transition-colors hover:border-border"
                  >
                    <Corner className="top-0 left-0 border-t-2 border-l-2" />
                    <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            item.phase === "done"
                              ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]"
                              : item.phase === "next"
                              ? "bg-accent shadow-[0_0_6px_var(--accent)]"
                              : "bg-muted/60"
                          }`}
                        />
                        <h3 className="font-serif text-sm font-semibold text-foreground sm:text-base">
                          <TitleWithAmpersand text={item.title} />
                        </h3>
                      </div>

                      <span
                        className={`inline-flex items-center self-start sm:self-auto rounded-sm border px-2.5 py-0.5 font-mono text-[10px] font-medium ${
                          item.phase === "done"
                            ? "border-green-500/40 bg-green-500/10 text-green-400"
                            : item.phase === "next"
                            ? "border-accent/40 bg-accent/10 text-accent"
                            : "border-border/60 bg-surface/50 text-muted"
                        }`}
                      >
                        {item.phaseLabel}
                      </span>
                    </div>

                    <p className="mt-2 font-sans text-xs leading-relaxed text-foreground/75 sm:text-sm sm:pl-4">
                      {item.description}
                    </p>
                  </div>
                ))}
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
