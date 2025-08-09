'use client';

import React from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { InView } from '@/components/ui/in-view';

interface Partner {
  id: string;
  logoUrl: string;
}

interface PartnershipSectionProps {
  sectionHeader: string;
  sectionSubheader: string;
  partners: Partner[];
}

export function PartnershipSection({
  sectionHeader,
  sectionSubheader,
  partners
}: PartnershipSectionProps) {
  return (
    <Section>
      <Container>
        <Box className="space-y-8 md:space-y-4" direction="col">
          <Box direction="col" gap={{ base: 4, md: 8 }}>
            <h2 className="">{sectionHeader}</h2>
            <p className="max-w-sm">{sectionSubheader}</p>
          </Box>
          <Box className="flex flex-col gap-8 md:flex-row md:justify-end">
            <div className="grid grid-cols-3 items-center gap-[0.64rem] md:gap-12">
              {partners.map((partner, index) => {
                const row = Math.floor(index / 2); // For 2 columns in mobile
                const delay = row * 0.1; // 0.1s delay per row

                return (
                  <InView
                    key={partner.id}
                    transition={{
                      delay,
                      duration: 0.5
                    }}
                  >
                    <Box className="relative aspect-square w-full border border-text md:w-48">
                      <div
                        className="absolute inset-0 m-6 bg-text md:m-12"
                        style={{
                          WebkitMaskImage: `url(${partner.logoUrl})`,
                          maskImage: `url(${partner.logoUrl})`,
                          WebkitMaskSize: 'contain',
                          maskSize: 'contain',
                          WebkitMaskRepeat: 'no-repeat',
                          maskRepeat: 'no-repeat',
                          WebkitMaskPosition: 'center',
                          maskPosition: 'center'
                        }}
                      />
                    </Box>
                  </InView>
                );
              })}
            </div>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
