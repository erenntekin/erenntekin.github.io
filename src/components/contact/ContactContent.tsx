"use client";

import { useState } from "react";
import { RevealOnMount } from "@/components/motion/RevealOnMount";
import { SectionLabel, SectionCard } from "@/components/ui/Section";
import { MailIcon } from "@/components/icons/MailIcon";
import { CopyIcon } from "@/components/icons/CopyIcon";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { socialLinks } from "@/data/social";

const EMAIL = "erentolgatekin0@gmail.com";

const SOCIAL_ICONS = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
};

function CopyEmailButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-xs transition-colors ${
        status === "error"
          ? "border-red-500/40 text-red-300"
          : "border-border/80 bg-surface/50 text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {status === "copied" && <CheckIcon className="h-3.5 w-3.5 text-accent" />}
      {status !== "copied" && <CopyIcon className="h-3.5 w-3.5" />}
      {status === "copied" ? "Copied" : status === "error" ? "Couldn't copy" : "Copy"}
    </button>
  );
}

export function ContactContent() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <RevealOnMount>
        <div className="border-b border-border/70 pb-6">
          <h1 className="font-serif text-2xl font-semibold text-accent sm:text-3xl">Contact</h1>
        </div>
      </RevealOnMount>

      <div className="mt-8 space-y-8">
        <RevealOnMount delay={0.1}>
          <section>
            <SectionLabel>Email</SectionLabel>
            <SectionCard>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 text-sm sm:text-base font-medium text-foreground transition-colors hover:text-accent"
                >
                  <MailIcon className="h-4 w-4 text-accent" />
                  {EMAIL}
                </a>
                <CopyEmailButton />
              </div>
            </SectionCard>
          </section>
        </RevealOnMount>

        <RevealOnMount delay={0.2}>
          <section>
            <SectionLabel>Profiles</SectionLabel>
            <SectionCard>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {socialLinks.map((link) => {
                  const Icon = SOCIAL_ICONS[link.label as keyof typeof SOCIAL_ICONS];
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-sm border border-border/80 bg-surface/30 px-3.5 py-2.5 text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-4 w-4 text-accent" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </SectionCard>
          </section>
        </RevealOnMount>
      </div>
    </div>
  );
}
