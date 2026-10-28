"use client";

import type { Project } from "@/data/projects";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { getProjectTheme, type ProjectTheme } from "@/lib/projectThemes";

function BlueprintConcept({ project, theme }: { project: Project; theme: ProjectTheme }) {
  const repoPath = project.links.repo?.replace(/^https?:\/\/github\.com\//, "");
  return (
    <div className="relative flex h-full w-full max-w-[340px] flex-col justify-between rounded-sm border border-border/80 bg-surface/90 p-4 shadow-2xl backdrop-blur select-none">
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

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

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
  const isWidescreen = resolvedSrc?.includes("film.mp4") || resolvedSrc?.includes("preview.mp4");

  // Mobile mockup specifically preserved for mobile projects (e.g. MyBelly)
  if (project.platform === "mobile" && !isWidescreen) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-[#07090e] p-3 select-none ${heightClass} ${className ?? ""}`}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.glowColor}, rgba(7, 9, 14, 0.98) 75%)`,
        }}
      >
        <PhoneMockup src={resolvedSrc ?? ""} alt={`${project.title} app`} playbackRate={playbackRate} />
      </div>
    );
  }

  // Clean direct media for all other projects (no nested box wrappers)
  if (resolvedSrc) {
    return (
      <div className={`relative w-full overflow-hidden rounded-sm border border-white/10 bg-[#060911] shadow-md select-none ${heightClass} ${className ?? ""}`}>
        {VIDEO_EXTENSIONS.test(resolvedSrc) ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={resolvedSrc}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <img
            src={resolvedSrc}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-[#060911] p-3 ${heightClass} ${className ?? ""}`}>
      <BlueprintConcept project={project} theme={theme} />
    </div>
  );
}
