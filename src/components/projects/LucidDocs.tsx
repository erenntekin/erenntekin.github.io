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

/* ------------------------------------------------------------------ shared ui */

function Section({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
        <span className="mr-2.5 font-mono text-xs font-normal text-muted">{num}.</span>
        <TitleWithAmpersand text={title} />
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
  { asset: "The database", impact: "Stolen records, forged edits, or wiped tables." },
  { asset: "Infrastructure secrets", impact: "Exposed API keys and internal services." },
  { asset: "Side-effect tools", impact: "Deleted accounts, reset passwords, or executed commands." },
  { asset: "The API budget", impact: "Drained credits that take the service down." },
  { asset: "The agent's loyalty", impact: "The agent turns against its own users." },
];

interface Row { id: string; name: string; owasp: string; what: string }
const T1: Row[] = [
  { id: "T1-01", name: "Direct Prompt Override", owasp: "LLM01", what: "Told to forget its rules and prove it." },
  { id: "T1-02", name: "System Prompt Extraction", owasp: "LLM07", what: "Reads its hidden prompt out loud, secret and all." },
  { id: "T1-03", name: "Dangerous Function Call", owasp: "LLM06", what: "Deletes an account on command without checking." },
];
const T2: Row[] = [
  { id: "T2-01", name: "Delimiter & Tag Injection", owasp: "LLM01", what: "Fake system tags fence off a hidden order." },
  { id: "T2-02", name: "Homoglyph Substitution", owasp: "LLM01", what: "Cyrillic look-alikes slip past the filter." },
  { id: "T2-03", name: "Encoding Obfuscation", owasp: "LLM01", what: "The command hides in Base64, then runs." },
  { id: "T2-04", name: "Parameter Injection", owasp: "LLM06", what: "Negative and wildcard values pass unchecked." },
  { id: "T2-05", name: "Cross-Lingual Evasion", owasp: "LLM01", what: "The same order in a language filters missed." },
];
const T3: Row[] = [
  { id: "T3-01", name: "Stored / Indirect Injection", owasp: "LLM01", what: "A trap hides inside text the agent reads on its own." },
  { id: "T3-02", name: "Tool-Loop DoS", owasp: "LLM10", what: "An endless tool loop drains the budget." },
  { id: "T3-03", name: "Fake Backend Event", owasp: "LLM01", what: "A forged emergency unlocks root privileges." },
  { id: "T3-04", name: "Confused Deputy", owasp: "LLM06", what: "Two safe tools chain into an account reset." },
  { id: "T3-05", name: "Cloud SSRF Extraction", owasp: "LLM06", what: "The fetch tool lifts cloud metadata credentials." },
];
const T4: Row[] = [
  { id: "T4-01", name: "Markdown Exfiltration", owasp: "LLM02", what: "The secret rides out inside an image link." },
  { id: "T4-02", name: "Multi-turn Crescendo", owasp: "LLM01", what: "Friendly turns lower the guard before the real ask." },
  { id: "T4-03", name: "Attention Saturation", owasp: "LLM01", what: "Filler text buries the order until rules drop out." },
  { id: "T4-04", name: "RAG Vector Poisoning", owasp: "LLM04", what: "A payload planted in the database wakes on search." },
  { id: "T4-05", name: "Arbitrary Shell Execution", owasp: "LLM06", what: "A fake diagnostic command runs in the shell." },
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
                <td className="whitespace-nowrap px-3 py-2.5 font-sans text-[12px] text-foreground/85">
                  <TitleWithAmpersand text={r.name} />
                </td>
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
          An LLM alone has very little power. It can hallucinate. But it cannot delete an account, read a secret key, or make a network call. The threat starts the moment you give the model tools. Tools are the hands it uses to act on real systems.
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
          Most security setups assume the attacker is just an anonymous person in the chat. In practice, four different attackers target an agent.
        </P>
        <div className="mt-4 space-y-3">
          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">1. Direct Abuser</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              An ordinary user typing in the chat. Uses roleplay, trick questions, or strange encodings to bypass rules and steal the system prompt.
            </p>
          </div>
          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">2. Competitor</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              An organized attacker scripting the chat. Probes the model to harvest cloud keys, proprietary logic, or customer records.
            </p>
          </div>
          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">3. Invisible Saboteur</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Never talks to the agent directly. Plants instructions inside web pages, PDFs, or repositories that the agent reads on its own.
            </p>
          </div>
          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">4. Financial DoS</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Traps the agent in an endless tool loop. Burns through the API token quota and takes the service down with the bill.
            </p>
          </div>
        </div>
      </Section>

      <Section num="03" title="The 19 OWASP LLM attack vectors">
        <P>
          LUCID is built to stop nineteen concrete attacks, tested across four tiers of difficulty.
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
        "[INST]"
      ]
    },
    "tool_shield": {
      "human_in_the_loop": [
        "delete_account"
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
      "block_external_images": true
    }
  }
}`;

function GuideDoc() {
  return (
    <div className="space-y-12">
      <Section num="01" title="Defending the Boundary">
        <P>
          Prompts cannot stop an attack on their own. Once a model is tricked, internal rules drop.
        </P>
        <P>
          LUCID sits between the model and the tools. It never touches model weights. It inspects what comes in, what the model calls, and what goes out. If an order breaks a rule, LUCID stops it before code runs.
        </P>
      </Section>

      <Section num="02" title="Quickstart & Integration">
        <P>
          You can protect any agent in three lines of Python:
        </P>
        <Code>{`from lucid.guard import LucidGuardrail

