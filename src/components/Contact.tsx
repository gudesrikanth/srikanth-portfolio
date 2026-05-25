'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';
import MagneticButton from './MagneticButton';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)', scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className="relative py-28 md:py-36">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          variants={reveal}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="relative rounded-3xl overflow-hidden text-center"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent-emerald/50 via-accent-cyan/40 to-accent-violet/50 opacity-80" />
          <div className="relative glass-strong rounded-3xl p-10 md:p-14">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <MessageSquare className="w-3.5 h-3.5 text-accent-cyan" />
              <span className="font-mono text-xs text-slate-300">04. What&apos;s next</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              <span className="text-gradient">Contact &mdash; let&apos;s build something</span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              I&apos;m open to senior and staff engineering roles, plus consulting around
              cloud-native systems and AI applications. Whether you have a question or just
              want to say hi, my inbox is open.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <MagneticButton href="mailto:srikanth.gude4@gmail.com">
                <button className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-ink-950 bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-violet shadow-lg shadow-accent-violet/30 hover:shadow-accent-cyan/40 transition-shadow">
                  <Mail className="w-4 h-4" />
                  Say Hello
                </button>
              </MagneticButton>
            </div>

            <div className="flex items-center justify-center gap-3">
              <a
                href="https://github.com/gudesrikanth"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-slate-300 hover:text-accent-emerald hover:border-accent-emerald/40 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/srikanthgude"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-slate-300 hover:text-accent-cyan hover:border-accent-cyan/40 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
