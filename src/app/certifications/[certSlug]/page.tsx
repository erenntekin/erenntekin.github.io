import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CertificateDetail } from "@/components/certifications/CertificateDetail";
import { getCertificateItem, getCertificateStaticParams } from "@/lib/certificateData";

export function generateStaticParams() {
  return getCertificateStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string }>;
}): Promise<Metadata> {
  const { certSlug } = await params;
  const item = getCertificateItem(certSlug);
  return {
    title: item ? `${item.title} · Eren Tolga Tekin` : "Certificate · Eren Tolga Tekin",
  };
}

export default async function CertificatePage({ params }: { params: Promise<{ certSlug: string }> }) {
  const { certSlug } = await params;
  const item = getCertificateItem(certSlug);
  if (!item) notFound();
  return <CertificateDetail item={item} />;
}
