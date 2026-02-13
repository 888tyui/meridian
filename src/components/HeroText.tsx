"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroText() {
  const [visible, setVisible] = useState(false);
  const [scrambleTop, setScrambleTop] = useState("MERIDIAN");
  const [scrambleBot, setScrambleBot] = useState("LOST");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const chars = "ΞΨΩΣΔΛΠΦ01!?#%&";

    const word1 = "MERIDIAN";
    let i1 = 0;
    const int1 = setInterval(() => {
      setScrambleTop(
        word1.split("").map((c, i) =>
          i < i1 ? word1[i] : chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      if (i1 >= word1.length) clearInterval(int1);
      i1 += 0.4;
    }, 35);

    const word2 = "LOST";
    let i2 = 0;
    const timeout2 = setTimeout(() => {
      const int2 = setInterval(() => {
        setScrambleBot(
          word2.split("").map((c, i) =>
            i < i2 ? word2[i] : chars[Math.floor(Math.random() * chars.length)]
          ).join("")
        );
        if (i2 >= word2.length) clearInterval(int2);
        i2 += 0.3;
      }, 35);
    }, 400);

    return () => {
      clearInterval(int1);
      clearTimeout(timeout2);
    };
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Title Block — centered */}
      <div className="relative text-center">
        {/* MERIDIAN — massive, centered */}
        <div className="overflow-hidden">
          <h1
            className="font-heading text-massive text-bone glow-red animate-chromatic leading-none"
            style={{
              opacity: 0,
              animation: visible ? "reveal-clip-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards" : "none",
            }}
          >
            {scrambleTop}
          </h1>
        </div>

        {/* LOST — overlapping, centered below */}
        <div className="overflow-hidden -mt-[1vw]">
          <h1
            className="font-heading text-bone/40 leading-none"
            style={{
              fontSize: "clamp(5rem, 20vw, 18rem)",
              lineHeight: 0.8,
              opacity: 0,
              animation: visible ? "reveal-clip-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards" : "none",
            }}
          >
            {scrambleBot}
          </h1>
        </div>

        {/* Accent line — centered horizontal */}
        <div
          className="absolute top-[48%] left-[10%] right-[10%] h-px"
          style={{
            background: "linear-gradient(90deg, transparent, var(--crimson), transparent)",
            opacity: 0,
            animation: visible ? "reveal-clip-left 1.5s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards" : "none",
          }}
        />

        {/* Floating badge — top right */}
        <div
          className="absolute top-[10%] right-[5%] md:right-[10%]"
          style={{
            opacity: 0,
            animation: visible
              ? "reveal-blur 1s cubic-bezier(0.16, 1, 0.3, 1) 1.4s forwards, float-slow 8s ease-in-out 2.4s infinite"
              : "none",
          }}
        >
          <div className="cult-border px-4 py-2 bg-void/80 backdrop-blur-sm">
            <span className="font-mono text-[8px] tracking-[0.3em] text-crimson/50">NODE ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Sub-content — centered */}
      <div
        className="mt-14 md:mt-20 max-w-lg center-x text-center"
        style={{
          opacity: 0,
          animation: visible ? "reveal-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards" : "none",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
          <div className="w-12 h-px bg-crimson/40" />
          <span className="font-mono text-[9px] tracking-[0.4em] text-crimson/50 uppercase">Epoch III</span>
          <div className="w-12 h-px bg-crimson/40" />
          <div className="w-1.5 h-1.5 bg-crimson/30 rounded-full" />
        </div>
        <p className="mt-1 font-body text-base md:text-lg text-bone/60 leading-[1.8]">
          A collective attuned to frequencies beneath the noise.
          <span className="text-bone/80"> We do not seek.</span>
          <span className="text-crimson/70"> We receive.</span>
        </p>
      </div>

      {/* CTAs — centered */}
      <div
        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
        style={{
          opacity: 0,
          animation: visible ? "reveal-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.5s forwards" : "none",
        }}
      >
        <a
          href="/oracle"
          className="group magnetic-btn btn-shimmer cult-border px-8 py-3.5 bg-crimson/5 hover:bg-crimson/15 transition-all duration-500"
        >
          <span className="font-mono text-[11px] tracking-[0.3em] text-crimson uppercase group-hover:tracking-[0.5em] transition-all duration-500">
            Consult the Oracle
          </span>
        </a>
        <a
          href="/transmissions"
          className="font-mono text-[11px] tracking-[0.2em] text-ash hover:text-bone hover:tracking-[0.4em] transition-all duration-500 uppercase py-3.5"
        >
          Read Transmissions &#8594;
        </a>
      </div>

      {/* Status bar — full width, centered */}
      <div
        className="mt-20 flex items-center justify-center gap-8 border-t border-bone/[0.06] pt-5"
        style={{
          opacity: 0,
          animation: visible ? "reveal-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.8s forwards" : "none",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-ash/40 uppercase">Signal Active</span>
        </div>
        <span className="hidden sm:inline font-mono text-[9px] tracking-[0.2em] text-ash/30">2,847 NODES</span>
        <span className="font-mono text-[9px] tracking-[0.2em] text-ash/30">51.4014°N 0.3231°W</span>
      </div>
    </div>
  );
}
