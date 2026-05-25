'use client';
import { motion } from 'framer-motion';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-navy overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(100,255,218,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Radial fade over grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24"
      >
        <motion.p variants={item} className="font-mono text-green text-base mb-5">
          Hi, my name is
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl md:text-8xl font-bold text-slate-lightest leading-tight mb-3"
        >
          Srikanth Gude.
        </motion.h1>

        <motion.h2
          variants={item}
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate leading-tight mb-8"
        >
          I build things for the cloud.
        </motion.h2>

        <motion.p
          variants={item}
          className="max-w-lg text-slate text-lg leading-relaxed mb-12"
        >
          Cloud-Native Full Stack Engineer with 8+ years designing production systems — from
          event-driven microservices and Kubernetes platforms to{' '}
          <span className="text-green">AI-powered applications</span> and serverless architectures.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4">
          <button
            onClick={() =>
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="font-mono text-green border border-green rounded px-7 py-4 text-sm hover:bg-green-tint transition-all duration-200"
          >
            Check out my work
          </button>
          <button
            onClick={() =>
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="font-mono text-slate-light text-sm px-7 py-4 hover:text-green transition-colors duration-200"
          >
            Get in touch →
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={item} className="mt-20 flex flex-wrap gap-10">
          {[
            { n: '8+', label: 'Years experience' },
            { n: '3', label: 'Cloud platforms' },
            { n: '50+', label: 'Production services' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div className="font-mono text-3xl font-bold text-green">{n}</div>
              <div className="text-slate text-sm mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-green/40" />
      </motion.div>
    </section>
  );
}
