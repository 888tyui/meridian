import Footer from "@/components/Footer";
import TransmissionList from "@/components/TransmissionList";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "TRANSMISSIONS — MERIDIAN LOST",
  description: "Archive of broadcasts from beyond the meridian.",
};

export default function TransmissionsPage() {
  return (
    <main className="relative min-h-screen bg-void">
      {/* Atmospheric blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-crimson/[0.015] animate-blob" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-blood/[0.01] animate-blob" style={{ animationDelay: "-8s" }} />
      </div>

      {/* Header */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.04)_0%,transparent_60%)] pointer-events-none" />

        {/* Ghost text */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          <span
            className="font-heading text-bone/[0.025] whitespace-nowrap"
            style={{ fontSize: "clamp(6rem, 18vw, 16rem)" }}
          >
            ARCHIVE
          </span>
        </div>

        <div className="relative site-container text-center">
          <ScrollReveal animation="blur">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-8 h-px bg-crimson/30" />
              <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/50 uppercase">
                Signal Archive
              </span>
              <div className="w-8 h-px bg-crimson/30" />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="clip-up" delay={0.1}>
            <h1
              className="font-heading tracking-wide text-bone mb-10"
              style={{ fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 0.9 }}
            >
              Transmissions
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="up" delay={0.3}>
            <p className="max-w-xl center-x font-body text-base md:text-lg text-bone/60 leading-relaxed">
              Intercepted broadcasts, decoded doctrines, and recovered fragments from
              the collective consciousness. Each transmission carries a frequency signature.
            </p>
          </ScrollReveal>

          {/* Stats bar */}
          <ScrollReveal animation="up" delay={0.5}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-8 py-5 border-t border-b border-bone/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-ash/40">9 BROADCASTS</span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-ash/30">
                FREQ RANGE: 133.000 — 145.500 MHz
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-ash/30">
                CLASSIFICATION: MIXED
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Transmission List */}
      <section className="relative py-8 md:py-16">
        <div className="site-container">
          <TransmissionList />
        </div>
      </section>

      <Footer />
    </main>
  );
}
