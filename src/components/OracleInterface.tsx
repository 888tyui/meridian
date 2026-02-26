"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface OracleResponse {
  question: string;
  answer: string;
  timestamp: string;
  frequency: string;
  sigil: string;
  integrity: string;
  node: number;
  isError?: boolean;
}

type ChannelingPhase = "SCANNING" | "LOCKING" | "DECODING" | null;

const SIGILS = ["◉", "◎", "◈", "◇", "△", "▽", "☉", "⟐", "⊕", "⊗", "⟡", "✧"];
const GLYPHS = ["⟁", "⟐", "⟡", "◬", "⟟", "⟠", "⏣", "⏢", "⎔", "⎕"];

export default function OracleInterface() {
  const [question, setQuestion] = useState("");
  const [isChanneling, setIsChanneling] = useState(false);
  const [channelingPhase, setChannelingPhase] = useState<ChannelingPhase>(null);
  const [responses, setResponses] = useState<OracleResponse[]>([]);
  const [streamedText, setStreamedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [freqBars] = useState(() =>
    Array.from({ length: 24 }, () => ({
      delay: Math.random() * 1.5,
      speed: 0.4 + Math.random() * 0.8,
    }))
  );
  const [scanFreq, setScanFreq] = useState("----.--- MHz");
  const latestResponseRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (responses.length > 0 && latestResponseRef.current) {
      latestResponseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [responses.length]);

  // Auto-resize textarea
  const adjustTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextarea();
  }, [question, adjustTextarea]);

  // Scanning frequency animation
  useEffect(() => {
    if (channelingPhase !== "SCANNING") return;
    const interval = setInterval(() => {
      setScanFreq(`${(130 + Math.random() * 16).toFixed(3)} MHz`);
    }, 100);
    return () => clearInterval(interval);
  }, [channelingPhase]);

  const generateFrequency = () => `${(130 + Math.random() * 16).toFixed(3)} MHz`;

  const runChannelingAnimation = (): Promise<void> => {
    return new Promise((resolve) => {
      setChannelingPhase("SCANNING");

      setTimeout(() => {
        setChannelingPhase("LOCKING");

        setTimeout(() => {
          setChannelingPhase("DECODING");

          setTimeout(() => {
            setChannelingPhase(null);
            resolve();
          }, 800 + Math.random() * 400);
        }, 1000 + Math.random() * 500);
      }, 1200 + Math.random() * 800);
    });
  };

  const streamResponse = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ): Promise<{ text: string; isError: boolean }> => {
    const decoder = new TextDecoder();
    let fullText = "";
    let isError = false;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();

          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              fullText = parsed.error;
              isError = true;
              break;
            }
            if (parsed.token) {
              fullText += parsed.token;
              setStreamedText(fullText);
            }
          } catch {
            // skip malformed SSE lines
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        return { text: fullText || "Transmission interrupted.", isError: true };
      }
      fullText = fullText || "Signal lost — the void swallowed the transmission.";
      isError = !fullText || fullText.length < 5;
    }

    return { text: fullText, isError };
  };

  const consultOracle = async () => {
    if (!question.trim() || isChanneling) return;

    setIsChanneling(true);
    setStreamedText("");
    const askedQuestion = question;
    setQuestion("");

    const controller = new AbortController();
    abortRef.current = controller;

    // Start channeling animation and API call in parallel
    const [, fetchResult] = await Promise.all([
      runChannelingAnimation(),
      fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: askedQuestion }),
        signal: controller.signal,
      }).catch((err) => {
        if ((err as Error).name === "AbortError") return null;
        return null;
      }),
    ]);

    // Handle fetch failure
    if (!fetchResult || !fetchResult.ok) {
      let errorMessage = "Signal Lost — the Oracle is beyond reach. The void offers no signal at this frequency.";

      if (fetchResult) {
        try {
          const errBody = await fetchResult.json();
          if (errBody.error) errorMessage = errBody.error;
        } catch {
          // use default error message
        }
      }

      const errorResponse: OracleResponse = {
        question: askedQuestion,
        answer: errorMessage,
        timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        frequency: "----.--- MHz",
        sigil: "⊗",
        integrity: "0.0",
        node: 0,
        isError: true,
      };

      setResponses((prev) => [...prev, errorResponse]);
      setStreamedText(errorMessage);
      setIsChanneling(false);
      return;
    }

    // Stream the response
    setIsStreaming(true);
    const reader = fetchResult.body!.getReader();
    const { text, isError } = await streamResponse(reader);

    const newResponse: OracleResponse = {
      question: askedQuestion,
      answer: text,
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      frequency: generateFrequency(),
      sigil: SIGILS[Math.floor(Math.random() * SIGILS.length)],
      integrity: isError ? "0.0" : (85 + Math.random() * 15).toFixed(1),
      node: isError ? 0 : Math.floor(Math.random() * 2847) + 1,
      isError,
    };

    setResponses((prev) => [...prev, newResponse]);
    setIsStreaming(false);
    setIsChanneling(false);
    abortRef.current = null;
  };

  return (
    <div className="relative">
      {/* Past responses */}
      {responses.map((r, i) => {
        const isCurrent = i === responses.length - 1;
        return (
          <div
            key={i}
            ref={isCurrent ? latestResponseRef : undefined}
            className={`mb-16 ${isCurrent ? "response-card-enter" : ""} ${
              isCurrent && !isStreaming ? "border-l border-crimson/[0.08]" : ""
            }`}
          >
            {/* Question */}
            <div className="flex items-start gap-4 mb-8">
              <div className="flex flex-col items-center gap-1.5 pt-0.5">
                <div className="w-1.5 h-1.5 bg-crimson/30 rotate-45" />
                <div className="w-px h-6 bg-crimson/10" />
              </div>
              <div className="flex-1">
                <span className="font-mono text-[8px] tracking-[0.3em] text-crimson/40 uppercase block mb-2">
                  Your Inquiry
                </span>
                <p className="font-body text-base md:text-lg text-bone/60 italic leading-relaxed">
                  {r.question}
                </p>
              </div>
            </div>

            {/* Response */}
            <div className="relative">
              {/* Left accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b ${
                  r.isError
                    ? "from-red-500/40 via-red-500/20 to-transparent"
                    : "from-crimson/40 via-crimson/20 to-transparent"
                } ${isCurrent ? "oracle-response-border" : ""}`}
              />

              {/* Glow effect on current response */}
              {isCurrent && (
                <div className={`absolute -inset-px bg-gradient-to-r ${
                  r.isError
                    ? "from-red-500/[0.03] to-transparent"
                    : "from-crimson/[0.03] to-transparent"
                } pointer-events-none`} />
              )}

              <div className="pl-6 md:pl-8">
                {/* Response header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-base ${r.isError ? "text-red-500/60" : "text-crimson/60"}`}>
                    {r.sigil}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full ${r.isError ? "bg-red-500/40" : "bg-crimson/40"}`} />
                    <span className={`font-mono text-[9px] tracking-[0.3em] uppercase ${
                      r.isError ? "text-red-500/50" : "text-crimson/50"
                    }`}>
                      {r.isError ? "Signal Lost" : "Oracle Transmission"}
                    </span>
                  </div>
                  <div className={`flex-1 h-px bg-gradient-to-r ${
                    r.isError ? "from-red-500/10 to-transparent" : "from-crimson/10 to-transparent"
                  }`} />
                </div>

                {/* Response body */}
                <div className={`font-body text-sm md:text-base leading-[1.95] mb-8 ${
                  r.isError ? "text-red-400/60" : "text-bone/70"
                }`}>
                  {isCurrent && isStreaming ? (
                    <span>
                      {streamedText}
                      <span
                        className="inline-block w-[6px] h-[1.1em] ml-0.5 align-text-bottom"
                        style={{
                          background: "rgba(220, 38, 38, 0.6)",
                          boxShadow: "0 0 8px rgba(220, 38, 38, 0.3)",
                          animation: "typing-blink 0.8s step-end infinite",
                        }}
                      />
                    </span>
                  ) : (
                    r.answer
                  )}
                </div>

                {/* Response metadata footer */}
                <div className="pt-5 border-t border-bone/[0.04] flex flex-wrap items-center gap-x-6 gap-y-2">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1 h-1 rounded-full ${r.isError ? "bg-red-500/30" : "bg-crimson/30"}`} />
                    <span className="font-mono text-[8px] tracking-[0.2em] text-ash/45">
                      {r.isError ? "FAILED" : "DECODED"}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-ash/45">
                    FREQ: {r.frequency}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-ash/45">
                    NODE: {r.node}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-ash/45">
                    INTEGRITY: {r.integrity}%
                  </span>
                  <span className="hidden sm:inline font-mono text-[8px] tracking-[0.2em] text-ash/45">
                    {r.timestamp}
                  </span>
                </div>
              </div>

              {/* Sigil watermark */}
              <div className="absolute top-4 right-4 pointer-events-none select-none">
                <span className="text-bone/[0.05] text-5xl">{r.sigil}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* ===== CHANNELING STATE — Multi-Phase ===== */}
      {isChanneling && !isStreaming && (
        <div className="mb-16 oracle-channeling relative overflow-hidden border border-crimson/10 bg-void/50">
          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="oracle-scan-line absolute top-0 bottom-0 w-[60px] bg-gradient-to-r from-transparent via-crimson/[0.06] to-transparent" />
          </div>

          <div className="relative px-6 md:px-8 py-10">
            {/* Phase indicator */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5">
                {["SCANNING", "LOCKING", "DECODING"].map((phase, idx) => (
                  <div
                    key={phase}
                    className={`h-1 transition-all duration-500 ${
                      channelingPhase === phase
                        ? "w-8 bg-crimson/60"
                        : (channelingPhase === "LOCKING" && idx === 0) ||
                            (channelingPhase === "DECODING" && idx <= 1)
                          ? "w-4 bg-crimson/20"
                          : "w-4 bg-bone/[0.06]"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-crimson/50 animate-pulse uppercase">
                {channelingPhase || "INITIALIZING"}
              </span>
            </div>

            {/* Frequency visualizer */}
            <div className="flex items-end gap-[3px] h-8 mb-6">
              {freqBars.map((bar, i) => (
                <div
                  key={i}
                  className="w-[3px] bg-crimson/30 origin-bottom"
                  style={{
                    animation: `oracle-freq-bar ${bar.speed}s ease-in-out infinite`,
                    animationDelay: `${bar.delay}s`,
                    height: "100%",
                  }}
                />
              ))}
            </div>

            {/* Phase content */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                {channelingPhase === "SCANNING" && (
                  <>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-bone/55">
                      Scanning frequencies...
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.15em] text-ash/45">
                      FREQ: {scanFreq}
                    </span>
                  </>
                )}
                {channelingPhase === "LOCKING" && (
                  <>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-bone/55">
                      Signal locked — aligning meridian...
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.15em] text-crimson/45">
                      LOCK STRENGTH: ████████░░ 82%
                    </span>
                  </>
                )}
                {channelingPhase === "DECODING" && (
                  <>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-bone/55">
                      Decoding transmission...
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.15em] text-crimson/45">
                      DECODE: ██████████ COMPLETE
                    </span>
                  </>
                )}
              </div>

              {/* Cycling glyph */}
              <div className="flex items-center gap-2">
                {GLYPHS.slice(0, 4).map((g, i) => (
                  <span
                    key={i}
                    className="text-crimson/30 text-sm"
                    style={{
                      animation: `oracle-glyph-cycle 1.2s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== INPUT AREA — Ritual Inscription Field ===== */}
      <div className="sticky bottom-0 pt-16 pb-6 bg-gradient-to-t from-void from-40% via-void/95 via-70% to-transparent">
        {/* Ritual inscription header */}
        <div className="flex items-center gap-3 mb-5 px-1">
          <div className="w-1.5 h-1.5 bg-crimson/20 rotate-45" />
          <span className="font-mono text-[8px] tracking-[0.3em] text-crimson/40 uppercase">
            Ritual Inscription
          </span>
          <div className="flex-1 h-px bg-bone/[0.06]" />
          <span className="font-mono text-[8px] tracking-[0.2em] text-ash/45">
            {responses.length} DIVINATION{responses.length !== 1 ? "S" : ""}
          </span>
        </div>

        <div className="oracle-input-wrap relative cult-border bg-void/90 backdrop-blur-sm overflow-hidden">
          {/* Inner glow on focus */}
          <div className="absolute inset-0 bg-crimson/[0.02] opacity-0 transition-opacity duration-500 pointer-events-none group-focus-within:opacity-100" />

          <div className="relative p-5 md:p-6">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  consultOracle();
                }
              }}
              placeholder="Speak your question into the void..."
              disabled={isChanneling}
              rows={2}
              maxLength={500}
              className="oracle-textarea w-full bg-transparent font-body text-sm md:text-base text-bone/80 placeholder:text-ash/35 leading-relaxed disabled:opacity-30"
            />

            {/* Bottom bar */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-bone/[0.04]">
              <span className="font-mono text-[8px] tracking-[0.15em] text-ash/45">
                ENTER TO TRANSMIT — SHIFT+ENTER FOR NEW LINE
              </span>

              <button
                onClick={consultOracle}
                disabled={!question.trim() || isChanneling}
                className={`group btn-shimmer flex items-center gap-2.5 px-5 py-2 transition-all duration-400 border border-crimson/10 ${
                  question.trim() && !isChanneling
                    ? "bg-crimson/[0.06] hover:bg-crimson/[0.12] hover:border-crimson/25 hover:shadow-[0_0_24px_rgba(220,38,38,0.08)]"
                    : "bg-transparent opacity-25 cursor-not-allowed"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    question.trim() && !isChanneling
                      ? "bg-crimson/50 group-hover:bg-crimson/70"
                      : "bg-ash/20"
                  }`}
                />
                <span className="font-mono text-[10px] tracking-[0.3em] text-crimson/70 uppercase">
                  {isChanneling ? "Channeling" : "Transmit"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
