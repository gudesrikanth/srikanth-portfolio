export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 text-center bg-navy border-t border-navy-lighter">
      <p className="font-mono text-slate text-xs">
        Designed &amp; Built by{' '}
        <span className="text-slate-light">Srikanth Gude</span>
        {' '}· {year} · Built with{' '}
        <span className="text-slate-light">Next.js</span>
        {' '}· Deployed on{' '}
        <span className="text-slate-light">AWS Lambda</span>
      </p>
    </footer>
  );
}
