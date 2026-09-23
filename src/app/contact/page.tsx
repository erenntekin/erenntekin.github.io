import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact · Eren Tolga Tekin",
  description: "Get in touch with Eren Tolga Tekin.",
};

export default function ContactPage() {
  return <ContactContent />;
}
