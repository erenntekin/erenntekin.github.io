"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { Project } from "@/data/projects";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { domainTagColor, shortTagLabel } from "@/lib/domainTagColors";

function Mockup({
  project,
  heightClass,
  className,
}: {
  project: Project;
  heightClass: string;
  className?: string;
}) {
  if (!project.media.cover) {
    return (
      <div
        className={`flex w-full items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted ${heightClass} ${className ?? ""}`}
      >
        Preview coming soon
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center ${heightClass} ${className ?? ""}`}>
      {project.platform === "mobile" ? (
        <PhoneMockup src={project.media.cover} alt={`${project.title} app`} />
      ) : (
        <BrowserMockup src={project.media.cover} alt={`${project.title} dashboard`} />
      )}
    </div>
  );
}

function DomainTags({ project }: { project: Project }) {
  const themeTags = project.themeTags ?? [];
  const remaining = Math.max(0, 3 - project.domainTags.length);

  return (
    <div className="mt-3 flex flex-nowrap items-center gap-1 overflow-hidden">
      {project.domainTags.map((tag) => (
        <span
          key={tag}
          className={`shrink-0 rounded-full border px-1.5 py-0.5 font-mono text-[9px] whitespace-nowrap ${domainTagColor(tag)}`}
        >
          {shortTagLabel(tag)}
        </span>
      ))}
      {themeTags.slice(0, remaining).map((tag) => (
        <span
          key={tag}
          className={`shrink-0 rounded-full border px-1.5 py-0.5 font-mono text-[9px] whitespace-nowrap ${domainTagColor(tag)}`}
        >
          {shortTagLabel(tag)}
        </span>
      ))}
      {project.status === "ongoing" && (
        <StatusBadge>
          <span className="text-[10px]">Ongoing</span>
        </StatusBadge>
      )}
    </div>
  );
}

function CardText({ project, large }: { project: Project; large: boolean }) {
  return (
    <div className="flex h-full min-w-0 flex-col">
      <h3
        className={`font-semibold text-foreground transition-colors group-hover:text-accent ${large ? "text-2xl" : "text-lg"}`}
      >
        {project.title}
      </h3>
      {project.summary && (
        <div className="mt-2 flex-1 overflow-hidden">
          <p className={`line-clamp-3 text-foreground/80 ${large ? "text-base" : "text-sm"}`}>
            {project.summary}
          </p>
        </div>
      )}
      {project.status !== "ongoing" && (
        <Link
          href={`/projects/${project.slug}`}
          onClick={(e) => e.stopPropagation()}
          className={`relative z-10 mt-2 inline-flex w-fit items-center gap-1 rounded-full border border-accent/40 font-medium text-accent transition-colors hover:bg-accent/10 ${large ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs"}`}
        >
          View project →
        </Link>
      )}
      <DomainTags project={project} />
    </div>
  );
}

export function ProjectCarouselCard({
  project,
  size = "desktop",
  onSelect,
}: {
  project: Project;
  size?: "mobile" | "desktop" | "large";
  onSelect?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, color-mix(in srgb, var(--accent) 20%, transparent), transparent 80%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  const compact = size === "mobile";
  const large = size === "large";

  const sizeClass = compact
    ? "flex h-[400px] w-[300px] flex-col p-4"
    : large
      ? "grid h-[300px] w-[660px] grid-cols-[1.15fr_1fr] gap-6 p-7"
      : "grid h-[260px] w-[520px] grid-cols-[1.15fr_1fr] gap-5 p-6";

  return (
    <div
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-accent bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur transition-shadow hover:shadow-[0_0_32px_-4px_var(--accent)] ${sizeClass}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      {compact ? (
        <>
          <Mockup project={project} heightClass="h-[210px]" />
          <div className="relative mt-3 flex-1">
            <CardText project={project} large={false} />
          </div>
        </>
      ) : (
        <>
          <div className="relative">
            <CardText project={project} large={large} />
          </div>
          <Mockup
            project={project}
            heightClass={large ? "h-[220px]" : "h-[190px]"}
            className="relative self-center"
          />
        </>
      )}
    </div>
  );
}
