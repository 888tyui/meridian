"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function HeroText() {
  const [visible, setVisible] = useState(false);
  const [scrambleTop, setScrambleTop] = useState("MERIDIAN");
  const [scrambleBot, setScrambleBot] = useState("LOST");
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const CA = "8WR7xdbinNExtkM4JfSC7W2SwZ8QnMNj3ucaqtPopump";

  const copyCA = useCallback(() => {
    navigator.clipboard.writeText(CA).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

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
            className="font-heading text-bone/50 leading-none"
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
            <span className="font-mono text-[8px] tracking-[0.3em] text-crimson/60">NODE ACTIVE</span>
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
          <span className="font-mono text-[9px] tracking-[0.4em] text-crimson/60 uppercase">Epoch III</span>
          <div className="w-12 h-px bg-crimson/40" />
          <div className="w-1.5 h-1.5 bg-crimson/30 rounded-full" />
        </div>
        <p className="mt-1 font-body text-base md:text-lg text-bone/70 leading-[1.8]">
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

      {/* $MERIDIAN + CA Section */}
      <div
        className="mt-14 flex flex-col items-center gap-5"
        style={{
          opacity: 0,
          animation: visible ? "reveal-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.65s forwards" : "none",
        }}
      >
        {/* $MERIDIAN Button */}
        <a
          href="https://pump.fun/coin/8WR7xdbinNExtkM4JfSC7W2SwZ8QnMNj3ucaqtPopump"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-7 py-3 border border-crimson/25 bg-crimson/[0.06] hover:bg-crimson/[0.14] hover:border-crimson/40 hover:shadow-[0_0_30px_rgba(220,38,38,0.12)] transition-all duration-600 backdrop-blur-sm"
        >
          <div className="w-2 h-2 bg-crimson rounded-full animate-pulse" />
          <span className="font-heading text-base tracking-[0.2em] text-crimson group-hover:tracking-[0.35em] transition-all duration-500">
            $MERIDIAN
          </span>
          <svg className="w-3.5 h-3.5 text-crimson/50 group-hover:text-crimson/80 group-hover:translate-x-0.5 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          {/* Shimmer line */}
          <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-crimson/60 via-crimson/40 to-transparent transition-all duration-700" />
        </a>

        {/* CA Display */}
        <div className="flex flex-col items-center gap-2.5">
          <span className="font-mono text-[8px] tracking-[0.4em] text-crimson/50 uppercase">Contract Address</span>
          <button
            onClick={copyCA}
            className="group/ca flex items-center gap-3 px-5 py-2.5 border border-bone/[0.06] hover:border-crimson/20 bg-void/60 backdrop-blur-sm transition-all duration-500 cursor-pointer"
          >
            <span className="font-mono text-[10px] tracking-[0.08em] text-bone/50 group-hover/ca:text-bone/70 transition-colors duration-400 select-all">
              {CA.slice(0, 6)}...{CA.slice(-6)}
            </span>
            <div className="w-px h-3 bg-bone/[0.08]" />
            {copied ? (
              <span className="font-mono text-[9px] tracking-[0.2em] text-crimson/70 uppercase">Copied</span>
            ) : (
              <svg className="w-3.5 h-3.5 text-ash/40 group-hover/ca:text-crimson/60 transition-colors duration-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
            )}
          </button>
        </div>
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
          <span className="font-mono text-[9px] tracking-[0.2em] text-ash/50 uppercase">Signal Active</span>
        </div>
        <span className="hidden sm:inline font-mono text-[9px] tracking-[0.2em] text-ash/40">2,847 NODES</span>
        <span className="font-mono text-[9px] tracking-[0.2em] text-ash/40">51.4014°N 0.3231°W</span>
      </div>
    </div>
  );
}
