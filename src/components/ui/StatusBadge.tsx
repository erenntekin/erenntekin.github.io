import type { ReactNode } from "react";

const TONES = {
  accent: { border: "border-border", bg: "bg-surface/60", text: "text-muted", dot: "bg-accent" },
  success: {
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    text: "text-green-300",
    dot: "bg-green-400",
  },
} as const;

export function StatusBadge({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
}) {
  const c = TONES[tone];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${c.border} ${c.bg} ${c.text}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${c.dot}`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${c.dot}`} />
      </span>
      {children}
    </span>
  );
}
