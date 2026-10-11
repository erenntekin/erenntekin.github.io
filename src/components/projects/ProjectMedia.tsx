"use client";

import type { Project } from "@/data/projects";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { getProjectTheme, type ProjectTheme } from "@/lib/projectThemes";

function ColdeyeConcept({ theme }: { theme: ProjectTheme }) {
  return (
    <div className="relative flex h-full w-full max-w-[360px] flex-col justify-between rounded-lg border border-rose-500/30 bg-[#0d070b]/90 p-3.5 shadow-2xl shadow-rose-950/40 backdrop-blur font-mono select-none">
      {/* Top HUD bar */}
      <div className="flex items-center justify-between border-b border-rose-500/20 pb-2 text-[9px] text-rose-400/80">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
          <span>CAM_FEED // 01 [LIVE]</span>
        </div>
        <span className="text-rose-400/60">30 FPS · 1080p</span>
      </div>

      {/* Center Viewfinder / Detection Bounding Box */}
      <div className="relative my-2 flex flex-1 flex-col items-center justify-center overflow-hidden rounded border border-dashed border-rose-500/30 bg-rose-950/10 p-3">
        {/* Radar concentric ring */}
        <div className="pointer-events-none absolute h-24 w-24 rounded-full border border-rose-500/15" />
        <div className="pointer-events-none absolute h-36 w-36 rounded-full border border-rose-500/10" />

        {/* Target Bounding Box */}
        <div className="relative rounded border border-rose-400/70 bg-rose-500/10 px-3 py-2 text-center shadow-[0_0_12px_rgba(244,63,94,0.25)]">
          <div className="text-[10px] font-bold tracking-wider text-rose-300">
            [ TARGET #042 // RE-ID ]
          </div>
          <div className="mt-0.5 text-[8px] text-rose-300/80">
            CONFIDENCE: 98.4% · MATCH CAM_02
          </div>
        </div>

        {/* Crosshair accents */}
        <span className="absolute top-1 left-1 text-[8px] text-rose-500/50">+</span>
        <span className="absolute top-1 right-1 text-[8px] text-rose-500/50">+</span>
        <span className="absolute bottom-1 left-1 text-[8px] text-rose-500/50">+</span>
        <span className="absolute bottom-1 right-1 text-[8px] text-rose-500/50">+</span>
      </div>

      {/* Bottom Pipeline Stack */}
      <div className="flex items-center justify-between border-t border-rose-500/20 pt-2 text-[8px] text-rose-300/80">
        <span className="text-rose-400 font-semibold">YOLO · ByteTrack · DeepLabV3</span>
        <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-rose-300">EDGE AI</span>
      </div>
    </div>
  );
}

function BlueprintConcept({ project, theme }: { project: Project; theme: ProjectTheme }) {
  const repoPath = project.links.repo?.replace(/^https?:\/\/github\.com\//, "");
  return (
    <div className="relative flex h-full w-full max-w-[340px] flex-col justify-between rounded-lg border border-border/80 bg-surface/90 p-4 shadow-2xl backdrop-blur select-none">
      <div className="flex items-center justify-between border-b border-border/60 pb-2 text-[9px] font-mono text-muted/70">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>{theme.category}</span>
        </div>
        <span className="uppercase text-[8px]">{project.status}</span>
      </div>

      <div className="my-auto py-2 text-center">
        <span className="font-serif text-xl font-bold text-foreground sm:text-2xl">
          {project.title}
        </span>
        <p className="mt-1 font-mono text-[10px] text-muted">
          {theme.tagline}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[9px]">
        {repoPath ? (
          <span className="truncate text-muted">{repoPath}</span>
        ) : (
          <span className="text-accent/90">Private repo · code on request</span>
        )}
        <span className="text-muted/60">{project.stack.slice(0, 2).join(" · ")}</span>
      </div>
    </div>
  );
}

export function ProjectMedia({
  project,
  heightClass,
  className,
  src,
}: {
  project: Project;
  heightClass: string;
  className?: string;
  src?: string;
}) {
  const resolvedSrc = src ?? project.media.cover;
  const theme = getProjectTheme(project.slug, project.title);
  const playbackRate = resolvedSrc === project.media.video ? project.media.videoRate : undefined;
  const isWidescreen = resolvedSrc?.includes("film.mp4");

  return (
    <div
      className={`group/stage relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-[#07090e] p-3 sm:p-4 select-none ${heightClass} ${className ?? ""}`}
      style={{
        background: `radial-gradient(circle at 50% 50%, ${theme.glowColor}, rgba(7, 9, 14, 0.98) 75%)`,
      }}
    >
      {/* Subtle dotted matrix background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:14px_14px]"
      />

      {/* Stage Watermark header */}
      <div className="pointer-events-none absolute top-2 inset-x-3 z-10 flex items-center justify-between font-mono text-[8px] sm:text-[9px] tracking-wider text-muted/60">
        <span className="truncate uppercase font-medium">{theme.tagline}</span>
        <span className="ml-2 shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono uppercase text-[8px] text-muted/80">
          {project.platform}
        </span>
      </div>

      {/* Stage Canvas / Device Display */}
      <div className="relative flex h-full w-full items-center justify-center pt-4 pb-0.5">
        {project.platform === "mobile" && !isWidescreen ? (
          <PhoneMockup src={resolvedSrc ?? ""} alt={`${project.title} app`} playbackRate={playbackRate} />
        ) : resolvedSrc ? (
          <BrowserMockup
            src={resolvedSrc}
            alt={`${project.title} preview`}
            className="h-full w-auto max-h-full max-w-full aspect-[16/10] shadow-2xl"
          />
        ) : project.slug === "coldeye" ? (
          <ColdeyeConcept theme={theme} />
        ) : (
          <BlueprintConcept project={project} theme={theme} />
        )}
      </div>
    </div>
  );
}
