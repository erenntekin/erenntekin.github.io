"use client";

import { motion } from "framer-motion";

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

// One real request, followed from the user's words to a saved entry.
const TOOL_CALLS = [
  'estimate_macros("grilled chicken", "white rice")',
  "add_journal_entry(meal: lunch, kcal: 640)",
  'use_inventory("chicken breast", "rice")',
];

interface Step {
  id: string;
  number: string;
  title: string;
}

const STEPS: Step[] = [
  { id: "input", number: "01", title: "Natural Input" },
  { id: "tools", number: "02", title: "Agentic Tool Calling" },
  { id: "confirm", number: "03", title: "Safe Confirmation" },
  { id: "update", number: "04", title: "Dual-State Update" },
  { id: "sync", number: "05", title: "Offline-First Sync" },
];

function StepBody({ id }: { id: string }) {
  if (id === "input") {
    return (
      <div className="max-w-md rounded-lg rounded-tl-sm border border-border/70 bg-surface/60 px-4 py-3">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted">You</p>
        <p className="font-sans text-sm text-foreground/90">I had grilled chicken and rice for lunch.</p>
      </div>
    );
  }
  if (id === "tools") {
    return (
      <div className="overflow-x-auto rounded-sm border border-white/10 bg-[#0b0e16] p-3">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">The AI lines up the calls</p>
        <div className="space-y-1.5">
          {TOOL_CALLS.map((call) => (
            <div key={call} className="flex items-start gap-2">
              <span className="mt-0.5 font-mono text-[11px] text-accent">›</span>
              <code className="font-mono text-[11px] leading-relaxed text-foreground/85">{call}</code>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (id === "confirm") {
    return (
      <div className="max-w-md rounded-sm border border-border/70 bg-surface/50 p-4">
        <p className="font-sans text-sm text-foreground/90">Add lunch to today&apos;s journal and update your stock?</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="rounded-sm border border-accent/50 bg-accent/15 px-3 py-1 font-sans text-xs font-medium text-accent">
            Confirm
          </span>
          <span className="font-mono text-[10px] text-muted">one tap, nothing runs before</span>
        </div>
      </div>
    );
  }
  if (id === "update") {
    return (
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div className="rounded-sm border border-border/70 bg-surface/40 p-3.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Journal</p>
          <p className="mt-1 font-serif text-lg font-semibold text-green-400">+640 kcal</p>
          <p className="mt-0.5 font-sans text-[11px] text-foreground/70">Grilled chicken · White rice</p>
        </div>
        <div className="rounded-sm border border-border/70 bg-surface/40 p-3.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Inventory</p>
          <p className="mt-1 font-serif text-lg font-semibold text-amber-400">2 items used</p>
          <p className="mt-0.5 font-sans text-[11px] text-foreground/70">Chicken breast · Rice</p>
        </div>
      </div>
    );
  }
  // sync
  return (
    <div className="flex items-center gap-2.5 rounded-sm border border-border/70 bg-surface/40 px-4 py-3">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400/20 font-mono text-[10px] text-green-400">✓</span>
      <p className="font-sans text-sm text-foreground/85">Saved to SQLite on the spot. Synced to Supabase in the background.</p>
    </div>
  );
}

export function MybellyPipeline() {
  return (
    <div className="relative rounded-sm border border-border/80 bg-surface/20 p-5 backdrop-blur-sm sm:p-7">
      <Corner className="top-0 left-0 border-t-2 border-l-2" />
      <Corner className="top-0 right-0 border-t-2 border-r-2" />
      <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
      <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

      <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-accent">One request, start to finish</p>

      <motion.ol
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="space-y-0"
      >
        {STEPS.map((step, idx) => {
          const isLast = idx === STEPS.length - 1;
          return (
            <motion.li
              key={step.id}
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.25 }}
              className="flex gap-4"
            >
              {/* Left rail: number badge + connector */}
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-mono text-[11px] font-semibold text-accent">
                  {step.number}
                </span>
                {!isLast && <span className="my-1 w-px flex-1 bg-border/70" />}
              </div>

              {/* Content */}
              <div className={`flex-1 ${isLast ? "" : "pb-6"}`}>
                <h4 className="mb-2 font-serif text-sm font-semibold text-foreground sm:text-base">{step.title}</h4>
                <StepBody id={step.id} />
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
