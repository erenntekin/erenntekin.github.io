"use client";

import { useState } from "react";
import { ZoomableImage } from "./ZoomableImage";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const features: FeatureItem[] = [
  {
    id: "docs",
    title: "Document Library",
    description:
      "Centralized file library managing document uploads, formats, and lifecycle states with clean status tracking.",
    image: "/projects/genai-document-analysis/documents-list.png",
    imageAlt: "Document management interface showing uploaded documents and metadata",
  },
  {
    id: "search",
    title: "Typo-Tolerant Search",
    description:
      "Instant OpenSearch matching that finds documents by title, author, or keywords even with spelling mistakes.",
    image: "/projects/genai-document-analysis/search-typo.png",
    imageAlt: "Typo-tolerant search results matching mistyped queries",
  },
  {
    id: "ontology",
    title: "Domain Ontologies",
    description:
      "Knowledge modeling interface to define entity categories and directional relationship rules with JSON export and import.",
    image: "/projects/genai-document-analysis/ontology-detail.png",
    imageAlt: "Ontology detail view showing entity types and connection rules",
  },
  {
    id: "integrity",
    title: "Deletion Safeguards",
    description:
      "Server-side validation rules that automatically prevent deleting an entity type when active relationships depend on it.",
    image: "/projects/genai-document-analysis/ontology-delete-refused.png",
    imageAlt: "Referential integrity dialog blocking deletion of linked entity types",
  },
  {
    id: "trash",
    title: "Trash & Recovery",
    description:
      "Two-stage deletion moving removed files into a dedicated bin where they can be safely restored or purged permanently.",
    image: "/projects/genai-document-analysis/trash.png",
    imageAlt: "Recoverable document trash lifecycle management",
  },
];

function TitleWithAmpersand({ text }: { text: string }) {
  const parts = text.split(" & ");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="font-sans font-normal text-current"> &amp; </span>}
        </span>
      ))}
    </>
  );
}

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function DocAnalysisFeatures() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = features[selectedIndex];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Column: Feature Selector Buttons (4 cols) */}
      <div className="space-y-2 lg:col-span-4">
        {features.map((feat, idx) => {
          const isActive = idx === selectedIndex;
          return (
            <button
              key={feat.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`flex w-full items-start gap-3 rounded-sm border p-3 text-left transition-all duration-150 ${
                isActive
                  ? "border-accent/80 bg-surface/90 shadow-sm"
                  : "border-border/60 bg-surface/20 hover:border-border hover:bg-surface/50"
              }`}
            >
              <span
                className={`font-mono text-xs font-semibold ${
                  isActive ? "text-accent" : "text-muted"
                }`}
              >
                0{idx + 1}
              </span>
              <div className="flex-1">
                <p
                  className={`font-serif text-xs font-semibold sm:text-sm ${
                    isActive ? "text-foreground" : "text-foreground/75"
                  }`}
                >
                  <TitleWithAmpersand text={feat.title} />
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Column: Museum Plaque Frame (8 cols) */}
      <div className="relative rounded-sm border border-border/80 bg-surface/30 p-5 sm:p-7 backdrop-blur-sm lg:col-span-8">
        <Corner className="top-0 left-0 border-t-2 border-l-2" />
        <Corner className="top-0 right-0 border-t-2 border-r-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            <div>
              <h3 className="font-serif text-lg font-semibold text-accent sm:text-xl">
                0{selectedIndex + 1}. <TitleWithAmpersand text={current.title} />
              </h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-foreground/80 sm:text-sm">
                {current.description}
              </p>
            </div>

            <div className="pt-1 flex flex-col items-center">
              <ZoomableImage
                src={current.image}
                alt={current.imageAlt}
                className="inline-block max-w-full"
              >
                <img
                  src={current.image}
                  alt={current.imageAlt}
                  className="max-h-60 sm:max-h-72 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
                />
              </ZoomableImage>
              <p className="mt-2 text-center font-mono text-[11px] text-muted">
                Click image to inspect full screen
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
