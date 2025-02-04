'use client';

import React, { useMemo } from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { type Partner } from '@/types/contentful';

interface PartnershipSectionProps {
  partners: Partner[];
}

export function PartnershipSection({ partners }: PartnershipSectionProps) {
  // Create a stable reversed array using useMemo to avoid hydration issues
  const reversedPartners = useMemo(() => [...partners].reverse(), [partners]);

  return (
    <Section>
      <Container>
        <Box className="space-y-8 md:space-y-4" direction="col">
          <Box className="space-y-4" direction="col">
            <h1 className="text-text text-[1.75rem] md:text-[2rem]">Built by partnership</h1>
            <p className="max-w-sm text-[1rem] md:text-[1.125rem] leading-relaxed">
              We partner and build with the most trusted and extensible platforms on the planet.
            </p>
          </Box>
          <Box className="flex flex-col md:flex-row gap-8">
            <Box className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 items-center flex-grow">
              {reversedPartners.map((partner) => (
                <Box key={partner.sys.id} className="relative aspect-square w-full border border-text">
                  <div 
                    className="absolute inset-0 m-6 md:m-12 bg-[hsl(var(--text))]"
                    style={{
                      WebkitMaskImage: `url(${partner.logo.url})`,
                      maskImage: `url(${partner.logo.url})`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
