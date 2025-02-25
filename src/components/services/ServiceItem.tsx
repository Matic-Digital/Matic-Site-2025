'use client';

import React from 'react';
import { Box } from '@/components/global/matic-ds';
import { Container } from '@/components/global/matic-ds';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TextEffect } from '../ui/text-effect';
import { InView } from '../ui/in-view';

interface ServiceItemProps {
  item: {
    name: string;
    bannerIcon?: {
      url: string;
    };
    bannerCopy?: string;
    bannerLinkCopy?: string;
    slug: string;
  };
  colors: string[];
  index: number;
}

export function ServiceItem({ item, colors, index }: ServiceItemProps) {
  const backgroundColor = colors[index % colors.length];

  return (
    <motion.div>
      <motion.div
        className="w-full group"
        initial={false}
        animate={{
          backgroundColor: 'transparent'
        }}
      >
        <Link
          href={`/`}
          className="relative flex flex-col p-8 md:p-12 bg-background dark:bg-text w-full md:h-[230px]"
        >
          <motion.div
            initial={false}
            animate={{
              backgroundColor: 'transparent',
              scale: 1,
              y: 0
            }}
            whileHover={{
              backgroundColor,
              scaleY: 1.3,
              y: -12
            }}
            transition={{
              duration: 0.3
            }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              transformOrigin: 'center'
            }}
          />
          <Container className="relative z-10 min-h-full pointer-events-none">
            <motion.div>
              <Box className="" direction="col" gap={0}>
                <Box className="items-center ">
                  <Box className="grid md:grid-cols-2 grid-cols-1 items-start md:items-center gap-8 md:gap-48 w-full justify-between">
                    <Box className="flex items-center space-x-8">
                      {item.bannerIcon && (
                        <div className="relative aspect-square w-12 md:w-14 shrink-0">
                          <Image
                            src={item.bannerIcon.url}
                            alt={item.name ?? ''}
                            fill
                            className="rounded-none border-none object-contain opacity-75 transition-all duration-300 group-hover:[filter:grayscale(100%)_brightness(1000%)_contrast(120%)]"
                          />
                        </div>
                      )}
                      <Box className="flex flex-col justify-center" direction="col">
                        {item.name && (
                          <InView>
                            <TextEffect as="h1" per="char" className="font-chalet-newyork text-[1.5rem] md:text-[2rem] leading-tight text-text dark:text-background hover:text-white group-hover:text-white transition-colors duration-150 md:whitespace-nowrap">
                              {item.name}
                            </TextEffect>
                          </InView>
                        )}
                      </Box>
                    </Box>
                    <Box className="flex flex-col justify-center md:justify-end" direction="col">
                      {item.bannerCopy && (
                        <InView>
                          <TextEffect as="p" per="line" className="text-[1rem] md:text-[1.125rem] leading-relaxed text-text dark:text-background hover:text-white group-hover:text-white transition-colors duration-150">
                            {item.bannerCopy}
                          </TextEffect>
                        </InView>
                      )}
                      {item.bannerLinkCopy && (
                        <div className="mt-6 md:mt-8">
                          <Box className="items-center gap-4">
                            <p className="text-[1rem] md:text-[1.125rem] text-text dark:text-background hover:text-white group-hover:text-white transition-colors duration-150">
                              {item.bannerLinkCopy}
                            </p>
                            <ArrowRight className="w-4 h-4 text-text dark:text-background hover:text-white group-hover:text-white transition-colors duration-150" />
                          </Box>
                        </div>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Container>
        </Link>
      </motion.div>
    </motion.div>
  );
}
