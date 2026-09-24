import { projects, type Project } from "@/data/projects";

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectCategories(): string[] {
  const categories = new Set<string>();
  for (const project of projects) {
    for (const tag of project.domainTags) categories.add(tag);
  }
  return Array.from(categories).sort();
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function hasDetailContent(project: Project): boolean {
  return project.description.length > 0;
}

export function getProjectStaticParams() {
  return projects.filter(hasDetailContent).map((project) => ({ slug: project.slug }));
}
