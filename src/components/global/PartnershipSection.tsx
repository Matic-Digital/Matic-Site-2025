'use client';

import React from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { useRef } from 'react';
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
          <InView>
            <div className="space-y-4">
              <h1 className="text-text text-[1.75rem] md:text-[2rem]">{sectionHeader}</h1>
              <p className="max-w-sm text-[1rem] md:text-[1.125rem] leading-relaxed text-text">
                {sectionSubheader}
              </p>
            </div>
          </InView>
          <Box className="flex flex-col md:flex-row gap-8 md:justify-end">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 items-center">
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
                    <Box className="relative aspect-square w-full border border-text w-36 md:w-48">
                      <div 
                        className="absolute inset-0 m-6 md:m-12 bg-text"
                        style={{
                          WebkitMaskImage: `url(${partner.logoUrl})`,
                          maskImage: `url(${partner.logoUrl})`,
                          WebkitMaskSize: 'contain',
                          maskSize: 'contain',
                          WebkitMaskRepeat: 'no-repeat',
                          maskRepeat: 'no-repeat',
                          WebkitMaskPosition: 'center',
                          maskPosition: 'center',
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
