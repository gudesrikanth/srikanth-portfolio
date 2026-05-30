'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-strong shadow-lg shadow-ink-950/40'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <button
          onClick={() => scrollTo('#hero')}
          className="font-mono text-lg font-bold tracking-wider"
          aria-label="Home"
        >
          <span className="text-gradient">SG</span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={`relative font-medium text-[0.95rem] tracking-wide px-4 py-2 rounded-full transition-colors ${
                  active === link.id
                    ? 'text-accent-emerald'
                    : 'text-slate-200 hover:text-accent-emerald'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent-emerald/10 border border-accent-emerald/30 shadow-[0_0_18px_-4px_rgba(16,185,129,0.45)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
          <li>
            <a
              href="https://linkedin.com/in/srikanthgude"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-2 font-mono text-sm text-ink-950 bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-violet rounded-full px-4 py-2 hover:shadow-lg hover:shadow-accent-violet/30 transition-shadow"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          </li>
        </ul>

        <button
          className="md:hidden text-accent-emerald p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-accent-emerald transition-all duration-300 ${
                open ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-px bg-accent-emerald transition-all duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-px bg-accent-emerald transition-all duration-300 ${
                open ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-20 glass-strong flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-semibold text-2xl text-slate-100 hover:text-accent-emerald transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://linkedin.com/in/srikanthgude"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-ink-950 bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-violet rounded-full px-6 py-3 mt-4"
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
