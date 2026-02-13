import Sigil from "@/components/Sigil";
import CoordinateStream from "@/components/CoordinateStream";
import HeroText from "@/components/HeroText";
import DoctrinePreview from "@/components/DoctrinePreview";
import CallToOracle from "@/components/CallToOracle";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import MarqueeBand from "@/components/MarqueeBand";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-void">
      <CoordinateStream />

      {/* ===== ATMOSPHERIC BLOBS ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-crimson/[0.02] animate-blob" />
        <div className="absolute top-[40%] -right-[15%] w-[500px] h-[500px] bg-blood/[0.015] animate-blob" style={{ animationDelay: "-5s" }} />
        <div className="absolute -bottom-[10%] left-[30%] w-[700px] h-[700px] bg-crimson/[0.01] animate-blob" style={{ animationDelay: "-10s" }} />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-lines opacity-40" />

        {/* Radial gradient backdrop */}
        <div className="absolute inset-0 gradient-mesh" />

        {/* Sigil — centered behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
          <Sigil />
        </div>

        {/* Vertical side text */}
        <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 text-vertical">
          <span className="font-mono text-[9px] tracking-[0.5em] text-ash/30 uppercase">
            Meridian Lost Collective — Epoch III — Signal Active
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 site-container pt-32 pb-28">
          <HeroText />
        </div>

        {/* Scroll indicator — bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono text-[8px] tracking-[0.4em] text-ash/30 uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-crimson/50 to-transparent" />
        </div>
      </section>

      {/* ===== SECTION DIVIDER ===== */}
      <div className="site-container"><div className="section-glow-divider" /></div>

      {/* ===== MARQUEE BAND ===== */}
      <MarqueeBand />

      {/* ===== DOCTRINE SECTION — broken grid ===== */}
      <section className="relative py-24 md:py-36">
        {/* Section header — centered */}
        <div className="site-container mb-20 text-center">
          <ScrollReveal animation="blur">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-8 h-px bg-crimson/30" />
              <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/50">01</span>
              <div className="w-8 h-px bg-crimson/30" />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="clip-up" delay={0.1}>
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-wide text-bone">
              Transmissions
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="up" delay={0.3}>
            <a
              href="/transmissions"
              className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-ash/50 hover:text-crimson transition-all duration-500 uppercase mt-10"
            >
              <span className="w-6 h-px bg-ash/30 group-hover:w-12 group-hover:bg-crimson/50 transition-all duration-500" />
              Full Archive
              <span className="w-6 h-px bg-ash/30 group-hover:w-12 group-hover:bg-crimson/50 transition-all duration-500" />
            </a>
          </ScrollReveal>
        </div>

        <DoctrinePreview />
      </section>

      {/* ===== MANIFESTO — dramatic typographic section ===== */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.06)_0%,transparent_50%)]" />

        {/* Ghost text in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span
            className="font-heading text-bone/[0.02] whitespace-nowrap"
            style={{ fontSize: "clamp(8rem, 25vw, 24rem)" }}
          >
            CONVERGE
          </span>
        </div>

        <div className="relative site-container-md text-center">
          <ScrollReveal animation="blur">
            <div className="flex items-center justify-center gap-4 mb-14">
              <div className="w-8 h-px bg-crimson/30" />
              <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/50 uppercase">
                Article Zero
              </span>
              <div className="w-8 h-px bg-crimson/30" />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="up" delay={0.2}>
            <blockquote className="font-heading text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-wide text-bone/60">
              <span className="text-crimson/70">&ldquo;</span>The meridian was never lost.
              It was <span className="text-bone italic">buried</span> beneath the noise of those who feared
              what silence would <span className="text-bone/80">reveal</span>.<span className="text-crimson/70">&rdquo;</span>
            </blockquote>
          </ScrollReveal>
          <ScrollReveal animation="up" delay={0.5}>
            <div className="mt-14 flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-crimson/30" />
              <span className="font-mono text-[9px] tracking-[0.3em] text-ash/40 uppercase">
                The First Keeper — Before Epoch 0 — Recovered Fragment
              </span>
              <div className="w-8 h-px bg-crimson/30" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION DIVIDER ===== */}
      <div className="site-container"><div className="section-glow-divider" /></div>

      {/* ===== SECOND MARQUEE ===== */}
      <MarqueeBand reverse />

      {/* ===== ORACLE CTA ===== */}
      <CallToOracle />

      <Footer />
    </main>
  );
}
