'use client';

import React from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { InView } from '@/components/ui/in-view';

interface Partner {
  id: string;
  logoUrl: string;
}

interface PartnershipSectionVariantProps {
  sectionHeader: string;
  sectionSubheader: string;
  partners: Partner[];
}

export function PartnershipSectionVariant({
  sectionHeader,
  sectionSubheader,
  partners
}: PartnershipSectionVariantProps) {
  return (
    <Section className="dark bg-[#060EC2]">
      <Container>
        <Box className="space-y-8 md:space-y-12" direction="col">
          {/* Row 1: Heading and Subheading */}
          <Box direction="col" gap={{ base: 4, md: 8 }} className="md:text-left">
            <p className="max-w-sm dark:text-blue md:max-w-none md:text-xl">{sectionSubheader}</p>
            <h2 className="md:text-5xl">{sectionHeader}</h2>
          </Box>

          {/* Row 2: Partners Grid */}
          <Box className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-[1.56rem] md:gap-x-[6.25rem] md:gap-y-[4.19rem]">
              {partners.map((partner, index) => {
                const row = Math.floor(index / 2); // For 2 columns in mobile, 5 in desktop
                const delay = row * 0.1; // 0.1s delay per row

                return (
                  <InView
                    key={partner.id}
                    transition={{
                      delay,
                      duration: 0.5
                    }}
                  >
                    <Box className="relative aspect-square w-32 border border-white/60 transition-colors duration-300 hover:border-white md:w-48">
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
