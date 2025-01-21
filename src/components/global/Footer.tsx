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
    <footer className="mt-24 border-t bg-background py-12">
      <Container width="full">
        {/* Main footer content grid */}
        <Box gap={12} className="">
          {/* Company information */}
          <Box direction="col" gap={4} className="flex-grow">
            <h1 className="">Change happens here.</h1>
            <p className="w-[25vw]">
              Matic is a business transformation agency, defining and launching pivotal brand and
              digital experiences that drive growth and solve complex challenges.
            </p>
            <Box>
              <Button>Get In Touch</Button>
            </Box>
          </Box>

          <Box direction="row" className="w-[17.5vw] items-center">
            {footerLinks.map((section) => (
              <Box key={section.title} cols={{ sm: 2, md: 3 }} className="h-fit gap-4">
                {section.links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm text-muted-foreground">
                    {link.label}
                  </Link>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
      <Container width="full" className="mt-8">
        <Box>
          <Box gap={4} className="flex-grow items-center">
            <Link href="#">LinkedIn</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">Facebook</Link>
            <Link href="#">Medium</Link>
          </Box>
          <Box direction="col" className="">
            <p className="">Headquarters</p>
            <p className="">3457 Ringsby Court 205, Denver, CO 80216</p>
            <Box>
              <p className="flex-grow">(303) 248-6385</p>
              <Link href="mailto:hello@maticdigital.com">hello@maticdigital.com</Link>
            </Box>
          </Box>
        </Box>
      </Container>
      {/* Copyright section */}
      <Container width="full" className="">
        <div className="my-4 border-t border-black"></div>
        <Box className="items-center justify-start" gap={8}>
          <Logo />
          <p className="text-right text-sm text-muted-foreground">
            ©Matic Digital {new Date().getFullYear()}
          </p>
          <Link href="/privacy" className="text-right text-sm text-muted-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-right text-sm text-muted-foreground">
            Terms of Use
          </Link>
          <ClutchWidget />
        </Box>
      </Container>
    </footer>
  );
}
