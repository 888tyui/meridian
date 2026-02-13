"use client";

import { useEffect, useState } from "react";

export default function EntranceRitual() {
  const [phase, setPhase] = useState<"ritual" | "split" | "done">("ritual");

  useEffect(() => {
    // Phase 1: Show ritual text with flicker
    const splitTimer = setTimeout(() => setPhase("split"), 2200);
    const doneTimer = setTimeout(() => setPhase("done"), 3000);
    return () => {
      clearTimeout(splitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[10000] pointer-events-none"
      style={{ opacity: phase === "split" ? 0 : 1, transition: "opacity 0.6s ease-out 0.2s" }}
    >
      {/* Top half */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-void"
        style={{
          transform: phase === "split" ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
      {/* Bottom half */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-void"
        style={{
          transform: phase === "split" ? "translateY(100%)" : "translateY(0)",
          transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: phase === "split" ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        {/* Expanding line */}
        <div
          className="w-24 h-px bg-crimson mb-8"
          style={{
            animation: "ritual-line-expand 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            transformOrigin: "center",
          }}
        />

        {/* Ritual text */}
        <span
          className="font-mono text-[10px] tracking-[0.6em] text-crimson/60 uppercase"
          style={{ animation: "ritual-text-flicker 1.5s ease-out forwards" }}
        >
          Signal Acquired
        </span>

        {/* Coordinates */}
        <span
          className="mt-4 font-mono text-[9px] tracking-[0.3em] text-ash/30"
          style={{ animation: "ritual-text-flicker 1.5s ease-out 0.3s forwards", opacity: 0 }}
        >
          51.4014° N — 0.3231° W
        </span>

        {/* Shrinking line */}
        <div
          className="w-24 h-px bg-crimson mt-8"
          style={{
            animation: "ritual-line-expand 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
            transformOrigin: "center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
