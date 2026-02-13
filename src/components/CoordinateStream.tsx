"use client";

import { useEffect, useState } from "react";

const DATA_FRAGMENTS = [
  "51.4014° N",
  "0.3231° W",
  "SIGNAL::ACTIVE",
  "FREQ 137.500",
  "NODE_07 ONLINE",
  "MERIDIAN LOCK",
  "VECTOR 270.00",
  "DEPTH -∞",
  "CONVERGENCE 98.7%",
  "PHASE III ACTIVE",
  "LOST::FOUND",
  "EPOCH 1739520000",
  "ORBIT DECAY 0.003",
  "CIPHER ENGAGED",
  "BEARING 180.000",
  "TRANSMISSION OK",
  "ALIGNMENT TRUE",
  "GATEWAY OPEN",
];

function DataLine({ side }: { side: "left" | "right" }) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fragment = DATA_FRAGMENTS[Math.floor(Math.random() * DATA_FRAGMENTS.length)];
      const timestamp = new Date().toISOString().slice(11, 23);
      setLines((prev) => [...prev.slice(-12), `${timestamp} ${fragment}`]);
    }, 800 + Math.random() * 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed top-24 ${side === "left" ? "left-4" : "right-4"} hidden lg:flex flex-col gap-1 z-10 ${
        side === "right" ? "items-end" : "items-start"
      }`}
    >
      {lines.map((line, i) => (
        <div
          key={`${line}-${i}`}
          className="font-mono text-[9px] tracking-[0.15em] text-crimson/20 whitespace-nowrap transition-opacity duration-1000"
          style={{ opacity: Math.min(1, (i + 1) / lines.length) * 0.5 }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

export default function CoordinateStream() {
  return (
    <>
      <DataLine side="left" />
      <DataLine side="right" />
    </>
  );
}
