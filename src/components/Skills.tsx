'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Server,
  LayoutDashboard,
  CloudCog,
  Database,
  type LucideIcon,
} from 'lucide-react';

interface SkillGroup {
  title: string;
  Icon: LucideIcon;
  skills: string[];
  gradient: string;
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Backend & Distributed Systems',
    Icon: Server,
    gradient: 'from-accent-emerald/30 to-accent-cyan/10',
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
    Icon: LayoutDashboard,
    gradient: 'from-accent-cyan/30 to-accent-violet/10',
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
    Icon: CloudCog,
    gradient: 'from-accent-violet/30 to-accent-fuchsia/10',
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
    Icon: Database,
    gradient: 'from-accent-fuchsia/30 to-accent-emerald/10',
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

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          variants={reveal}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient">Skills</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-cyan/60 via-accent-violet/40 to-transparent max-w-sm ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              variants={reveal}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ delay: groupIndex * 0.08 }}
              className="group relative rounded-2xl overflow-hidden"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent-emerald/40 via-accent-cyan/40 to-accent-violet/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative glass rounded-2xl p-6 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${group.gradient} opacity-30 pointer-events-none`} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-lg shadow-accent-violet/20">
                      <group.Icon className="w-5 h-5 text-ink-950" />
                    </div>
                    <h3 className="font-semibold text-slate-100 text-base">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: groupIndex * 0.08 + i * 0.03 }}
                        className="px-3 py-1 rounded-full font-mono text-xs text-slate-300 bg-white/5 border border-white/10 hover:border-accent-emerald/40 hover:text-accent-emerald transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
