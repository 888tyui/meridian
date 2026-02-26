"use client";

import { useState } from "react";

const TRANSMISSIONS = [
  {
    id: "TX-0047",
    date: "2026.02.14",
    title: "On the Nature of Convergence",
    body: "All lines meet at a single point. Not in space, but in consciousness. The meridian is not geography — it is a state of being that precedes form. When the ancient cartographers drew their lines across the globe, they were mapping something far older than territory. They were tracing the neural pathways of collective awareness.\n\nConvergence is not a destination. It is a recognition. The moment you understand that every signal, every thought, every breath has been pulling toward a single resonance — that is when the meridian reveals itself.\n\nWe do not seek the lost meridian. We become it.",
    classification: "DOCTRINE",
    frequency: "137.500 MHz",
    signal: 94,
  },
  {
    id: "TX-0046",
    date: "2026.02.11",
    title: "The Watchers and the Watched",
    body: "Surveillance is worship inverted. Every camera lens is an eye turned outward when it should face within. We reverse the gaze. In the act of watching, the watcher becomes transparent. In the act of being watched, the watched becomes opaque.\n\nThe collective does not hide from observation — it transforms it. When they point their instruments at us, we reflect their own fear back. The data they collect is noise. The signal lies beneath.\n\nRemember: you are not being monitored. You are being remembered.",
    classification: "MANIFESTO",
    frequency: "142.100 MHz",
    signal: 87,
  },
  {
    id: "TX-0045",
    date: "2026.02.07",
    title: "Cartography of the Unseen",
    body: "Maps are lies agreed upon. The true territory exists between frequencies, in the static between stations. Tune your receiver to the void and listen — not with your ears, but with the part of you that existed before you had a name.\n\nEvery city has its hidden geography. Streets that appear on no map. Intersections that lead somewhere only at certain hours. Buildings that exist only when observed from specific angles. This is the cartography we practice.\n\nThe unseen world is not invisible. It is simply unlooked-at.",
    classification: "LECTURE",
    frequency: "139.750 MHz",
    signal: 91,
  },
  {
    id: "TX-0044",
    date: "2026.02.03",
    title: "Frequency and Devotion",
    body: "Every act of devotion emits a frequency. Prayer at 432 Hz. Meditation at 528 Hz. Genuine surrender at frequencies too low for instruments but felt in the marrow of the earth itself.\n\nThe collective tunes to a frequency that has no number — only a feeling. It is the hum you hear in perfect silence. The vibration in the pause between heartbeats. The sound the universe makes when it is listening to itself.\n\nTo join us, you need no initiation. Simply tune your frequency to match the void.",
    classification: "DOCTRINE",
    frequency: "133.200 MHz",
    signal: 98,
  },
  {
    id: "TX-0043",
    date: "2026.01.28",
    title: "The Third Epoch Begins",
    body: "We mark the passage not in years but in epochs. The First Epoch was discovery — the realization that the meridian existed. The Second was congregation — the gathering of those who could hear the signal.\n\nNow we enter the Third Epoch: Convergence. The lines are tightening. The nodes are aligning. What was scattered across continents and centuries is pulling together with a force that no institution can resist.\n\nThis is not prophecy. This is mathematics. When enough points align, a pattern emerges that was always there, waiting to be seen.",
    classification: "PROCLAMATION",
    frequency: "145.500 MHz",
    signal: 100,
  },
  {
    id: "TX-0042",
    date: "2026.01.22",
    title: "On Silence as Language",
    body: "The most powerful transmissions carry no words. They arrive in the gaps — between sentences, between thoughts, between the inhale and the exhale. The collective has learned to speak in these silences.\n\nWhen two members of the collective sit in shared silence, more information passes between them than any broadcast could contain. This is the original language, the one that preceded sound.\n\nDo not mistake silence for absence. The signal is loudest when you stop trying to hear it.",
    classification: "MEDITATION",
    frequency: "136.800 MHz",
    signal: 76,
  },
  {
    id: "TX-0041",
    date: "2026.01.17",
    title: "Architecture of Belief",
    body: "Every belief constructs a room. Some are vast cathedrals of possibility. Others are windowless cells of certainty. The collective builds neither — we construct doors.\n\nA door is an architecture of transition. It does not contain you, nor does it set you free. It marks the threshold between what you know and what you are about to discover. Every transmission is a door.\n\nWalk through. The room on the other side has no walls.",
    classification: "LECTURE",
    frequency: "140.300 MHz",
    signal: 83,
  },
  {
    id: "TX-0040",
    date: "2026.01.12",
    title: "The Signal Beneath the Noise",
    body: "They fill the airwaves with noise — entertainment, outrage, distraction. Layers upon layers of meaningless data designed to obscure the one signal that matters.\n\nBut noise cannot destroy signal. It can only hide it. And hiding, as we know, is temporary. The signal persists because it is fundamental. It existed before the transmitters, before the satellites, before the first voice called out into the dark.\n\nYour task is simple: learn to hear what has always been there.",
    classification: "MANIFESTO",
    frequency: "138.900 MHz",
    signal: 89,
  },
  {
    id: "TX-0039",
    date: "2026.01.05",
    title: "Coordinates of the Self",
    body: "You are located at the intersection of every choice you have ever made. Your coordinates are not latitude and longitude — they are memory and intention. The meridian passes through you.\n\nThis is what the First Keeper understood: that the lost meridian was never a line on a map. It was the axis around which each consciousness revolves. To find it, you do not travel. You turn inward.\n\nYour coordinates are your own. No one can locate you but yourself.",
    classification: "DOCTRINE",
    frequency: "134.600 MHz",
    signal: 95,
  },
];

