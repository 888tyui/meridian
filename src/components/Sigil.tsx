"use client";

import { useEffect, useRef } from "react";

export default function Sigil() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 600;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let frame = 0;
    let animId: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const time = frame * 0.003;

      // Outer rotating ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.5);

      // Main circle
      ctx.beginPath();
      ctx.arc(0, 0, 200, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(220, 38, 38, ${0.15 + Math.sin(time) * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Second circle
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(220, 38, 38, 0.08)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Tick marks around the circle
      for (let i = 0; i < 72; i++) {
        const angle = (i / 72) * Math.PI * 2;
        const innerR = i % 6 === 0 ? 190 : 195;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
        ctx.lineTo(Math.cos(angle) * 200, Math.sin(angle) * 200);
        ctx.strokeStyle = i % 6 === 0 ? "rgba(220, 38, 38, 0.3)" : "rgba(220, 38, 38, 0.1)";
        ctx.lineWidth = i % 6 === 0 ? 1 : 0.5;
        ctx.stroke();
      }

      ctx.restore();

      // Inner counter-rotating geometry
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-time * 0.3);

      // Diamond shape
      ctx.beginPath();
      const dSize = 120 + Math.sin(time * 2) * 5;
      ctx.moveTo(0, -dSize);
      ctx.lineTo(dSize * 0.6, 0);
      ctx.lineTo(0, dSize);
      ctx.lineTo(-dSize * 0.6, 0);
      ctx.closePath();
      ctx.strokeStyle = "rgba(220, 38, 38, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // Cross lines
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.15);

      // Vertical
      ctx.beginPath();
      ctx.moveTo(0, -220);
      ctx.lineTo(0, 220);
      ctx.strokeStyle = "rgba(220, 38, 38, 0.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Horizontal
      ctx.beginPath();
      ctx.moveTo(-220, 0);
      ctx.lineTo(220, 0);
      ctx.stroke();

      // Diagonal
      ctx.beginPath();
      ctx.moveTo(-155, -155);
      ctx.lineTo(155, 155);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(155, -155);
      ctx.lineTo(-155, 155);
      ctx.stroke();

      ctx.restore();

      // Central dot with glow
      const glowIntensity = 0.3 + Math.sin(time * 3) * 0.15;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
      gradient.addColorStop(0, `rgba(220, 38, 38, ${glowIntensity})`);
      gradient.addColorStop(0.5, `rgba(220, 38, 38, ${glowIntensity * 0.3})`);
      gradient.addColorStop(1, "rgba(220, 38, 38, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(220, 38, 38, 0.8)";
      ctx.fill();

      // Inner triangle
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.8);
      ctx.beginPath();
      const tSize = 50 + Math.sin(time * 1.5) * 3;
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * tSize;
        const y = Math.sin(angle) * tSize;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(220, 38, 38, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Orbiting particles
      for (let i = 0; i < 8; i++) {
        const orbitAngle = time * (0.5 + i * 0.1) + (i * Math.PI) / 4;
        const orbitR = 140 + Math.sin(time + i) * 20;
        const px = cx + Math.cos(orbitAngle) * orbitR;
        const py = cy + Math.sin(orbitAngle) * orbitR;
        const particleAlpha = 0.2 + Math.sin(time * 2 + i) * 0.1;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${particleAlpha})`;
        ctx.fill();
      }

      // Coordinate data ring text (simulated)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-time * 0.2);
      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(220, 38, 38, 0.12)";
      const coords = "51.4014°N·0.3231°W·MERIDIAN·LOST·SIGNAL·ACTIVE·FREQUENCY·137.5·";
      for (let i = 0; i < coords.length; i++) {
        const charAngle = (i / coords.length) * Math.PI * 2;
        ctx.save();
        ctx.rotate(charAngle);
        ctx.translate(0, -230);
        ctx.rotate(Math.PI / 2);
        ctx.fillText(coords[i], 0, 0);
        ctx.restore();
      }
      ctx.restore();

      frame++;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-[600px] h-[600px] max-w-[90vw] max-h-[90vw] opacity-80"
      style={{ width: 600, height: 600 }}
    />
  );
}
