'use client';

import React, { useState } from 'react';
import { Box } from '@/components/global/matic-ds';
import { Container } from '@/components/global/matic-ds';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { TextEffect } from '../ui/text-effect';
import { InView } from '../ui/in-view';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ServiceItemLink } from './ServiceItemLink';
import { type Work } from '@/types';

interface ServiceItemProps {
  item: {
    name: string;
    bannerIcon?: {
      url: string;
    };
    hoverIcon?: {
      url: string;
    };
    bannerCopy?: string;
    bannerLinkCopy?: string;
    slug: string;
  };
  colors: string[];
  index: number;
  isLast?: boolean;
  works: Work[];
}

export function ServiceItem({ item, colors, index, isLast = false, works }: ServiceItemProps) {
  const backgroundColor = colors[index % colors.length] ?? colors[0] ?? '#000000';
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <motion.div className={isLast ? 'mb-0' : 'mb-4 md:mb-8'}>
      <motion.div
        className="group w-full"
        initial={false}
        animate={{
          backgroundColor: 'transparent'
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <ServiceItemLink
          serviceName={item.name}
          works={works}
          className="relative flex w-full flex-col bg-background p-6 dark:bg-text sm:p-8 md:h-[230px] md:p-12"
        >
          <motion.div
            initial={false}
            animate={{
              backgroundColor: isHovered ? backgroundColor : 'transparent',
              scale: isHovered ? (isMobile ? 1.05 : 1.15) : 1,
              y: isHovered ? -8 : 0
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
          <Container className="relative z-10 min-h-full px-0">
            <Box className="" direction="col" gap={0}>
              <Box className="items-center">
                <Box className="grid w-full grid-cols-1 items-start justify-between gap-6 md:grid-cols-2 md:items-center md:gap-4">
                  <Box className="flex items-center space-x-4 md:justify-center md:space-x-8">
                    <div className="relative aspect-square w-10 shrink-0 sm:w-12 md:w-14">
                      {item.bannerIcon && (
                        <Image
                          src={item.bannerIcon.url}
                          alt={item.name ?? ''}
                          fill
                          className={`rounded-none border-none object-contain transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                        />
                      )}
                      {item.hoverIcon && (
                        <Image
                          src={item.hoverIcon.url}
                          alt={`${item.name} hover icon`}
                          fill
                          className={`absolute inset-0 rounded-none border-none object-contain transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        />
                      )}
                    </div>
                    <Box className="flex flex-col justify-center" direction="col">
                      {item.name && (
                        <h1
                          className={`text-xl font-medium transition-colors duration-150 sm:text-2xl md:text-[2.25rem] ${isHovered ? 'text-white' : 'text-text dark:text-background'}`}
                        >
                          {item.name}
                        </h1>
                      )}
                    </Box>
                  </Box>
                  <Box
                    className="mx-auto flex flex-col justify-center md:max-w-[37.8125rem] md:justify-end"
                    direction="col"
                  >
                    {item.bannerCopy && (
                      <InView>
                        <TextEffect
                          as="p"
                          per="line"
                          className={`text-sm leading-relaxed transition-colors duration-150 sm:text-base md:text-lg ${isHovered ? 'text-white' : 'text-text dark:text-background'}`}
                        >
                          {item.bannerCopy}
                        </TextEffect>
                      </InView>
                    )}
                    {item.bannerLinkCopy && (
                      <div className="mt-4 sm:mt-6 md:mt-8">
                        <Box className="items-center gap-2 md:gap-4">
                          <p
                            className={`text-sm transition-colors duration-150 sm:text-base md:text-lg ${isHovered ? 'text-white' : 'text-text dark:text-background'}`}
                          >
                            {item.bannerLinkCopy}
                          </p>
                          <ArrowRight
                            className={`h-4 w-4 transition-colors duration-150 ${isHovered ? 'text-white' : 'text-text dark:text-background'}`}
                          />
                        </Box>
                      </div>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </ServiceItemLink>
      </motion.div>
    </motion.div>
  );
}
