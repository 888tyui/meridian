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
    <div className="marquee-track group relative py-7 border-y border-bone/[0.06] overflow-hidden bg-void hover:border-crimson/20 transition-colors duration-700">
      <div className={reverse ? "animate-marquee-reverse" : "animate-marquee"}>
        <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/25 group-hover:text-crimson/40 uppercase whitespace-nowrap inline-block transition-colors duration-700">
          {doubled}
        </span>
      </div>
    </div>
  );
}
