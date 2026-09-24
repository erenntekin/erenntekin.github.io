"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { RevealOnMount } from "@/components/motion/RevealOnMount";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { domainTagColor, shortTagLabel } from "@/lib/domainTagColors";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { ZoomableImage } from "./ZoomableImage";
import { ProjectMedia } from "./ProjectMedia";
import { StaggerList } from "./StaggerList";
import { AmbientGlow } from "./AmbientGlow";
import { Walkthrough } from "./Walkthrough";
import { SectionNav } from "./SectionNav";

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

export function ProjectDetail({ project }: { project: Project }) {
  const heroSrc = project.media.video ?? project.media.cover;
  const heroIsVideo = Boolean(heroSrc && VIDEO_EXTENSIONS.test(heroSrc));

  const allNotes = project.designNotes ?? [];
  const illustrated = allNotes.filter((n) => n.screenshot);
  const quietNotes = allNotes.filter((n) => !n.screenshot);
  const hasLimitations = Boolean(project.limitations && project.limitations.length > 0);
  const hasRoadmap = Boolean(project.roadmap && project.roadmap.length > 0);

  const navSections = [
    project.description.length > 0 && { id: "overview", label: "Overview" },
    (illustrated.length > 0 || quietNotes.length > 0) && { id: "how-it-works", label: "How it works" },
    hasLimitations && { id: "limitations", label: "Limitations" },
    hasRoadmap && { id: "whats-next", label: "What's next" },
  ].filter((s): s is { id: string; label: string } => Boolean(s));

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 pl-10 sm:pr-6 sm:pl-36 sm:py-20 lg:pl-44 xl:px-6">
      <SectionNav sections={navSections} />

      <RevealOnMount>
        <Link href="/projects" className="text-xs text-muted transition-colors hover:text-accent">
          ← Back to projects
        </Link>
      </RevealOnMount>

      <RevealOnMount delay={0.1}>
        <div className="relative mt-5">
          <AmbientGlow />
          {!heroSrc ? (
            <ProjectMedia project={project} heightClass="h-[clamp(180px,26vw,256px)]" />
          ) : heroIsVideo ? (
            <ProjectMedia project={project} heightClass="h-[clamp(200px,32vw,420px)]" src={heroSrc} />
          ) : (
            <ZoomableImage src={heroSrc} alt={project.title} className="block w-full">
              <ProjectMedia project={project} heightClass="h-[clamp(200px,32vw,420px)]" src={heroSrc} />
            </ZoomableImage>
          )}
        </div>
      </RevealOnMount>

      <RevealOnMount delay={0.15}>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.domainTags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${domainTagColor(tag)}`}
            >
              {shortTagLabel(tag)}
            </span>
          ))}
        </div>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">{project.title}</h1>
        <p className="mt-2 text-base text-foreground/80">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-sm text-accent transition-colors hover:border-accent hover:bg-accent/10"
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
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-sm text-accent transition-colors hover:border-accent hover:bg-accent/10"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Live demo
            </a>
          )}
        </div>

        {project.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface/30 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </RevealOnMount>

      {project.description.length > 0 && (
        <div id="overview" className="mt-10 scroll-mt-28 border-t border-border pt-8">
          <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Overview</p>
          <h2 className="mt-1.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">The pitch</h2>
          <StaggerList
            items={project.description}
            keyFn={(p) => p}
            as="div"
            itemAs="div"
            className="mt-4 max-w-2xl space-y-3 text-sm text-foreground/80"
            renderItem={(paragraph) => <p>{paragraph}</p>}
          />
        </div>
      )}

      {project.stats && project.stats.length > 0 && (
        <StaggerList
          items={project.stats}
          keyFn={(s) => s.label}
          as="div"
          itemAs="div"
          className="mt-10 grid grid-cols-3 gap-3 border-t border-border pt-6"
          itemClassName="rounded-lg border border-border bg-surface/30 px-3 py-3 transition-colors hover:border-accent/40 sm:px-4"
          renderItem={(stat) => <AnimatedStat label={stat.label} value={stat.value} />}
        />
      )}

      {(illustrated.length > 0 || quietNotes.length > 0) && (
        <div id="how-it-works" className="mt-14 scroll-mt-28 border-t border-border pt-8">
          <p className="font-mono text-[10px] tracking-widest text-accent uppercase">How it works</p>
          <h2 className="mt-1.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            The build, piece by piece
          </h2>
          {illustrated.length > 0 && <Walkthrough project={project} notes={illustrated} />}

          {quietNotes.length > 0 && illustrated.length === 0 && (
            <StaggerList
              items={quietNotes}
              keyFn={(note) => note.title}
              as="div"
              itemAs="div"
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
              itemClassName="group rounded-xl border border-border bg-surface/30 p-5 transition-colors hover:border-accent/40"
              renderItem={(note) => (
                <>
                  <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform group-hover:scale-150" />
                    {note.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{note.body}</p>
                </>
              )}
            />
          )}

          {quietNotes.length > 0 && illustrated.length > 0 && (
            <StaggerList
              items={quietNotes}
              keyFn={(note) => note.title}
              as="div"
              itemAs="div"
              className="mt-12 grid grid-cols-1 gap-x-10 gap-y-5 border-t border-border pt-8 sm:grid-cols-2"
              itemClassName="group"
              renderItem={(note) => (
                <>
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground/90">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent transition-transform group-hover:scale-150" />
                    {note.title}
                  </p>
                  <p className="mt-1.5 pl-3 text-xs leading-relaxed text-muted">{note.body}</p>
                </>
              )}
            />
          )}
        </div>
      )}

      {hasLimitations && (
        <div id="limitations" className="mt-14 scroll-mt-28 border-t border-border pt-8">
          <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Limitations</p>
          <h2 className="mt-1.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Where it falls short
          </h2>
          <p className="mt-2 text-sm text-foreground/70">Open items, acknowledged rather than hidden.</p>
          <StaggerList
            items={project.limitations!.map((item, i) => ({ item, i }))}
            keyFn={({ item }) => item}
            as="div"
            itemAs="div"
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            itemClassName="group flex items-start gap-4 rounded-xl border border-dashed border-border p-5 transition-colors hover:border-accent/50"
            renderItem={({ item, i }) => (
              <>
                <span className="shrink-0 font-serif text-3xl font-semibold text-border transition-colors group-hover:text-accent/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-base text-foreground/80">{item}</p>
              </>
            )}
          />
        </div>
      )}

      {hasRoadmap && (
        <div id="whats-next" className="mt-14 scroll-mt-28 border-t border-border pt-8">
          <p className="font-mono text-[10px] tracking-widest text-accent uppercase">What&apos;s next</p>
          <h2 className="mt-1.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Where this goes next
          </h2>
          <p className="mt-2 text-sm text-foreground/70">The path from here, in order.</p>
          <StaggerList
            items={project.roadmap!.map((item, i) => ({ item, i }))}
            keyFn={({ item }) => item}
            as="div"
            itemAs="div"
            className="mt-6 space-y-4"
            itemClassName="group flex items-center gap-5 rounded-xl border border-border bg-surface/30 p-5 transition-all hover:border-accent hover:bg-surface/50"
            renderItem={({ item, i }) => (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-accent/70 font-serif text-lg font-semibold text-accent transition-colors group-hover:border-accent">
                  {i + 1}
                </span>
                <p className="text-base text-foreground/80 transition-colors group-hover:text-foreground">{item}</p>
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}
