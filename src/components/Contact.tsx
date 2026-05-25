'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const CONTACT_ITEMS = [
  {
    label: 'Email',
    value: 'srikanth.gude4@gmail.com',
    href: 'mailto:srikanth.gude4@gmail.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    description: 'Best for async conversations and project inquiries.',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/srikanthgude',
    href: 'https://linkedin.com/in/srikanthgude',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    description: 'Professional network, open to connecting.',
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-32"
      style={{ background: 'var(--background)' }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: 'var(--accent)' }}
          >
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: 'var(--foreground)' }}>
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: 'var(--foreground-muted)' }}>
            I&apos;m open to senior engineering roles, staff engineering opportunities, and
            consulting engagements around cloud-native systems and AI applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {CONTACT_ITEMS.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="rounded-xl p-6 flex flex-col gap-3 transition-all duration-200 group"
              style={{
                background: 'var(--background-card)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'var(--border-accent)';
                el.style.transform = 'translateY(-3px)';
                el.style.boxShadow = '0 12px 40px rgba(6, 182, 212, 0.08)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'var(--border)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}
              >
                {item.icon}
              </div>
              <div>
                <div
                  className="text-xs font-semibold tracking-wider uppercase mb-1"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  {item.label}
                </div>
                <div
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.value}
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                {item.description}
              </p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
            Based in the US &bull; Open to remote and hybrid opportunities worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
