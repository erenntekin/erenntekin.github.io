"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

export function SectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    function onScroll() {
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
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (sections.length < 2) return null;

  const activeIndex = sections.findIndex((s) => s.id === active);

  return (
    <div className="fixed top-1/2 left-1.5 z-30 -translate-y-1/2 sm:left-3 lg:left-6">
      <div className="rounded-xl border border-border bg-surface/90 px-1.5 py-2 shadow-xl shadow-black/40 backdrop-blur-md sm:rounded-2xl sm:px-3 sm:py-3 lg:px-4 lg:py-4">
        {sections.map((s, i) => (
          <div key={s.id} className="flex flex-col items-start">
            {i > 0 && (
              <span
                className={`ml-[3.5px] h-3.5 w-0.5 transition-colors duration-300 sm:ml-[4.5px] sm:h-5 lg:ml-[5px] lg:h-6 ${i <= activeIndex ? "bg-accent" : "bg-border"}`}
              />
            )}
            <button
              type="button"
              onClick={() => handleClick(s.id)}
              className="group flex items-center gap-1.5 py-0.5 sm:gap-2 sm:py-1 lg:gap-3"
            >
              <span
                className={`shrink-0 rounded-full border-2 transition-all duration-300 ${
                  active === s.id
                    ? "h-2 w-2 border-accent bg-accent shadow-[0_0_8px_1px_var(--accent)] sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3"
                    : "h-1.5 w-1.5 border-border bg-transparent group-hover:border-accent/60 sm:h-2 sm:w-2 lg:h-2.5 lg:w-2.5"
                }`}
              />
              <span
                className={`hidden text-[11px] font-medium whitespace-nowrap transition-colors sm:inline sm:text-xs lg:text-sm ${
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
