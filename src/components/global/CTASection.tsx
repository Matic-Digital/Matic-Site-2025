'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface CTASectionProps {
  backgroundImageRoute?: string;  // e.g. '/images/background.jpg'
  secondaryBackgroundRoute?: string;  // e.g. '/images/secondary.jpg'
  sectionHeader: string;
  sectionSubheader: string;
  ctaButtonText: string;
}

export function CTASection({ 
  backgroundImageRoute,
  secondaryBackgroundRoute,
  sectionHeader,
  sectionSubheader,
  ctaButtonText
}: CTASectionProps) {
  return (
    <>
      {/* Main CTA Section */}
      <Section className="h-screen items-center justify-center flex bg-[hsl(var(--base-hsl))]">
        <Container>
          <Box direction="col" className="relative items-center justify-center h-full">
            <Box className="relative overflow-hidden rounded-full aspect-square w-[300px] md:w-[500px]">
              {backgroundImageRoute && (
                <Image
                  src={backgroundImageRoute}
                  alt={sectionHeader}
                  width={500}
                  height={500}
                  className="object-cover border-none rounded-full"
                  priority
                />
              )}
            </Box>

            <Box direction="col" className="z-20 absolute items-center" gap={4}>
              <p className="font-light md:text-[1.5rem] leading-[120%]">{sectionSubheader}</p>
              <h1 className="md:text-[4rem] whitespace-nowrap">{sectionHeader}</h1>
              <Link href='/contact'>
                <Button className="bg-text text-[hsl(var(--base-hsl))] hover:bg-text/90 transition-all">
                  {ctaButtonText}
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Section>

      {/* Secondary Image Section */}
      {secondaryBackgroundRoute && (
        <Section className="h-screen relative">
          {/* Color overlay */}
          <div 
            className="absolute inset-0 z-10 bg-[hsl(var(--base-hsl))] mix-blend-multiply opacity-60" 
          />
          <Image
            src={secondaryBackgroundRoute}
            alt="secondary background"
            fill
            className="object-cover border-none rounded-none"
            priority
          />
        </Section>
      )}
    </>
  );
}
