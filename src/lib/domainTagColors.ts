const TAG_COLORS: Record<string, string> = {
  // Domain
  Cybersecurity: "border-red-500/30 bg-red-500/10 text-red-300",
  "AI/ML": "border-violet-500/30 bg-violet-500/10 text-violet-300",
  "Data Engineering": "border-blue-500/30 bg-blue-500/10 text-blue-300",
  "Mobile Development": "border-teal-500/30 bg-teal-500/10 text-teal-300",
  Cloud: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  // Theme
  "Threat Intelligence": "border-orange-500/30 bg-orange-500/10 text-orange-300",
  "Health & Nutrition": "border-green-500/30 bg-green-500/10 text-green-300",
};

const DEFAULT_COLOR = "border-border bg-transparent text-muted";

export function domainTagColor(tag: string) {
  return TAG_COLORS[tag] ?? DEFAULT_COLOR;
}

const SHORT_LABELS: Record<string, string> = {
  "Data Engineering": "Data Eng.",
  "Mobile Development": "Mobile Dev.",
  "Health & Nutrition": "Health",
  "Threat Intelligence": "Threat Intel.",
};

export function shortTagLabel(tag: string) {
  return SHORT_LABELS[tag] ?? tag;
}
