'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1424 50%, #0a0f1e 100%)' }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.div variants={itemVariants}>
          <span
            className="inline-block text-sm font-medium tracking-widest uppercase mb-6"
            style={{ color: 'var(--accent)' }}
          >
            Available for new opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          style={{ color: 'var(--foreground)' }}
        >
          Srikanth{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Gude
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-medium mb-4"
          style={{ color: 'var(--foreground-muted)' }}
        >
          Cloud-Native Full Stack Engineer
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg mb-4"
          style={{ color: 'rgba(148, 163, 184, 0.7)' }}
        >
          Distributed Systems &bull; AI-Powered Applications
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-base md:text-lg mb-12 leading-relaxed"
          style={{ color: 'var(--foreground-muted)' }}
        >
          8+ years designing and shipping production systems at scale — from event-driven
          microservices and cloud infrastructure to LLM-powered applications and
          platform engineering.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200"
            style={{
              background: 'var(--accent)',
              color: '#0a0f1e',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-hover)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)';
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200"
            style={{
              border: '1px solid var(--border-accent)',
              color: 'var(--accent)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-glow)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            }}
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 flex items-center justify-center gap-8"
        >
          {['Java / Spring Boot', 'AWS / Kubernetes', 'AI Agents'].map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid var(--border-accent)',
                color: 'var(--accent)',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.5"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
