"use client";

import { useState } from "react";
import { ZoomableImage } from "./ZoomableImage";
import { motion, AnimatePresence } from "framer-motion";

interface Shot {
  src: string;
  alt: string;
}

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  images: Shot[];
}

const FEATURES: FeatureItem[] = [
  {
    id: "journal",
    title: "Daily Journal & Macros",
    description: "Track calories, protein, carbs, fat, and water, day by day.",
    images: [{ src: "/projects/mybelly/screenshot-home.png", alt: "Daily journal with calories and macros" }],
  },
  {
    id: "inventory",
    title: "Smart Food Inventory",
    description: "See your stock by zone: fridge, freezer, and pantry. A heads-up warns you before food expires.",
    images: [{ src: "/projects/mybelly/screenshot-inventory.png", alt: "Food inventory organized by storage zone" }],
  },
  {
    id: "recipes",
    title: "Recipe Suggestions",
    description: "Meal ideas built from the ingredients you actually have in stock.",
    images: [{ src: "/projects/mybelly/screenshot-recipe.png", alt: "Recipe suggestion checked against current stock" }],
  },
  {
    id: "assistant",
    title: "Conversational Assistant",
    description: "Talk to it in plain words. It estimates the nutrition, and you approve the changes before they save.",
    images: [
      { src: "/projects/mybelly/screenshot-agent-chat.png", alt: "Natural language chat with the assistant" },
      { src: "/projects/mybelly/screenshot-agent-confirm.png", alt: "One-tap confirmation before a change is saved" },
    ],
  },
  {
    id: "scanner",
    title: "Barcode Scanner & Search",
    description: "Instant search and a barcode scan, powered by the open OpenFoodFacts database.",
    images: [{ src: "/projects/mybelly/screenshot-foods.png", alt: "Food search and barcode lookup via OpenFoodFacts" }],
  },
];

// Keeps the ampersand in the sans font, where the serif glyph reads as decorative.
function TitleText({ text }: { text: string }) {
  const parts = text.split(" & ");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="font-sans font-normal"> &amp; </span>}
        </span>
      ))}
    </>
  );
}

function PhoneFrame({ src, alt, width }: { src: string; alt: string; width: string }) {
  return (
    <ZoomableImage src={src} alt={alt} className="inline-block">
      <div className={`group relative ${width} rounded-[1.8rem] border-[5px] border-[#14171d] bg-[#14171d] shadow-2xl transition-transform hover:scale-[1.015]`}>
        <span className="absolute left-1/2 top-1.5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-black/50" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full rounded-[1.4rem] object-contain" />
      </div>
    </ZoomableImage>
  );
}

export function MybellyFeatures() {
  const [index, setIndex] = useState(0);
  const current = FEATURES[index];
  const twoShots = current.images.length > 1;
  const width = twoShots ? "w-[150px] sm:w-[172px]" : "w-[210px] sm:w-[238px]";

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
      {/* Left: active feature text + selector */}
      <div className="lg:col-span-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            <h3 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
              0{index + 1}. <TitleText text={current.title} />
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-foreground/80">{current.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 space-y-2">
          {FEATURES.map((feat, idx) => {
            const isActive = idx === index;
            return (
              <button
                key={feat.id}
                type="button"
                onClick={() => setIndex(idx)}
                className={`flex w-full items-center gap-3 rounded-sm border p-3 text-left transition-all duration-150 ${
                  isActive ? "border-accent/80 bg-surface/90 shadow-sm" : "border-border/60 bg-surface/20 hover:border-border hover:bg-surface/50"
                }`}
              >
                <span className={`font-mono text-xs font-semibold ${isActive ? "text-accent" : "text-muted"}`}>0{idx + 1}</span>
                <span className={`font-serif text-xs font-semibold sm:text-sm ${isActive ? "text-foreground" : "text-foreground/75"}`}>
                  <TitleText text={feat.title} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: the phone showcase */}
      <div className="lg:col-span-7">
        <div className="relative flex min-h-[420px] items-center justify-center rounded-sm border border-border/80 bg-surface/20 p-6 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="flex flex-wrap items-center justify-center gap-5"
            >
              {current.images.map((shot) => (
                <PhoneFrame key={shot.src} src={shot.src} alt={shot.alt} width={width} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-2 text-center font-mono text-[11px] text-muted">Click to inspect full screen</p>
      </div>
    </div>
  );
}
