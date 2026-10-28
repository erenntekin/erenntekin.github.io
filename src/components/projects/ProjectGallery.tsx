"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import { shortTagLabel } from "@/lib/domainTagColors";
import { ProjectCard } from "./ProjectCard";

export function ProjectGallery({
  projects,
  planned,
}: {
  projects: Project[];
  planned: Project[];
  categories?: string[];
}) {
  const [showPlanned, setShowPlanned] = useState(false);

  return (
    <div>
      {/* Header Row: Clean Title */}
      <div className="border-b border-border/70 pb-6">
        <h1 className="font-serif text-2xl font-semibold text-accent sm:text-3xl">
          Projects
        </h1>
      </div>

      {/* Proportional 3-Column Responsive Architectural Grid */}
      <div className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {planned.length > 0 && (
        <div className="mt-14 border-t border-border/60 pt-6">
          <button
            type="button"
            onClick={() => setShowPlanned((v) => !v)}
            aria-expanded={showPlanned}
            className="flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-foreground"
          >
            <span className={`inline-block transition-transform ${showPlanned ? "rotate-90" : ""}`}>›</span>
            Upcoming projects ({planned.length})
          </button>

          {showPlanned && (
            <>
              <p className="mt-2 font-sans text-xs text-muted/80">
                Planned architectures in specification phase. Each project moves into the gallery once shipped.
              </p>
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
    <div className="relative rounded-sm border border-dashed border-border/80 bg-surface/20 p-4 opacity-80 transition-colors hover:border-accent/40">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-sans text-sm font-semibold text-foreground/90">{project.title}</h3>
        <span className="shrink-0 rounded-sm border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-muted">
          Planned
        </span>
      </div>
      <p className="mt-1 line-clamp-2 font-sans text-xs text-muted">{project.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
        {project.domainTags.map(shortTagLabel).map((tag) => (
          <span
            key={tag}
            className="rounded-sm border border-border/60 bg-surface/40 px-1.5 py-0.5 font-mono text-[9px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
