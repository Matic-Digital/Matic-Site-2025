'use client';

import React from 'react';
import { Box } from '@/components/global/matic-ds';
import { Container } from '@/components/global/matic-ds';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceItemProps {
  item: {
    bannerIcon?: { url: string };
    name: string;
    bannerCopy?: string;
    bannerLinkCopy?: string;
    slug: string;
  };
  colors: string[];
  index: number;
}

function numberToText(num: number): string {
  const numbers = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  return numbers[num] ?? num.toString();
}

export function ServiceItem({ item, colors, index }: ServiceItemProps) {
  const backgroundColor = colors[index % colors.length];
  
  return (
    <Link
      href={`/`}
      className="group relative flex flex-col p-8 md:p-12 bg-background dark:bg-text  w-full"
    >
      <motion.div
        initial={{ 
          backgroundColor: 'transparent'
        }}
        animate={{
          backgroundColor: 'transparent'
        }}
        whileHover={{
          backgroundColor: backgroundColor,
        }}
        transition={{
          duration: 0.15,
          ease: 'easeOut'
        }}
        className="absolute inset-0 opacity-100 transition-all duration-[0.15s] ease-out"
      />
      <Container>
        <motion.div
          initial={{ scale: 1 }}
          whileTap={{
            scale: 0.985,
            transition: { 
              duration: 0.15,
              ease: "easeOut"
            }
          }}
        >
          <Box className="" direction="col" gap={0}>
            <Box className="items-center ">
              <Box className="grid md:grid-cols-2 grid-cols-1 items-start md:items-center gap-8 md:gap-48 w-full justify-between">
                <Box className="flex items-center space-x-8">
                  {item.bannerIcon && (
                    <motion.div
                      className="relative aspect-square w-12 md:w-14 shrink-0"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.15,
                        ease: "easeOut"
                      }}
                    >
                      <Image
                        src={item.bannerIcon.url}
                        alt={item.name ?? ''}
                        fill
                        className="rounded-none border-none object-contain opacity-75 [transition:opacity_0.15s_ease-out,filter_0.15s_ease-out] group-hover:[filter:contrast(150%)_brightness(0)_invert(1)] group-hover:opacity-100 group-active:[filter:contrast(150%)_brightness(0)_invert(1)] group-active:opacity-100"
                      />
                    </motion.div>
                  )}
                  <Box className="flex flex-col justify-center" direction="col">
                    <p className="text-[0.75rem] md:text-[0.875rem] uppercase text-text dark:text-background group-hover:text-background dark:group-hover:text-text transition-all duration-[0.15s] ease-out">
                      {numberToText(index + 1)}
                    </p>
                    <h1 className="font-chalet-newyork text-[1.5rem] md:text-[2rem] leading-tight text-text dark:text-background group-hover:text-background dark:group-hover:text-text transition-all duration-[0.15s] ease-out md:whitespace-nowrap mt-1">
                      {item.name}
                    </h1>
                  </Box>
                </Box>
                <Box className="flex flex-col justify-center md:justify-end" direction="col">
                  <p className="text-[1rem] md:text-[1.125rem] leading-relaxed text-text dark:text-background group-hover:text-background dark:group-hover:text-text transition-all duration-[0.15s] ease-out">
                    {item.bannerCopy}
                  </p>
                  {item.bannerLinkCopy && (
                    <motion.div 
                      className="mt-6 md:mt-8"
                      transition={{ 
                        duration: 0.15,
                        ease: "easeOut"
                      }}
                    >
                      <Box className="items-center gap-3">
                        <p className="text-[1rem] md:text-[1.125rem] font-medium text-text dark:text-background group-hover:text-background dark:group-hover:text-text transition-all duration-[0.15s] ease-out">
                          {item.bannerLinkCopy}
                        </p>
                        <ArrowRight className="h-4 md:h-5 w-4 md:w-5 text-text dark:text-background group-hover:text-background dark:group-hover:text-text transition-all duration-[0.15s] ease-out" />
                      </Box>
                    </motion.div>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Link>
  );
}
