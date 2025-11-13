'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
          {/* Row 1: Heading, Subheading, and Button */}
          <Box className="flex flex-col md:flex-row md:items-start md:justify-between" gap={{ base: 4, md: 8 }}>
            <Box direction="col" gap={{ base: 4, md: 8 }} className="md:text-left flex-1">
              <h2 className="md:text-5xl">{sectionHeader}</h2>
              <p className="max-w-sm dark:text-white md:max-w-none md:text-xl">{sectionSubheader}</p>
            </Box>
            <Box className="flex-shrink-0 md:mt-[3.5rem]">
              <Link 
                href="/contact"
                className="inline-block bg-white text-[#070FC2] px-6 py-3 rounded-sm font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Discuss a project
              </Link>
            </Box>
          </Box>

          {/* Row 2: Partners Grid */}
          <Box className="justify-left flex">
            <div className="grid w-full grid-cols-3 gap-x-[1.56rem] gap-y-[1.56rem] md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] md:gap-x-[1.56rem] md:gap-y-[4.19rem] justify-items-center items-stretch">
              {partners.map((partner, index) => {
                const row = Math.floor(index / 3); // For 3 columns in mobile, 6 in desktop
                const delay = row * 0.1; // 0.1s delay per row

                return (
                  <InView
                    key={partner.sys.id}
                    transition={{
                      delay,
                      duration: 0.5
                    }}
                  >
                    <Box className="relative flex h-full md:aspect-square w-[5.625rem] flex-col items-center justify-center border border-white/60 p-3 transition-colors duration-300 hover:border-white md:w-48 text-lg text-white/60 hover:text-white">
                      {partner.image && (
                        <div className="flex-1 flex items-center justify-center mb-2">
                          <Image
                            src={partner.image.url}
                            alt={partner.image.title ?? partner.title ?? 'Partner logo'}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="max-w-[80%] max-h-[80%] md:max-w-full md:max-h-full w-auto h-auto object-contain border-none rounded-none"
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
                          <div className="bg-[#9B9FE7] px-1 text-[0.625rem] md:px-2 md:py-1 md:text-xs text-[#070FC2] font-medium rounded-[0.875rem] md:rounded-[1.25rem] whitespace-nowrap">
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
