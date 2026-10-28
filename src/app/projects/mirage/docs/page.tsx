import type { Metadata } from "next";
import { MirageDocs } from "@/components/projects/MirageDocs";

export const metadata: Metadata = {
  title: "MIRAGE Documentation · Eren Tolga Tekin",
  description:
    "Two technical documents on MIRAGE: the threat model and attack catalog for tool-calling AI agents, and the scan engine and workflow.",
};

export default function Page() {
  return <MirageDocs />;
}
