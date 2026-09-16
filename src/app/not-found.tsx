import Link from "next/link";
import { GlitchText } from "@/components/motion/GlitchText";
import { RevealOnMount } from "@/components/motion/RevealOnMount";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <GlitchText
        text="404"
        className="font-mono text-7xl font-semibold tracking-tight text-foreground sm:text-8xl"
      />

      <RevealOnMount delay={0.5} className="mt-6 max-w-md space-y-2">
        <p className="text-lg text-foreground">This page took a wrong turn.</p>
        <p className="text-muted">
          You found the one thing I haven&apos;t built yet. Everything else on
          here, I actually shipped.
        </p>
      </RevealOnMount>

      <RevealOnMount delay={0.75} className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Back to home
        </Link>
      </RevealOnMount>
    </div>
  );
}
