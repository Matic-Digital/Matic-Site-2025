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
    bannerCopy: string;
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
    <Link href={`/`} className="block">
      <motion.div
        initial={{ 
          backgroundColor: 'var(--base)'
        }}
        whileHover={{
          backgroundColor,
          color: backgroundColor,
          transition: { 
            duration: 0.15,
            ease: "easeOut"
          }
        }}
        animate={{
          backgroundColor: 'var(--base)',
          transition: {
            duration: 0.15,
            ease: "easeOut"
          }
        }}
        className="group relative py-20 cursor-pointer"
        style={{ zIndex: 1 }} // Ensure background appears above other elements
      >
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
              <Box className="items-center">
                <Box className="grid grid-cols-[500px_520px] items-center gap-48">
                  <Box className="flex items-center space-x-8">
                    {item.bannerIcon && (
                      <motion.div
                        className="relative aspect-square w-14 shrink-0"
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
                      <p className="text-[0.875rem] uppercase text-muted-foreground group-hover:text-background transition-all duration-[0.15s] ease-out">
                        {numberToText(index + 1)}
                      </p>
                      <h1 className="font-chalet-newyork text-[2rem] leading-tight text-foreground group-hover:text-background transition-all duration-[0.15s] ease-out whitespace-nowrap mt-1">
                        {item.name}
                      </h1>
                    </Box>
                  </Box>
                  <Box className="flex flex-col justify-center" direction="col">
                    <p className="text-[1.125rem] leading-relaxed text-foreground group-hover:text-background transition-all duration-[0.15s] ease-out">
                      {item.bannerCopy}
                    </p>
                    {item.bannerLinkCopy && (
                      <motion.div 
                        className="mt-8"
                        transition={{ 
                          duration: 0.15,
                          ease: "easeOut"
                        }}
                      >
                        <Box className="items-center gap-3">
                          <p className="text-[1.125rem] font-medium text-foreground group-hover:text-background transition-all duration-[0.15s] ease-out">
                            {item.bannerLinkCopy}
                          </p>
                          <ArrowRight className="h-5 w-5 text-gray-900 group-hover:text-background transition-all duration-[0.15s] ease-out" />
                        </Box>
                      </motion.div>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </motion.div>
    </Link>
  );
}
