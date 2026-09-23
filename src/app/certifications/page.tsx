import type { Metadata } from "next";
import { CertificationsContent } from "@/components/certifications/CertificationsContent";

export const metadata: Metadata = {
  title: "Certifications · Eren Tolga Tekin",
  description: "Certifications and coursework completed by Eren Tolga Tekin, with the projects behind them.",
};

export default function CertificationsPage() {
  return <CertificationsContent />;
}
