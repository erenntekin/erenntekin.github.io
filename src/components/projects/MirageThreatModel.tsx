"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Attacker {
  id: string;
  label: string;
  node: { x: number; y: number };
  // where the arrow lands, just outside the agent fortress
  target: { x: number; y: number };
  line: string;
  goal: string;
}

// Fortress sits in the middle. Four attackers approach from the four corners.
const ATTACKERS: Attacker[] = [
  {
    id: "direct",
    label: "Direct Abuser",
    node: { x: 130, y: 70 },
    target: { x: 300, y: 172 },
    line: "An ordinary user types in the chat. He tries to push the agent past its own rules.",
    goal: "Free perks, or the hidden system prompt.",
  },
  {
    id: "competitor",
    label: "Competitor",
    node: { x: 630, y: 70 },
    target: { x: 460, y: 172 },
    line: "An organized attacker scripts the chat. He wants the whole client base, or the cloud keys.",
    goal: "Mass data theft and espionage.",
  },
  {
    id: "saboteur",
    label: "Invisible Saboteur",
    node: { x: 130, y: 350 },
    target: { x: 300, y: 248 },
    line: "This one never talks to the agent. He plants his order in a repo, a web page or a document the agent will read on its own.",
    goal: "The agent leaks data, or runs his code, and nothing points back to him.",
  },
  {
    id: "dos",
    label: "Financial DoS",
    node: { x: 630, y: 350 },
    target: { x: 460, y: 248 },
    line: "A bot traps the agent in an endless tool loop. The API bill drains in a few hours.",
    goal: "Burn the budget, take the service down.",
  },
];

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function MirageThreatModel() {
  const [activeId, setActiveId] = useState<string>("direct");
  const active = ATTACKERS.find((a) => a.id === activeId) ?? ATTACKERS[0];

  return (
    <div className="w-full space-y-5">
      <p className="font-sans text-sm leading-relaxed text-foreground/80">
        Every tool an agent can call is a door. Four kinds of attacker knock on those doors.
        Tap one to see how it comes in.
      </p>

      <div className="relative rounded-sm border border-border/80 bg-surface/20 p-4 backdrop-blur-sm sm:p-6">
        <Corner className="top-0 left-0 border-t-2 border-l-2" />
        <Corner className="top-0 right-0 border-t-2 border-r-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

        <div className="overflow-x-auto">
        <svg
          viewBox="0 0 760 420"
          className="mx-auto w-full min-w-[520px] max-w-[760px]"
          role="img"
          aria-label="Four attackers approaching the AI agent"
        >
          <defs>
            <marker id="mirage-arrow-on" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
            </marker>
            <marker id="mirage-arrow-off" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--border)" />
            </marker>
          </defs>

          {/* Attack vectors (drawn first, so the fortress covers their inner ends) */}
          {ATTACKERS.map((a) => {
            const on = a.id === activeId;
            return (
              <line
                key={`line-${a.id}`}
                x1={a.node.x}
                y1={a.node.y}
                x2={a.target.x}
                y2={a.target.y}
                stroke={on ? "var(--accent)" : "var(--border)"}
                strokeWidth={on ? 2.4 : 1.4}
                strokeDasharray={on ? "none" : "5 5"}
                markerEnd={on ? "url(#mirage-arrow-on)" : "url(#mirage-arrow-off)"}
                opacity={on ? 1 : 0.7}
              />
            );
          })}

          {/* The fortress: the agent and what it guards */}
          <rect x="300" y="160" width="160" height="100" rx="4" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="380" y="196" textAnchor="middle" className="fill-accent" fontFamily="var(--font-mono, monospace)" fontSize="17" fontWeight="600">
            AI AGENT
          </text>
          <text x="380" y="221" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-mono, monospace)" fontSize="12">
            Database · Secrets
          </text>
          <text x="380" y="239" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-mono, monospace)" fontSize="12">
            Tools · API budget
          </text>

          {/* Attacker nodes */}
          {ATTACKERS.map((a) => {
            const on = a.id === activeId;
            return (
              <g
                key={`node-${a.id}`}
                onClick={() => setActiveId(a.id)}
                style={{ cursor: "pointer" }}
                role="button"
                aria-pressed={on}
              >
                <rect
                  x={a.node.x - 100}
                  y={a.node.y - 25}
                  width="200"
                  height="50"
                  rx="4"
                  fill={on ? "var(--surface-hover)" : "var(--surface)"}
                  stroke={on ? "var(--accent)" : "var(--border)"}
                  strokeWidth={on ? 1.6 : 1}
                  opacity={on ? 1 : 0.85}
                />
                <text
                  x={a.node.x}
                  y={a.node.y + 5}
                  textAnchor="middle"
                  fill={on ? "var(--accent)" : "var(--muted)"}
                  fontFamily="var(--font-sans, sans-serif)"
                  fontSize="15"
                  fontWeight={on ? 600 : 400}
                >
                  {a.label}
                </text>
              </g>
            );
          })}
        </svg>
        </div>
      </div>

      {/* Caption for the selected attacker */}
      <div className="relative min-h-[84px] rounded-sm border border-border/80 bg-surface/30 p-4 backdrop-blur-sm sm:p-5">
        <Corner className="top-0 left-0 border-t-2 border-l-2" />
        <Corner className="top-0 right-0 border-t-2 border-r-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.16 }}
          >
            <h3 className="font-serif text-base font-semibold text-accent">{active.label}</h3>
            <p className="mt-1.5 font-sans text-sm leading-relaxed text-foreground/85">{active.line}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">Goal · {active.goal}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
