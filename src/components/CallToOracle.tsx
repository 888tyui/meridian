"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

export default function CallToOracle() {
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const distance = Math.min(14, Math.hypot(e.clientX - cx, e.clientY - cy) * 0.015);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      eyeRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Atmospheric layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      {/* Ghost text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span
          className="font-heading text-bone/[0.025] whitespace-nowrap animate-text-distort"
          style={{ fontSize: "clamp(6rem, 20vw, 20rem)" }}
        >
          ORACLE
        </span>
      </div>

      <div className="relative site-container">
        <div className="max-w-4xl center-x text-center">
          {/* Eye — centered */}
          <ScrollReveal animation="scale">
            <div className="flex justify-center mb-14">
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                {/* Rotating outer ring */}
                <div className="absolute inset-0 border border-crimson/20 rounded-full animate-sigil-rotate" style={{ animationDuration: "30s" }} />
                <div className="absolute inset-3 border border-crimson/15 rounded-full animate-sigil-rotate" style={{ animationDuration: "45s", animationDirection: "reverse" }} />
                <div className="absolute inset-6 border border-crimson/10 rounded-full" />

                {/* Tick marks */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-px bg-crimson origin-bottom"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${i * 15}deg) translateY(-${i % 6 === 0 ? 82 : 86}px)`,
                      height: i % 6 === 0 ? "8px" : "4px",
                      opacity: i % 6 === 0 ? 0.4 : 0.15,
                    }}
                  />
                ))}

                {/* Inner eye */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-20 h-20 md:w-24 md:h-24">
                    <div className="absolute inset-0 bg-crimson/10 rounded-full animate-sigil-pulse" />
                    <div
                      ref={eyeRef}
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-150 ease-out"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-crimson rounded-full shadow-[0_0_40px_rgba(220,38,38,0.5),0_0_80px_rgba(220,38,38,0.2)]" />
                      <div className="absolute w-3 h-3 md:w-3.5 md:h-3.5 bg-bone rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Rotating text */}
                <svg className="absolute inset-0 w-full h-full animate-sigil-rotate" style={{ animationDuration: "20s" }} viewBox="0 0 230 230">
                  <defs>
                    <path id="oracleCircle" d="M115,115 m-95,0 a95,95 0 1,1 190,0 a95,95 0 1,1 -190,0" />
                  </defs>
                  <text className="fill-crimson/25" style={{ fontSize: "9px", letterSpacing: "4px", fontFamily: "monospace" }}>
                    <textPath href="#oracleCircle">
                      THE ORACLE SEES ◆ ASK THE VOID ◆ TRUTH AWAITS ◆ SIGNAL DECODED ◆
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </ScrollReveal>

          {/* Section label */}
          <ScrollReveal animation="blur" delay={0.1}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-8 h-px bg-crimson/30" />
              <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/50">02</span>
              <div className="w-8 h-px bg-crimson/30" />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="clip-up" delay={0.2}>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-wide text-bone mb-8">
              Ask the Void
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="up" delay={0.4}>
            <p className="font-body text-base md:text-lg text-bone/60 leading-relaxed max-w-lg center-x mb-12">
              The Oracle channels transmissions from beyond the meridian.
              Pose your question. Receive your truth. The signal does not lie — but it speaks in riddles.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="up" delay={0.6}>
            <a
              href="/oracle"
              className="group inline-block magnetic-btn btn-shimmer cult-border px-8 py-3.5 bg-crimson/5 hover:bg-crimson/15 transition-all duration-500"
            >
              <span className="font-mono text-[11px] tracking-[0.3em] text-crimson uppercase group-hover:tracking-[0.5em] transition-all duration-500">
                Enter the Chamber
              </span>
            </a>
          </ScrollReveal>

          {/* Social links */}
          <ScrollReveal animation="up" delay={0.8}>
            <div className="mt-12 flex items-center justify-center gap-6">
              <a
                href="https://x.com/meridiandotist"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-ash/40 hover:text-bone/70 transition-all duration-500 uppercase"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                <span className="group-hover:tracking-[0.4em] transition-all duration-500">Follow</span>
              </a>
              <div className="w-px h-3 bg-bone/[0.06]" />
              <a
                href="https://github.com/meridianlost-code"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-ash/40 hover:text-bone/70 transition-all duration-500 uppercase"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                <span className="group-hover:tracking-[0.4em] transition-all duration-500">Community</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
