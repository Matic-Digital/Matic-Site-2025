// Next.js imports
import Link from 'next/link';

import { Container, Box } from '@/components/global/matic-ds';

import { Logo } from '@/components/global/Logo';

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
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' }
    ]
  },
  {
    title: 'Resources',
    links: [
      {href: '/insights', label: 'Insights'},
    ]
  },
  {
    title: 'Social',
    links: [
      { href: 'https://twitter.com', label: 'Twitter' },
      { href: 'https://github.com', label: 'GitHub' },
      { href: 'https://linkedin.com', label: 'LinkedIn' }
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
export function Footer() {
  return (
    <footer className="mt-24 border-t bg-background py-12">
      <Container width="full">
        {/* Main footer content grid */}
        <Box cols={{ sm: 2 }} gap={12}>
          {/* Company information */}
          <div>
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              Modern blog platform built with Next.js, Contentful and Mux
            </p>
          </div>

          <Box gap={12} className="justify-start lg:justify-between">
            {/* Footer sections with links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-medium">{section.title}</h3>
                <nav>
                  <ul className="ml-1 mt-4 space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </Box>
        </Box>
      </Container>
      {/* Copyright section */}
      <div className="mt-8 border-t pt-8">
        <Container width="full">
          <p className="text-right text-sm text-muted-foreground">
            {new Date().getFullYear()} Matic. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
