'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
}

interface FeaturedProject {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  githubUrl?: string;
}

const FEATURED: FeaturedProject = {
  title: 'SwiftLink',
  description:
    'A fully production-ready URL shortening platform featuring click analytics, custom short codes, and TTL-based expiration. Built with Java 25 and Spring Boot 3.5 deployed as a container on AWS Lambda via the Lambda Web Adapter pattern. Infrastructure managed entirely through Terraform with a complete CI/CD pipeline on GitHub Actions.',
  highlights: [
    'Zero-cold-start Lambda Web Adapter — same container runs on Cloud Run or Container Apps unchanged',
    'DynamoDB atomic click counters with Resilience4j circuit-breaker protecting all DB calls',
    'Caffeine in-process cache (5 min TTL, 10k entries) — sub-millisecond redirect latency',
    'Full IaC: ECR, IAM, Lambda, API Gateway v2, CloudWatch alarms — all in Terraform modules',
    'Async click recording via @Async thread pool — redirect response never waits on analytics',
  ],
  tags: ['Java 25', 'Spring Boot 3.5', 'AWS Lambda', 'DynamoDB', 'Terraform', 'GitHub Actions', 'Docker'],
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

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SmallCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col bg-navy-light border border-navy-lighter rounded-lg p-6 hover:border-green/40 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <div className="text-green/70 group-hover:text-green transition-colors duration-300">
          <FolderIcon />
        </div>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-green transition-colors duration-200"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        )}
      </div>

      <h3 className="text-slate-lightest font-semibold text-lg mb-3 group-hover:text-green transition-colors duration-200">
        {project.title}
      </h3>

      <p className="text-slate text-sm leading-relaxed flex-1 mb-6">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono text-xs text-slate">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 bg-navy">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-green text-xl">03.</span>
          <h2 className="text-3xl font-bold text-slate-lightest">Projects</h2>
          <div className="flex-1 h-px bg-navy-lighter max-w-xs ml-4" />
        </motion.div>

        {/* Featured project */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-center">
            {/* Text side */}
            <div className="lg:order-1">
              <p className="font-mono text-green text-sm mb-2">Featured Project</p>
              <h3 className="text-slate-lightest text-2xl font-bold mb-4">{FEATURED.title}</h3>

              <div className="bg-navy-light border border-navy-lighter rounded-lg p-6 mb-4">
                <p className="text-slate text-sm leading-relaxed">{FEATURED.description}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {FEATURED.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-slate text-sm">
                    <span className="text-green mt-0.5 flex-shrink-0">▹</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mb-6">
                {FEATURED.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-slate">
                    {tag}
                  </span>
                ))}
              </div>

              {FEATURED.githubUrl && (
                <a
                  href={FEATURED.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate hover:text-green transition-colors duration-200"
                >
                  <GitHubIcon />
                  <span className="text-sm">View on GitHub</span>
                </a>
              )}
            </div>

            {/* Terminal window side */}
            <div className="lg:order-2 mt-8 lg:mt-0">
              <div className="rounded-lg bg-navy-light border border-navy-lighter overflow-hidden shadow-xl shadow-navy/50">
                {/* Terminal header */}
                <div className="px-4 py-3 border-b border-navy-lighter flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green/60" />
                  <span className="font-mono text-xs text-slate ml-2">swiftlink ~ demo</span>
                </div>
                {/* Terminal body */}
                <div className="p-5 font-mono text-xs space-y-1.5">
                  <div>
                    <span className="text-green">$</span>
                    <span className="text-slate-light"> curl -X POST /api/shorten</span>
                  </div>
                  <div className="pl-4 text-slate">
                    {'{'}
                    <span className="text-slate-light">&quot;url&quot;</span>:{' '}
                    <span className="text-green">&quot;https://long-url.example.com/...&quot;</span>
                    {'}'}
                  </div>
                  <div className="mt-2 text-slate">
                    <span className="text-green">200 OK</span> · 8ms
                  </div>
                  <div className="pl-4 text-slate">
                    {'{'}
                    <span className="text-slate-light">&quot;shortCode&quot;</span>:{' '}
                    <span className="text-green">&quot;xK9mP2&quot;</span>,
                  </div>
                  <div className="pl-4 text-slate">
                    <span className="text-slate-light">&quot;shortUrl&quot;</span>:{' '}
                    <span className="text-green">&quot;https://swlnk.io/xK9mP2&quot;</span>
                  </div>
                  <div className="pl-4 text-slate">{'}'}</div>
                  <div className="mt-3">
                    <span className="text-green">$</span>
                    <span className="text-slate-light"> curl /api/stats/xK9mP2</span>
                  </div>
                  <div className="pl-4 text-slate">
                    {'{'}
                    <span className="text-slate-light">&quot;clicks&quot;</span>:{' '}
                    <span className="text-green">1_247</span>,
                  </div>
                  <div className="pl-4 text-slate">
                    <span className="text-slate-light">&quot;p99Latency&quot;</span>:{' '}
                    <span className="text-green">&quot;&lt;1ms&quot;</span>
                  </div>
                  <div className="pl-4 text-slate">{'}'}</div>
                  <div className="mt-3 text-slate">
                    <span className="text-slate-light"># </span>
                    <span className="text-slate">Caffeine cache hit — DynamoDB not touched</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other projects grid */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-green text-sm text-center mb-8"
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
