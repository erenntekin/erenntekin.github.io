import { Frame } from "./CertificateFrame";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import type { CertificateItem } from "@/lib/certificateData";

function ProfileLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 rounded-full border border-[var(--museum-gold)]/50 px-3 py-1.5 text-xs text-[var(--museum-gold)] transition-colors hover:border-[var(--museum-gold-bright)] hover:text-[var(--museum-gold-bright)]"
    >
      <ExternalLinkIcon className="h-3.5 w-3.5" />
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
  subtitle: string;
  credlyProfileUrl?: string;
}) {
  return (
    <div className="museum-theme mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-20">
      <h1 className="font-serif text-2xl font-semibold text-[var(--museum-gold-bright)] sm:text-3xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#e8ddc8]">{subtitle}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {credlyProfileUrl && <ProfileLink href={credlyProfileUrl} label="Credly profile" />}
        <ProfileLink href="https://www.kaggle.com/erennntkn" label="Kaggle profile" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
        {items.map((item) => (
          <Frame key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
