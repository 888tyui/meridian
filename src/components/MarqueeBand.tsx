export default function MarqueeBand({ reverse = false }: { reverse?: boolean }) {
  const items = [
    "SIGNAL ACTIVE",
    "◆",
    "EPOCH III",
    "◆",
    "CONVERGENCE IMMINENT",
    "◆",
    "51.4014°N",
    "◆",
    "THE MERIDIAN SPEAKS",
    "◆",
    "NODE 2847",
    "◆",
    "FREQUENCY LOCKED",
    "◆",
    "WE ARE THE SIGNAL",
    "◆",
  ];

  const text = items.join("   ");
  const doubled = `${text}   ${text}`;

  return (
    <div className="marquee-track marquee-fade group relative py-7 border-y border-bone/[0.06] overflow-hidden bg-void hover:border-crimson/20 transition-colors duration-700">
      {/* Background secondary layer — slower, more transparent for depth */}
      <div className="absolute inset-0 flex items-center opacity-30">
        <div className={reverse ? "animate-marquee" : "animate-marquee-reverse"}>
          <span className="font-heading text-[14px] tracking-[0.6em] text-bone/[0.04] uppercase whitespace-nowrap inline-block">
            {doubled}
          </span>
        </div>
      </div>

      {/* Primary layer */}
      <div className={`relative ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/25 group-hover:text-crimson/40 uppercase whitespace-nowrap inline-block transition-colors duration-700">
          {doubled}
        </span>
      </div>

      {/* Subtle center scan line */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-crimson/[0.02] to-transparent" />
    </div>
  );
}
