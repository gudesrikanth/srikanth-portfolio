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
  title: 'Srikanth Gude — Cloud-Native Full Stack Engineer',
  description:
    'Cloud-Native Full Stack Engineer with 8+ years building distributed systems, AI-powered applications, and scalable backend platforms. Specializing in Java/Spring Boot, AWS, Kubernetes, and event-driven microservices.',
  keywords: [
    'Srikanth Gude',
    'Cloud Engineer',
    'Full Stack Engineer',
    'Java',
    'Spring Boot',
    'AWS',
    'Kubernetes',
    'Terraform',
    'Microservices',
    'Distributed Systems',
    'AI Applications',
  ],
  authors: [{ name: 'Srikanth Gude' }],
  openGraph: {
    title: 'Srikanth Gude — Cloud-Native Full Stack Engineer',
    description:
      'Cloud-Native Full Stack Engineer with 8+ years building distributed systems, AI-powered applications, and scalable backend platforms.',
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
