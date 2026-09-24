"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import { domainTagColor, shortTagLabel } from "@/lib/domainTagColors";
import { ProjectCard } from "./ProjectCard";

export function ProjectGallery({
  projects,
  planned,
  categories,
}: {
  projects: Project[];
  planned: Project[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>("All");
  const [showPlanned, setShowPlanned] = useState(false);
  const filters = ["All", ...categories];

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((project) => project.domainTags.includes(active));
  }, [projects, active]);

  return (
    <div className="mt-16">
      <h2 className="font-serif text-2xl font-semibold text-foreground">All Projects</h2>
      <p className="mt-1 text-sm text-muted">A complete collection of everything I&apos;ve built.</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              active === filter
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted hover:border-accent/50 hover:text-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {planned.length > 0 && (
        <div className="mt-14">
          <button
            type="button"
            onClick={() => setShowPlanned((v) => !v)}
            aria-expanded={showPlanned}
            className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-foreground"
          >
            <span className={`inline-block transition-transform ${showPlanned ? "rotate-90" : ""}`}>›</span>
            Upcoming projects ({planned.length})
          </button>

          {showPlanned && (
            <>
              <p className="mt-2 text-xs text-muted/80">Planned, not built yet. Each one moves up here once it ships.</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {planned.map((project) => (
                  <PlannedCard key={project.slug} project={project} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function PlannedCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface/30 p-3 opacity-80">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-serif text-base font-semibold text-foreground/90">{project.title}</h3>
        <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] tracking-wide text-muted uppercase">
          Planned
        </span>
      </div>
      <p className="mt-1 line-clamp-2 text-xs text-muted">{project.tagline}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {project.domainTags.map((tag) => (
          <span key={tag} className={`rounded-full border px-1.5 py-0.5 font-mono text-[9px] ${domainTagColor(tag)}`}>
            {shortTagLabel(tag)}
          </span>
        ))}
      </div>
    </div>
  );
}
