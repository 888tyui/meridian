"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "up" | "left" | "right" | "scale" | "blur" | "clip-up" | "clip-left";
  delay?: number;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  animation = "up",
  delay = 0,
  className = "",
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      data-anim={animation}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
