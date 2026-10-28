const FLAGS: Record<string, React.ReactNode> = {
  FR: (
    <>
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
      <rect width="3" height="2" fill="none" stroke="#000" strokeWidth="0.04" opacity="0.15" />
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
      <rect width="3" height="2" fill="none" stroke="#000" strokeWidth="0.04" opacity="0.15" />
    </>
  ),
  GB: (
    <>
      <rect width="3" height="2" fill="#00247d" />
      <path d="M0,0 L3,2 M3,0 L0,2" stroke="#fff" strokeWidth="0.4" />
      <path d="M0,0 L3,2 M3,0 L0,2" stroke="#cf142b" strokeWidth="0.14" />
      <path d="M1.5,0 V2 M0,1 H3" stroke="#fff" strokeWidth="0.5" />
      <path d="M1.5,0 V2 M0,1 H3" stroke="#cf142b" strokeWidth="0.3" />
      <rect width="3" height="2" fill="none" stroke="#000" strokeWidth="0.04" opacity="0.15" />
    </>
  ),
  JP: (
    <>
      <rect width="3" height="2" fill="#fff" />
      <circle cx="1.5" cy="1" r="0.55" fill="#BC002D" />
      <rect width="3" height="2" fill="none" stroke="#000" strokeWidth="0.04" opacity="0.15" />
    </>
  ),
  KR: (
    <>
      <rect width="3" height="2" fill="#fff" />
      {/* 4 Black Trigrams in corners */}
      {/* Top-left: Geon (3 solid bars) */}
      <g transform="translate(0.55, 0.42) rotate(33.7)">
        <rect x="-0.22" y="-0.16" width="0.44" height="0.05" fill="#000" />
        <rect x="-0.22" y="-0.025" width="0.44" height="0.05" fill="#000" />
        <rect x="-0.22" y="0.11" width="0.44" height="0.05" fill="#000" />
      </g>
      {/* Bottom-right: Gon (3 broken bars) */}
      <g transform="translate(2.45, 1.58) rotate(33.7)">
        <rect x="-0.22" y="-0.16" width="0.19" height="0.05" fill="#000" />
        <rect x="0.03" y="-0.16" width="0.19" height="0.05" fill="#000" />
        <rect x="-0.22" y="-0.025" width="0.19" height="0.05" fill="#000" />
        <rect x="0.03" y="-0.025" width="0.19" height="0.05" fill="#000" />
        <rect x="-0.22" y="0.11" width="0.19" height="0.05" fill="#000" />
        <rect x="0.03" y="0.11" width="0.19" height="0.05" fill="#000" />
      </g>
      {/* Top-right: Gam (water: broken, solid, broken) */}
      <g transform="translate(2.45, 0.42) rotate(-33.7)">
        <rect x="-0.22" y="-0.16" width="0.19" height="0.05" fill="#000" />
        <rect x="0.03" y="-0.16" width="0.19" height="0.05" fill="#000" />
        <rect x="-0.22" y="-0.025" width="0.44" height="0.05" fill="#000" />
        <rect x="-0.22" y="0.11" width="0.19" height="0.05" fill="#000" />
        <rect x="0.03" y="0.11" width="0.19" height="0.05" fill="#000" />
      </g>
      {/* Bottom-left: Ri (fire: solid, broken, solid) */}
      <g transform="translate(0.55, 1.58) rotate(-33.7)">
        <rect x="-0.22" y="-0.16" width="0.44" height="0.05" fill="#000" />
        <rect x="-0.22" y="-0.025" width="0.19" height="0.05" fill="#000" />
        <rect x="0.03" y="-0.025" width="0.19" height="0.05" fill="#000" />
        <rect x="-0.22" y="0.11" width="0.44" height="0.05" fill="#000" />
      </g>
      {/* Taegeuk (Center rotated ~33.7deg to align with diagonal) */}
      <g transform="translate(1.5, 1) rotate(-33.7)">
        <circle cx="0" cy="0" r="0.45" fill="#0047A0" />
        <path d="M-0.45,0 A0.45,0.45 0 0,1 0.45,0 A0.225,0.225 0 0,1 0,0 A0.225,0.225 0 0,0 -0.45,0 Z" fill="#CD2E3A" />
        <circle cx="0.225" cy="0" r="0.225" fill="#CD2E3A" />
        <circle cx="-0.225" cy="0" r="0.225" fill="#0047A0" />
      </g>
      {/* Subtle outer border */}
      <rect width="3" height="2" fill="none" stroke="#000" strokeWidth="0.04" opacity="0.15" />
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
