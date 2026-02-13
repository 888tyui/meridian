"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "ORIGIN", code: "00" },
    { href: "/transmissions", label: "TRANSMISSIONS", code: "01" },
    { href: "/oracle", label: "ORACLE", code: "02" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-void/80 backdrop-blur-md border-b border-bone/[0.03]" : ""
      }`}
    >
      <div className="site-container flex items-center justify-between py-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-crimson rounded-full" />
            <div className="absolute inset-0 w-2.5 h-2.5 bg-crimson rounded-full animate-ping opacity-30" />
          </div>
          <span className="font-heading text-base tracking-[0.3em] text-bone/80 group-hover:text-bone group-hover:tracking-[0.5em] transition-all duration-500 uppercase">
            M—L
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group nav-link-glitch relative flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-500 ${
                pathname === link.href
                  ? "text-crimson"
                  : "text-bone/50 hover:text-bone/80"
              }`}
            >
              <span className="text-crimson/30 font-mono text-[8px] group-hover:text-crimson/50 transition-colors duration-400">{link.code}</span>
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-gradient-to-r from-crimson/70 to-crimson/20" />
              )}
              {pathname !== link.href && (
                <span className="absolute -bottom-1.5 left-0 w-0 group-hover:w-full h-px bg-bone/10 transition-all duration-500 ease-out" />
              )}
            </Link>
          ))}
        </div>

        {/* Social + Coordinates */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-ash/40 hover:text-bone/70 transition-all duration-500"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a
            href="/community"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-ash/40 hover:text-bone/70 transition-all duration-500"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </a>
          <div className="w-px h-3 bg-bone/[0.06]" />
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-1 h-1 bg-crimson/30 rounded-full" />
            <span className="font-mono text-[9px] text-ash/40 tracking-[0.2em]">
              51.4014° N
            </span>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-bone transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-5 h-px bg-bone transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-bone transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-void/98 backdrop-blur-lg flex flex-col items-center justify-center gap-10 z-40">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`group font-heading text-4xl tracking-[0.2em] transition-all duration-500 ${
                pathname === link.href ? "text-crimson" : "text-bone/30 hover:text-bone"
              }`}
              style={{ animation: `reveal-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s forwards`, opacity: 0 }}
            >
              <span className="block font-mono text-[9px] tracking-[0.5em] text-crimson/30 mb-1">{link.code}</span>
              {link.label}
            </Link>
          ))}

          {/* Social links */}
          <div
            className="flex items-center gap-8 mt-4"
            style={{ animation: `reveal-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${links.length * 0.1}s forwards`, opacity: 0 }}
          >
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-ash/40 hover:text-bone transition-colors duration-400 uppercase"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X
            </a>
            <a
              href="/community"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-ash/40 hover:text-bone transition-colors duration-400 uppercase"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              Community
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
