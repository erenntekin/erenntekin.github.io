"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PipelineStep {
  id: string;
  number: string;
  title: string;
  tools: string;
  description: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "ingestion",
    number: "01",
    title: "Document Ingestion",
    tools: "Apache Tika & Spring Boot",
    description:
      "Extracts raw text and metadata from PDF, Office, and text files as soon as they are uploaded.",
  },
  {
    id: "indexing",
    number: "02",
    title: "Instant Search",
    tools: "OpenSearch Index",
    description:
      "Indexes file names, authors, and text so you can find any document immediately, even with spelling mistakes.",
  },
  {
    id: "ontology",
    number: "03",
    title: "Knowledge Modeling",
    tools: "Domain Ontologies",
    description:
      "Organizes concepts into custom ontologies, with built-in safeguards preventing broken links between related items.",
  },
  {
    id: "rag",
    number: "04",
    title: "Semantic RAG",
    tools: "Vector k-NN Search",
    description:
      "Splits text into passages, locates the most relevant excerpts, and generates answers with direct source citations.",
  },
  {
    id: "graphrag",
    number: "05",
    title: "GraphRAG & Agents",
    tools: "Knowledge Graph Fusion",
    description:
      "Connects text passages to ontologies so autonomous AI agents can answer complex queries across multiple documents.",
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

export function DocAnalysisPipeline() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance loop every 4.5 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = PIPELINE_STEPS[activeStepIndex];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Visual Pipeline Flow with Steps */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {PIPELINE_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPast = idx < activeStepIndex;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`relative flex w-full flex-col items-start rounded-sm border p-3.5 text-left transition-all duration-200 ${
                  isActive
                    ? "border-accent/80 bg-surface/90 shadow-[0_0_16px_rgba(240,217,153,0.12)]"
                    : isPast
                    ? "border-border/80 bg-surface/40 hover:border-border"
                    : "border-border/50 bg-surface/20 hover:border-border/80"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`font-mono text-[10px] font-semibold tracking-wider ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    STEP {step.number}
                  </span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                </div>
                <span className="mt-1 font-serif text-xs font-semibold text-foreground sm:text-sm">
                  <TitleWithAmpersand text={step.title} />
                </span>
                <span className="mt-0.5 font-mono text-[10px] text-muted">
                  <TitleWithAmpersand text={step.tools} />
                </span>
              </button>

              {idx < PIPELINE_STEPS.length - 1 && (
                <div className="hidden items-center px-1 text-muted/40 sm:flex">
                  <span className="text-xs">→</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic Explanation Box (Museum Plaque with Corner Brackets) */}
      <div className="relative mt-6 min-h-[72px] rounded-sm border border-border/80 bg-surface/30 p-4 sm:p-5 backdrop-blur-sm">
        <Corner className="top-0 left-0 border-t-2 border-l-2" />
        <Corner className="top-0 right-0 border-t-2 border-r-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Active Stage
            </span>
            <span className="font-mono text-xs text-foreground/80">
              {current.number} · <TitleWithAmpersand text={current.title} />
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-muted">
            <span className="font-mono text-[10px]">
              {isPaused ? "Paused" : "Auto-playing"}
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isPaused ? "bg-amber-400" : "bg-green-400 animate-pulse"
              }`}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.18 }}
            className="mt-2 font-sans text-sm leading-relaxed text-foreground/90"
          >
            {current.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
