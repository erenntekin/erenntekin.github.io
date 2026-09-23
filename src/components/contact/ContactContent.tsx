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
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
        status === "error"
          ? "border-red-500/40 text-red-300"
          : "border-border text-muted hover:border-accent hover:text-accent"
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
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-24">
      <RevealOnMount>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Contact</h1>
      </RevealOnMount>

      <RevealOnMount delay={0.1}>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Best way to reach me is email. I'll get back to you as soon as I can.
        </p>
      </RevealOnMount>

      <RevealOnMount delay={0.2}>
        <section className="mt-8">
          <SectionLabel>Email</SectionLabel>
          <SectionCard>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-base font-medium text-foreground transition-colors hover:text-accent sm:text-lg"
              >
                <MailIcon className="h-5 w-5 text-accent" />
                {EMAIL}
              </a>
              <CopyEmailButton />
            </div>
          </SectionCard>
        </section>
      </RevealOnMount>

      <RevealOnMount delay={0.3}>
        <section className="mt-10">
          <SectionLabel>Social</SectionLabel>
          <SectionCard>
            <div className="flex flex-col gap-3 sm:flex-row">
              {socialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[link.label as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </SectionCard>
        </section>
      </RevealOnMount>
    </div>
  );
}
