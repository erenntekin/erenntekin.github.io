const TAG_COLORS: Record<string, string> = {
  // --- CYBERSECURITY FAMILY (Warm Red / Crimson / Rust / Orange) ---
  Cybersecurity: "border-red-500/35 bg-red-500/10 text-red-300",
  "AI Red Teaming": "border-rose-400/35 bg-rose-500/10 text-rose-300",
  "Offensive Security": "border-red-400/35 bg-red-500/10 text-red-200",
  "Threat Intelligence": "border-orange-500/35 bg-orange-500/10 text-orange-300",
  "Threat Detection": "border-amber-500/35 bg-amber-500/10 text-amber-300",
  "AI Security": "border-rose-400/35 bg-rose-500/10 text-rose-300",

  // --- ARTIFICIAL INTELLIGENCE FAMILY (Violet / Purple / Fuchsia / Cyan) ---
  "Artificial Intelligence": "border-purple-500/35 bg-purple-500/10 text-purple-300",
  "AI/ML": "border-purple-500/35 bg-purple-500/10 text-purple-300",
  "Generative AI": "border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-300",
  GenAI: "border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-300",
  "AI Agents": "border-violet-400/35 bg-violet-500/10 text-violet-300",
  "Computer Vision": "border-cyan-400/35 bg-cyan-500/10 text-cyan-300",

  // --- PLATFORM, CLOUD & DATA ENGINEERING (Blue / Teal / Sky / Slate) ---
  "Data Engineering": "border-blue-400/35 bg-blue-500/10 text-blue-300",
  "Mobile Development": "border-teal-400/35 bg-teal-500/10 text-teal-300",
  Cloud: "border-sky-400/35 bg-sky-500/10 text-sky-300",
  DevOps: "border-indigo-400/35 bg-indigo-500/10 text-indigo-300",
  FinOps: "border-emerald-400/35 bg-emerald-500/10 text-emerald-300",
};

const DEFAULT_COLOR = "border-border bg-transparent text-muted";

export function domainTagColor(tag: string) {
  return TAG_COLORS[tag] ?? DEFAULT_COLOR;
}

const SHORT_LABELS: Record<string, string> = {
  "Artificial Intelligence": "AI",
  "Generative AI": "GenAI",
  "Data Engineering": "Data Eng.",
  "Mobile Development": "Mobile Dev.",
  "Threat Intelligence": "Threat Intel.",
};

export function shortTagLabel(tag: string) {
  return SHORT_LABELS[tag] ?? tag;
}
