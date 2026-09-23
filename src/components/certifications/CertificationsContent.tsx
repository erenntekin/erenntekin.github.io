import { MuseumGallery } from "@/components/certifications/MuseumGallery";
import { getGalleryItems } from "@/lib/certificateData";
import { certifications } from "@/data/certifications";

export function CertificationsContent() {
  const items = getGalleryItems();
  const credlyProfile = certifications.find((c) => c.credlyProfileUrl)?.credlyProfileUrl;

  return (
    <MuseumGallery
      items={items}
      title="Certifications"
      subtitle="Coursework I've completed alongside my degree, with the real projects that came out of it."
      credlyProfileUrl={credlyProfile}
    />
  );
}
