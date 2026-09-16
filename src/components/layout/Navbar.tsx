"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/data/nav";
import { cvOptions } from "@/data/cv";
import { CvDownload } from "@/components/layout/CvDownload";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto flex max-w-2xl items-center justify-between rounded-full border border-border bg-surface/90 shadow-lg shadow-black/40 backdrop-blur-md transition-[padding] duration-300 ${scrolled ? "px-3 py-2" : "px-4 py-2.5"}`}
      >
        <Link
          href="/"
          aria-label="Eren Tekin — home"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border font-mono text-xs font-semibold text-accent transition-colors hover:border-accent"
        >
          ET
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${active ? "text-foreground" : "text-muted hover:text-foreground"}`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-surface-hover"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          {cvOptions.length > 0 && <CvDownload options={cvOptions} />}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-px w-5 bg-foreground transition-transform ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-transform ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-2xl overflow-hidden rounded-3xl border border-border bg-surface/95 backdrop-blur md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 text-sm ${pathname === link.href ? "text-accent" : "text-muted"}`}
                >
                  {link.label}
                </Link>
              ))}
              {cvOptions.length > 0 && (
                <div className="pt-2">
                  <CvDownload options={cvOptions} />
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
