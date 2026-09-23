"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGallery({ projects, categories }: { projects: Project[]; categories: string[] }) {
  const [active, setActive] = useState<string>("All");
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
    </div>
  );
}
