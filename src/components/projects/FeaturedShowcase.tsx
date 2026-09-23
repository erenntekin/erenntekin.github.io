"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { domainTagColor, shortTagLabel } from "@/lib/domainTagColors";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import { hasDetailContent } from "@/lib/projectData";
import { ProjectMedia } from "./ProjectMedia";
import { ZoomableImage } from "./ZoomableImage";

const MEDIA_INTERVAL_MS = 4200;
const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

function galleryFor(project: Project): string[] {
  const raw = [project.media.video, project.media.cover, ...project.media.screenshots.map((s) => s.src)];
  return Array.from(new Set(raw.filter((src): src is string => Boolean(src))));
}

export function FeaturedShowcase({
  featured,
  allProjects,
}: {
  featured: Project[];
  allProjects: Project[];
}) {
  const router = useRouter();
  const featuredSlugs = useMemo(() => featured.map((p) => p.slug), [featured]);
  const [activeSlug, setActiveSlug] = useState(featured[0]?.slug ?? allProjects[0].slug);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const project = allProjects.find((p) => p.slug === activeSlug) ?? allProjects[0];
  const clickable = hasDetailContent(project);
  const overview = project.description[0] ?? project.summary;
  const mediaGallery = useMemo(() => galleryFor(project), [project]);
  const currentSrc = mediaGallery[mediaIndex];

  useEffect(() => {
    setMediaIndex(0);
  }, [activeSlug]);

  useEffect(() => {
    if (paused || mediaGallery.length === 0) return;
    const id = setTimeout(() => {
      setMediaIndex((i) => {
        const next = i + 1;
        if (next >= mediaGallery.length) {
          const fi = featuredSlugs.indexOf(activeSlug);
          if (fi !== -1 && featuredSlugs.length > 1) {
            setActiveSlug(featuredSlugs[(fi + 1) % featuredSlugs.length]);
          }
          return 0;
        }
        return next;
      });
    }, MEDIA_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [mediaIndex, paused, mediaGallery.length, activeSlug, featuredSlugs]);

  function step(delta: number) {
    const i = allProjects.findIndex((p) => p.slug === activeSlug);
    const next = (i + delta + allProjects.length) % allProjects.length;
    setActiveSlug(allProjects[next].slug);
  }

  function handleCardClick() {
    if (clickable) router.push(`/projects/${project.slug}`);
  }

  return (
    <div className="mt-10">
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role={clickable ? "link" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={(e) => {
          if (clickable && (e.key === "Enter" || e.key === " ")) handleCardClick();
        }}
        className={`group grid gap-6 overflow-hidden rounded-2xl border-2 border-accent bg-surface/80 p-6 shadow-2xl shadow-black/40 transition-shadow sm:grid-cols-[1.2fr_1fr] sm:p-8 ${
          clickable ? "cursor-pointer hover:shadow-[0_0_32px_-4px_var(--accent)]" : ""
        }`}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${project.slug}-${mediaIndex}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {!currentSrc || VIDEO_EXTENSIONS.test(currentSrc) ? (
                <ProjectMedia project={project} heightClass="h-[clamp(140px,22vw,256px)]" src={currentSrc} />
              ) : (
                <ZoomableImage src={currentSrc} alt={project.title} className="block w-full">
                  <ProjectMedia project={project} heightClass="h-[clamp(140px,22vw,256px)]" src={currentSrc} />
                </ZoomableImage>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col justify-center"
          >
            <span className="w-fit rounded-full border border-accent/50 px-2 py-0.5 text-[10px] tracking-widest text-accent uppercase">
              Featured
            </span>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground transition-colors group-hover:text-accent sm:text-3xl">
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-foreground/80">{overview}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.domainTags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${domainTagColor(tag)}`}
                >
                  {shortTagLabel(tag)}
                </span>
              ))}
            </div>

            <div className="relative z-10 mt-5 flex flex-wrap items-center gap-3">
              {clickable && (
                <span className="rounded-full border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                  View project →
                </span>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  Live demo
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {allProjects.length > 1 && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous project"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent transition-colors hover:bg-accent/10"
          >
            ←
          </button>

          <div className="marquee-fade flex-1 overflow-hidden">
            <div className="marquee-track flex w-max gap-4">
              {[...allProjects, ...allProjects].map((p, i) => (
                <button
                  key={`${p.slug}-${i}`}
                  type="button"
                  onClick={() => setActiveSlug(p.slug)}
                  className={`relative h-[clamp(64px,9vw,96px)] w-[clamp(112px,14vw,144px)] min-w-0 shrink-0 overflow-hidden rounded-lg border-2 bg-surface text-left transition-colors ${
                    p.slug === project.slug ? "border-accent" : "border-border hover:border-accent/50"
                  }`}
                >
                  {p.media.cover ? (
                    <img
                      src={p.media.cover}
                      alt=""
                      className={`absolute inset-0 h-full w-full ${p.platform === "mobile" ? "object-contain" : "object-cover"}`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-surface text-xs text-muted">
                      Coming soon
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-2.5 pt-8 pb-2">
                    <p
                      className={`truncate font-serif text-sm font-semibold ${p.slug === project.slug ? "text-accent" : "text-white"}`}
                    >
                      {p.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next project"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent transition-colors hover:bg-accent/10"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
