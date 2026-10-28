import type { Metadata } from "next";
import { ColdeyeWhitepaper } from "@/components/projects/ColdeyeWhitepaper";

export const metadata: Metadata = {
  title: "Coldeye Architecture Spec · Eren Tolga Tekin",
  description: "Technical whitepaper detailing the architecture, model selection, fine-tuning pipeline, and hardware trade-offs of the Coldeye vision engine.",
};

export default function Page() {
  return <ColdeyeWhitepaper />;
}
