export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="inline-flex items-center gap-2 rounded-sm border border-accent/40 bg-surface/60 px-2.5 py-1 font-mono text-[11px] tracking-widest text-muted uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </h2>
  );
}

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-3 w-3 border-accent/50 ${className}`} />;
}

export function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-4 rounded-sm border border-border bg-surface/40 p-6 sm:p-8">
      <Corner className="top-0 left-0 border-t-2 border-l-2" />
      <Corner className="top-0 right-0 border-t-2 border-r-2" />
      <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
      <Corner className="bottom-0 right-0 border-b-2 border-r-2" />
      {children}
    </div>
  );
}
