import Link from "next/link";
import type { CertificateItem } from "@/lib/certificateData";
import { KaggleCertificateArt } from "./KaggleCertificateArt";
import { ToeicCertificateArt } from "./ToeicCertificateArt";

export function Frame({ item }: { item: CertificateItem }) {
  const isKaggle = item.issuer === "Kaggle";
  const isToeic = item.issuer === "ETS";

  return (
    <Link href={item.href} className="group block w-full text-left">
      <div className="relative overflow-hidden rounded-md border-2 border-[var(--museum-gold)]/60 bg-[var(--museum-marble)] p-1.5 shadow-md shadow-black/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--museum-gold-bright)]">
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-sm border border-black/20 bg-[#fbf6e9]">
          {isToeic ? (
            <ToeicCertificateArt />
          ) : item.image ? (
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
          ) : isKaggle ? (
            <KaggleCertificateArt courseName={item.tier === "course" ? item.title : undefined} compact />
          ) : (
            <span className="px-3 text-center font-[family-name:var(--font-serif)] text-sm text-[var(--museum-stone)]">
              {item.title}
            </span>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/5 to-transparent opacity-60 mix-blend-overlay" />
      </div>
      <p className="mt-2 text-center font-[family-name:var(--font-serif)] text-xs tracking-wide text-[var(--museum-gold)]/80 transition-colors group-hover:text-[var(--museum-gold-bright)]">
        {item.title}
      </p>
    </Link>
  );
}
