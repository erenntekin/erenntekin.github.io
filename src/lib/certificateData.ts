import fs from "fs";
import path from "path";
import { certifications, type Certification, type CertificationCourse } from "@/data/certifications";

export interface CertificateItem {
  href: string;
  slug: string;
  title: string;
  issuer: string;
  image?: string;
  certificateFile?: string;
  credentialUrl?: string;
  badgeImage?: string;
  badgeUrl?: string;
  completedOn?: string;
  tier: "certificate" | "course";
  courses?: CertificateItem[];
}

function fileExists(publicPath?: string) {
  if (!publicPath) return undefined;
  return fs.existsSync(path.join(process.cwd(), "public", publicPath)) ? publicPath : undefined;
}

function toCourseItem(cert: Certification, course: CertificationCourse): CertificateItem {
  return {
    href: `/certifications/${cert.slug}/${course.slug}`,
    slug: `${cert.slug}/${course.slug}`,
    title: course.name,
    issuer: cert.issuer,
    image: course.image,
    certificateFile: fileExists(course.certificateFile),
    credentialUrl: course.credentialUrl,
    badgeImage: course.badgeImage,
    badgeUrl: course.badgeUrl,
    completedOn: course.completedOn,
    tier: "course",
  };
}

function toCertificateItem(cert: Certification): CertificateItem {
  return {
    href: `/certifications/${cert.slug}`,
    slug: cert.slug,
    title: cert.title,
    issuer: cert.issuer,
    image: cert.image,
    certificateFile: fileExists(cert.certificateFile),
    credentialUrl: cert.credentialUrl,
    tier: "certificate",
    courses: cert.courses.map((course) => toCourseItem(cert, course)),
  };
}

export function getGalleryItems(): CertificateItem[] {
  return certifications.map(toCertificateItem);
}

export function getCertificateItem(certSlug: string): CertificateItem | undefined {
  const cert = certifications.find((c) => c.slug === certSlug);
  if (!cert) return undefined;
  return toCertificateItem(cert);
}

export function getCourseItem(certSlug: string, courseSlug: string): CertificateItem | undefined {
  const cert = certifications.find((c) => c.slug === certSlug);
  const course = cert?.courses.find((c) => c.slug === courseSlug);
  if (!cert || !course) return undefined;
  return toCourseItem(cert, course);
}

export function getCertificateStaticParams() {
  return certifications.map((cert) => ({ certSlug: cert.slug }));
}

export function getCourseStaticParams() {
  const params: { certSlug: string; courseSlug: string }[] = [];
  for (const cert of certifications) {
    for (const course of cert.courses) {
      params.push({ certSlug: cert.slug, courseSlug: course.slug });
    }
  }
  return params;
}
