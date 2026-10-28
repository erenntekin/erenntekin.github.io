import { projects, type Project } from "@/data/projects";

const ORDERED_SLUGS = [
  "mirage",
  "ghostnet",
  "genai-document-analysis",
  "lucid",
  "coldeye",
  "mybelly",
];

const visibleProjects = projects
  .filter((project) => project.status !== "planned")
  .sort((a, b) => {
    const ia = ORDERED_SLUGS.indexOf(a.slug);
    const ib = ORDERED_SLUGS.indexOf(b.slug);
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

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
