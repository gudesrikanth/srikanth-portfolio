'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FACTS = [
  { icon: '⚡', text: '8+ years across fintech, SaaS, and platform domains' },
  { icon: '☁️', text: 'AWS, Azure, and GCP production deployments' },
  { icon: '🤖', text: 'Building LLM agents and RAG pipelines' },
  { icon: '🔧', text: 'Terraform IaC, Kubernetes operators, CI/CD' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-navy">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-green text-xl">01.</span>
          <h2 className="text-3xl font-bold text-slate-lightest">About Me</h2>
          <div className="flex-1 h-px bg-navy-lighter max-w-xs ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 space-y-4 text-slate text-lg leading-relaxed"
          >
            <p>
              I&apos;m a Cloud-Native Full Stack Engineer who loves building systems that handle
              real-world scale — from sub-millisecond APIs to event-driven platforms processing
              millions of messages daily.
            </p>
            <p>
              My work spans the full vertical: backend services in{' '}
              <span className="text-green">Java/Spring Boot</span> and Go, reactive frontends in{' '}
              <span className="text-green">Next.js</span>, cloud infrastructure on AWS with{' '}
              <span className="text-green">Kubernetes and Terraform</span>, and increasingly,
              AI-powered systems using LLMs and agent frameworks.
            </p>
            <p>
              I care deeply about operational excellence — observable, resilient, and maintainable
              systems that teams can confidently ship and run at any scale.
            </p>
            <blockquote className="border-l-2 border-green pl-4 mt-8 italic text-slate-light text-base">
              &ldquo;Great software is built through clarity, simplicity, and continuous
              learning.&rdquo;
            </blockquote>
          </motion.div>

          {/* Terminal card + facts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="rounded-lg bg-navy-light border border-navy-lighter overflow-hidden">
              {/* Terminal header */}
              <div className="px-4 py-3 border-b border-navy-lighter flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green/60" />
                <span className="font-mono text-xs text-slate ml-2">about.json</span>
              </div>
              {/* Content */}
              <div className="p-5 font-mono text-sm space-y-3">
                <div className="text-slate">{'{'}</div>
                <div className="pl-4 text-slate">
                  <span className="text-slate-light">&quot;role&quot;</span>
                  <span className="text-slate">: </span>
                  <span className="text-green">&quot;Cloud-Native Full Stack Engineer&quot;</span>
                  <span className="text-slate">,</span>
                </div>
                <div className="pl-4 text-slate">
                  <span className="text-slate-light">&quot;experience&quot;</span>
                  <span className="text-slate">: </span>
                  <span className="text-green">&quot;8+ years&quot;</span>
                  <span className="text-slate">,</span>
                </div>
                <div className="pl-4 text-slate">
                  <span className="text-slate-light">&quot;focus&quot;</span>
                  <span className="text-slate">: [</span>
                </div>
                {[
                  'Distributed Systems',
                  'Cloud Infrastructure',
                  'AI Agents',
                  'Platform Engineering',
                ].map((f) => (
                  <div key={f} className="pl-8 text-green">
                    &quot;{f}&quot;,
                  </div>
                ))}
                <div className="pl-4 text-slate">],</div>
                <div className="pl-4 text-slate">
                  <span className="text-slate-light">&quot;available&quot;</span>
                  <span className="text-slate">: </span>
                  <span className="text-green">true</span>
                </div>
                <div className="text-slate">{'}'}</div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="mt-6 space-y-3">
              {FACTS.map((fact) => (
                <div key={fact.text} className="flex items-start gap-3 text-slate text-sm">
                  <span>{fact.icon}</span>
                  <span>{fact.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
