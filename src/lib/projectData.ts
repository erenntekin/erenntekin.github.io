import { projects, type Project } from "@/data/projects";

const visibleProjects = projects.filter((project) => project.status !== "planned");

export function getFeaturedProjects(): Project[] {
  return visibleProjects.filter((project) => project.featured);
}

export function getAllProjects(): Project[] {
  return visibleProjects;
}

export function getPlannedProjects(): Project[] {
  return projects.filter((project) => project.status === "planned");
}

export function getProjectCategories(): string[] {
  const categories = new Set<string>();
  for (const project of visibleProjects) {
    for (const tag of project.domainTags) categories.add(tag);
  }
  return Array.from(categories).sort();
}

export function getProject(slug: string): Project | undefined {
  return visibleProjects.find((project) => project.slug === slug);
}

export function hasDetailContent(project: Project): boolean {
  return project.status !== "planned" && project.description.length > 0;
}

export function getProjectStaticParams() {
  return visibleProjects.filter(hasDetailContent).map((project) => ({ slug: project.slug }));
}
