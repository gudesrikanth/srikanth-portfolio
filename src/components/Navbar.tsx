'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/90 backdrop-blur-sm shadow-lg shadow-navy/50' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <button
          onClick={() => scrollTo('#hero')}
          className="font-mono text-green text-xl font-bold hover:opacity-70 transition-opacity"
        >
          SG
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="font-mono text-sm text-slate-light hover:text-green transition-colors duration-200"
              >
                <span className="text-green mr-1">0{i + 1}.</span>
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <a
              href="https://linkedin.com/in/srikanthgude"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-green border border-green rounded px-4 py-2 hover:bg-green-tint transition-colors duration-200"
            >
              LinkedIn
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden text-green p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-green transition-all duration-300 ${
                open ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-px bg-green transition-all duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-px bg-green transition-all duration-300 ${
                open ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="md:hidden fixed inset-0 top-20 bg-navy-light/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8"
        >
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-mono text-xl text-slate-lightest hover:text-green transition-colors"
            >
              <span className="text-green text-sm block text-center mb-1">0{i + 1}.</span>
              {link.label}
            </button>
          ))}
          <a
            href="https://linkedin.com/in/srikanthgude"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-green border border-green rounded px-8 py-3 hover:bg-green-tint transition-colors mt-4"
          >
            LinkedIn
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
