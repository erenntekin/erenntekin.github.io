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
    title: "Camera Ingestion",
    tools: "OpenCV",
    description:
      "Captures the live camera feed frame by frame using OpenCV, supporting local webcams, RTSP streams, and video files.",
  },
  {
    id: "detection",
    number: "02",
    title: "Detection · Tracking",
    tools: "YOLO11m · ByteTrack",
    description:
      "Detects people and objects with YOLO11m while ByteTrack maintains persistent IDs across temporary occlusions.",
  },
  {
    id: "pose",
    number: "03",
    title: "Pose Estimation",
    tools: "YOLO-Pose",
    description:
      "Extracts skeletal joint angles in real time to classify posture and tracks hand vectors to register item pickups.",
  },
  {
    id: "analysis",
    number: "04",
    title: "Face · Text Analysis",
    tools: "DeepFace · EasyOCR",
    description:
      "Runs facial recognition in an isolated process to preserve frame rates, while on-demand OCR reads text on held items.",
  },
  {
    id: "database",
    number: "05",
    title: "Database · Dashboard",
    tools: "SQLite · FastAPI",
    description:
      "Appends structured events to SQLite in WAL mode while FastAPI streams live telemetry to the web interface.",
  },
];

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function SystemPipeline() {
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
      {/* Visual Pipeline Flow with Arrows */}
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
                    className={`font-mono text-[10px] tracking-wider uppercase ${
                      isActive ? "text-accent font-semibold" : "text-muted"
                    }`}
                  >
                    Step {step.number}
                  </span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" />
                  )}
                </div>

                <h4
                  className={`mt-1 font-sans text-xs font-medium ${
                    isActive ? "text-accent font-semibold" : "text-foreground/85"
                  }`}
                >
                  {step.title}
                </h4>

                <span className="mt-0.5 font-mono text-[10px] text-muted">
                  {step.tools}
                </span>

                {/* Subtle active progress border at bottom */}
                {isActive && !isPaused && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                  />
                )}
              </button>

              {/* Connecting Arrow between nodes (hidden on mobile, visible on desktop) */}
              {idx < PIPELINE_STEPS.length - 1 && (
                <div className="hidden sm:flex shrink-0 px-2 text-muted/60">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic Single-Sentence Explanation Box (Museum Plaque with Corner Brackets) */}
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
