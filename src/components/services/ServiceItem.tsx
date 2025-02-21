'use client';

import React, { useRef } from 'react';
import { Box } from '@/components/global/matic-ds';
import { Container } from '@/components/global/matic-ds';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.15
      }}
    >
      <Link
        href={`/`}
        className="group relative flex flex-col p-8 md:p-12 bg-background dark:bg-text w-full md:h-[230px]"
      >
        <motion.div
          initial={false}
          animate={{
            backgroundColor: 'transparent'
          }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        />
        <Container className="relative z-10 pointer-events-none">
          <motion.div>
            <Box className="" direction="col" gap={0}>
              <Box className="items-center ">
                <Box className="grid md:grid-cols-2 grid-cols-1 items-start md:items-center gap-8 md:gap-48 w-full justify-between">
                  <Box className="flex items-center space-x-8">
                    {item.bannerIcon && (
                      <motion.div
                        className="relative aspect-square w-12 md:w-14 shrink-0"
                      >
                        <Image
                          src={item.bannerIcon.url}
                          alt={item.name ?? ''}
                          fill
                          className="rounded-none border-none object-contain opacity-75"
                        />
                      </motion.div>
                    )}
                    <Box className="flex flex-col justify-center" direction="col">
                      <p className="text-[0.75rem] md:text-[0.875rem] uppercase text-text dark:text-background">
                        {numberToText(index + 1)}
                      </p>
                      <h1 className="font-chalet-newyork text-[1.5rem] md:text-[2rem] leading-tight text-text dark:text-background md:whitespace-nowrap mt-1">
                        {item.name}
                      </h1>
                    </Box>
                  </Box>
                  <Box className="flex flex-col justify-center md:justify-end" direction="col">
                    <p className="text-[1rem] md:text-[1.125rem] leading-relaxed text-text dark:text-background">
                      {item.bannerCopy}
                    </p>
                    {item.bannerLinkCopy && (
                      <motion.div 
                        className="mt-6 md:mt-8"
                      >
                        <Box className="items-center gap-4">
                          <p className="text-[1rem] md:text-[1.125rem] text-text dark:text-background">
                            {item.bannerLinkCopy}
                          </p>
                          <ArrowRight className="w-4 h-4 text-text dark:text-background" />
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
    </motion.div>
  );
}
