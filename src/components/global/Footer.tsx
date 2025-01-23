'use client';

// Next.js imports
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Container, Box } from '@/components/global/matic-ds';

import { Logo } from '@/components/global/Logo';
import { Button } from '../ui/button';

/**
 * Footer navigation configuration
 * Organized into sections with titles and links
 * Includes:
 * - Company information and legal pages
 * - Resource links for users
 * - Social media profiles
 */
const footerLinks = [
  {
    title: 'Company',
    links: [
      { href: '/work', label: 'Work' },
      { href: '/journal', label: 'Journal' },
      { href: '/contact', label: 'Contact' },
      { href: '/services', label: 'Services' },
      { href: '/studio', label: 'Studio' },
      { href: '/careers', label: 'Careers' },
      { href: '/about', label: 'About' },
      { href: '/teams', label: 'Teams' },
      { href: '/newsletter', label: 'Newsletter' }
    ]
  }
];

/**
 * Footer component
 * Responsive footer with multiple columns of links and company information
 * Features:
 * - Responsive grid layout (2 columns on mobile, 4 on desktop)
 * - Company branding and description
 * - Organized link sections
 * - Copyright notice
 */
export default function Footer() {
  const ClutchWidget = dynamic(() => import('./ClutchWidget'), { ssr: false });

  return (
    <footer className="border-t bg-background py-12">
      <Container width="full">
        footer
      </Container>
    </footer>
  );
}
