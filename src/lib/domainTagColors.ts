const TAG_COLORS: Record<string, string> = {
  // Major Pillars
  Cybersecurity: "border-red-500/30 bg-red-500/10 text-red-300",
  "Artificial Intelligence": "border-violet-500/30 bg-violet-500/10 text-violet-300",
  "AI/ML": "border-violet-500/30 bg-violet-500/10 text-violet-300",
  "Data Engineering": "border-blue-500/30 bg-blue-500/10 text-blue-300",
  "Mobile Development": "border-teal-500/30 bg-teal-500/10 text-teal-300",
  Cloud: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  // AI Specializations
  "AI Red Teaming": "border-rose-500/30 bg-rose-500/10 text-rose-300",
  "AI Agents": "border-amber-500/30 bg-amber-500/10 text-amber-300",
  "Generative AI": "border-purple-500/30 bg-purple-500/10 text-purple-300",
  GenAI: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  "Computer Vision": "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  "AI Security": "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  // Security & Infra Specializations
  "Threat Intelligence": "border-orange-500/30 bg-orange-500/10 text-orange-300",
  "Offensive Security": "border-rose-500/30 bg-rose-500/10 text-rose-300",
  "Threat Detection": "border-amber-500/30 bg-amber-500/10 text-amber-300",
  DevOps: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
  FinOps: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
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
