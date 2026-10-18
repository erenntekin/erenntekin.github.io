export interface ProjectTheme {
  shortTitle: string;
  category: string;
  tagline: string;
  glowColor: string;
  accentBorder: string;
  accentBg: string;
  textAccent: string;
  activeRing: string;
  activeShadow: string;
  iconTint: string;
  deviceType: "mobile" | "browser" | "concept";
}

const ACCENT_GLOW = "rgba(240, 217, 153, 0.18)";

function makeTheme(
  shortTitle: string,
  category: string,
  tagline: string,
  deviceType: "mobile" | "browser" | "concept"
): ProjectTheme {
  return {
    shortTitle,
    category,
    tagline,
    glowColor: ACCENT_GLOW,
    accentBorder: "border-accent/40",
    accentBg: "bg-surface/80",
    textAccent: "text-accent",
    activeRing: "border-accent ring-2 ring-accent/60",
    activeShadow: "shadow-[0_0_20px_-2px_rgba(240,217,153,0.35)]",
    iconTint: "border-accent/40 bg-accent/10 text-accent",
    deviceType,
  };
}

const THEMES: Record<string, ProjectTheme> = {
  mirage: makeTheme("MIRAGE", "CYBERSECURITY", "OFFENSIVE AI SCANNER · OWASP LLM", "browser"),
  ghostnet: makeTheme("GhostNet", "CYBERSECURITY", "THREAT INTELLIGENCE · STREAMING", "browser"),
  mybelly: makeTheme("MyBelly", "AI & MOBILE", "NUTRITION AGENT · OFFLINE-FIRST", "mobile"),
  "genai-document-analysis": makeTheme("GenAI Docs", "ENTERPRISE AI", "KNOWLEDGE GRAPH · THALES", "browser"),
  coldeye: makeTheme("Coldeye", "COMPUTER VISION", "ON-DEVICE PERCEPTION · YOLO11", "browser"),
  lucid: makeTheme("LUCID", "AI SAFETY", "DETERMINISTIC GUARDRAILS", "concept"),
  phoenix: makeTheme("Phoenix", "CLOUD INFRA", "SELF-HEALING KUBERNETES", "concept"),
  lifeos: makeTheme("LifeOS", "PERSONAL AI", "MULTI-AGENT PRODUCTIVITY", "concept"),
  blackbox: makeTheme("BlackBox", "SECURITY AUDIT", "LAB PENTEST & EXPLOITATION", "concept"),
  siem: makeTheme("SIEM", "DEFENSIVE SEC", "REAL-TIME INTRUSION DETECTION", "concept"),
  "cost-optimizer": makeTheme("Cost Optimizer", "FINOPS", "CLOUD SPEND OPTIMIZATION", "concept"),
};

const DEFAULT_THEME: ProjectTheme = makeTheme("Project", "ENGINEERING", "TECHNICAL ARCHITECTURE", "browser");

export function getProjectTheme(slug: string, fallbackTitle?: string): ProjectTheme {
  const t = THEMES[slug];
  if (t) return t;
  return {
    ...DEFAULT_THEME,
    shortTitle: fallbackTitle ?? DEFAULT_THEME.shortTitle,
  };
}
