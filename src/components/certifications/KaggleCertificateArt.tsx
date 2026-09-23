export function KaggleCertificateArt({
  courseName,
  completedOn,
  compact = false,
}: {
  courseName?: string;
  completedOn?: string;
  compact?: boolean;
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white px-3 py-2 text-center">
      <div className={`absolute -top-4 -right-5 rounded-[40%] bg-[#fce35a] ${compact ? "h-8 w-8" : "h-14 w-14"}`} />
      <div className={`absolute top-2 -right-7 rounded-[45%] bg-[#20beff] ${compact ? "h-6 w-6" : "h-11 w-11"}`} />
      <div className={`absolute -top-1 right-1 rounded-[45%] bg-[#4caf50] ${compact ? "h-4 w-4" : "h-8 w-8"}`} />

      <span className={`leading-none font-bold text-[#20beff] ${compact ? "text-[9px]" : "text-base"}`}>kaggle</span>

      {!compact && (
        <span className="mt-1 text-[9px] tracking-widest text-neutral-400 uppercase">Certificate of completion</span>
      )}

      {courseName ? (
        <>
          {!compact && <span className="mt-1.5 text-[9px] text-neutral-500">Eren Tekin has completed</span>}
          <span
            className={`px-1 leading-tight font-semibold text-neutral-800 ${
              compact ? "mt-1 line-clamp-2 text-[9px]" : "mt-0.5 text-sm"
            }`}
          >
            {courseName}
          </span>
          {!compact && completedOn && <span className="mt-1 text-[8px] text-neutral-400">{completedOn}</span>}
        </>
      ) : (
        !compact && <span className="mt-1 text-[10px] text-neutral-500">Eren Tekin</span>
      )}
    </div>
  );
}
