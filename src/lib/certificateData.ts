import fs from "fs";
import path from "path";
import { certifications, type Certification, type CertificationCourse } from "@/data/certifications";

export interface CertificateItem {
  href: string;
  slug: string;
  title: string;
  issuer: string;
  tagline?: string;
  badgeCount?: string;
  image?: string;
  certificateFile?: string;
  credentialUrl?: string;
  badgeImage?: string;
  badgeUrl?: string;
  completedOn?: string;
  tier: "certificate" | "course";
  courses?: CertificateItem[];
}

const CERTIFICATE_METADATA: Record<string, { tagline: string; badgeCount: string }> = {
  "ibm-ai-engineering": {
    tagline: "PyTorch neural networks, deep learning architectures, and generative AI systems.",
    badgeCount: "13 Courses",
  },
  "ibm-machine-learning": {
    tagline: "Supervised & unsupervised learning, classification models, and neural recommender systems.",
    badgeCount: "6 Courses",
  },
  "google-cybersecurity": {
    tagline: "Network security, threat detection, Linux security operations, and automated Python defense.",
    badgeCount: "9 Courses",
  },
  toeic: {
    tagline: "Certified professional English proficiency for international engineering teams.",
    badgeCount: "Score 885 · C1",
  },
  "kaggle-learn": {
    tagline: "Hands-on tracks in computer vision, deep learning, feature engineering, and data analysis.",
    badgeCount: "8 Certificates",
  },
};

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
  const meta = CERTIFICATE_METADATA[cert.slug];
  return {
    href: `/certifications/${cert.slug}`,
    slug: cert.slug,
    title: cert.title,
    issuer: cert.issuer,
    tagline: meta?.tagline,
    badgeCount: meta?.badgeCount,
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
