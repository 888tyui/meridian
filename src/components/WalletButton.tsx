"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback, useState, useEffect } from "react";

export default function WalletButton() {
    const { publicKey, disconnect, connected, connecting } = useWallet();
    const { setVisible } = useWalletModal();
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleClick = useCallback(() => {
        if (connected) return;
        setVisible(true);
    }, [connected, setVisible]);

    const handleDisconnect = useCallback(() => {
        disconnect();
    }, [disconnect]);

    const handleCopy = useCallback(() => {
        if (!publicKey) return;
        navigator.clipboard.writeText(publicKey.toBase58());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [publicKey]);

    const truncatedKey = publicKey
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
        : "";

    if (!mounted) {
        return (
            <div className="wallet-btn px-8 py-4 border border-bone/[0.06] bg-surface">
                <span className="font-mono text-[11px] tracking-[0.2em] text-ash/40 uppercase">
                    Loading...
                </span>
            </div>
        );
    }

    if (connected && publicKey) {
        return (
            <div className="flex flex-col items-center gap-4">
                {/* Connected status */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-2 h-2 bg-crimson rounded-full" />
                        <div className="absolute inset-0 w-2 h-2 bg-crimson rounded-full animate-ping opacity-30" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-crimson/60 uppercase">
                        Signal Linked
                    </span>
                </div>

                {/* Wallet address */}
                <button
                    onClick={handleCopy}
                    className="group wallet-connected cult-border px-6 py-3 bg-surface/50 backdrop-blur-sm transition-all duration-500 hover:bg-surface/80"
                >
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[12px] tracking-[0.15em] text-bone/70">
                            {truncatedKey}
                        </span>
                        <span className="font-mono text-[8px] tracking-[0.2em] text-ash/40 group-hover:text-crimson/50 transition-colors duration-300">
                            {copied ? "COPIED" : "COPY"}
                        </span>
                    </div>
                </button>

                {/* Disconnect */}
                <button
                    onClick={handleDisconnect}
                    className="font-mono text-[9px] tracking-[0.3em] text-ash/30 hover:text-crimson/50 transition-all duration-500 uppercase"
                >
                    Sever Connection
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleClick}
            disabled={connecting}
            className="group wallet-btn btn-shimmer cult-border px-10 py-4 bg-surface/50 backdrop-blur-sm transition-all duration-700 hover:bg-surface/80 hover:border-crimson/30 disabled:opacity-40"
        >
            <div className="flex items-center gap-4">
                {/* Sigil dot */}
                <div className="relative">
                    <div className="w-2 h-2 border border-crimson/40 rounded-full group-hover:bg-crimson/40 transition-all duration-500" />
                </div>

                <span className="font-mono text-[11px] tracking-[0.3em] text-bone/60 group-hover:text-bone/90 transition-colors duration-500 uppercase">
                    {connecting ? "Linking..." : "Connect Wallet"}
                </span>

                {/* Arrow */}
                <span className="w-6 h-px bg-bone/20 group-hover:w-10 group-hover:bg-crimson/50 transition-all duration-500" />
            </div>
        </button>
    );
}
