"use client";

import Link from "next/link";
import type { Project, ProgressState } from "@/data/projects";
import { RevealOnMount } from "@/components/motion/RevealOnMount";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { domainTagColor, shortTagLabel } from "@/lib/domainTagColors";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { ZoomableImage } from "./ZoomableImage";
import { ProjectMedia } from "./ProjectMedia";
import { StaggerList } from "./StaggerList";
import { AmbientGlow } from "./AmbientGlow";
import { Walkthrough } from "./Walkthrough";
import { SectionNav } from "./SectionNav";
import { LimitBarriers } from "./LimitBarriers";
import { RoadmapTrail } from "./RoadmapTrail";

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

const PROGRESS_STYLES: Record<ProgressState, { label: string; pill: string; card: string; bar: string }> = {
  done: {
    label: "Done",
    pill: "border-green-500/30 bg-green-500/10 text-green-300",
    card: "border-border bg-surface/30",
    bar: "bg-green-400",
  },
  "in-progress": {
    label: "In progress",
    pill: "border-accent/50 bg-accent/10 text-accent",
    card: "border-accent/40 bg-surface/30",
    bar: "bg-accent",
  },
  planned: {
    label: "Not started",
    pill: "border-border text-muted",
    card: "border-dashed border-border",
    bar: "bg-border",
  },
};

function balancedGrid(count: number) {
  if (count > 1 && count % 3 === 0) return "lg:grid-cols-3";
  if (count % 2 === 0) return "sm:grid-cols-2";
  return "";
}

