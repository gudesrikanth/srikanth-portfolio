import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Srikanth Gude — Senior Software Engineer | Cloud-Native & AI',
  description:
    'Senior Software Engineer · Cloud-Native Backend · Microservices & API Development · AI & Generative Agents. Building distributed systems with Java/Spring Boot, AWS, Kubernetes, and modern LLM agent frameworks.',
  keywords: [
    'Srikanth Gude',
    'Senior Software Engineer',
    'Cloud-Native',
    'Backend Engineer',
    'Microservices',
    'API Development',
    'AI Agents',
    'Generative AI',
    'Java',
    'Spring Boot',
    'AWS',
    'Kubernetes',
    'Terraform',
    'Distributed Systems',
  ],
  authors: [{ name: 'Srikanth Gude' }],
  openGraph: {
    title: 'Srikanth Gude — Senior Software Engineer | Cloud-Native & AI',
    description:
      'Senior Software Engineer · Cloud-Native Backend · Microservices & API Development · AI & Generative Agents.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
