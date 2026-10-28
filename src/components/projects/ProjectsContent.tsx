"use client";

import { getAllProjects, getPlannedProjects, getProjectCategories } from "@/lib/projectData";
import { ProjectGallery } from "./ProjectGallery";

export function ProjectsContent() {
  const all = getAllProjects();
  const planned = getPlannedProjects();
  const categories = getProjectCategories();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <ProjectGallery projects={all} planned={planned} categories={categories} />
    </div>
  );
}
