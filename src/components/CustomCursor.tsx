"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let glowX = 0;
    let glowY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    function animate() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring!.style.left = `${ringX}px`;
      ring!.style.top = `${ringY}px`;

      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      glow!.style.left = `${glowX}px`;
      glow!.style.top = `${glowY}px`;

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* Ambient glow that follows cursor with heavy delay */}
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Outer ring - follows with delay */}
      <div
        ref={ringRef}
        className="fixed z-[9997] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "width 0.4s, height 0.4s, opacity 0.3s, border-color 0.3s",
          width: isHovering ? "50px" : "32px",
          height: isHovering ? "50px" : "32px",
          border: isHovering ? "1px solid rgba(220, 38, 38, 0.6)" : "1px solid rgba(220, 38, 38, 0.2)",
          borderRadius: "50%",
          mixBlendMode: "difference" as const,
        }}
      />

      {/* Center dot - tracks instantly */}
      <div
        ref={dotRef}
        className="fixed z-[9997] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "width 0.3s, height 0.3s, opacity 0.3s, background 0.3s",
          width: isHovering ? "6px" : "4px",
          height: isHovering ? "6px" : "4px",
          background: isHovering ? "var(--crimson)" : "var(--bone)",
          borderRadius: "50%",
          boxShadow: isHovering
            ? "0 0 20px rgba(220, 38, 38, 0.6), 0 0 40px rgba(220, 38, 38, 0.2)"
            : "0 0 10px rgba(232, 228, 224, 0.3)",
        }}
      />
    </>
  );
}
