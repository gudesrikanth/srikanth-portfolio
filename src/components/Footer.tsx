export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 text-center border-t border-white/5">
      <p className="font-mono text-slate-500 text-xs">
        Designed &amp; Built by{' '}
        <span className="text-slate-300">Srikanth Gude</span>
        {' '}· {year} · Built with{' '}
        <span className="text-slate-300">Next.js</span>
        {' '}· Deployed on{' '}
        <span className="text-slate-300">AWS Lambda</span>
      </p>
    </footer>
  );
}
