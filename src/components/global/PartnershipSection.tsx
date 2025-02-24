'use client';

import React from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
  const headerRef = useRef(null);
  const partnersRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.1 });
  const isPartnersInView = useInView(partnersRef, { once: true, amount: 0.1 });

  return (
    <Section>
      <Container>
        <Box className="space-y-8 md:space-y-4" direction="col">
          <motion.div 
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 100
            }}
            className="space-y-4"
          >
            <h1 className="text-text text-[1.75rem] md:text-[2rem]">{sectionHeader}</h1>
            <p className="max-w-sm text-[1rem] md:text-[1.125rem] leading-relaxed text-text">
              {sectionSubheader}
            </p>
          </motion.div>
          <Box className="flex flex-col md:flex-row gap-8 md:justify-end">
            <div ref={partnersRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 items-center">
              {partners.map((partner, index) => {
                const row = Math.floor(index / 2); // For 2 columns in mobile
                const delay = row * 0.1; // 0.1s delay per row

                return (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isPartnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ 
                      type: "spring",
                      damping: 20,
                      stiffness: 100,
                      delay
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
                  </motion.div>
                );
              })}
            </div>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
