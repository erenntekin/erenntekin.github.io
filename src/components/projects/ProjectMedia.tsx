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
    if (project.status === "shipped") {
      const repoPath = project.links.repo?.replace(/^https?:\/\/github\.com\//, "");
      return (
        <div
          className={`flex w-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/50 ${heightClass} ${className ?? ""}`}
        >
          <div className="flex shrink-0 items-center gap-1.5 border-b border-border px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="font-serif text-2xl font-semibold text-foreground/90 sm:text-3xl">
              {project.title}
            </span>
            {repoPath && (
              <span className="rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] text-muted">
                {repoPath}
              </span>
            )}
          </div>
        </div>
      );
    }
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
