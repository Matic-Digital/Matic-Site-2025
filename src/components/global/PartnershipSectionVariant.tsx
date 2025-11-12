'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { InView } from '@/components/ui/in-view';
import type { Item } from '@/types/contentful';

interface PartnershipSectionVariantProps {
  sectionHeader: string;
  sectionSubheader: string;
  partners: Item[];
}

export function PartnershipSectionVariant({
  sectionHeader,
  sectionSubheader,
  partners
}: PartnershipSectionVariantProps) {
  return (
    <Section className="dark bg-gradient-to-b from-[#000227] via-[#050CA3] to-[#060EC2] py-[10rem]">
      <Container>
        <Box className="space-y-8 md:space-y-24" direction="col">
          {/* Row 1: Heading and Subheading */}
          <Box direction="col" gap={{ base: 4, md: 8 }} className="md:text-left">
            <h2 className="md:text-5xl">{sectionHeader}</h2>
            <p className="max-w-sm dark:text-white md:max-w-none md:text-xl">{sectionSubheader}</p>
          </Box>

          {/* Row 2: Partners Grid */}
          <Box className="justify-left flex">
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-x-[1.56rem] gap-y-[1.56rem] md:gap-y-[4.19rem] md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] md:gap-x-[1.56rem] md:gap-y-[4.19rem] justify-items-center">
              {partners.map((partner, index) => {
                const row = Math.floor(index / 2); // For 2 columns in mobile, 6 in desktop
                const delay = row * 0.1; // 0.1s delay per row

                return (
                  <InView
                    key={partner.sys.id}
                    transition={{
                      delay,
                      duration: 0.5
                    }}
                  >
                    <Box className="relative flex aspect-square w-[10rem] flex-col items-center justify-center border border-white/60 p-4 transition-colors duration-300 hover:border-white md:w-48 text-lg text-white/60 hover:text-white">
                      {partner.image && (
                        <div className="flex-1 flex items-center justify-center mb-2">
                          <Image
                            src={partner.image.url}
                            alt={partner.image.title ?? partner.title ?? 'Partner logo'}
                            width={200}
                            height={60}
                            className="max-w-full max-h-full object-contain border-none rounded-none"
                          />
                        </div>
                      )}
                      {partner.title && (
                        <p className="text-center pb-6">
                          {partner.title}
                        </p>
                      )}
                      
                      {/* Premium Partner Badge */}
                      {partner.partnershipToggle && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                          <div className="bg-[#9B9FE7] px-2 py-1 text-xs text-[#070FC2] font-medium rounded-[1.25rem] whitespace-nowrap">
                            PREMIUM PARTNER
                          </div>
                        </div>
                      )}
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
