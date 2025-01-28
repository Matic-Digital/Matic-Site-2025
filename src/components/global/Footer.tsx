'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Container } from '@/components/global/matic-ds';
import { getFooter } from '@/lib/api';
import type { Footer } from '@/types';
import ClutchWidget from './ClutchWidget';
import { Logo } from './Logo';
import Image from 'next/image';
import { Button } from '../ui/button';

export function Footer() {
  const [footer, setFooter] = React.useState<Footer | null>(null);

  React.useEffect(() => {
    async function loadFooter() {
      try {
        const footerData = await getFooter();
        setFooter(footerData);
      } catch (error) {
        console.error('Failed to load footer:', error);
      }
    }
    void loadFooter();
  }, []);

  if (!footer) {
    return null;
  }

  return (
    <footer className="bg-white py-16">
      <Container width="full">
        <div className="flex space-y-12 pb-6">
          <div className="flex flex-col space-y-4 flex-grow">
            {footer.tagline && <h3 className="max-w-md text-gray-600">{footer.tagline}</h3>}
            {footer.paragraph && <p className="max-w-md text-gray-600">{footer.paragraph}</p>}
            <Link href={'/contact'}>
              <Button>Contact Us</Button>
            </Link>
            {footer.socialsCollection?.items && footer.socialsCollection.items.length > 0 && (
              <div className="flex space-x-4">
                {footer.socialsCollection.items.map((social) => (
                  <Link
                    key={social.sys.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Image
                      src={social.logo.url}
                      alt={social.name}
                      width={50}
                      height={50}
                      className="w-auto rounded-none border-none object-contain"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Box className="" direction="col" gap={4}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/work" className="text-gray-600 hover:text-gray-900">
                    Work
                  </Link>
                  <Link href="/services" className="text-gray-600 hover:text-gray-900">
                    Services
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    About
                  </Link>
                </nav>
              </div>
              <div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/journal" className="text-gray-600 hover:text-gray-900">
                    Journal
                  </Link>
                  <Link href="/studio" className="text-gray-600 hover:text-gray-900">
                    Studio
                  </Link>
                  <Link href="/teams" className="text-gray-600 hover:text-gray-900">
                    Teams
                  </Link>
                </nav>
              </div>
              <div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                  <Link href="/careers" className="text-gray-600 hover:text-gray-900">
                    Careers
                  </Link>
                  <Link href="/newsletter" className="text-gray-600 hover:text-gray-900">
                    Newsletter
                  </Link>
                </nav>
              </div>
            </div>

            <div className="flex flex-col w-fit">
              <p className="font-medium">Headquarters</p>
              {footer.address && <p className="text-gray-600">{footer.address}</p>}
              <Box className="justify-between">
                {footer.phone && (
                  <Link href={`tel:${footer.phone}`} className="text-gray-600 hover:text-gray-900">
                    {footer.phone}
                  </Link>
                )}
                {footer.email && (
                  <Link
                    href={`mailto:${footer.email}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {footer.email}
                  </Link>
                )}
              </Box>
            </div>
          </Box>
        </div>
        <div className="flex flex-col items-center justify-between border-t border-gray-200 pt-6 md:flex-row">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/">
              <Logo variant="dark" withLink={false} />
            </Link>
            <span> Matic Digital, 2025</span>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-of-use" className="hover:text-gray-900">
              Terms of Use
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            <ClutchWidget />
          </div>
        </div>
      </Container>
    </footer>
  );
}
