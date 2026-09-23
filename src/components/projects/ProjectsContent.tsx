"use client";

import { useRef } from "react";
import { RevealOnMount } from "@/components/motion/RevealOnMount";
import { ScrollHint } from "@/components/home/ScrollHint";
import { getAllProjects, getFeaturedProjects, getProjectCategories } from "@/lib/projectData";
import { FeaturedShowcase } from "./FeaturedShowcase";
import { ProjectGallery } from "./ProjectGallery";

export function ProjectsContent() {
  const featured = getFeaturedProjects();
  const all = getAllProjects();
  const categories = getProjectCategories();
  const galleryRef = useRef<HTMLDivElement>(null);

  function scrollToGallery() {
    galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="h-[calc(100vh-72px)] snap-y snap-mandatory overflow-y-auto scroll-smooth">
      <section className="flex min-h-[calc(100vh-72px)] snap-start flex-col justify-center px-6 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <RevealOnMount>
            <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Projects</h1>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Selected works, experiments and things I&apos;ve built.
            </p>
          </RevealOnMount>

          {featured.length > 0 && (
            <RevealOnMount delay={0.1}>
              <FeaturedShowcase featured={featured} allProjects={all} />
            </RevealOnMount>
          )}

          <div className="mt-10 flex justify-center">
            <ScrollHint onClick={scrollToGallery} />
          </div>
        </div>
      </section>

      <section ref={galleryRef} className="snap-start px-6 pt-4 pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <ProjectGallery projects={all} categories={categories} />
        </div>
      </section>
    </div>
  );
}
