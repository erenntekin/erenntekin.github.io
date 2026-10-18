"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { domainTagColor, shortTagLabel } from "@/lib/domainTagColors";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { hasDetailContent } from "@/lib/projectData";
import { getProjectTheme } from "@/lib/projectThemes";
import { ProjectMedia } from "./ProjectMedia";
import { ZoomableImage } from "./ZoomableImage";

const MEDIA_INTERVAL_MS = 4200;
// Each half of the marquee track must be wider than the strip itself, or a gap shows before it loops.
const MARQUEE_MIN_TILES = 10;
const MARQUEE_SECONDS_PER_TILE = 4.5;
const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

function galleryFor(project: Project): string[] {
  if (project.slug === "ghostnet" || project.slug === "mirage") {
    return project.media.cover ? [project.media.cover] : [];
  }
  const raw = [project.media.cover, ...project.media.screenshots.map((s) => s.src)];
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
  const marqueeHalf = useMemo(() => {
    const repeats = Math.max(1, Math.ceil(MARQUEE_MIN_TILES / allProjects.length));
    return Array.from({ length: repeats }, () => allProjects).flat();
  }, [allProjects]);

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
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${project.slug}-${mediaIndex}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ProjectMedia project={project} heightClass="h-[clamp(260px,32vw,380px)]" src={currentSrc} />
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
              {project.links.repo && !project.links.repoPrivate && (
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
              {project.links.repoPrivate && (
                <span className="flex items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-sm text-accent">
                  <GitHubIcon className="h-4 w-4" />
                  Private repo · code on request
                </span>
              )}
              {project.links.demoPrivate && (
                <span className="flex items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-sm text-accent">
                  <GlobeIcon className="h-4 w-4" />
                  Web app · access on request
                </span>
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
            <div
              className="marquee-track flex w-max"
              style={{ animationDuration: `${marqueeHalf.length * MARQUEE_SECONDS_PER_TILE}s` }}
            >
              {[...marqueeHalf, ...marqueeHalf].map((p, i) => {
                const pTheme = getProjectTheme(p.slug, p.title);
                const isSelected = p.slug === project.slug;

                return (
                  <button
                    key={`${p.slug}-${i}`}
                    type="button"
                    onClick={() => setActiveSlug(p.slug)}
                    style={{
                      background: `radial-gradient(circle at 50% 25%, ${pTheme.glowColor}, rgba(8, 10, 15, 0.98) 85%)`,
                    }}
                    className={`group/tile relative mr-4 flex h-[clamp(70px,9.2vw,96px)] w-[clamp(124px,15vw,160px)] min-w-0 shrink-0 flex-col justify-between overflow-hidden rounded-xl border-2 p-2.5 text-left transition-all ${
                      isSelected
                        ? `${pTheme.activeRing} ${pTheme.activeShadow} opacity-100`
                        : "border-border/70 opacity-80 hover:border-white/20 hover:opacity-100"
                    }`}
                  >
                    {/* Micro top header */}
                    <div className="flex items-center justify-between font-mono text-[8.5px]">
                      <span className={`truncate font-semibold tracking-wider uppercase ${isSelected ? pTheme.textAccent : "text-muted/80"}`}>
                        {pTheme.category}
                      </span>
                      <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? `${pTheme.textAccent} shadow-[0_0_6px_currentColor]` : "bg-white/20"}`} />
                    </div>

                    {/* Center device icon / silhouette with project accent */}
                    <div className="flex flex-1 items-center justify-center py-0.5">
                      {pTheme.deviceType === "mobile" ? (
                        <div className={`flex h-6 w-4 flex-col justify-between rounded-[3px] border p-0.5 shadow-xs transition-colors ${isSelected ? "border-amber-400/80 bg-amber-500/20" : "border-amber-500/30 bg-amber-500/10"}`}>
                          <div className="mx-auto h-0.5 w-1.5 rounded-full bg-white/40" />
                          <div className="mx-auto h-1 w-1 rounded-full bg-amber-400" />
                        </div>
                      ) : pTheme.deviceType === "browser" ? (
                        <div className={`flex h-5.5 w-9 flex-col rounded-[3px] border p-0.5 shadow-xs transition-colors ${
                          p.slug === "ghostnet"
                            ? isSelected ? "border-cyan-400/80 bg-cyan-500/20" : "border-cyan-500/30 bg-cyan-500/10"
                            : p.slug === "mirage"
                            ? isSelected ? "border-red-400/80 bg-red-500/20" : "border-red-500/30 bg-red-500/10"
                            : isSelected ? "border-emerald-400/80 bg-emerald-500/20" : "border-emerald-500/30 bg-emerald-500/10"
                        }`}>
                          <div className="flex items-center gap-0.5 border-b border-white/10 pb-0.5">
                            <span className="h-1 w-1 rounded-full bg-red-400/90" />
                            <span className="h-1 w-1 rounded-full bg-amber-400/90" />
                            <span className="h-1 w-1 rounded-full bg-emerald-400/90" />
                          </div>
                          <div className={`mt-0.5 flex-1 rounded-[1px] ${isSelected ? "bg-white/15" : "bg-white/5"}`} />
                        </div>
                      ) : (
                        <div className={`flex h-5.5 w-9 items-center justify-center rounded-[3px] border border-dashed transition-colors ${isSelected ? "border-rose-400 bg-rose-500/20" : "border-rose-500/40 bg-rose-500/10"}`}>
                          <span className="font-mono text-[7px] font-bold text-rose-400">CV · LAB</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom title with matching theme accent */}
                    <div className="truncate">
                      <p
                        className={`truncate font-serif text-xs font-semibold sm:text-sm transition-colors ${
                          isSelected ? `${pTheme.textAccent} font-bold` : "text-foreground/90"
                        }`}
                      >
                        {pTheme.shortTitle}
                      </p>
                    </div>
                  </button>
                );
              })}
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
