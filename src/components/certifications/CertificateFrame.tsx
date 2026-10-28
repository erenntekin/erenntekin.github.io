import Link from "next/link";
import type { CertificateItem } from "@/lib/certificateData";

function Corner({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-3 w-3 border-accent/60 pointer-events-none transition-colors duration-200 group-hover:border-accent ${className}`}
    />
  );
}

export function CertificateCard({ item }: { item: CertificateItem }) {
  return (
    <Link href={item.href} className="group block h-full">
      <div className="relative flex h-full flex-col justify-between rounded-sm border border-border/80 bg-surface/30 p-3.5 sm:p-4 transition-all duration-300 hover:border-accent/60 hover:bg-surface/50">
        {/* 4 Golden Architectural Corner Brackets */}
        <Corner className="top-0 left-0 border-t-2 border-l-2" />
        <Corner className="top-0 right-0 border-t-2 border-r-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

        {/* Top Header: Issuer Tag & Count Badge */}
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span className="rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[9px] font-medium text-accent">
            {item.issuer}
          </span>
          {item.badgeCount && (
            <span className="font-mono text-[9px] text-muted">
              {item.badgeCount}
            </span>
          )}
        </div>

        {/* Certificate Preview (Contained so no text or certificate seals are cropped) */}
        <div className="relative mb-2.5 flex h-44 sm:h-48 w-full items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-black/50 p-2">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="max-h-full max-w-full rounded-[2px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface/80 p-4 text-center">
              <span className="font-serif text-sm text-foreground/80">{item.title}</span>
            </div>
          )}
        </div>

        {/* Bottom Content: Title Only (Clean, Airy, No Clutter) */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <h3 className="font-serif text-base sm:text-lg font-bold text-foreground transition-colors group-hover:text-accent line-clamp-1">
            {item.title}
          </h3>
          <span className="font-mono text-xs text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent">
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}

// For sub-course cards displayed on CertificateDetail
export function CourseCard({ item }: { item: CertificateItem }) {
  return (
    <Link href={item.href} className="group block h-full">
      <div className="relative flex h-full flex-col justify-between rounded-sm border border-border/80 bg-surface/30 p-3 transition-all duration-300 hover:border-accent/60 hover:bg-surface/50">
        <Corner className="top-0 left-0 border-t-2 border-l-2" />
        <Corner className="top-0 right-0 border-t-2 border-r-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

        <div className="relative mb-2 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-black/50 p-1.5">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="max-h-full max-w-full rounded-[2px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-2 text-center">
              <span className="font-serif text-xs text-foreground/80">{item.title}</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-1">
          <h4 className="font-serif text-xs sm:text-sm font-semibold text-foreground transition-colors group-hover:text-accent line-clamp-2">
            {item.title}
          </h4>
        </div>
      </div>
    </Link>
  );
}

// Backwards-compatible alias for any components importing Frame
export const Frame = CertificateCard;
