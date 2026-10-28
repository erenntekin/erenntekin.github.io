"use client";

import { useState } from "react";
import { ZoomableImage } from "./ZoomableImage";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  wip?: boolean;
}

const features: FeatureItem[] = [
  {
    id: "tracking",
    title: "Multi-Target Tracking",
    description:
      "Tracks people and objects across continuous frames, maintaining persistent identities.",
    image: "/projects/coldeye/entities.png",
    imageAlt: "Multi-target person and object tracking with bounding boxes",
  },
  {
    id: "hand-interactions",
    title: "Hand-Object Pick / Put-Down",
    description:
      "Tracks palm and wrist proximity to detect when an object is picked up from a desk or set down.",
    image: "/projects/coldeye/desk-pickup.png",
    imageAlt: "Hand interaction detecting object pickup from desk",
  },
  {
    id: "posture",
    title: "Real-Time Posture Detection",
    description:
      "Analyzes skeletal joint angles to classify sitting, standing, and transitions in real time.",
    image: "/projects/coldeye/room-sat.png",
    imageAlt: "Geometric posture classification showing sitting state",
  },
  {
    id: "ocr",
    title: "On-Demand Text Extraction",
    description:
      "Extracts text from held objects when brought close to the camera.",
  },
  {
    id: "privacy-face",
    title: "Face Recognition · Privacy",
    description:
      "Blurs faces by default with an instant on/off toggle, keeping identity recognition opt-in for registered people.",
    image: "/projects/coldeye/entity-woman.png",
    imageAlt: "Face recognition and privacy blurring",
  },
  {
    id: "timeline",
    title: "Live Activity Timeline",
    description:
      "Turns camera detections and room activity into a live event timeline.",
    image: "/projects/coldeye/activity.png",
    imageAlt: "Real-time activity log and event timeline",
  },
];

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function ColdeyeFeatures() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const current = features[selectedIndex];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
      {/* Left Column: Feature Selection List (Compact 4 cols) */}
      <div className="space-y-1.5 lg:col-span-4">
        {features.map((item, idx) => {
          const isSelected = idx === selectedIndex;
          const numberPrefix = `0${idx + 1}. `;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`flex w-full items-center justify-between rounded-sm border px-3.5 py-2.5 text-left transition-all ${
                isSelected
                  ? "border-accent/80 bg-surface/70 shadow-sm"
                  : "border-border/70 bg-surface/20 hover:border-border hover:bg-surface/40"
              }`}
            >
              <p
                className={`font-sans text-xs sm:text-sm font-medium transition-colors ${
                  isSelected ? "text-accent font-semibold" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {numberPrefix}
                {item.title}
              </p>

              {item.wip && (
                <span className="shrink-0 rounded-sm border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-mono text-[9px] text-amber-400">
                  WIP
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right Column: Museum Plaque Frame with Expanded Width (8 cols) */}
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
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold text-accent sm:text-xl">
                  0{selectedIndex + 1}. {current.title}
                </h3>
                {current.wip && (
                  <span className="rounded-sm border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] text-amber-400">
                    Work in Progress
                  </span>
                )}
              </div>
              <p className="mt-2 font-sans text-xs leading-relaxed text-foreground/80 sm:text-sm">
                {current.description}
              </p>
            </div>

            {current.image && (
              <div className="pt-1 flex flex-col items-center">
                <ZoomableImage
                  src={current.image}
                  alt={current.imageAlt ?? current.title}
                  className="inline-block max-w-full"
                >
                  <img
                    src={current.image}
                    alt={current.imageAlt ?? current.title}
                    className="max-h-48 sm:max-h-52 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
                  />
                </ZoomableImage>
                <p className="mt-1.5 text-center font-mono text-[10px] text-muted">
                  Click image to expand full screen
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
