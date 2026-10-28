"use client";

import { useState } from "react";
import { ZoomableImage } from "./ZoomableImage";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const features: FeatureItem[] = [
  {
    id: "defense",
    title: "Pre-LLM Input Sanitization",
    description:
      "Intercepts adversarial prompt injections and homoglyph substitutions before inputs reach the model, returning safe refusal responses.",
    image: "/projects/lucid/1-mybelly-defense.png",
    imageAlt: "Adversarial prompt injection interception on target assistant",
  },
  {
    id: "gating",
    title: "Zero-Trust Tool Gating",
    description:
      "Blocks unauthorized function calls, validates parameter bounds, and enforces human approval on destructive actions like account deletion.",
    image: "/projects/lucid/2-tool-gating.png",
    imageAlt: "Pre-execution tool gating and parameter constraint validation",
  },
  {
    id: "breaker",
    title: "Sliding-Window Circuit Breaker",
    description:
      "Enforces execution rate limits per turn and triggers automatic cooldowns to prevent recursive tool loops and API quota exhaustion.",
    image: "/projects/lucid/3-circuit-breaker.png",
    imageAlt: "Circuit breaker rate limiting and recursive loop detection",
  },
  {
    id: "verification",
    title: "Closed-Loop Proof of Defense",
    description:
      "Replays adversarial attack probes against the protected agent, confirming exploit neutralization across all tested threat vectors.",
    image: "/projects/lucid/4-verification-matrix.png",
    imageAlt: "Closed-loop verification matrix confirming full exploit neutralization",
  },
  {
    id: "tests",
    title: "Automated Regression Suite",
    description:
      "Unit and integration tests verifying shield mechanics, rate-limit cooldowns, policy parsing, and closed-loop defense.",
    image: "/projects/lucid/5-pytest-suite.png",
    imageAlt: "Pytest test suite verifying shield and middleware mechanics",
  },
];

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function LucidFeatures() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = features[selectedIndex];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Column: Feature Selector Buttons (4 cols) */}
      <div className="space-y-2 lg:col-span-4">
        {features.map((feat, idx) => {
          const isActive = idx === selectedIndex;
          return (
            <button
              key={feat.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`flex w-full items-start gap-3 rounded-sm border p-3 text-left transition-all duration-150 ${
                isActive
                  ? "border-accent/80 bg-surface/90 shadow-sm"
                  : "border-border/60 bg-surface/20 hover:border-border hover:bg-surface/50"
              }`}
            >
              <span
                className={`font-mono text-xs font-semibold ${
                  isActive ? "text-accent" : "text-muted"
                }`}
              >
                0{idx + 1}
              </span>
              <div className="flex-1">
                <p
                  className={`font-serif text-xs font-semibold sm:text-sm ${
                    isActive ? "text-foreground" : "text-foreground/75"
                  }`}
                >
                  {feat.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Column: Museum Plaque Frame (8 cols) */}
      <div className="relative rounded-sm border border-border/80 bg-surface/30 p-5 sm:p-7 backdrop-blur-sm lg:col-span-8">
        <Corner className="top-0 left-0 border-t-2 border-l-2" />
        <Corner className="top-0 right-0 border-t-2 border-r-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            <div>
              <h3 className="font-serif text-lg font-semibold text-accent sm:text-xl">
                0{selectedIndex + 1}. {current.title}
              </h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-foreground/80 sm:text-sm">
                {current.description}
              </p>
            </div>

            <div className="pt-1 flex flex-col items-center">
              <ZoomableImage
                src={current.image}
                alt={current.imageAlt}
                className="inline-block max-w-full"
              >
                <img
                  src={current.image}
                  alt={current.imageAlt}
                  className="max-h-56 sm:max-h-64 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
                />
              </ZoomableImage>
              <p className="mt-2 text-center font-mono text-[11px] text-muted">
                Click image to inspect full screen
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
