'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SkillGroup {
  title: string;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Backend & Distributed Systems',
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
    skills: [
      'AWS (Lambda, ECS, DynamoDB)',
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
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="py-24 md:py-32 bg-navy-light">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-green text-xl">02.</span>
          <h2 className="text-3xl font-bold text-slate-lightest">Skills</h2>
          <div className="flex-1 h-px bg-navy-lighter max-w-xs ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="rounded-lg bg-navy border border-navy-lighter p-6 hover:border-green/30 transition-colors duration-300"
            >
              <h3 className="font-mono text-green text-sm mb-5 font-medium">{group.title}</h3>
              <ul className="space-y-2">
                {group.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: groupIndex * 0.1 + i * 0.04 }}
                    className="flex items-center gap-2 text-slate text-sm hover:text-slate-light transition-colors duration-200"
                  >
                    <span className="text-green text-xs flex-shrink-0">▹</span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
