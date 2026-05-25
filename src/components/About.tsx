'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const HIGHLIGHTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    label: '8+ Years',
    description: 'Engineering production systems across fintech, SaaS, and platform domains.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    label: 'Distributed Systems',
    description: 'Kafka-backed event pipelines, circuit-breaker patterns, and multi-region failover.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    label: 'AI-First Engineering',
    description: 'LLM-powered agents, RAG pipelines, and tool-augmented reasoning systems.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    label: 'Platform Engineering',
    description: 'IaC with Terraform, Kubernetes operators, and developer-friendly CI/CD pipelines.',
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32"
      style={{ background: 'var(--background-secondary)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: 'var(--accent)' }}
          >
            About
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: 'var(--foreground)' }}>
            Building software that lasts
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: 'var(--foreground-muted)' }}
            >
              I&apos;m a Cloud-Native Full Stack Engineer with 8+ years of experience designing and
              delivering systems that handle real-world scale — from sub-millisecond APIs to
              event-driven platforms processing millions of messages daily.
            </p>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: 'var(--foreground-muted)' }}
            >
              My work spans the full vertical: backend services in Java/Spring Boot and Go, reactive
              frontends in Next.js, cloud infrastructure on AWS with Kubernetes and Terraform, and
              increasingly, AI-powered systems using LLMs and agent frameworks.
            </p>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: 'var(--foreground-muted)' }}
            >
              I care deeply about operational excellence — observable, resilient, and maintainable
              systems that teams can confidently ship and run at any scale.
            </p>

            <blockquote
              className="relative pl-5 py-1"
              style={{ borderLeft: '3px solid var(--accent)' }}
            >
              <p
                className="text-base italic leading-relaxed"
                style={{ color: 'var(--foreground)' }}
              >
                &ldquo;Great software is built through clarity, simplicity, and continuous
                learning.&rdquo;
              </p>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="rounded-xl p-5 transition-all duration-200"
                style={{
                  background: 'var(--background-card)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                }}
              >
                <div className="mb-3" style={{ color: 'var(--accent)' }}>
                  {item.icon}
                </div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.label}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
