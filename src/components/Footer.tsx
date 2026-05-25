export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 text-center"
      style={{
        background: 'var(--background-secondary)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
        &copy; {year} Srikanth Gude &bull; Built with Next.js 15 &bull; Deployed on AWS Lambda
      </p>
    </footer>
  );
}