export function ProjectDetail({ project }: { project: Project }) {
  const heroSrc = project.media.cover ?? project.media.video;
  const heroIsVideo = Boolean(heroSrc && VIDEO_EXTENSIONS.test(heroSrc));

  const allNotes = project.designNotes ?? [];
  const illustrated = allNotes.filter((n) => n.screenshot);
  const quietNotes = allNotes.filter((n) => !n.screenshot);
  const hasLimitations = Boolean(project.limitations && project.limitations.length > 0);
  const hasRoadmap = Boolean(project.roadmap && project.roadmap.length > 0);
  const progressItems = project.progress?.items ?? [];
  const doneCount = progressItems.filter((p) => p.state === "done").length;

  const navSections = [
    project.description.length > 0 && { id: "overview", label: "Overview" },
    progressItems.length > 0 && { id: "progress", label: "Progress" },
    project.media.video && { id: "demo", label: "Demo" },
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
            <ProjectMedia project={project} heightClass="h-[clamp(220px,30vw,320px)]" />
          ) : project.platform === "mobile" && !heroSrc.includes("film.mp4") ? (
            <div className="flex justify-center h-[380px] sm:h-[460px]">
              <PhoneMockup src={heroSrc} alt={project.title} playbackRate={project.media.videoRate} />
            </div>
          ) : heroIsVideo ? (
            <div className="flex justify-center">
              <BrowserMockup src={heroSrc} alt={project.title} className="w-full max-w-4xl aspect-[16/10] shadow-2xl" />
            </div>
          ) : (
            <ZoomableImage src={heroSrc} alt={project.title} className="block w-full">
              <div className="flex justify-center">
                <BrowserMockup src={heroSrc} alt={project.title} className="w-full max-w-4xl aspect-[16/10] shadow-2xl" />
              </div>
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
          {project.status === "ongoing" && (
            <StatusBadge>
              <span className="text-[10px]">
                Work in progress{project.progress ? ` · updated ${project.progress.updated}` : ""}
              </span>
            </StatusBadge>
          )}
        </div>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">{project.title}</h1>
        <p className="mt-2 text-base text-foreground/80">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.media.video && (
            <a
              href="#demo"
              className="flex items-center gap-2 rounded-full border border-accent bg-accent/15 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/25"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch demo
            </a>
          )}
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
              className="flex items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-sm text-accent transition-colors hover:border-accent hover:bg-accent/10"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Live demo
            </a>
          )}
        </div>

      </RevealOnMount>

      {project.description.length > 0 && (
        <div id="overview" className="mt-10 scroll-mt-28 border-t border-border pt-8">
          <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Overview</p>
          <h2 className="mt-1.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">The pitch</h2>
          <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-2xl border border-border/80 bg-surface/25 backdrop-blur-sm md:grid-cols-[1.6fr_1fr]">
            <div className="space-y-3 p-5 sm:p-6">
              {project.description.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={`text-[15px] leading-relaxed ${i === 0 ? "text-foreground/90" : "text-foreground/65"}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <dl className="divide-y divide-border/60 border-t border-border/70 md:border-t-0 md:border-l">
              {[
                { label: "Platform", value: project.platform === "mobile" ? "Mobile app" : "Web app" },
                { label: "Status", value: project.status === "ongoing" ? "In progress" : "Shipped" },
                { label: "Domain", value: project.domainTags.join(" · ") },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 px-5 py-3 sm:px-6">
                  <dt className="font-mono text-[10px] tracking-widest text-muted uppercase">{row.label}</dt>
                  <dd className="flex items-center gap-2 text-right text-sm text-foreground/85">
                    {row.label === "Status" && (
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          project.status === "ongoing" ? "bg-amber-400" : "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]"
                        }`}
                      />
                    )}
                    {row.value}
                  </dd>
                </div>
              ))}
              {project.stack.length > 0 && (
                <div className="px-5 py-3 sm:px-6">
                  <dt className="font-mono text-[10px] tracking-widest text-muted uppercase">Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/80 bg-background/50 px-2 py-0.5 font-mono text-[11px] text-foreground/75"
                      >
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
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

      {progressItems.length > 0 && (
        <div id="progress" className="mt-14 scroll-mt-28 border-t border-border pt-8">
          <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Progress</p>
          <h2 className="mt-1.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Where it stands today
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            {doneCount} of {progressItems.length} work packages done. Still in progress.
          </p>
          <div className="mt-5 flex gap-1.5" aria-hidden="true">
            {progressItems.map((p) => (
              <span key={p.title} className={`h-1.5 flex-1 rounded-full ${PROGRESS_STYLES[p.state].bar}`} />
            ))}
          </div>
          <StaggerList
            items={progressItems}
            keyFn={(p) => p.title}
            as="div"
            itemAs="div"
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            itemClassName="h-full"
            renderItem={(p) => (
              <div
                className={`h-full rounded-xl border p-5 transition-colors hover:border-accent/50 ${PROGRESS_STYLES[p.state].card}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{p.title}</p>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] ${PROGRESS_STYLES[p.state].pill}`}
                  >
                    {PROGRESS_STYLES[p.state].label}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{p.note}</p>
              </div>
            )}
          />
        </div>
      )}

      {project.media.video && (
        <div id="demo" className="mt-14 scroll-mt-28 border-t border-border pt-8">
          <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Demo</p>
          <h2 className="mt-1.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Watch the product in action
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            {project.media.videoNote ?? "Full walkthrough with architecture narration and live interface."}
          </p>
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-black/80 shadow-2xl">
            <video
              controls
              playsInline
              preload="auto"
              poster={project.media.videoPoster}
              className="aspect-video w-full object-contain bg-black"
              src={project.media.video}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {(illustrated.length > 0 || quietNotes.length > 0) && (
        <div id="how-it-works" className="mt-14 scroll-mt-28 border-t border-border pt-8">
          <p className="font-mono text-[10px] tracking-widest text-accent uppercase">How it works</p>
          <h2 className="mt-1.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            The build, piece by piece
          </h2>
          {illustrated.length > 0 && <Walkthrough project={project} notes={illustrated} />}

          {quietNotes.length > 0 && (
            <StaggerList
              items={quietNotes}
              keyFn={(note) => note.title}
              as="div"
              itemAs="div"
              className={`grid grid-cols-1 gap-3 ${balancedGrid(quietNotes.length)} ${
                illustrated.length > 0 ? "mt-12 border-t border-border pt-8" : "mt-6"
              }`}
              itemClassName="group h-full rounded-2xl border border-border/80 bg-surface/25 p-5 backdrop-blur-sm transition-colors hover:border-accent/40"
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
        </div>
      )}

      {hasLimitations && (
        <div id="limitations" className="mt-14 scroll-mt-28 border-t border-border pt-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            <p className="font-mono text-[10px] tracking-widest text-amber-400 uppercase">Limitations & Trade-offs</p>
          </div>
          <h2 className="mt-1.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Where it falls short</h2>
          <p className="mt-2 text-sm text-foreground/70">Known architectural constraints and engineering boundaries.</p>
          <LimitBarriers project={project} />
        </div>
      )}

      {hasRoadmap && (
        <div id="whats-next" className="mt-14 scroll-mt-28 border-t border-border pt-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
            <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Roadmap & Vision</p>
          </div>
          <h2 className="mt-1.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Where this goes next</h2>
          <p className="mt-2 text-sm text-foreground/70">The planned evolution, architectural next steps.</p>
          <RoadmapTrail project={project} />
        </div>
      )}
    </div>
  );
}
