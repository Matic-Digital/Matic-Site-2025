'use client';

import React, { useMemo } from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { type Partner } from '@/types';
import Image from 'next/image';

interface PartnershipSectionProps {
  partners: Partner[];
}

export function PartnershipSection({ partners: _partners }: PartnershipSectionProps) {
  // Create a stable reversed array using useMemo to avoid hydration issues
  const partners = useMemo(() => [..._partners].reverse(), [_partners]);

  return (
    <Section>
      <Container>
        <Box className="" direction="col" gap={4}>
          <h2 className="text-3xl font-bold">Built by partnership</h2>
          <Box className="" gap={8} direction={{ sm: 'col', md: 'row' }}>
            <p className="max-w-sm">
              We partner and build with the most trusted and extensible platforms on the planet.
            </p>
            <Box className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center flex-grow">
              {partners.map((partner, index) => (
                <Box key={partner.sys.id} className="relative aspect-square">
                  <Image 
                    src={partner.logo.url} 
                    alt={partner.name} 
                    fill
                    className="object-contain transition-all duration-300 brightness-0 p-12 invert"
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
