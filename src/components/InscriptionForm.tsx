"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { Transaction, TransactionInstruction, PublicKey } from "@solana/web3.js";
import { useState, useCallback } from "react";

const MEMO_PROGRAM_ID = new PublicKey(
    "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

const FREQUENCY_TAGS = [
    { label: "WHISPER", freq: "133.7 MHz" },
    { label: "SIGNAL", freq: "137.0 MHz" },
    { label: "BROADCAST", freq: "141.3 MHz" },
    { label: "DISTRESS", freq: "143.8 MHz" },
    { label: "CONVERGENCE", freq: "145.5 MHz" },
];

type TxState =
    | { status: "idle" }
    | { status: "signing" }
    | { status: "confirming" }
    | { status: "saving" }
    | { status: "confirmed"; signature: string }
    | { status: "error"; message: string };

interface InscriptionFormProps {
    onInscriptionCreated?: () => void;
}

export default function InscriptionForm({ onInscriptionCreated }: InscriptionFormProps) {
    const { publicKey, sendTransaction, connected } = useWallet();
    const { connection } = useConnection();
    const [memo, setMemo] = useState("");
    const [tag, setTag] = useState(FREQUENCY_TAGS[1]);
    const [txState, setTxState] = useState<TxState>({ status: "idle" });

    const charCount = new TextEncoder().encode(memo).length;
    const maxBytes = 566;

    const handleSubmit = useCallback(async () => {
        if (!publicKey || !connected || !memo.trim()) return;

        try {
            setTxState({ status: "signing" });

            const formattedMemo = `[${tag.label}] ${memo.trim()}`;

            const instruction = new TransactionInstruction({
                keys: [{ pubkey: publicKey, isSigner: true, isWritable: false }],
                programId: MEMO_PROGRAM_ID,
                data: Buffer.from(formattedMemo, "utf-8"),
            });

            const transaction = new Transaction().add(instruction);

            const signature = await sendTransaction(transaction, connection);

            setTxState({ status: "confirming" });

            await connection.confirmTransaction(signature, "confirmed");

            // Save to DB
            setTxState({ status: "saving" });

            try {
                await fetch("/api/inscriptions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        wallet: publicKey.toBase58(),
                        memo: memo.trim(),
                        tag: tag.label,
                        freq: tag.freq,
                        signature,
                    }),
                });
            } catch {
                // DB save failure is non-critical — tx already confirmed on chain
                console.warn("Failed to save inscription to DB, but tx is confirmed.");
            }

            setTxState({ status: "confirmed", signature });
            setMemo("");
            onInscriptionCreated?.();
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Unknown transmission failure";
            setTxState({ status: "error", message });
        }
    }, [publicKey, connected, memo, tag, sendTransaction, connection, onInscriptionCreated]);

    const resetState = useCallback(() => {
        setTxState({ status: "idle" });
    }, []);

    if (!connected) {
        return (
            <div className="text-center py-16">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-px bg-crimson/20" />
                    <span className="font-mono text-[9px] tracking-[0.4em] text-ash/30 uppercase">
                        Wallet Required
                    </span>
                    <div className="w-8 h-px bg-crimson/20" />
                </div>
                <p className="font-body text-sm text-bone/40">
                    Connect your Solana wallet above to inscribe onto the chain.
                </p>
            </div>
        );
    }

    /* --- CONFIRMED STATE --- */
    if (txState.status === "confirmed") {
        return (
            <div className="inscription-confirmed response-card-enter">
                <div className="cult-border bg-surface/30 backdrop-blur-sm p-8 md:p-12 text-center">
                    {/* Success sigil */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="relative">
                            <div className="w-16 h-16 border border-crimson/20 rounded-full flex items-center justify-center animate-sigil-rotate" style={{ animationDuration: "20s" }}>
                                <div className="w-8 h-8 border border-crimson/30 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-crimson/60 rounded-full animate-beacon" />
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-crimson/20 to-transparent" />
                        </div>
                    </div>

                    <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/60 uppercase block mb-4">
                        Inscription Complete
                    </span>
                    <h3 className="font-heading text-2xl md:text-3xl tracking-wide text-bone/80 mb-6">
                        Signal Etched
                    </h3>
                    <p className="font-body text-sm text-bone/50 mb-8 max-w-md center-x">
                        Your transmission has been permanently inscribed into the Solana
                        meridian. The Oracle will absorb this frequency in the next convergence
                        cycle.
                    </p>

                    {/* Transaction link — mainnet */}
                    <a
                        href={`https://explorer.solana.com/tx/${txState.signature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-crimson/60 hover:text-crimson transition-all duration-500"
                    >
                        <span className="w-4 h-px bg-crimson/30 group-hover:w-8 transition-all duration-500" />
                        VIEW ON EXPLORER
                        <span className="w-4 h-px bg-crimson/30 group-hover:w-8 transition-all duration-500" />
                    </a>

                    <div className="mt-4">
                        <span className="font-mono text-[9px] tracking-[0.1em] text-ash/30 break-all">
                            {txState.signature}
                        </span>
                    </div>

                    <button
                        onClick={resetState}
                        className="mt-10 font-mono text-[10px] tracking-[0.3em] text-ash/40 hover:text-bone/70 transition-colors duration-500 uppercase"
                    >
                        New Inscription →
                    </button>
                </div>
            </div>
        );
    }

    /* --- ERROR STATE --- */
    if (txState.status === "error") {
        return (
            <div className="inscription-error response-card-enter">
                <div className="border border-crimson/20 bg-surface/30 backdrop-blur-sm p-8 text-center">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/70 uppercase block mb-4">
                        Transmission Failed
                    </span>
                    <p className="font-body text-sm text-bone/50 mb-6">{txState.message}</p>
                    <button
                        onClick={resetState}
                        className="font-mono text-[10px] tracking-[0.3em] text-ash/40 hover:text-bone/70 transition-colors duration-500 uppercase"
                    >
                        Retry →
                    </button>
                </div>
            </div>
        );
    }

    /* --- SIGNING / CONFIRMING / SAVING STATE --- */
    const isProcessing =
        txState.status === "signing" || txState.status === "confirming" || txState.status === "saving";

    const statusText = {
        signing: "Awaiting Signature...",
        confirming: "Confirming on Chain...",
        saving: "Recording Signal...",
        idle: "",
        confirmed: "",
        error: "",
    }[txState.status];

    return (
        <div className={`inscription-form ${isProcessing ? "oracle-channeling" : ""}`}>
            <div className="cult-border bg-surface/20 backdrop-blur-sm p-6 md:p-10">
                {/* Processing overlay */}
                {isProcessing && (
                    <div className="absolute inset-0 bg-void/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 border border-crimson/20 rounded-full animate-sigil-rotate" style={{ animationDuration: "3s" }}>
                                <div className="absolute top-0 left-1/2 w-1 h-1 bg-crimson rounded-full -translate-x-1/2 -translate-y-1/2" />
                            </div>
                        </div>
                        <span className="font-mono text-[10px] tracking-[0.4em] text-crimson/60 uppercase animate-flicker">
                            {statusText}
                        </span>

                        {/* Scan line during processing */}
                        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-crimson/40 to-transparent oracle-scan-line" />
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-px bg-crimson/20" />
                    <span className="font-mono text-[9px] tracking-[0.4em] text-crimson/40 uppercase">
                        Compose Inscription
                    </span>
                    <div className="w-8 h-px bg-crimson/20" />
                </div>

                {/* Frequency tag selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {FREQUENCY_TAGS.map((t) => (
                        <button
                            key={t.label}
                            onClick={() => setTag(t)}
                            className={`filter-btn px-3 py-1.5 border font-mono text-[9px] tracking-[0.2em] uppercase transition-all duration-400 ${tag.label === t.label
                                    ? "border-crimson/30 text-crimson/70 bg-crimson/[0.05]"
                                    : "border-bone/[0.06] text-ash/40 hover:text-bone/60 hover:border-bone/10"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Frequency display */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 bg-crimson/40 rounded-full animate-pulse" />
                    <span className="font-mono text-[9px] tracking-[0.2em] text-ash/30">
                        FREQ: {tag.freq}
                    </span>
                </div>

                {/* Textarea */}
                <div className="oracle-input-wrap mb-4">
                    <textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="Speak your truth into the void..."
                        rows={5}
                        className="oracle-textarea w-full bg-void/50 border border-bone/[0.06] p-5 font-body text-sm text-bone/70 placeholder-ash/20 leading-relaxed transition-all duration-500 focus:border-crimson/20"
                    />

                    {/* Byte counter */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <span
                            className={`font-mono text-[9px] tracking-[0.1em] ${charCount > maxBytes ? "text-crimson" : "text-ash/30"
                                }`}
                        >
                            {charCount} / {maxBytes}
                        </span>
                    </div>
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={!memo.trim() || charCount > maxBytes || isProcessing}
                    className="group w-full btn-shimmer py-4 border border-crimson/20 bg-crimson/[0.04] hover:bg-crimson/[0.08] transition-all duration-700 disabled:opacity-30 disabled:hover:bg-crimson/[0.04]"
                >
                    <div className="flex items-center justify-center gap-4">
                        <span className="w-6 h-px bg-crimson/30 group-hover:w-10 transition-all duration-500" />
                        <span className="font-mono text-[11px] tracking-[0.3em] text-bone/70 group-hover:text-bone transition-colors duration-500 uppercase">
                            Inscribe onto Chain
                        </span>
                        <span className="w-6 h-px bg-crimson/30 group-hover:w-10 transition-all duration-500" />
                    </div>
                </button>
            </div>
        </div>
    );
}
