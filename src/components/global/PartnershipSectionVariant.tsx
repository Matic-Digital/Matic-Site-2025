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
          <Box
            className="flex flex-col md:flex-row md:items-start md:justify-between"
            gap={{ base: 4, md: 8 }}
          >
            <Box direction="col" gap={{ base: 4, md: 8 }} className="flex-1 md:text-left">
              <h2 className="md:text-5xl">{sectionHeader}</h2>
              <p className="max-w-sm dark:text-white md:max-w-none md:text-xl">
                {sectionSubheader}
              </p>
            </Box>
            <Box className="flex-shrink-0 md:mt-[3.5rem]">
              <Link
                href="/contact"
                className="inline-block rounded-sm bg-white px-6 py-3 font-medium text-[#070FC2] transition-colors duration-200 hover:bg-gray-100"
              >
                Discuss a project
              </Link>
            </Box>
          </Box>

          {/* Row 2: Partners Grid */}
          <Box className="justify-left flex">
            <div className="grid w-full grid-cols-3 items-stretch justify-items-center gap-x-[1.56rem] gap-y-[1.56rem] md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] md:gap-x-[1.56rem] md:gap-y-[4.19rem]">
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
                    <Box className="relative flex h-full w-[5.625rem] flex-col items-center justify-center border border-white/60 p-3 text-lg text-white/60 transition-colors duration-300 hover:border-white hover:text-white md:aspect-square md:w-48">
                      {partner.image && (
                        <div className="mb-2 flex flex-1 items-center justify-center">
                          <Image
                            src={partner.image.url}
                            alt={partner.image.title ?? partner.title ?? 'Partner logo'}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-auto max-h-[80%] w-auto max-w-[80%] rounded-none border-none object-contain md:max-h-full md:max-w-full"
                          />
                        </div>
                      )}
                      {partner.title && <p className="pb-6 text-center">{partner.title}</p>}

                      {/* Premium Partner Badge */}
                      {partner.partnershipToggle && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                          <div className="whitespace-nowrap rounded-[0.875rem] bg-[#9B9FE7] px-1 text-[0.625rem] font-medium text-[#070FC2] md:rounded-[1.25rem] md:px-2 md:py-1 md:text-xs">
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