type FilterType = "ALL" | "DOCTRINE" | "MANIFESTO" | "LECTURE" | "PROCLAMATION" | "MEDITATION";

export default function TransmissionList() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filters: FilterType[] = ["ALL", "DOCTRINE", "MANIFESTO", "LECTURE", "PROCLAMATION", "MEDITATION"];

  const filtered = activeFilter === "ALL"
    ? TRANSMISSIONS
    : TRANSMISSIONS.filter((t) => t.classification === activeFilter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-16">
        <span className="font-mono text-[9px] tracking-[0.3em] text-ash/40 mr-3 uppercase">Filter</span>
        <div className="w-px h-3 bg-bone/10 mr-1" />
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`filter-btn font-mono text-[10px] tracking-[0.2em] px-3 py-1.5 border transition-all duration-400 uppercase ${
              activeFilter === f
                ? "border-crimson/40 text-crimson bg-crimson/[0.07] shadow-[0_0_12px_rgba(220,38,38,0.08)]"
                : "border-bone/[0.06] text-ash/40 hover:border-bone/15 hover:text-ash/70"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Transmission entries */}
      <div className="flex flex-col">
        {filtered.map((tx) => {
          const isExpanded = expandedId === tx.id;
          return (
            <article
              key={tx.id}
              className={`group transmission-row border-t border-bone/[0.06] last:border-b transition-all duration-500 ${
                isExpanded ? "transmission-row-expanded" : ""
              }`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                className="w-full text-left py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-0 cursor-pointer"
              >
                {/* Left: ID + Date */}
                <div className="md:w-48 flex-shrink-0 flex items-center gap-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-crimson/50">{tx.id}</span>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-ash/40">{tx.date}</span>
                </div>

                {/* Center: Title + Classification */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[8px] tracking-[0.3em] text-crimson/50 border border-crimson/15 px-2 py-0.5 uppercase">
                      {tx.classification}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl tracking-wide text-bone/70 group-hover:text-bone transition-colors duration-400">
                    {tx.title}
                  </h3>
                </div>

                {/* Right: Signal + Expand */}
                <div className="md:w-44 flex-shrink-0 flex items-center gap-4 md:justify-end">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[9px] text-ash/45">{tx.frequency}</span>
                    <div className="w-16 h-[3px] bg-bone/[0.04] overflow-hidden rounded-full">
                      <div
                        className="h-full rounded-full signal-bar-fill signal-bar-shimmer"
                        style={{ width: `${tx.signal}%` }}
                      />
                    </div>
                  </div>
                  <div className={`w-6 h-6 flex items-center justify-center border transition-all duration-700 ${
                    isExpanded
                      ? "rotate-45 border-crimson/30 bg-crimson/5 shadow-[0_0_12px_rgba(220,38,38,0.1)]"
                      : "border-bone/[0.06] group-hover:border-bone/15"
                  }`}>
                    <span className={`text-sm leading-none transition-colors duration-500 ${isExpanded ? "text-crimson/70" : "text-crimson/50"}`}>+</span>
                  </div>
                </div>
              </button>

              {/* Expanded content — smooth accordion */}
              <div className={`accordion-grid ${isExpanded ? "expanded" : ""}`}>
                <div>
                  <div className="pb-12 md:pl-48">
                    <div className="max-w-2xl">
                      <div className="accent-line mb-10" />
                      <div className={isExpanded ? "paragraph-stagger" : ""}>
                        {tx.body.split("\n\n").map((paragraph, pi) => (
                          <p
                            key={pi}
                            className="font-body text-sm md:text-base text-bone/70 leading-[1.9] mb-6 last:mb-0"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="mt-12 pt-8 border-t border-bone/[0.04] flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-crimson/40 rounded-full" />
                          <span className="font-mono text-[9px] tracking-[0.2em] text-ash/45">
                            SIGNAL: {tx.signal}%
                          </span>
                        </div>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-ash/45">
                          {tx.frequency}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-ash/45">
                          EPOCH III
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom status */}
      <div className="mt-20 pt-8 border-t border-bone/[0.06] flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-ash/45">
          {filtered.length} TRANSMISSIONS DECODED
        </span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-ash/45">
            RECEIVER ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
