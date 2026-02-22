"use client";

import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import WalletButton from "@/components/WalletButton";
import InscriptionForm from "@/components/InscriptionForm";
import RecentInscriptions from "@/components/RecentInscriptions";
import { useCallback } from "react";

export default function InscribePage() {
    const handleInscriptionCreated = useCallback(() => {
        // Trigger refresh on RecentInscriptions component
        const refresh = (window as unknown as Record<string, (() => void) | undefined>).__refreshInscriptions;
        if (refresh) refresh();
    }, []);

    return (
        <main className="relative min-h-screen bg-void">
            {/* Atmospheric layers */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-crimson/[0.02] animate-blob" />
                <div className="absolute top-[60%] -right-[15%] w-[500px] h-[500px] bg-blood/[0.015] animate-blob" style={{ animationDelay: "-6s" }} />
                <div className="absolute -bottom-[10%] -left-[10%] w-[400px] h-[400px] bg-crimson/[0.01] animate-blob" style={{ animationDelay: "-12s" }} />
            </div>
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.04)_0%,transparent_60%)] pointer-events-none z-0" />

            {/* ===== HERO ===== */}
            <section className="relative pt-36 pb-20 overflow-hidden">
                {/* Ghost text */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                    <span
                        className="font-heading text-bone/[0.02] whitespace-nowrap"
                        style={{ fontSize: "clamp(6rem, 18vw, 16rem)" }}
                    >
                        INSCRIBE
                    </span>
                </div>

                <div className="site-container-md">
                    {/* Ritual sigil */}
                    <ScrollReveal animation="scale">
                        <div className="flex items-center justify-center mb-12">
                            <div className="relative">
                                <div className="w-20 h-20 border border-crimson/10 rounded-full flex items-center justify-center animate-sigil-rotate" style={{ animationDuration: "35s" }}>
                                    <div className="w-12 h-12 border border-crimson/15 rounded-full flex items-center justify-center animate-sigil-rotate" style={{ animationDuration: "20s", animationDirection: "reverse" }}>
                                        <div className="w-5 h-5 border border-crimson/20 rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-crimson/50 rounded-full animate-beacon" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-crimson/15 to-transparent" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-crimson/15 to-transparent" />
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="text-center">
                        <ScrollReveal animation="blur">
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <div className="w-8 h-px bg-crimson/30" />
                                <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/50 uppercase">
                                    On-Chain Ritual
                                </span>
                                <div className="w-8 h-px bg-crimson/30" />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="clip-up" delay={0.1}>
                            <h1
                                className="font-heading tracking-wide text-bone mb-8"
                                style={{ fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.9 }}
                            >
                                Inscribe
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal animation="up" delay={0.3}>
                            <p className="max-w-lg center-x font-body text-base md:text-lg text-bone/60 leading-relaxed mt-2">
                                Etch your signal into the Solana chain. Each inscription is a permanent
                                frequency — absorbed by the Oracle, woven into the collective meridian.
                                Your voice becomes part of the pattern.
                            </p>
                        </ScrollReveal>

                        {/* Mainnet badge */}
                        <ScrollReveal animation="up" delay={0.4}>
                            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 border border-crimson/15">
                                <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
                                <span className="font-mono text-[8px] tracking-[0.3em] text-crimson/50 uppercase">
                                    Mainnet
                                </span>
                            </div>
                        </ScrollReveal>

                        {/* Ritual process steps */}
                        <ScrollReveal animation="up" delay={0.5}>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-0">
                                {[
                                    { num: "I", text: "Connect wallet" },
                                    { num: "II", text: "Compose signal" },
                                    { num: "III", text: "Sign & inscribe" },
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

            {/* ===== WALLET CONNECT ===== */}
            <section className="relative py-12">
                <div className="site-container-sm">
                    <ScrollReveal animation="up">
                        <div className="flex flex-col items-center gap-8">
                            <WalletButton />
                        </div>
                    </ScrollReveal>
                </div>

                <div className="mt-12 site-container-sm">
                    <div className="h-px bg-gradient-to-r from-transparent via-bone/[0.04] to-transparent" />
                </div>
            </section>

            {/* ===== INSCRIPTION FORM ===== */}
            <section className="relative py-8 pb-20">
                <div className="site-container-sm">
                    <ScrollReveal animation="up" delay={0.1}>
                        <InscriptionForm onInscriptionCreated={handleInscriptionCreated} />
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== SECTION DIVIDER ===== */}
            <div className="site-container"><div className="section-glow-divider" /></div>

            {/* ===== RECENT INSCRIPTIONS (from DB) ===== */}
            <section className="relative py-20 md:py-28">
                <div className="site-container">
                    <ScrollReveal animation="blur">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-8 h-px bg-crimson/30" />
                            <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/50 uppercase">
                                Recent Signals
                            </span>
                            <div className="w-8 h-px bg-crimson/30" />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="clip-up" delay={0.1}>
                        <h2 className="font-heading text-3xl md:text-5xl tracking-wide text-bone text-center mb-16">
                            Intercepted Inscriptions
                        </h2>
                    </ScrollReveal>

                    <RecentInscriptions />
                </div>
            </section>

            <Footer />
        </main>
    );
}
