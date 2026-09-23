import type { Project } from "@/data/projects";
import { ProjectCarousel3D } from "@/components/home/ProjectCarousel3D";
import { SectionLabel } from "@/components/ui/Section";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionLabel>Exhibition</SectionLabel>
        <p className="mt-3 text-sm text-muted">
          Click a dot, or use the arrows, to bring a project forward.
        </p>
      </div>

      <ProjectCarousel3D projects={projects} />
    </div>
  );
}
