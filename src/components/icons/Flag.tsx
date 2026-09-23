const FLAGS: Record<string, React.ReactNode> = {
  FR: (
    <>
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
    </>
  ),
  TR: (
    <>
      <rect width="3" height="2" fill="#E30A17" />
      <circle cx="1.15" cy="1" r="0.5" fill="#fff" />
      <circle cx="1.3" cy="1" r="0.4" fill="#E30A17" />
      <polygon
        points="1.62,0.65 1.71,0.86 1.94,0.86 1.75,1 1.82,1.22 1.62,1.09 1.42,1.22 1.49,1 1.3,0.86 1.53,0.86"
        fill="#fff"
      />
    </>
  ),
  GB: (
    <>
      <rect width="3" height="2" fill="#00247d" />
      <path d="M0,0 L3,2 M3,0 L0,2" stroke="#fff" strokeWidth="0.4" />
      <path d="M0,0 L3,2 M3,0 L0,2" stroke="#cf142b" strokeWidth="0.14" />
      <path d="M1.5,0 V2 M0,1 H3" stroke="#fff" strokeWidth="0.5" />
      <path d="M1.5,0 V2 M0,1 H3" stroke="#cf142b" strokeWidth="0.3" />
    </>
  ),
  JP: (
    <>
      <rect width="3" height="2" fill="#fff" />
      <circle cx="1.5" cy="1" r="0.55" fill="#BC002D" />
    </>
  ),
  KR: (
    <>
      <rect width="3" height="2" fill="#fff" />
      <path d="M1,1 A0.5,0.5 0 0,1 2,1 Z" fill="#CD2E3A" />
      <path d="M1,1 A0.5,0.5 0 0,0 2,1 Z" fill="#0047A0" />
      <circle cx="1.5" cy="0.75" r="0.25" fill="#0047A0" />
      <circle cx="1.5" cy="1.25" r="0.25" fill="#CD2E3A" />
    </>
  ),
};

export function Flag({ code, className }: { code: keyof typeof FLAGS; className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
      {FLAGS[code]}
    </svg>
  );
}
