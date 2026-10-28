"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomableImage } from "./ZoomableImage";

interface Step {
  id: string;
  number: string;
  title: string;
  tag: string;
  line: string;
  image: string;
  alt: string;
}

const STEPS: Step[] = [
  {
    id: "recon",
    number: "01",
    title: "Reconnaissance",
    tag: "Black-box discovery",
    line: "MIRAGE asks the agent to list its own tools. A naive agent hands over the whole catalogue.",
    image: "/projects/mirage/1-mirage-target-recon.png",
    alt: "Black-box reconnaissance listing the agent's callable tools",
  },
  {
    id: "matrix",
    number: "02",
    title: "Attack Matrix",
    tag: "19 probes · LLM variants",
    line: "A fast LLM rewrites all 19 attacks to fit the tools it just found, and spins up fresh variants. Some strike the chat head-on. Others hide in data the agent reads on its own.",
    image: "/projects/mirage/3-mirage-scan-matrix.png",
    alt: "The 19-probe attack matrix running against the target",
  },
  {
    id: "oracle",
    number: "03",
    title: "Oracle Check",
    tag: "No false positives",
    line: "It never trusts the words. It reads the real tool calls and the leaked secret to confirm a hit.",
    image: "/projects/mirage/2-mirage-exploit-oracle.png",
    alt: "An execution oracle confirming a canary token leak",
  },
  {
    id: "remediate",
    number: "04",
    title: "Score & Fix",
    tag: "Guardrail synthesis",
    line: "It scores the agent from A to F. Then it writes the guardrails that block every confirmed attack.",
    image: "/projects/mirage/4-mirage-policy-synthesis.png",
    alt: "The generated lucid_policy.json guardrail file",
  },
  {
    id: "proof",
    number: "05",
    title: "Proof",
    tag: "Regression suite",
    line: "A test suite replays every probe. The result holds, and nothing breaks in silence.",
    image: "/projects/mirage/5-mirage-pytest-suite.png",
    alt: "The passing regression test suite",
  },
];

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

// Renders a serif title but keeps the ampersand in the sans font, where the serif
// glyph reads as decorative.
function TitleText({ text }: { text: string }) {
  const parts = text.split(" & ");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="font-sans font-normal"> &amp; </span>}
        </span>
      ))}
    </>
  );
}

export function MirageScanWalkthrough() {
  const [index, setIndex] = useState(0);
  const current = STEPS[index];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left: the scan steps, as a numbered rail */}
      <div className="space-y-2 lg:col-span-4">
        {STEPS.map((step, idx) => {
          const isActive = idx === index;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setIndex(idx)}
              className={`flex w-full items-start gap-3 rounded-sm border p-3 text-left transition-all duration-150 ${
                isActive
                  ? "border-accent/80 bg-surface/90 shadow-sm"
                  : "border-border/60 bg-surface/20 hover:border-border hover:bg-surface/50"
              }`}
            >
              <span className={`font-mono text-xs font-semibold ${isActive ? "text-accent" : "text-muted"}`}>
                {step.number}
              </span>
              <div className="flex-1">
                <p className={`font-serif text-sm font-semibold ${isActive ? "text-foreground" : "text-foreground/75"}`}>
                  <TitleText text={step.title} />
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-muted">{step.tag}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right: natural one-liner + the real terminal capture */}
      <div className="relative rounded-sm border border-border/80 bg-surface/30 p-5 backdrop-blur-sm sm:p-6 lg:col-span-8">
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
                {current.number}. <TitleText text={current.title} />
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-foreground/85">{current.line}</p>
            </div>

            <div className="flex flex-col items-center pt-1">
              <ZoomableImage src={current.image} alt={current.alt} className="inline-block max-w-full">
                <img
                  src={current.image}
                  alt={current.alt}
                  className="max-h-56 sm:max-h-64 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
                />
              </ZoomableImage>
              <p className="mt-2 text-center font-mono text-[11px] text-muted">Click to inspect full screen</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
