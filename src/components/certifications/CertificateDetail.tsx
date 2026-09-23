import Link from "next/link";
import { RevealOnMount } from "@/components/motion/RevealOnMount";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { KaggleCertificateArt } from "./KaggleCertificateArt";
import { Frame } from "./CertificateFrame";
import type { CertificateItem } from "@/lib/certificateData";

export function CertificateDetail({ item }: { item: CertificateItem }) {
  const isKaggle = item.issuer === "Kaggle";

  return (
    <div className="museum-theme mx-auto w-full max-w-xl px-6 py-16 sm:py-20">
      <RevealOnMount>
        <Link
          href="/certifications"
          className="text-xs text-[var(--museum-gold)]/70 transition-colors hover:text-[var(--museum-gold-bright)]"
        >
          ← Back to certifications
        </Link>
      </RevealOnMount>

      <RevealOnMount delay={0.1}>
        <div className="mt-5 overflow-hidden rounded-md border-[3px] border-[var(--museum-gold)] bg-[var(--museum-marble)] p-1.5 shadow-xl shadow-black/50">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full rounded-sm border border-black/25" />
          ) : isKaggle ? (
            <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-black/25">
              <KaggleCertificateArt
                courseName={item.tier === "course" ? item.title : undefined}
                completedOn={item.completedOn}
              />
            </div>
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded-sm border border-black/25 bg-[#fbf6e9] px-6">
              <span className="text-center font-[family-name:var(--font-serif)] text-xl text-[var(--museum-stone)]">
                {item.title}
              </span>
            </div>
          )}
        </div>
      </RevealOnMount>

      <RevealOnMount delay={0.2}>
        <div className="mt-6 flex items-center gap-2">
          <span className="rounded-full border border-[var(--museum-gold)]/50 px-2 py-0.5 text-[10px] tracking-wide text-[var(--museum-gold)] uppercase">
            {item.tier === "course" ? "Course" : "Certificate"}
          </span>
          <p className="text-sm text-[var(--museum-gold)]/70">{item.issuer}</p>
        </div>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-[var(--museum-gold-bright)] sm:text-3xl">
          {item.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {item.credentialUrl && (
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-[var(--museum-gold)]/50 px-4 py-2 text-sm text-[var(--museum-gold)] transition-colors hover:border-[var(--museum-gold-bright)] hover:text-[var(--museum-gold-bright)]"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Verify credential
            </a>
          )}
          {item.certificateFile && (
            <a
              href={item.certificateFile}
              download
              className="flex items-center gap-1.5 rounded-full border border-[var(--museum-gold)]/50 px-4 py-2 text-sm text-[var(--museum-gold)] transition-colors hover:border-[var(--museum-gold-bright)] hover:text-[var(--museum-gold-bright)]"
            >
              <DownloadIcon className="h-4 w-4" />
              Download certificate
            </a>
          )}
          {item.badgeUrl && (
            <a
              href={item.badgeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-[var(--museum-gold)]/50 py-1 pr-4 pl-1 text-sm text-[var(--museum-gold)] transition-colors hover:border-[var(--museum-gold-bright)] hover:text-[var(--museum-gold-bright)]"
            >
              {item.badgeImage && <img src={item.badgeImage} alt="" className="h-7 w-7 object-contain" />}
              Credly badge
            </a>
          )}
        </div>
      </RevealOnMount>

      {item.courses && item.courses.length > 0 && (
        <RevealOnMount delay={0.3}>
          <div className="mt-10 border-t border-[var(--museum-gold)]/20 pt-6">
            <p className="font-mono text-[10px] tracking-widest text-[var(--museum-gold)]/60 uppercase">
              Courses in this certificate
            </p>
            <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4">
              {item.courses.map((course) => (
                <Frame key={course.slug} item={course} />
              ))}
            </div>
          </div>
        </RevealOnMount>
      )}
    </div>
  );
}
