import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CertificateDetail } from "@/components/certifications/CertificateDetail";
import { getCourseItem, getCourseStaticParams } from "@/lib/certificateData";

export function generateStaticParams() {
  return getCourseStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certSlug: string; courseSlug: string }>;
}): Promise<Metadata> {
  const { certSlug, courseSlug } = await params;
  const item = getCourseItem(certSlug, courseSlug);
  return {
    title: item ? `${item.title} · Eren Tolga Tekin` : "Course · Eren Tolga Tekin",
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ certSlug: string; courseSlug: string }>;
}) {
  const { certSlug, courseSlug } = await params;
  const item = getCourseItem(certSlug, courseSlug);
  if (!item) notFound();
  return <CertificateDetail item={item} />;
}
