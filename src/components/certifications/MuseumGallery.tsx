import { CertificateCard } from "./CertificateFrame";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import type { CertificateItem } from "@/lib/certificateData";

function ProfileLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-surface/50 px-3 py-1.5 font-mono text-xs text-foreground transition-all hover:border-accent hover:bg-surface hover:text-accent"
    >
      <ExternalLinkIcon className="h-3 w-3 text-accent" />
      {label}
    </a>
  );
}

export function MuseumGallery({
  items,
  title,
  subtitle,
  credlyProfileUrl,
}: {
  items: CertificateItem[];
  title: string;
  subtitle?: string;
  credlyProfileUrl?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Header Row: Title & Subtitle on Left, External Credentials on Right */}
      <div className="border-b border-border/70 pb-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-accent sm:text-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 font-sans text-sm leading-relaxed text-foreground/80">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {credlyProfileUrl && <ProfileLink href={credlyProfileUrl} label="Credly profile" />}
            <ProfileLink href="https://www.kaggle.com/erennntkn" label="Kaggle profile" />
          </div>
        </div>
      </div>

      {/* Proportional Grid: Matches ProjectGallery Exactly */}
      <div className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <CertificateCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
