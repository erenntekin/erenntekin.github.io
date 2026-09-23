import type { Project } from "@/data/projects";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

export function ProjectMedia({
  project,
  heightClass,
  className,
  src,
}: {
  project: Project;
  heightClass: string;
  className?: string;
  src?: string;
}) {
  const resolvedSrc = src ?? project.media.cover;

  if (!resolvedSrc) {
    return (
      <div
        className={`flex w-full items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted ${heightClass} ${className ?? ""}`}
      >
        Preview coming soon
      </div>
    );
  }

  const playbackRate = resolvedSrc === project.media.video ? project.media.videoRate : undefined;

  return (
    <div className={`flex items-center justify-center overflow-hidden ${heightClass} ${className ?? ""}`}>
      {project.platform === "mobile" ? (
        <PhoneMockup src={resolvedSrc} alt={`${project.title} app`} playbackRate={playbackRate} />
      ) : (
        <BrowserMockup src={resolvedSrc} alt={`${project.title} dashboard`} />
      )}
    </div>
  );
}
