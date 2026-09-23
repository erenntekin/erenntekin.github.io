"use client";

import Link from "next/link";
import type { MouseEvent as ReactMouseEvent } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { RevealOnMount } from "@/components/motion/RevealOnMount";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ScrollHint } from "@/components/home/ScrollHint";

export function Hero({ onAdvance }: { onAdvance?: () => void }) {
  return (
    <div className="relative flex flex-col items-center px-6 pt-16 pb-12 text-center sm:pt-20 sm:pb-14">
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] lg:h-[520px] lg:w-[520px] 2xl:h-[620px] 2xl:w-[620px]"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 55%, transparent), transparent 70%)" }}
      />

      <RevealOnMount>
        <StatusBadge tone="success">Open to work · Final-year internship 2027</StatusBadge>
      </RevealOnMount>

      <RevealOnMount delay={0.15} blur>
        <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:mt-8 lg:text-7xl 2xl:mt-10 2xl:text-8xl">
          Eren Tolga Tekin
        </h1>
      </RevealOnMount>

      <RevealOnMount delay={0.3}>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base lg:mt-7 lg:max-w-xl lg:text-lg 2xl:max-w-2xl 2xl:text-xl">
          Final-year engineering student building hands-on AI, cybersecurity and data
          projects.
        </p>
      </RevealOnMount>

      <RevealOnMount delay={0.45}>
        <div className="mt-8 flex items-center gap-3 lg:mt-10 lg:gap-4">
          <MagneticLink href="/projects" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Enter the gallery
          </MagneticLink>
          <MagneticLink
            href="/contact"
            className="border border-border text-foreground hover:border-accent hover:text-accent"
          >
            Contact the curator
          </MagneticLink>
        </div>
      </RevealOnMount>

      <RevealOnMount delay={0.6}>
        <ScrollHint onClick={onAdvance} />
      </RevealOnMount>
    </div>
  );
}

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 };

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    animate(x, (e.clientX - rect.left - rect.width / 2) * 0.3, spring);
    animate(y, (e.clientY - rect.top - rect.height / 2) * 0.3, spring);
  }

  function handleMouseLeave() {
    animate(x, 0, spring);
    animate(y, 0, spring);
  }

  return (
    <motion.div style={{ x, y }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <Link
        href={href}
        className={`inline-flex rounded-full px-5 py-2.5 text-sm font-medium shadow-lg shadow-black/0 transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/20 active:scale-95 lg:px-6 lg:py-3 lg:text-base 2xl:px-7 2xl:py-3.5 2xl:text-lg ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
