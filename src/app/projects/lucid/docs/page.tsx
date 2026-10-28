import type { Metadata } from "next";
import { LucidDocs } from "@/components/projects/LucidDocs";

export const metadata: Metadata = {
  title: "LUCID Documentation · Eren Tolga Tekin",
  description:
    "Technical documentation on LUCID: the shared threat model and 19 attack vectors, plus the defensive architecture and developer guide.",
};

export default function Page() {
  return <LucidDocs />;
}
