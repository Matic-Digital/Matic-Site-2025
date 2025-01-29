'use client';

import React from 'react';
import { Box } from '@/components/global/matic-ds';
import { Container } from '@/components/global/matic-ds';
import { Section } from '@/components/global/matic-ds';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceItemProps {
  item: {
    bannerIcon?: { url: string };
    name?: string;
    homepageOrder?: number;
    bannerCopy?: string;
    slug?: string;
  };
  backgroundColor: string;
}

const numberToText = (num?: number): string => {
  if (!num) return '';
  const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  return numbers[num] ?? num.toString();
};

export function ServiceItem({ item, backgroundColor }: ServiceItemProps) {
  return (
    <motion.div 
      initial={{ backgroundColor: 'transparent' }}
      whileHover={{ 
        backgroundColor,
        transition: { duration: 0.15, ease: [0.33, 1, 0.68, 1] }
      }}
      className="group relative transition-all duration-200 ease-out"
    >
      <Section>
        <Container>
          <Box className="" direction="col" gap={0}>
            <Box className="items-center">
              <Box className="items-center flex-grow">
                {item.bannerIcon && (
                  <motion.div 
                    className="relative aspect-square w-16"
                    whileHover={{ scale: 1.08 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 15,
                      mass: 0.8 
                    }}
                  >
                    <Image
                      src={item.bannerIcon.url}
                      alt={item.name ?? ''}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                )}
                <Box className="ml-8 flex-grow">
                  <p className="text-sm font-medium text-gray-500">
                    {numberToText(item.homepageOrder)}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-4 text-base text-gray-600">
                    {item.bannerCopy}
                  </p>
                  {item.slug && (
                    <Link href={`/services/${item.slug}`}>
                      <Box className="mt-4 items-center gap-2">
                        <span className="text-sm font-medium">Learn more</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Box>
                    </Link>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Section>
    </motion.div>
  );
}
