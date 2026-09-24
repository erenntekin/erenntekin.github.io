import Link from "next/link";
import type { Project } from "@/data/projects";
import { domainTagColor, shortTagLabel } from "@/lib/domainTagColors";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { hasDetailContent } from "@/lib/projectData";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectCard({ project }: { project: Project }) {
  const clickable = hasDetailContent(project);
  const heightClass = project.platform === "mobile" ? "h-48" : "h-40";

  const inner = (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-border bg-surface/60 p-4 transition-colors group-hover:border-accent">
      <ProjectMedia project={project} heightClass={heightClass} />
      <div className="mt-4 flex items-start justify-between gap-2">
        <h3 className="font-serif text-xl font-bold text-foreground transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        {project.status === "shipped" ? (
          <StatusBadge tone="success">
            <span className="text-[10px]">Shipped</span>
          </StatusBadge>
        ) : clickable ? (
          <StatusBadge>
            <span className="text-[10px]">Ongoing</span>
          </StatusBadge>
        ) : (
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] tracking-wide text-muted uppercase">
            Coming soon
          </span>
        )}
      </div>
      {clickable && project.tagline && (
        <p className="mt-1.5 line-clamp-2 text-sm text-foreground/70">{project.tagline}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.domainTags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-1.5 py-0.5 font-mono text-[9px] ${domainTagColor(tag)}`}
          >
            {shortTagLabel(tag)}
          </span>
        ))}
      </div>
    </div>
  );

  if (!clickable) {
    return <div className="group h-full opacity-70">{inner}</div>;
  }

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      {inner}
    </Link>
  );
}
