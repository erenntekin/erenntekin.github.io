"use client";

import { motion } from "framer-motion";
import type { DesignNote, Project } from "@/data/projects";
import { ZoomableImage } from "./ZoomableImage";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

function renderTitle(title: string) {
  return title.split(/(&)/).map((part, i) =>
    part === "&" ? (
      <span key={i} className="font-sans">
        &
      </span>
    ) : (
      part
    ),
  );
}

export function Walkthrough({ project, notes }: { project: Project; notes: DesignNote[] }) {
  return (
    <div className="mt-6 space-y-12">
      {notes.map((note, i) => (
        <motion.div
          key={note.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2 sm:gap-10"
        >
          <div className={i % 2 === 1 ? "sm:order-2" : ""}>
            <ZoomableImage src={note.screenshot!} alt={note.title} className="block w-full">
              <div className="flex items-center justify-center">
                {project.platform === "mobile" ? (
                  <PhoneMockup src={note.screenshot!} alt={note.title} className="h-64 sm:h-72 w-auto" />
                ) : project.slug === "mirage" ? (
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-[#060911] shadow-2xl">
                    <img src={note.screenshot!} alt={note.title} className="h-full w-full object-contain" />
                  </div>
                ) : (
                  <BrowserMockup src={note.screenshot!} alt={note.title} className="w-full aspect-[16/10] shadow-xl" />
                )}
              </div>
            </ZoomableImage>
          </div>
          <div className={i % 2 === 1 ? "sm:order-1" : ""}>
            <h3 className="font-serif text-lg font-semibold text-foreground sm:text-xl">{renderTitle(note.title)}</h3>
            <p className="mt-2 text-sm text-foreground/80">{note.body}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
