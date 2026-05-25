'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillGroup {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Backend & Distributed Systems',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="4" rx="1" />
        <rect x="2" y="10" width="20" height="4" rx="1" />
        <rect x="2" y="17" width="20" height="4" rx="1" />
        <circle cx="6" cy="5" r="1" fill="currentColor" />
        <circle cx="6" cy="12" r="1" fill="currentColor" />
        <circle cx="6" cy="19" r="1" fill="currentColor" />
      </svg>
    ),
    skills: [
      'Java 21+',
      'Spring Boot 3',
      'Python',
      'Go',
      'Node.js',
      'GraphQL',
      'REST APIs',
      'gRPC',
      'Microservices',
      'Event-Driven Architecture',
    ],
  },
  {
    title: 'Frontend',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      'React',
      'Next.js 15',
      'Angular',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Responsive Design',
      'Web Performance',
    ],
  },
  {
    title: 'Cloud / DevOps / Infrastructure',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    skills: [
      'AWS (Lambda, ECS, DynamoDB, API Gateway)',
      'Azure',
      'GCP',
      'Docker',
      'Kubernetes',
      'Terraform',
      'GitHub Actions',
      'Helm',
      'ArgoCD',
      'CI/CD Pipelines',
    ],
  },
  {
    title: 'Data / Messaging / Observability',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Apache Kafka',
      'Prometheus',
      'Grafana',
      'OpenTelemetry',
      'Structured Logging',
      'Distributed Tracing',
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 md:py-32"
      style={{ background: 'var(--background)' }}
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
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: 'var(--foreground)' }}>
            Technology stack
          </h2>
          <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--foreground-muted)' }}>
            A curated set of tools I reach for when building scalable, observable, and
            maintainable systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="rounded-xl p-6"
              style={{
                background: 'var(--background-card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'var(--accent-glow)',
                    color: 'var(--accent)',
                  }}
                >
                  {group.icon}
                </div>
                <h3
                  className="text-base font-semibold"
                  style={{ color: 'var(--foreground)' }}
                >
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: groupIndex * 0.1 + i * 0.03 }}
                    className="text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border)',
                      color: 'var(--foreground-muted)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.borderColor = 'var(--border-accent)';
                      el.style.color = 'var(--accent)';
                      el.style.background = 'var(--accent-glow)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.borderColor = 'var(--border)';
                      el.style.color = 'var(--foreground-muted)';
                      el.style.background = 'rgba(255,255,255,0.04)';
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
