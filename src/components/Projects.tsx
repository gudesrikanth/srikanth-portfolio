'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'production' | 'in-progress' | 'concept';
}

const PROJECTS: Project[] = [
  {
    title: 'SwiftLink',
    description: 'Production-grade URL shortener with analytics, built on AWS serverless.',
    longDescription:
      'A fully production-ready URL shortening platform featuring click analytics, custom short codes, and TTL-based expiration. Built with Java 25 and Spring Boot 3.5 deployed as a container on AWS Lambda via the Lambda Web Adapter pattern. Infrastructure managed entirely through Terraform with a complete CI/CD pipeline on GitHub Actions.',
    tags: ['Java 25', 'Spring Boot 3.5', 'AWS Lambda', 'DynamoDB', 'Terraform', 'GitHub Actions', 'Docker'],
    highlights: [
      'Zero-cold-start Lambda Web Adapter pattern — same container image runs on Cloud Run or Container Apps unchanged',
      'DynamoDB atomic click counters with Resilience4j circuit-breaker protecting all DB calls',
      'Caffeine in-process cache (5 min TTL, 10k entries) — sub-millisecond redirect latency',
      'Full IaC: ECR, IAM, Lambda, API Gateway v2, CloudWatch alarms — all in Terraform modules',
      'Async click recording via @Async thread pool — redirect response never waits on analytics',
    ],
    githubUrl: 'https://github.com/srikanthgude/swiftlink',
    status: 'production',
  },
  {
    title: 'FlowOps Platform',
    description: 'Internal developer platform for self-service Kubernetes workload provisioning.',
    longDescription:
      'A GitOps-driven internal developer platform that enables engineering teams to provision, deploy, and observe Kubernetes workloads without direct cluster access. Built on ArgoCD for continuous delivery, Crossplane for cloud resource provisioning, and a React/Next.js portal for self-service workflows.',
    tags: ['Kubernetes', 'ArgoCD', 'Crossplane', 'Terraform', 'Next.js', 'Go', 'Prometheus', 'Grafana'],
    highlights: [
      'Self-service portal reduces infra provisioning from days to minutes via GitOps pull requests',
      'Crossplane compositions abstract AWS RDS, S3, and ElastiCache provisioning into simple CRDs',
      'Golden path templates enforce security policies and observability standards by default',
      'Prometheus + Grafana dashboards with SLO burn-rate alerting across 50+ services',
    ],
    status: 'in-progress',
  },
  {
    title: 'LLM Agent Toolkit',
    description: 'Composable framework for building tool-augmented LLM reasoning agents.',
    longDescription:
      'A Python framework for building production-grade LLM agents with tool use, memory, and structured output. Designed around composable building blocks: tool registries, vector-store backed memory, ReAct reasoning loops, and structured output validation. Supports Claude, GPT-4, and open-weight models via a unified provider interface.',
    tags: ['Python', 'LLM Agents', 'RAG', 'Vector DB', 'FastAPI', 'Claude API', 'OpenAI', 'Pydantic'],
    highlights: [
      'Provider-agnostic LLM interface — swap Claude for GPT-4 or Llama with a single config change',
      'Tool registry with JSON Schema validation and automatic retry on malformed tool calls',
      'RAG pipeline with chunking strategies, embedding caching, and hybrid BM25 + dense retrieval',
      'Structured output with Pydantic v2 — zero hallucination on typed extraction tasks',
    ],
    status: 'in-progress',
  },
  {
    title: 'EventStream Processor',
    description: 'High-throughput Kafka-based event processing pipeline with exactly-once semantics.',
    longDescription:
      'A distributed event stream processing system handling 500k+ events/sec across a multi-region Kafka cluster. Built with Java and Spring Boot using the Kafka Streams API for stateful stream processing, with dead-letter queues, schema registry integration, and real-time anomaly detection via sliding window aggregations.',
    tags: ['Apache Kafka', 'Kafka Streams', 'Java', 'Spring Boot', 'Avro', 'PostgreSQL', 'Redis', 'Kubernetes'],
    highlights: [
      'Exactly-once semantics via Kafka transactions — zero event loss on pod restarts',
      'Avro schema registry with backward/forward compatibility enforcement at deploy time',
      'Sliding-window anomaly detection flags statistical outliers within 30-second windows',
      'Consumer group lag alerting with automatic partition rebalance on degraded consumers',
    ],
    status: 'concept',
  },
];

const STATUS_CONFIG = {
  production: { label: 'Production', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)' },
  'in-progress': { label: 'In Progress', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)' },
  concept: { label: 'Concept', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)' },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const statusCfg = STATUS_CONFIG[project.status];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl overflow-hidden flex flex-col transition-all duration-300"
      style={{
        background: 'var(--background-card)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-accent)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(6, 182, 212, 0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
            {project.title}
          </h3>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
            style={{
              color: statusCfg.color,
              background: statusCfg.bg,
              border: `1px solid ${statusCfg.border}`,
            }}
          >
            {statusCfg.label}
          </span>
        </div>

        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
          {project.longDescription}
        </p>

        <ul className="space-y-2 mb-5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2.5 text-xs" style={{ color: 'var(--foreground-muted)' }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                color: 'var(--foreground-muted)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {(project.githubUrl ?? project.liveUrl) && (
        <div
          className="px-6 py-4 flex items-center gap-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-colors duration-200"
              style={{ color: 'var(--foreground-muted)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground-muted)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-colors duration-200"
              style={{ color: 'var(--foreground-muted)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground-muted)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
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
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: 'var(--foreground)' }}>
            Things I&apos;ve built
          </h2>
          <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--foreground-muted)' }}>
            A selection of production systems, open-source tools, and explorations — each reflecting
            a different dimension of the stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
