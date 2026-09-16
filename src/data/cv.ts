export interface CvOption {
  label: string;
  file: string;
}

// Provisional entry for wiring up the download flow during development —
// swap for the finalized domain-specific PDFs before the site goes live.
export const cvOptions: CvOption[] = [
  { label: "AI & Data Science", file: "/cv/eren-tekin-ai-datascience.pdf" },
];
