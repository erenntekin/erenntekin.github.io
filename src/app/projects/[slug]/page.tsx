import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getProject, getProjectStaticParams, hasDetailContent } from "@/lib/projectData";

export function generateStaticParams() {
  return getProjectStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? `${project.title} · Eren Tolga Tekin` : "Project · Eren Tolga Tekin",
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !hasDetailContent(project)) notFound();
  return <ProjectDetail project={project} />;
}
