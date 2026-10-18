// Elegant Dark-Tech Monochromatic Badges
// Subtle dark background, fine muted border, crisp readable text
const TAG_COLORS: Record<string, string> = {
  // Cybersecurity pillar & specializations: fine crimson-tinted neutral
  Cybersecurity: "border-red-500/25 bg-red-500/[0.05] text-red-200/90",
  "AI Red Teaming": "border-red-500/25 bg-red-500/[0.05] text-red-200/90",
  "Offensive Security": "border-red-500/25 bg-red-500/[0.05] text-red-200/90",
  "Threat Intelligence": "border-red-500/25 bg-red-500/[0.05] text-red-200/90",
  "Threat Detection": "border-red-500/25 bg-red-500/[0.05] text-red-200/90",
  "AI Security": "border-red-500/25 bg-red-500/[0.05] text-red-200/90",

  // Artificial Intelligence pillar & specializations: fine violet-tinted neutral
  "Artificial Intelligence": "border-violet-500/25 bg-violet-500/[0.05] text-violet-200/90",
  "AI/ML": "border-violet-500/25 bg-violet-500/[0.05] text-violet-200/90",
  "Generative AI": "border-violet-500/25 bg-violet-500/[0.05] text-violet-200/90",
  GenAI: "border-violet-500/25 bg-violet-500/[0.05] text-violet-200/90",
  "AI Agents": "border-violet-500/25 bg-violet-500/[0.05] text-violet-200/90",
  "Computer Vision": "border-violet-500/25 bg-violet-500/[0.05] text-violet-200/90",

  // Engineering & Platform: refined zinc / slate neutral
  "Data Engineering": "border-white/10 bg-white/[0.03] text-foreground/75",
  "Mobile Development": "border-white/10 bg-white/[0.03] text-foreground/75",
  Cloud: "border-white/10 bg-white/[0.03] text-foreground/75",
  DevOps: "border-white/10 bg-white/[0.03] text-foreground/75",
  FinOps: "border-white/10 bg-white/[0.03] text-foreground/75",
};

const DEFAULT_COLOR = "border-white/10 bg-white/[0.03] text-foreground/75";

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
