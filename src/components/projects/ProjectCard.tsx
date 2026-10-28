import Link from "next/link";
import type { Project } from "@/data/projects";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { hasDetailContent } from "@/lib/projectData";
import { ProjectMedia } from "./ProjectMedia";

function Corner({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-3 w-3 border-accent/60 pointer-events-none transition-colors duration-200 group-hover:border-accent ${className}`}
    />
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const clickable = hasDetailContent(project);
  const heightClass = "h-36 sm:h-40";

  const inner = (
    <div className="group relative flex h-full flex-col justify-between rounded-sm border border-border/80 bg-surface/30 p-3.5 sm:p-4 transition-all duration-300 hover:border-accent/60 hover:bg-surface/50">
      {/* 4 Golden Architectural Corner Brackets (Museum Plaque Style) */}
      <Corner className="top-0 left-0 border-t-2 border-l-2" />
      <Corner className="top-0 right-0 border-t-2 border-r-2" />
      <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
      <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

      {/* Top Header: Domain Mini-Tags & Status Badge */}
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {(project.slug === "ghostnet" || project.slug === "mirage" || project.slug === "lucid" ? project.domainTags : [project.domainTags[0]]).map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[9px] font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.status === "shipped" ? (
          <StatusBadge tone="success">
            <span className="text-[9px]">Shipped</span>
          </StatusBadge>
        ) : clickable ? (
          <StatusBadge>
            <span className="text-[9px]">Ongoing</span>
          </StatusBadge>
        ) : (
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-muted">
            Planned
          </span>
        )}
      </div>

      {/* Panoramic Preview (16:9 Widescreen) */}
      <div className="relative mb-2.5 w-full">
        <ProjectMedia project={project} heightClass={heightClass} />
      </div>

      {/* Bottom Content: Title & Short Crisp Explanatory Sentence */}
      <div className="mt-auto flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-serif text-base sm:text-lg font-bold text-foreground transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent">
            ↗
          </span>
        </div>
        {clickable && project.tagline && (
          <p className="line-clamp-2 font-sans text-xs leading-relaxed text-foreground/75">
            {project.tagline}
          </p>
        )}
      </div>
    </div>
  );

  if (!clickable) {
    return <div className="h-full opacity-70">{inner}</div>;
  }

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      {inner}
    </Link>
  );
}
