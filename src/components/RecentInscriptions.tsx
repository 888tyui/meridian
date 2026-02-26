"use client";

import { useState, useEffect, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface Inscription {
    id: string;
    wallet: string;
    memo: string;
    tag: string;
    freq: string;
    signature: string;
    createdAt: string;
}

function timeAgo(dateStr: string): string {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const diff = now - then;

    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    return new Date(dateStr).toLocaleDateString();
}

function truncateWallet(wallet: string): string {
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
}

function truncateSig(sig: string): string {
    return `${sig.slice(0, 4)}...${sig.slice(-4)}`;
}

export default function RecentInscriptions() {
    const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInscriptions = useCallback(async () => {
        try {
            const res = await fetch("/api/inscriptions?limit=20");
            if (res.ok) {
                const data = await res.json();
                setInscriptions(data.inscriptions || []);
            }
        } catch {
            console.warn("Failed to fetch inscriptions");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInscriptions();
    }, [fetchInscriptions]);

    // Expose refresh function globally for InscriptionForm callback
    useEffect(() => {
        (window as unknown as Record<string, () => void>).__refreshInscriptions = fetchInscriptions;
        return () => {
            delete (window as unknown as Record<string, (() => void) | undefined>).__refreshInscriptions;
        };
    }, [fetchInscriptions]);

    if (loading) {
        return (
            <div className="text-center py-16">
                <div className="flex items-center justify-center gap-3">
                    <div className="w-2 h-2 bg-crimson/30 rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] tracking-[0.3em] text-ash/45 uppercase animate-flicker">
                        Scanning frequencies...
                    </span>
                </div>
            </div>
        );
    }

    if (inscriptions.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-px bg-crimson/15" />
                    <span className="font-mono text-[9px] tracking-[0.4em] text-ash/40 uppercase">
                        No Signals Detected
                    </span>
                    <div className="w-8 h-px bg-crimson/15" />
                </div>
                <p className="font-body text-sm text-bone/50">
                    The void awaits its first inscription.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl center-x space-y-1">
            {inscriptions.map((item, i) => (
                <ScrollReveal key={item.id} animation="up" delay={0.08 * i}>
                    <div className="transmission-row group px-5 py-5 border-b border-bone/[0.04] transition-all duration-500">
                        <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6">
                            {/* Tag + Freq */}
                            <div className="flex items-center gap-3 shrink-0">
                                <span className="font-mono text-[8px] tracking-[0.3em] text-crimson/50 border border-crimson/15 px-2 py-0.5">
                                    {item.tag}
                                </span>
                                <span className="font-mono text-[9px] tracking-[0.1em] text-ash/45">
                                    {item.freq}
                                </span>
                            </div>

                            {/* Memo content */}
                            <div className="flex-1 min-w-0">
                                <p className="font-body text-sm text-bone/70 leading-relaxed">
                                    {item.memo}
                                </p>
                            </div>

                            {/* Meta */}
                            <div className="flex items-center gap-4 shrink-0">
                                <span className="font-mono text-[9px] tracking-[0.1em] text-ash/40">
                                    {timeAgo(item.createdAt)}
                                </span>
                                <a
                                    href={`https://explorer.solana.com/tx/${item.signature}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[9px] tracking-[0.1em] text-ash/35 hover:text-crimson/50 transition-colors duration-500"
                                >
                                    {truncateSig(item.signature)}
                                </a>
                                <span className="font-mono text-[8px] tracking-[0.1em] text-ash/30">
                                    {truncateWallet(item.wallet)}
                                </span>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            ))}

            {/* Total count */}
            <div className="mt-8 text-center">
                <span className="font-mono text-[9px] tracking-[0.2em] text-ash/40">
                    {inscriptions.length} SIGNAL{inscriptions.length !== 1 ? "S" : ""} INTERCEPTED
                </span>
            </div>
        </div>
    );
}
