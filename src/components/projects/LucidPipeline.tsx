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
    id: "input-shield",
    number: "01",
    title: "Input Shield",
    tools: "Prompt Sanitization",
    description:
      "Intercepts prompt injections, strips delimiter tags, and normalizes homoglyphs before tokens reach the model.",
  },
  {
    id: "tool-shield",
    number: "02",
    title: "Tool Shield",
    tools: "Parameter and Call Gating",
    description:
      "Validates function arguments against Pydantic schemas and halts sensitive actions until confirmed by an operator.",
  },
  {
    id: "circuit-breaker",
    number: "03",
    title: "Circuit Breaker",
    tools: "Loop and Quota Defense",
    description:
      "Tracks tool calls per turn to detect recursive execution loops and prevent API quota exhaustion.",
  },
  {
    id: "output-shield",
    number: "04",
    title: "Output Shield",
    tools: "Secret Redaction",
    description:
      "Scrubs canary tokens, credentials, and private keys from the final response before it leaves the middleware.",
  },
];

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function LucidPipeline() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const current = PIPELINE_STEPS[activeStepIndex];

  return (
    <div className="w-full">
      {/* 4 Architectural Shield Cards (4-column grid) */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStepIndex(idx)}
              className={`relative flex flex-col items-center justify-center rounded-sm border p-4 text-center transition-all duration-150 ${
                isActive
                  ? "border-accent/80 bg-surface/90 shadow-[0_0_16px_rgba(240,217,153,0.12)]"
                  : "border-border/60 bg-surface/30 hover:border-border hover:bg-surface/50"
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
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" />
                )}
              </div>
              <span className="mt-2 font-serif text-sm font-semibold text-foreground">
                {step.title}
              </span>
              <span className="mt-0.5 font-mono text-[11px] text-muted">
                {step.tools}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expanded Detail Frame for Active Step */}
      <div className="relative mt-5 rounded-sm border border-border/80 bg-surface/30 p-5 backdrop-blur-sm">
        <Corner className="top-0 left-0 border-t-2 border-l-2" />
        <Corner className="top-0 right-0 border-t-2 border-r-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              Active Stage
            </span>
            <span className="font-mono text-xs text-foreground/80">
              {current.number} · {current.title}
            </span>
          </div>

          <span className="font-mono text-[11px] text-muted">
            {current.tools}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
            className="mt-3 font-sans text-sm leading-relaxed text-foreground/90"
          >
            {current.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
