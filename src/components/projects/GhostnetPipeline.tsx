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
    title: "Ingestion",
    tools: "4 Threat Feeds",
    description:
      "Pulls raw IP incident reports continuously from four public blocklists.",
  },
  {
    id: "queue",
    number: "02",
    title: "Queue",
    tools: "Kafka",
    description:
      "Holds incoming records in a queue so sudden traffic bursts never drop data.",
  },
  {
    id: "processing",
    number: "03",
    title: "Processing",
    tools: "Spark",
    description:
      "Cleans and normalizes network records in 5-minute micro-batches.",
  },
  {
    id: "scoring",
    number: "04",
    title: "Threat Scoring",
    tools: "scikit-learn",
    description:
      "Scores each IP with a reoffense predictor and an anomaly detector.",
  },
  {
    id: "dashboard",
    number: "05",
    title: "Dashboard",
    tools: "PostgreSQL · React",
    description:
      "Plots live attack events on the 3D globe and serves instant firewall rules.",
  },
];

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function GhostnetPipeline() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance loop every 4 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 4000);
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
                className={`relative flex w-full flex-col items-center justify-center rounded-sm border p-3.5 text-center transition-all duration-200 ${
                  isActive
                    ? "border-accent/80 bg-surface/90 shadow-[0_0_16px_rgba(240,217,153,0.12)]"
                    : isPast
                    ? "border-border/80 bg-surface/40 hover:border-border"
                    : "border-border/50 bg-surface/20 hover:border-border/80"
                }`}
              >
                <div className="relative flex w-full items-center justify-center">
                  <span
                    className={`font-mono text-[10px] font-semibold tracking-wider ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    STEP {step.number}
                  </span>
                  {isActive && (
                    <span className="absolute right-0 h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                </div>
                <span className="mt-1 font-serif text-xs font-semibold text-foreground sm:text-sm">
                  {step.title}
                </span>
                <span className="mt-0.5 font-mono text-[10px] text-muted">
                  {step.tools}
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
              {current.number} · {current.title}
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
