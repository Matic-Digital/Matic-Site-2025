'use client';

import React, { useState } from 'react';
import { Box } from '@/components/global/matic-ds';
import { Container } from '@/components/global/matic-ds';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TextEffect } from '../ui/text-effect';
import { InView } from '../ui/in-view';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
}

export function ServiceItem({ item, colors, index, isLast = false }: ServiceItemProps) {
  const backgroundColor = colors[index % colors.length] ?? colors[0] ?? '#000000';
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <motion.div className={isLast ? 'mb-0' : 'mb-4 md:mb-8'}>
      <motion.div
        className="w-full group"
        initial={false}
        animate={{
          backgroundColor: 'transparent'
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <Link
          href={`/about`}
          className="relative flex flex-col p-6 sm:p-8 md:p-12 bg-background dark:bg-text w-full md:h-[230px]"
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
                <Box className="grid md:grid-cols-2 grid-cols-1 items-start md:items-center w-full justify-between gap-6 md:gap-4">
                  <Box className="flex items-center md:justify-center space-x-4 md:space-x-8">
                    <div className="relative aspect-square w-10 sm:w-12 md:w-14 shrink-0">
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
                          className={`rounded-none border-none object-contain transition-opacity duration-300 absolute inset-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        />
                      )}
                    </div>
                    <Box className="flex flex-col justify-center" direction="col">
                      {item.name && (
                        <h1 className={`text-xl sm:text-2xl md:text-[2.25rem] font-medium transition-colors duration-150 ${isHovered ? 'text-white' : 'text-text dark:text-background'}`}>
                          {item.name}
                        </h1>
                      )}
                    </Box>
                  </Box>
                  <Box className="flex flex-col mx-auto justify-center md:justify-end md:max-w-[37.8125rem]" direction="col">
                    {item.bannerCopy && (
                      <InView>
                        <TextEffect 
                          as="p" 
                          per="line" 
                          className={`text-sm sm:text-base md:text-lg leading-relaxed transition-colors duration-150 ${isHovered ? 'text-white' : 'text-text dark:text-background'}`}
                        >
                          {item.bannerCopy}
                        </TextEffect>
                      </InView>
                    )}
                    {item.bannerLinkCopy && (
                      <div className="mt-4 sm:mt-6 md:mt-8">
                        <Box className="items-center gap-2 md:gap-4">
                          <p className={`text-sm sm:text-base md:text-lg transition-colors duration-150 ${isHovered ? 'text-white' : 'text-text dark:text-background'}`}>
                            {item.bannerLinkCopy}
                          </p>
                          <ArrowRight className={`w-4 h-4 transition-colors duration-150 ${isHovered ? 'text-white' : 'text-text dark:text-background'}`} />
                        </Box>
                      </div>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Link>
      </motion.div>
    </motion.div>
  );
}
