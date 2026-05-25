export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl animate-blob-1"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl animate-blob-2"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 left-1/3 w-[560px] h-[560px] rounded-full opacity-30 blur-3xl animate-blob-3"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(226,232,240,0.6) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />
    </div>
  );
}
