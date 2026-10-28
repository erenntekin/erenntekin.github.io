import Link from "next/link";
import { RevealOnMount } from "@/components/motion/RevealOnMount";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { CourseCard } from "./CertificateFrame";
import type { CertificateItem } from "@/lib/certificateData";

function Corner({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-3 w-3 border-accent/60 pointer-events-none transition-colors duration-200 group-hover:border-accent ${className}`}
    />
  );
}

export function CertificateDetail({ item }: { item: CertificateItem }) {
  const isCourse = item.tier === "course";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Navigation & Header */}
      <RevealOnMount>
        <Link
          href="/certifications"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          ← Back to certifications
        </Link>
      </RevealOnMount>

      <RevealOnMount delay={0.1}>
        <div className="mt-4 border-b border-border/70 pb-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[9px] font-medium text-accent">
                  {item.issuer}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                  {isCourse ? "Course module" : "Professional Certificate"}
                </span>
              </div>
              <h1 className="mt-2 font-serif text-2xl font-semibold text-accent sm:text-3xl">
                {item.title}
              </h1>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-surface/50 px-3.5 py-1.5 font-mono text-xs text-foreground transition-all hover:border-accent hover:bg-surface hover:text-accent"
                >
                  <ExternalLinkIcon className="h-3.5 w-3.5 text-accent" />
                  Verify credential
                </a>
              )}
              {item.certificateFile && (
                <a
                  href={item.certificateFile}
                  download
                  className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-surface/50 px-3.5 py-1.5 font-mono text-xs text-foreground transition-all hover:border-accent hover:bg-surface hover:text-accent"
                >
                  <DownloadIcon className="h-3.5 w-3.5 text-accent" />
                  Download PDF
                </a>
              )}
              {item.badgeUrl && (
                <a
                  href={item.badgeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-border/80 bg-surface/50 px-3 py-1 font-mono text-xs text-foreground transition-all hover:border-accent hover:bg-surface hover:text-accent"
                >
                  {item.badgeImage && <img src={item.badgeImage} alt="" className="h-4 w-4 object-contain" />}
                  Credly badge
                </a>
              )}
            </div>
          </div>
        </div>
      </RevealOnMount>

      {/* Main Certificate Display Plaque (Hugs Image Directly, Proportionally Sized) */}
      <RevealOnMount delay={0.2}>
        <div className="mt-8 flex justify-center">
          <div className="relative inline-block max-w-xl sm:max-w-2xl rounded-sm border border-border/80 bg-surface/30 p-1.5 shadow-2xl">
            <Corner className="top-0 left-0 border-t-2 border-l-2" />
            <Corner className="top-0 right-0 border-t-2 border-r-2" />
            <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
            <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="block max-h-[440px] w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-lg"
              />
            ) : (
              <div className="flex aspect-[16/9] w-full items-center justify-center p-8 text-center">
                <span className="font-serif text-lg text-foreground/80">{item.title}</span>
              </div>
            )}
          </div>
        </div>
      </RevealOnMount>

      {/* Course Sub-modules Grid (if any) */}
      {item.courses && item.courses.length > 0 && (
        <RevealOnMount delay={0.3}>
          <div className="mt-12 border-t border-border/70 pt-8">
            <div className="mb-6 flex items-baseline justify-between">
              <div>
                <h2 className="font-serif text-xl font-medium text-foreground">
                  Courses in this track
                </h2>
                <p className="mt-1 font-mono text-xs text-muted">
                  {item.courses.length} specialized modules completed
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {item.courses.map((course) => (
                <CourseCard key={course.slug} item={course} />
              ))}
            </div>
          </div>
        </RevealOnMount>
      )}
    </div>
  );
}
