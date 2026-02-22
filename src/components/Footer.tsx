export default function Footer() {
  return (
    <footer className="relative border-t border-bone/[0.06]">
      {/* Subtle gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />

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
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-bone/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[9px] tracking-[0.2em] text-ash/30">
            &copy; EPOCH III — MERIDIAN LOST COLLECTIVE
          </span>
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 bg-crimson/30 rounded-full" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-ash/30">
              51.4014° N, 0.3231° W
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
