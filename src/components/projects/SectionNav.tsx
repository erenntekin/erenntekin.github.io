"use client";

import { useEffect, useRef, useState } from "react";

interface Section {
  id: string;
  label: string;
}

export function SectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  // section picked in the menu: it stays highlighted while the page scrolls to it, even when
  // it sits too close to the bottom to reach the top of the screen
  const picked = useRef<string | null>(null);

  useEffect(() => {
    function release() {
      picked.current = null;
    }
    function onScroll() {
      if (picked.current) {
        setActive(picked.current);
        return;
      }
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (nearBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 220) {
          current = s.id;
        }
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
  }, [sections]);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    picked.current = id;
    setActive(id);
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (sections.length < 2) return null;

  const activeIndex = sections.findIndex((s) => s.id === active);

  return (
    <div className="fixed top-1/2 left-2 z-30 -translate-y-1/2 sm:left-3 2xl:left-6">
      <div className="rounded-full border border-border/80 bg-surface/90 px-1.5 py-2.5 shadow-xl shadow-black/40 backdrop-blur-md 2xl:rounded-2xl 2xl:px-4 2xl:py-4">
        {sections.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center 2xl:items-start">
            {i > 0 && (
              <span
                className={`h-3 w-0.5 transition-colors duration-300 sm:h-4 2xl:ml-[5px] 2xl:h-5 ${i <= activeIndex ? "bg-accent" : "bg-border"}`}
              />
            )}
            <button
              type="button"
              onClick={() => handleClick(s.id)}
              className="group relative flex items-center gap-2 py-1 2xl:gap-3"
              title={s.label}
            >
              <span
                className={`shrink-0 rounded-full border-2 transition-all duration-300 ${
                  active === s.id
                    ? "h-2 w-2 border-accent bg-accent shadow-[0_0_8px_1px_var(--accent)] sm:h-2.5 sm:w-2.5"
                    : "h-1.5 w-1.5 border-border bg-transparent group-hover:border-accent/60 sm:h-2 sm:w-2"
                }`}
              />
              <span
                className={`hidden text-[11px] font-medium whitespace-nowrap transition-colors 2xl:inline sm:text-xs ${
                  active === s.id ? "text-accent" : "text-muted group-hover:text-foreground"
                }`}
              >
                {s.label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
