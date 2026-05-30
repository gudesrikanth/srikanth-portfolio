'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FolderGit2, ExternalLink, Sparkle } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
}

interface FeaturedProject {
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  tags: string[];
  githubUrl?: string;
}

const FEATURED: FeaturedProject = {
  title: 'SwiftLink',
  tagline: 'Serverless URL shortener — Java 25, AWS Lambda, DynamoDB',
  description:
    'A fully production-ready URL shortening platform featuring click analytics, custom short codes, and TTL-based expiration. Built with Java 25 and Spring Boot 3.5 deployed as a container on AWS Lambda via the Lambda Web Adapter pattern. Infrastructure managed entirely through Terraform with a complete CI/CD pipeline on GitHub Actions.',
  highlights: [
    'Zero-cold-start Lambda Web Adapter — same container runs on Cloud Run or Container Apps unchanged',
    'DynamoDB atomic click counters with Resilience4j circuit-breaker protecting all DB calls',
    'Caffeine in-process cache (5 min TTL, 10k entries) — sub-millisecond redirect latency',
    'Full IaC: ECR, IAM, Lambda, API Gateway v2, CloudWatch alarms — all in Terraform modules',
    'Async click recording via @Async thread pool — redirect response never waits on analytics',
  ],
  tags: [
    'Java 25',
    'Spring Boot 3.5',
    'AWS Lambda',
    'DynamoDB',
    'Terraform',
    'GitHub Actions',
    'Docker',
  ],
  githubUrl: 'https://github.com/gudesrikanth/swiftlink',
};

const OTHER_PROJECTS: Project[] = [
  {
    title: 'FlowOps Platform',
    description:
      'GitOps-driven internal developer platform for self-service Kubernetes workload provisioning. Enables engineering teams to provision, deploy, and observe workloads without direct cluster access.',
    tags: ['Kubernetes', 'ArgoCD', 'Crossplane', 'Terraform', 'Next.js', 'Go'],
  },
  {
    title: 'LLM Agent Toolkit',
    description:
      'Python framework for building production-grade LLM agents with tool use, memory, and structured output. Provider-agnostic interface supports Claude, GPT-4, and open-weight models.',
    tags: ['Python', 'LLM Agents', 'RAG', 'Vector DB', 'FastAPI', 'Pydantic'],
  },
  {
    title: 'EventStream Processor',
    description:
      'Distributed event stream processing system handling 500k+ events/sec across a multi-region Kafka cluster, with exactly-once semantics and real-time anomaly detection.',
    tags: ['Apache Kafka', 'Kafka Streams', 'Java', 'Spring Boot', 'Avro', 'Redis'],
  },
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

function SmallCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={reveal}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent-emerald/50 via-accent-cyan/50 to-accent-violet/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative glass rounded-2xl p-6 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-start justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-gradient-accent-soft border border-white/10 flex items-center justify-center">
            <FolderGit2 className="w-5 h-5 text-accent-emerald" />
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-accent-emerald transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          )}
        </div>

        <h3 className="text-slate-100 font-semibold text-lg mb-3 group-hover:text-accent-emerald transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          variants={reveal}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient">Projects</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-cyan/60 via-accent-violet/40 to-transparent max-w-sm ml-4" />
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="relative mb-20 rounded-3xl overflow-hidden"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent-emerald/40 via-accent-cyan/30 to-accent-violet/40 opacity-70" />
          <div className="relative glass-strong rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkle className="w-4 h-4 text-accent-emerald" />
                  <p className="font-mono text-accent-emerald text-sm">Featured Project</p>
                </div>
                <h3 className="text-slate-100 text-3xl md:text-4xl font-bold mb-2">
                  {FEATURED.title}
                </h3>
                <p className="text-slate-400 mb-6">{FEATURED.tagline}</p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {FEATURED.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {FEATURED.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-slate-400 text-sm"
                    >
                      <span className="text-accent-cyan mt-1 flex-shrink-0">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {FEATURED.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {FEATURED.githubUrl && (
                  <a
                    href={FEATURED.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm text-ink-950 bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-violet shadow-lg shadow-accent-violet/30 hover:shadow-accent-cyan/40 transition-shadow"
                  >
                    <GithubIcon className="w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 bg-ink-900/60">
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                  <div className="w-3 h-3 rounded-full bg-accent-emerald/80" />
                  <span className="font-mono text-xs text-slate-400 ml-2">
                    swiftlink ~ demo
                  </span>
                </div>
                <div className="p-5 font-mono text-xs space-y-1.5">
                  <div>
                    <span className="text-accent-emerald">$</span>
                    <span className="text-slate-200"> curl -X POST /api/shorten</span>
                  </div>
                  <div className="pl-4 text-slate-400">
                    {'{'}
                    <span className="text-accent-cyan">&quot;url&quot;</span>:{' '}
                    <span className="text-accent-violet">
                      &quot;https://long-url.example.com/...&quot;
                    </span>
                    {'}'}
                  </div>
                  <div className="mt-2 text-slate-400">
                    <span className="text-accent-emerald">200 OK</span> · 8ms
                  </div>
                  <div className="pl-4 text-slate-400">
                    {'{'}
                    <span className="text-accent-cyan">&quot;shortCode&quot;</span>:{' '}
                    <span className="text-accent-violet">&quot;xK9mP2&quot;</span>,
                  </div>
                  <div className="pl-4 text-slate-400">
                    <span className="text-accent-cyan">&quot;shortUrl&quot;</span>:{' '}
                    <span className="text-accent-violet">
                      &quot;https://swlnk.io/xK9mP2&quot;
                    </span>
                  </div>
                  <div className="pl-4 text-slate-400">{'}'}</div>
                  <div className="mt-3">
                    <span className="text-accent-emerald">$</span>
                    <span className="text-slate-200"> curl /api/stats/xK9mP2</span>
                  </div>
                  <div className="pl-4 text-slate-400">
                    {'{'}
                    <span className="text-accent-cyan">&quot;clicks&quot;</span>:{' '}
                    <span className="text-accent-violet">1_247</span>,
                  </div>
                  <div className="pl-4 text-slate-400">
                    <span className="text-accent-cyan">&quot;p99Latency&quot;</span>:{' '}
                    <span className="text-accent-violet">&quot;&lt;1ms&quot;</span>
                  </div>
                  <div className="pl-4 text-slate-400">{'}'}</div>
                  <div className="mt-3 text-slate-500">
                    # Caffeine cache hit — DynamoDB not touched
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-accent-emerald text-sm text-center mb-8"
        >
          Other Noteworthy Projects
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OTHER_PROJECTS.map((project, i) => (
            <SmallCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
