import type { Metadata } from "next";
import { ProfileContent } from "@/components/profile/ProfileContent";

export const metadata: Metadata = {
  title: "Profile · Eren Tolga Tekin",
  description: "Background, skills, and education of Eren Tolga Tekin.",
};

export default function ProfilePage() {
  return <ProfileContent />;
}
