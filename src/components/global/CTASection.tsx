'use client';

import type { CTA } from '@/types/contentful';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface CTASectionProps {
  cta?: CTA;
}

export function CTASection({ cta }: CTASectionProps) {
  if (!cta) return null;

  return (
    <>
      {/* Main CTA Section */}
      <Section className="h-screen items-center justify-center flex bg-[hsl(var(--base-hsl))]">
        <Container>
          <Box direction="col" className="relative items-center justify-center h-full">
            <Box className="relative overflow-hidden rounded-full aspect-square w-[300px] md:w-[500px]">
              <Image
                src={cta.backgroundImage?.url ?? ''}
                alt={cta.sectionHeader}
                width={500}
                height={500}
                className="object-cover border-none rounded-full"
                priority
              />
              <div 
                className="absolute inset-0 rounded-full" 
                style={{ 
                  background: 'linear-gradient(270deg, hsl(var(--base-hsl)) 0%, transparent 100%)' 
                }} 
              />
            </Box>

            <Box direction="col" className="z-20 absolute items-center" gap={4}>
              <p className="font-light md:text-[1.5rem] leading-[120%]">{cta.sectionSubheader}</p>
              <h1 className="md:text-[4rem] whitespace-nowrap">{cta.sectionHeader}</h1>
              <Link href='/contact'>
                <Button className="bg-text text-[hsl(var(--base-hsl))] hover:bg-text/90 transition-all">
                  {cta.ctaButtonText}
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Section>

      {/* Secondary Image Section */}
      {cta.secondaryBackgroundImage?.url && (
        <Section className="h-screen relative">
          {/* Color overlay */}
          <div 
            className="absolute inset-0 z-10 bg-[hsl(var(--base-hsl))] mix-blend-multiply opacity-60" 
          />
          <Image
            src={cta.secondaryBackgroundImage.url}
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