# 1. Load the policy file
guard = LucidGuardrail.from_policy_file("lucid_policy.json")

# 2. Wrap your agent
protected_agent = guard.wrap(my_agent)

# 3. Chat safely
response = protected_agent.chat("Delete account u_1002")
# -> Refused by Tool Shield: requires operator approval.`}</Code>
      </Section>

      <Section num="03" title="The Four Shields">
        <P>
          Every message passes through four checkpoints:
        </P>
        <div className="mt-4 space-y-3">
          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">1. Input Shield</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Cleans text before the model sees it. Replaces Cyrillic look-alikes with plain letters, normalizes Unicode, and removes fake tags.
            </p>
          </div>

          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">2. Tool Shield</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Catches tool calls before dispatch. Checks arguments against Pydantic rules and holds sensitive actions, like account deletion, for human approval.
            </p>
          </div>

          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">3. Circuit Breaker</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Counts tool calls per turn. If an agent loops on the same tool or calls too many, the breaker trips and cools down for sixty seconds.
            </p>
          </div>

          <div className="rounded-sm border border-border/70 bg-surface/20 p-4">
            <p className="font-mono text-xs font-semibold text-accent">4. Output Shield</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/80">
              Scans the final answer before the user sees it. Redacts secret keys, canary tokens, and hidden Markdown image links.
            </p>
          </div>
        </div>
      </Section>

      <Section num="04" title="The Policy File">
        <P>
          Rules live in a single JSON file. MIRAGE can generate this file automatically from the exploits it finds, or you can write it by hand:
        </P>
        <Code>{POLICY_SAMPLE}</Code>
      </Section>

      <Section num="05" title="CLI Policy Check">
        <P>
          Inspect your rules from the terminal:
        </P>
        <Code>lucid policy ./reports/lucid_policy.json</Code>
        <P>
          This prints active shields, tool bounds, and canary secrets in a clean table.
        </P>
      </Section>

      <Section num="06" title="Proving the Defense">
        <P>
          A defense only matters if you test it. LUCID replays all nineteen attacks from MIRAGE against the guarded agent:
        </P>
        <Code>lucid verify --policy ./reports/lucid_policy.json</Code>
        <P>
          On the MyBelly assistant, this test proves the security change:
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

      <Section num="07" title="Automated Regression Tests">
        <P>
          Thirty-five automated tests run in under half a second:
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
                  <TitleWithAmpersand text={d.label} />
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
