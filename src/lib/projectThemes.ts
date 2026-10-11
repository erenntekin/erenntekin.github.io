export interface ProjectTheme {
  shortTitle: string;
  category: string;
  tagline: string;
  glowColor: string;
  accentBorder: string;
  accentBg: string;
  textAccent: string;
  deviceType: "mobile" | "browser" | "concept";
}

const THEMES: Record<string, ProjectTheme> = {
  ghostnet: {
    shortTitle: "GhostNet",
    category: "CYBERSECURITY",
    tagline: "LIVE THREAT INTEL · 24K+ ATTACKER IPs",
    glowColor: "rgba(6, 182, 212, 0.22)",
    accentBorder: "border-cyan-500/40",
    accentBg: "bg-cyan-500/10",
    textAccent: "text-cyan-400",
    deviceType: "browser",
  },
  mybelly: {
    shortTitle: "MyBelly",
    category: "AI & MOBILE",
    tagline: "NUTRITION AGENT · OFFLINE-FIRST",
    glowColor: "rgba(245, 158, 11, 0.22)",
    accentBorder: "border-amber-500/40",
    accentBg: "bg-amber-500/10",
    textAccent: "text-amber-400",
    deviceType: "mobile",
  },
  "genai-document-analysis": {
    shortTitle: "GenAI Docs",
    category: "ENTERPRISE AI",
    tagline: "KNOWLEDGE GRAPH · RAG PIPELINE",
    glowColor: "rgba(16, 185, 129, 0.22)",
    accentBorder: "border-emerald-500/40",
    accentBg: "bg-emerald-500/10",
    textAccent: "text-emerald-400",
    deviceType: "browser",
  },
  coldeye: {
    shortTitle: "Coldeye",
    category: "COMPUTER VISION",
    tagline: "MULTI-CAMERA RE-ID · YOLO + BYTETRACK",
    glowColor: "rgba(244, 63, 94, 0.22)",
    accentBorder: "border-rose-500/40",
    accentBg: "bg-rose-500/10",
    textAccent: "text-rose-400",
    deviceType: "concept",
  },
  lucid: {
    shortTitle: "LUCID",
    category: "AI SAFETY",
    tagline: "DETERMINISTIC GUARDRAILS FOR AGENTS",
    glowColor: "rgba(139, 92, 246, 0.22)",
    accentBorder: "border-violet-500/40",
    accentBg: "bg-violet-500/10",
    textAccent: "text-violet-400",
    deviceType: "concept",
  },
  phoenix: {
    shortTitle: "Phoenix",
    category: "DATA PLATFORM",
    tagline: "HIGH-THROUGHPUT EVENT STREAMING",
    glowColor: "rgba(249, 115, 22, 0.22)",
    accentBorder: "border-orange-500/40",
    accentBg: "bg-orange-500/10",
    textAccent: "text-orange-400",
    deviceType: "concept",
  },
  mirage: {
    shortTitle: "MIRAGE",
    category: "OFFENSIVE AI",
    tagline: "ADVERSARIAL AGENT EVALUATION",
    glowColor: "rgba(239, 68, 68, 0.22)",
    accentBorder: "border-red-500/40",
    accentBg: "bg-red-500/10",
    textAccent: "text-red-400",
    deviceType: "concept",
  },
  lifeos: {
    shortTitle: "LifeOS",
    category: "PERSONAL AI",
    tagline: "MULTI-AGENT PRODUCTIVITY SUITE",
    glowColor: "rgba(59, 130, 246, 0.22)",
    accentBorder: "border-blue-500/40",
    accentBg: "bg-blue-500/10",
    textAccent: "text-blue-400",
    deviceType: "concept",
  },
  blackbox: {
    shortTitle: "BlackBox",
    category: "SECURITY AUDIT",
    tagline: "BINARY ANALYSIS & FORENSICS",
    glowColor: "rgba(161, 161, 170, 0.22)",
    accentBorder: "border-zinc-500/40",
    accentBg: "bg-zinc-500/10",
    textAccent: "text-zinc-300",
    deviceType: "concept",
  },
};

const DEFAULT_THEME: ProjectTheme = {
  shortTitle: "Project",
  category: "ENGINEERING",
  tagline: "TECHNICAL ARCHITECTURE",
  glowColor: "rgba(99, 102, 241, 0.20)",
  accentBorder: "border-indigo-500/40",
  accentBg: "bg-indigo-500/10",
  textAccent: "text-indigo-400",
  deviceType: "browser",
};

export function getProjectTheme(slug: string, fallbackTitle?: string): ProjectTheme {
  const t = THEMES[slug];
  if (t) return t;
  return {
    ...DEFAULT_THEME,
    shortTitle: fallbackTitle ?? DEFAULT_THEME.shortTitle,
  };
}
