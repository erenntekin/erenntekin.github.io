// Portfolio Native Badge Styling
// Pure museum gold badge matching the portfolio theme:
// dark surface, fine accent border (--accent #f0d999), elegant warm gold text
const BADGE_STYLE = "border-accent/40 bg-surface/75 text-accent/90 hover:border-accent hover:text-accent transition-colors";

export function domainTagColor(_tag?: string) {
  return BADGE_STYLE;
}

const SHORT_LABELS: Record<string, string> = {
  "Mobile Development": "Mobile Dev",
  "Threat Intelligence": "Threat Intel",
};

export function shortTagLabel(tag: string) {
  return SHORT_LABELS[tag] ?? tag;
}
