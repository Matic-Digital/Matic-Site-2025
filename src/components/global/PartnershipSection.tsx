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
        <Box className="" direction="col" gap={4}>
          <h1 className="text-text">Built by partnership</h1>
          <Box className="" gap={8} direction={{ sm: 'col', md: 'row' }}>
            <p className="max-w-sm">
              We partner and build with the most trusted and extensible platforms on the planet.
            </p>
            <Box className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center flex-grow">
              {reversedPartners.map((partner) => (
                <Box key={partner.sys.id} className="relative aspect-square border border-text">
                  <div 
                    className="absolute inset-0 m-12 bg-[hsl(var(--text))]"
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
