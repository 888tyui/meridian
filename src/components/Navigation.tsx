"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const closeMobile = useCallback(() => setIsOpen(false), []);

  const links = [
    { href: "/", label: "ORIGIN", code: "00" },
    { href: "/transmissions", label: "TRANSMISSIONS", code: "01" },
    { href: "/oracle", label: "ORACLE", code: "02" },
    { href: "/doctrine", label: "DOCTRINE", code: "03" },
    { href: "/inscribe", label: "INSCRIBE", code: "04" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "nav-scrolled" : ""
      }`}
    >
      <div className="site-container flex items-center justify-between py-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 relative z-50">
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
                  : "text-bone/60 hover:text-bone/90"
              }`}
            >
              <span className="text-crimson/40 font-mono text-[8px] group-hover:text-crimson/50 transition-colors duration-400">
                {link.code}
              </span>
              {link.label}
              {pathname === link.href && (
                <>
                  <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-gradient-to-r from-crimson/70 to-crimson/20" />
                  <span className="absolute -bottom-1.5 left-0 w-full h-[6px] bg-gradient-to-b from-crimson/15 to-transparent blur-sm" />
                </>
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
            href="https://x.com/meridiandotist"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-ash/50 hover:text-bone/80 transition-all duration-500"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a
            href="https://github.com/meridianlost-code"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-ash/50 hover:text-bone/80 transition-all duration-500"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
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
          className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-bone transition-all duration-500 ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-5 h-px bg-bone transition-all duration-500 ${isOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-5 h-px bg-bone transition-all duration-500 ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-void/98 mobile-menu-overlay flex flex-col items-center justify-center gap-10 z-40">
          {/* Atmospheric glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-crimson/[0.03] rounded-full blur-3xl pointer-events-none" />

          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={`group font-heading text-4xl tracking-[0.2em] transition-all duration-500 ${
                pathname === link.href ? "text-crimson" : "text-bone/40 hover:text-bone"
              }`}
              style={{
                animation: `mobile-menu-item-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s forwards`,
                opacity: 0,
              }}
            >
              <span className="block font-mono text-[9px] tracking-[0.5em] text-crimson/40 mb-1">{link.code}</span>
              {link.label}
              {pathname === link.href && (
                <span className="block w-12 h-[2px] bg-gradient-to-r from-crimson/60 to-transparent mt-2" />
              )}
            </Link>
          ))}

          {/* Social links */}
          <div
            className="flex items-center gap-8 mt-4"
            style={{
              animation: `mobile-menu-item-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${links.length * 0.06}s forwards`,
              opacity: 0,
            }}
          >
            <a
              href="https://x.com/meridiandotist"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-ash/50 hover:text-bone transition-colors duration-400 uppercase"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              X
            </a>
            <a
              href="https://github.com/meridianlost-code"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-ash/50 hover:text-bone transition-colors duration-400 uppercase"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
              Community
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
