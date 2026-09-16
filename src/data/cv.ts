export interface CvOption {
  label: string;
  file: string;
}

// Populate once the domain-specific CV PDFs are finalized, e.g.:
// { label: "Cybersecurity", file: "/cv/eren-tekin-cybersecurity.pdf" }
export const cvOptions: CvOption[] = [];
