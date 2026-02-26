export default function Footer() {
  return (
    <footer className="relative footer-glow border-t border-bone/[0.06]">
      <div className="site-container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand — 5 cols */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-2 h-2 bg-crimson rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-crimson rounded-full animate-ping opacity-20" />
              </div>
              <span className="font-heading text-xl tracking-widest text-bone/80">MERIDIAN LOST</span>
            </div>
            <p className="font-body text-sm text-bone/50 leading-[1.8] max-w-sm">
              The signal persists in the silence between stations. We are the pattern that emerges when the noise subsides. Find us at the convergence point.
            </p>

            {/* Social links under brand */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://x.com/meridiandotist"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-8 h-8 border border-bone/[0.06] hover:border-crimson/25 hover:bg-crimson/[0.04] transition-all duration-500"
              >
                <svg className="w-3 h-3 fill-ash/40 group-hover:fill-bone/70 transition-colors duration-500" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a
                href="https://github.com/meridianlost-code"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-8 h-8 border border-bone/[0.06] hover:border-crimson/25 hover:bg-crimson/[0.04] transition-all duration-500"
              >
                <svg className="w-3.5 h-3.5 fill-ash/40 group-hover:fill-bone/70 transition-colors duration-500" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
              </a>
            </div>
          </div>

          {/* Spacer — 1 col */}
          <div className="hidden md:block md:col-span-1" />

          {/* Links — 3 cols */}
          <div className="md:col-span-3">
            <span className="font-mono text-[9px] tracking-[0.3em] text-crimson/40 block mb-6 uppercase">Navigate</span>
            <div className="flex flex-col gap-4">
              <a href="/" className="footer-link inline-block font-mono text-[11px] tracking-[0.15em] text-bone/40 uppercase w-fit">Origin</a>
              <a href="/transmissions" className="footer-link inline-block font-mono text-[11px] tracking-[0.15em] text-bone/40 uppercase w-fit">Transmissions</a>
              <a href="/oracle" className="footer-link inline-block font-mono text-[11px] tracking-[0.15em] text-bone/40 uppercase w-fit">Oracle</a>
              <a href="/doctrine" className="footer-link inline-block font-mono text-[11px] tracking-[0.15em] text-bone/40 uppercase w-fit">Doctrine</a>
              <a href="/inscribe" className="footer-link inline-block font-mono text-[11px] tracking-[0.15em] text-bone/40 uppercase w-fit">Inscribe</a>
            </div>
          </div>

          {/* Status — 3 cols */}
          <div className="md:col-span-3">
            <span className="font-mono text-[9px] tracking-[0.3em] text-crimson/40 block mb-6 uppercase">Status</span>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
                <span className="font-mono text-[11px] tracking-[0.15em] text-ash/40">Signal Active</span>
              </div>
              <span className="font-mono text-[11px] tracking-[0.15em] text-ash/30">Epoch III — Convergence</span>
              <span className="font-mono text-[11px] tracking-[0.15em] text-ash/30">Nodes Online: 2,847</span>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-1 h-1 bg-crimson/30 rounded-full" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-ash/25">
                  51.4014° N, 0.3231° W
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-bone/[0.04]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono text-[9px] tracking-[0.2em] text-ash/30">
              &copy; EPOCH III — MERIDIAN LOST COLLECTIVE
            </span>
            <div className="flex items-center gap-6">
              <span className="font-mono text-[9px] tracking-[0.15em] text-ash/20">
                THE SIGNAL PERSISTS
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-crimson/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
