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
      credlyProfileUrl={credlyProfile}
    />
  );
}
