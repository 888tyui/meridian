"use client";

import ScrollReveal from "./ScrollReveal";

const TRANSMISSIONS = [
  {
    id: "TX-0047",
    date: "2026.02.14",
    title: "On the Nature of Convergence",
    excerpt: "All lines meet at a single point — not in space, but in the architecture of awareness. The meridian is not geography. It is the axis around which perception itself revolves.",
    classification: "DOCTRINE",
    frequency: "137.500 MHz",
  },
  {
    id: "TX-0046",
    date: "2026.02.11",
    title: "The Watchers and the Watched",
    excerpt: "Every lens turned outward is a prayer misdirected. Surveillance is worship inverted. The collective does not hide — it reflects. Point your instruments at us; receive only your own signal.",
    classification: "MANIFESTO",
    frequency: "142.100 MHz",
  },
  {
    id: "TX-0045",
    date: "2026.02.07",
    title: "Cartography of the Unseen",
    excerpt: "The true territory exists in the static between stations, in the silence between heartbeats. Every city conceals streets that appear on no map. This is the cartography we practice.",
    classification: "LECTURE",
    frequency: "139.750 MHz",
  },
];

export default function DoctrinePreview() {
  return (
    <div className="relative site-container">
      {/* Editorial staggered grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
        {/* Card 1 — Large, spans 7 cols */}
        <ScrollReveal animation="up" delay={0} className="md:col-span-7">
          <a href="/transmissions" className="group editorial-card block relative bg-surface/40 border border-bone/[0.03] hover:border-crimson/20 p-10 md:p-14 h-full overflow-hidden backdrop-blur-[2px]">
            {/* Huge ghost number */}
            <span className="absolute -top-4 -right-2 font-heading text-[10rem] md:text-[14rem] text-bone/[0.02] leading-none pointer-events-none select-none group-hover:text-bone/[0.04] transition-colors duration-700">
              01
            </span>

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[9px] tracking-[0.3em] text-crimson/40">{TRANSMISSIONS[0].id}</span>
                <div className="w-8 h-px bg-crimson/15" />
                <span className="font-mono text-[8px] tracking-[0.3em] text-crimson/50 border border-crimson/15 px-2 py-0.5 uppercase">
                  {TRANSMISSIONS[0].classification}
                </span>
              </div>

              <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-wide text-bone mb-8 group-hover:glow-red transition-all duration-700">
                {TRANSMISSIONS[0].title}
              </h3>

              <p className="font-body text-sm md:text-base text-bone/50 leading-relaxed max-w-lg mb-10">
                {TRANSMISSIONS[0].excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.15em] text-ash/40">{TRANSMISSIONS[0].frequency}</span>
                <span className="font-mono text-[10px] text-crimson/0 group-hover:text-crimson/60 transition-all duration-500 tracking-[0.5em]">
                  READ &#8594;
                </span>
              </div>
            </div>

            {/* Hover accent line — expands from left */}
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-crimson/60 to-transparent transition-all duration-700" />
          </a>
        </ScrollReveal>

        {/* Right column — 2 stacked cards, 5 cols */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Card 2 — offset up for stagger */}
          <ScrollReveal animation="right" delay={0.2} className="md:-mt-12">
            <a href="/transmissions" className="group editorial-card block relative bg-surface/20 border border-bone/[0.03] hover:border-crimson/20 p-8 md:p-10 overflow-hidden backdrop-blur-[2px]">
              <span className="absolute -top-2 -right-1 font-heading text-[8rem] text-bone/[0.02] leading-none pointer-events-none select-none group-hover:text-bone/[0.04] transition-colors duration-700">
                02
              </span>

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-crimson/40">{TRANSMISSIONS[1].id}</span>
                  <span className="font-mono text-[8px] tracking-[0.3em] text-crimson/50 border border-crimson/15 px-2 py-0.5 uppercase">
                    {TRANSMISSIONS[1].classification}
                  </span>
                </div>

                <h3 className="font-heading text-xl md:text-2xl tracking-wide text-bone/70 mb-5 group-hover:text-bone transition-colors duration-500">
                  {TRANSMISSIONS[1].title}
                </h3>

                <p className="font-body text-sm text-bone/50 leading-relaxed mb-8">
                  {TRANSMISSIONS[1].excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-ash/40">{TRANSMISSIONS[1].frequency}</span>
                  <span className="font-mono text-[9px] text-crimson/0 group-hover:text-crimson/50 transition-colors">&#8594;</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-crimson/40 transition-all duration-700" />
            </a>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal animation="right" delay={0.4}>
            <a href="/transmissions" className="group editorial-card block relative bg-surface/20 border border-bone/[0.03] hover:border-crimson/20 p-8 md:p-10 overflow-hidden backdrop-blur-[2px]">
              <span className="absolute -top-2 -right-1 font-heading text-[8rem] text-bone/[0.02] leading-none pointer-events-none select-none group-hover:text-bone/[0.04] transition-colors duration-700">
                03
              </span>

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-crimson/40">{TRANSMISSIONS[2].id}</span>
                  <span className="font-mono text-[8px] tracking-[0.3em] text-crimson/50 border border-crimson/15 px-2 py-0.5 uppercase">
                    {TRANSMISSIONS[2].classification}
                  </span>
                </div>

                <h3 className="font-heading text-xl md:text-2xl tracking-wide text-bone/70 mb-5 group-hover:text-bone transition-colors duration-500">
                  {TRANSMISSIONS[2].title}
                </h3>

                <p className="font-body text-sm text-bone/50 leading-relaxed mb-8">
                  {TRANSMISSIONS[2].excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-ash/40">{TRANSMISSIONS[2].frequency}</span>
                  <span className="font-mono text-[9px] text-crimson/0 group-hover:text-crimson/50 transition-colors">&#8594;</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-crimson/40 transition-all duration-700" />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
