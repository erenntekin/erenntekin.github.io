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

const THEMES: Record<string, ProjectTheme> = {
  ghostnet: {
    shortTitle: "GhostNet",
    category: "CYBERSECURITY",
    tagline: "LIVE THREAT INTEL · 24K+ ATTACKER IPs",
    glowColor: "rgba(6, 182, 212, 0.28)",
    accentBorder: "border-cyan-500/50",
    accentBg: "bg-cyan-500/15",
    textAccent: "text-cyan-400",
    activeRing: "border-cyan-400 ring-2 ring-cyan-400/80",
    activeShadow: "shadow-[0_0_24px_-2px_rgba(6,182,212,0.5)]",
    iconTint: "border-cyan-400/50 bg-cyan-500/15 text-cyan-300",
    deviceType: "browser",
  },
  mybelly: {
    shortTitle: "MyBelly",
    category: "AI & MOBILE",
    tagline: "NUTRITION AGENT · OFFLINE-FIRST",
    glowColor: "rgba(245, 158, 11, 0.28)",
    accentBorder: "border-amber-500/50",
    accentBg: "bg-amber-500/15",
    textAccent: "text-amber-400",
    activeRing: "border-amber-400 ring-2 ring-amber-400/80",
    activeShadow: "shadow-[0_0_24px_-2px_rgba(245,158,11,0.5)]",
    iconTint: "border-amber-400/50 bg-amber-500/15 text-amber-300",
    deviceType: "mobile",
  },
  "genai-document-analysis": {
    shortTitle: "GenAI Docs",
    category: "ENTERPRISE AI",
    tagline: "KNOWLEDGE GRAPH · RAG PIPELINE",
    glowColor: "rgba(16, 185, 129, 0.28)",
    accentBorder: "border-emerald-500/50",
    accentBg: "bg-emerald-500/15",
    textAccent: "text-emerald-400",
    activeRing: "border-emerald-400 ring-2 ring-emerald-400/80",
    activeShadow: "shadow-[0_0_24px_-2px_rgba(16,185,129,0.5)]",
    iconTint: "border-emerald-400/50 bg-emerald-500/15 text-emerald-300",
    deviceType: "browser",
  },
  coldeye: {
    shortTitle: "Coldeye",
    category: "COMPUTER VISION",
    tagline: "ON-DEVICE PERCEPTION · YOLO11 + BYTETRACK",
    glowColor: "rgba(244, 63, 94, 0.28)",
    accentBorder: "border-rose-500/50",
    accentBg: "bg-rose-500/15",
    textAccent: "text-rose-400",
    activeRing: "border-rose-400 ring-2 ring-rose-400/80",
    activeShadow: "shadow-[0_0_24px_-2px_rgba(244,63,94,0.5)]",
    iconTint: "border-rose-400/50 bg-rose-500/15 text-rose-300",
    deviceType: "browser",
  },
  lucid: {
    shortTitle: "LUCID",
    category: "AI SAFETY",
    tagline: "DETERMINISTIC GUARDRAILS FOR AGENTS",
    glowColor: "rgba(139, 92, 246, 0.28)",
    accentBorder: "border-violet-500/50",
    accentBg: "bg-violet-500/15",
    textAccent: "text-violet-400",
    activeRing: "border-violet-400 ring-2 ring-violet-400/80",
    activeShadow: "shadow-[0_0_24px_-2px_rgba(139,92,246,0.5)]",
    iconTint: "border-violet-400/50 bg-violet-500/15 text-violet-300",
    deviceType: "concept",
  },
  phoenix: {
    shortTitle: "Phoenix",
    category: "DATA PLATFORM",
    tagline: "HIGH-THROUGHPUT EVENT STREAMING",
    glowColor: "rgba(249, 115, 22, 0.28)",
    accentBorder: "border-orange-500/50",
    accentBg: "bg-orange-500/15",
    textAccent: "text-orange-400",
    activeRing: "border-orange-400 ring-2 ring-orange-400/80",
    activeShadow: "shadow-[0_0_24px_-2px_rgba(249,115,22,0.5)]",
    iconTint: "border-orange-400/50 bg-orange-500/15 text-orange-300",
    deviceType: "concept",
  },
  mirage: {
    shortTitle: "MIRAGE",
    category: "OFFENSIVE AI",
    tagline: "ADVERSARIAL AGENT EVALUATION",
    glowColor: "rgba(239, 68, 68, 0.28)",
    accentBorder: "border-red-500/50",
    accentBg: "bg-red-500/15",
    textAccent: "text-red-400",
    activeRing: "border-red-400 ring-2 ring-red-400/80",
    activeShadow: "shadow-[0_0_24px_-2px_rgba(239,68,68,0.5)]",
    iconTint: "border-red-400/50 bg-red-500/15 text-red-300",
    deviceType: "concept",
  },
  lifeos: {
    shortTitle: "LifeOS",
    category: "PERSONAL AI",
    tagline: "MULTI-AGENT PRODUCTIVITY SUITE",
    glowColor: "rgba(59, 130, 246, 0.28)",
    accentBorder: "border-blue-500/50",
    accentBg: "bg-blue-500/15",
    textAccent: "text-blue-400",
    activeRing: "border-blue-400 ring-2 ring-blue-400/80",
    activeShadow: "shadow-[0_0_24px_-2px_rgba(59,130,246,0.5)]",
    iconTint: "border-blue-400/50 bg-blue-500/15 text-blue-300",
    deviceType: "concept",
  },
  blackbox: {
    shortTitle: "BlackBox",
    category: "SECURITY AUDIT",
    tagline: "BINARY ANALYSIS & FORENSICS",
    glowColor: "rgba(161, 161, 170, 0.28)",
    accentBorder: "border-zinc-500/50",
    accentBg: "bg-zinc-500/15",
    textAccent: "text-zinc-300",
    activeRing: "border-zinc-300 ring-2 ring-zinc-300/80",
    activeShadow: "shadow-[0_0_24px_-2px_rgba(161,161,170,0.5)]",
    iconTint: "border-zinc-400/50 bg-zinc-500/15 text-zinc-300",
    deviceType: "concept",
  },
};

const DEFAULT_THEME: ProjectTheme = {
  shortTitle: "Project",
  category: "ENGINEERING",
  tagline: "TECHNICAL ARCHITECTURE",
  glowColor: "rgba(99, 102, 241, 0.25)",
  accentBorder: "border-indigo-500/50",
  accentBg: "bg-indigo-500/15",
  textAccent: "text-indigo-400",
  activeRing: "border-indigo-400 ring-2 ring-indigo-400/80",
  activeShadow: "shadow-[0_0_24px_-2px_rgba(99,102,241,0.5)]",
  iconTint: "border-indigo-400/50 bg-indigo-500/15 text-indigo-300",
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
