import type { Metadata } from "next";
import { ProjectsContent } from "@/components/projects/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects · Eren Tolga Tekin",
  description: "Selected projects, experiments and things built by Eren Tolga Tekin.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
