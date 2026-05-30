'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Cloud, Bot, Wrench, Target } from 'lucide-react';

const FACTS = [
  { Icon: Zap, text: '8+ years across fintech, SaaS, and platform domains' },
  { Icon: Cloud, text: 'AWS, Azure, and GCP production deployments' },
  { Icon: Bot, text: 'Building LLM agents and RAG pipelines' },
  { Icon: Wrench, text: 'Terraform IaC, Kubernetes operators, CI/CD' },
];

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

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          variants={reveal}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient">About Me</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-cyan/60 via-accent-violet/40 to-transparent max-w-sm ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div
            variants={reveal}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 space-y-5 text-slate-400 text-lg leading-relaxed"
          >
            <p>
              I&apos;m a Senior Software Engineer focused on{' '}
              <span className="text-accent-emerald">Cloud-Native backend</span>,{' '}
              microservices &amp; API development, and{' '}
              <span className="text-accent-violet">AI &amp; generative agents</span>.
              My work spans the full stack of modern distributed systems — from sub-millisecond
              APIs to event-driven platforms moving millions of messages a day.
            </p>
            <p>
              Day to day I&apos;m writing{' '}
              <span className="text-accent-cyan">Java/Spring Boot</span> and Go services,
              shipping reactive UIs in <span className="text-accent-cyan">Next.js</span>,
              and managing AWS infrastructure with{' '}
              <span className="text-accent-cyan">Kubernetes and Terraform</span>. Increasingly,
              that includes integrating LLMs and agent frameworks into production workflows.
            </p>
            <p>
              I care about operational excellence: observable, resilient, maintainable systems
              that teams can ship and run with confidence at any scale.
            </p>

            <motion.div
              variants={reveal}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ delay: 0.25 }}
              className="glass rounded-2xl p-6 mt-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-accent-soft pointer-events-none" />
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
                  <Target className="w-5 h-5 text-ink-950" />
                </div>
                <div>
                  <div className="font-mono text-xs text-accent-emerald mb-1">
                    Current focus
                  </div>
                  <p className="text-slate-200 text-base leading-relaxed">
                    Designing zero-cold-start serverless platforms and building production-grade
                    AI agent systems that combine RAG, structured tool use, and durable memory.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-strong rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400/70" />
                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                <div className="w-3 h-3 rounded-full bg-accent-emerald/80" />
                <span className="font-mono text-xs text-slate-400 ml-2">about.json</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-2">
                <div className="text-slate-400">{'{'}</div>
                <div className="pl-4">
                  <span className="text-accent-cyan">&quot;role&quot;</span>
                  <span className="text-slate-400">: </span>
                  <span className="text-accent-emerald">
                    &quot;Senior Software Engineer&quot;
                  </span>
                  <span className="text-slate-400">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-accent-cyan">&quot;experience&quot;</span>
                  <span className="text-slate-400">: </span>
                  <span className="text-accent-emerald">&quot;8+ years&quot;</span>
                  <span className="text-slate-400">,</span>
                </div>
                <div className="pl-4 text-slate-400">
                  <span className="text-accent-cyan">&quot;focus&quot;</span>: [
                </div>
                {[
                  'Cloud-Native Backend',
                  'Microservices & APIs',
                  'AI & Generative Agents',
                  'Platform Engineering',
                ].map((f) => (
                  <div key={f} className="pl-8 text-accent-violet">
                    &quot;{f}&quot;,
                  </div>
                ))}
                <div className="pl-4 text-slate-400">],</div>
                <div className="pl-4">
                  <span className="text-accent-cyan">&quot;available&quot;</span>
                  <span className="text-slate-400">: </span>
                  <span className="text-accent-emerald">true</span>
                </div>
                <div className="text-slate-400">{'}'}</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {FACTS.map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-slate-400 text-sm">
                  <Icon className="w-4 h-4 text-accent-emerald flex-shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
