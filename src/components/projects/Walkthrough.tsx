"use client";

import { motion } from "framer-motion";
import type { DesignNote, Project } from "@/data/projects";
import { ZoomableImage } from "./ZoomableImage";
import { ProjectMedia } from "./ProjectMedia";

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
              <ProjectMedia project={project} heightClass="h-[clamp(170px,24vw,256px)]" src={note.screenshot} />
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
