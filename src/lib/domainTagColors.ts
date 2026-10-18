// Portfolio Native Badge Styling
// Pure, single-tone dark badge: dark surface, fine border, readable muted text, hover accent
const BADGE_STYLE = "border-border/80 bg-surface/60 text-foreground/75 hover:border-accent/40";

export function domainTagColor(_tag?: string) {
  return BADGE_STYLE;
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
