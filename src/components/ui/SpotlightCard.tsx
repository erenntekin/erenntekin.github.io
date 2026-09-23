"use client";

import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ href, children, className }: SpotlightCardProps) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, color-mix(in srgb, var(--accent) 25%, transparent), transparent 80%)`;

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <Link
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative block overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      {children}
    </Link>
  );
}
