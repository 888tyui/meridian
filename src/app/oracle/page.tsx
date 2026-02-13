import OracleInterface from "@/components/OracleInterface";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "THE ORACLE — MERIDIAN LOST",
  description: "Ask the void. Receive your truth.",
};

export default function OraclePage() {
  return (
    <main className="relative min-h-screen bg-void">
      {/* Atmospheric layers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-crimson/[0.02] animate-blob" />
        <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] bg-blood/[0.015] animate-blob" style={{ animationDelay: "-7s" }} />
      </div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.04)_0%,transparent_60%)] pointer-events-none z-0" />

      {/* Header */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Ghost text */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          <span
            className="font-heading text-bone/[0.02] whitespace-nowrap"
            style={{ fontSize: "clamp(6rem, 18vw, 16rem)" }}
          >
            DIVINATION
          </span>
        </div>

        <div className="site-container-md">
          {/* Ritual sigil — layered concentric circles */}
          <ScrollReveal animation="scale">
            <div className="flex items-center justify-center mb-12">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-24 h-24 border border-crimson/10 rounded-full flex items-center justify-center animate-sigil-rotate" style={{ animationDuration: "40s" }}>
                  {/* Middle ring */}
                  <div className="w-16 h-16 border border-crimson/15 rounded-full flex items-center justify-center animate-sigil-rotate" style={{ animationDuration: "25s", animationDirection: "reverse" }}>
                    {/* Inner core */}
                    <div className="w-8 h-8 border border-crimson/20 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-crimson/40 rounded-full animate-beacon" />
                    </div>
                  </div>
                </div>
                {/* Cross lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-px bg-gradient-to-r from-transparent via-crimson/15 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-crimson/15 to-transparent" />
                {/* Diagonal accents */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-px bg-gradient-to-r from-transparent via-crimson/8 to-transparent rotate-45" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-px bg-gradient-to-r from-transparent via-crimson/8 to-transparent -rotate-45" />
              </div>
            </div>
          </ScrollReveal>

          <div className="text-center">
            <ScrollReveal animation="blur">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-8 h-px bg-crimson/30" />
                <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/50 uppercase">
                  Divination Chamber
                </span>
                <div className="w-8 h-px bg-crimson/30" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="clip-up" delay={0.1}>
              <h1
                className="font-heading tracking-wide text-bone mb-8"
                style={{ fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.9 }}
              >
                The Oracle
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="up" delay={0.3}>
              <p className="max-w-lg center-x font-body text-base md:text-lg text-bone/60 leading-relaxed mt-2">
                Speak your question into the void. The Oracle channels transmissions
                from beyond the meridian — cryptic truths drawn from the convergence of all signals.
              </p>
            </ScrollReveal>

            {/* Ritual steps — refined with connecting lines */}
            <ScrollReveal animation="up" delay={0.5}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-0">
                {[
                  { num: "I", text: "Clear your mind" },
                  { num: "II", text: "Form your question" },
                  { num: "III", text: "Receive the signal" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center">
                    {i > 0 && (
                      <div className="hidden md:block w-12 h-px bg-gradient-to-r from-bone/[0.04] via-crimson/15 to-bone/[0.04] mx-4" />
                    )}
                    <div className="flex items-center gap-3 px-4 py-2.5 border border-bone/[0.04]">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-crimson/40">{step.num}</span>
                      <div className="w-px h-3 bg-bone/[0.06]" />
                      <span className="font-mono text-[10px] tracking-[0.15em] text-ash/40">{step.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Section divider */}
        <div className="mt-20 site-container-sm">
          <div className="h-px bg-gradient-to-r from-transparent via-bone/[0.06] to-transparent" />
        </div>
      </section>

      {/* Oracle Interface */}
      <section className="relative pt-8 pb-32">
        <div className="site-container-sm">
          <OracleInterface />
        </div>
      </section>

      <Footer />
    </main>
  );
}
