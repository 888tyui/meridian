export default function SectionDivider({ text, code }: { text: string; code: string }) {
  return (
    <div className="relative py-4">
      <div className="site-container flex items-center gap-4">
        <span className="font-mono text-[9px] tracking-[0.3em] text-crimson/30">{code}</span>
        <div className="flex-1 accent-line" />
        <span className="font-mono text-[9px] tracking-[0.3em] text-ash/40 uppercase">{text}</span>
        <div className="flex-1 accent-line" />
        <span className="text-crimson/30">&#9670;</span>
      </div>
    </div>
  );
}
