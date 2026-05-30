'use client';
import { useRef, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronDown, ShieldCheck } from 'lucide-react';
import AuroraBackground from './AuroraBackground';
import MagneticButton from './MagneticButton';
import { useTypewriter } from './useTypewriter';

const ROLES = [
  'Senior Software Engineer',
  'Cloud-Native Architect',
  'AI & Generative Agents',
  'Microservices Specialist',
];

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const role = useTypewriter({ words: ROLES });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: globalThis.MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const scrollTo = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="spotlight relative min-h-screen flex items-center overflow-hidden"
    >
      <AuroraBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-emerald" />
              <span className="font-mono text-xs text-slate-300">
                Available for senior &amp; staff engineering roles
              </span>
            </motion.div>

            <motion.p variants={item} className="font-mono text-accent-cyan text-sm mb-3">
              Hi, my name is
            </motion.p>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-7xl md:text-[5.5rem] font-bold leading-[1.05] mb-4 tracking-tight"
            >
              <span className="text-gradient">Srikanth Gude</span>
            </motion.h1>

            <motion.div
              variants={item}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-200 mb-6 min-h-[2.5rem]"
            >
              <span>{role}</span>
              <span className="inline-block w-[3px] h-7 sm:h-8 md:h-9 bg-accent-emerald ml-1 align-middle animate-caret-blink" />
            </motion.div>

            <motion.p
              variants={item}
              className="max-w-xl text-slate-400 text-base sm:text-lg leading-relaxed mb-10"
            >
              Senior Software Engineer focused on{' '}
              <span className="text-accent-emerald font-medium">Cloud-Native</span> backend,
              microservices &amp; API development, and{' '}
              <span className="text-accent-violet font-medium">AI &amp; generative agents</span>.
              I build distributed systems that hold up under real-world load.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 items-center">
              <MagneticButton onClick={scrollTo('#projects') as () => void}>
                <button className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-ink-950 bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-violet shadow-lg shadow-accent-violet/30 transition-shadow hover:shadow-accent-cyan/40">
                  <span>View my work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </MagneticButton>

              <button
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium text-slate-200 glass hover:border-accent-emerald/40 transition-colors"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

            <motion.div variants={item} className="mt-14 flex flex-wrap gap-x-10 gap-y-5">
              {[
                { n: '8+', label: 'Years experience' },
                { n: '3', label: 'Cloud platforms' },
                { n: '50+', label: 'Production services' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div className="font-mono text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                    {n}
                  </div>
                  <div className="text-slate-400 text-xs mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[340px] lg:h-[340px]">
              <div className="absolute inset-0 ring-gradient rounded-full" />
              <div className="absolute inset-[3px] rounded-full bg-ink-950" />
              <div
                className="absolute -inset-6 rounded-full opacity-40 blur-2xl"
                style={{
                  background:
                    'conic-gradient(from 90deg, #10b981, #06b6d4, #8b5cf6, #d946ef, #10b981)',
                }}
              />
              <div
                className="absolute inset-[10px] rounded-full overflow-hidden border border-white/10 select-none"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              >
                <Image
                  src="/api/avatar"
                  alt="Srikanth Gude"
                  fill
                  priority
                  unoptimized
                  draggable={false}
                  sizes="(max-width: 768px) 240px, 340px"
                  className="object-cover pointer-events-none"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-[10px] rounded-full z-10"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              <div
                aria-label="Protected profile photo"
                title="Protected profile photo"
                className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-20 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet shadow-lg shadow-accent-violet/40 ring-2 ring-ink-950"
              >
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        onClick={scrollTo('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-accent-emerald transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to about"
      >
        <span className="font-mono text-xs">scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.a>
    </section>
  );
}
