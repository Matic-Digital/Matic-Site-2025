'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface CTASectionProps {
  backgroundImageRoute?: string; // e.g. '/images/background.jpg'
  secondaryBackgroundRoute?: string; // e.g. '/images/secondary.jpg'
  sectionHeader: string;
  sectionSubheader: string;
  ctaButtonText: string;
}

export function CTASection({
  backgroundImageRoute,
  secondaryBackgroundRoute,
  sectionHeader,
  sectionSubheader,
  ctaButtonText
}: CTASectionProps) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start']
  });
  const gradientStop = useTransform(scrollYProgress, [0, 1], [0, 540]);
  const gradientBackground = useTransform(
    gradientStop,
    (stop) => `linear-gradient(${stop}deg, var(--tw-gradient-from), transparent)`
  );

  return (
    <div className="relative" ref={targetRef}>
      {/* Secondary Image Section */}
      {secondaryBackgroundRoute && (
        <Section className="relative h-screen bg-text blue:bg-background dark:bg-background">
          {/* Color overlay */}
          <div className="absolute inset-0 z-10 bg-[hsl(var(--base-hsl))] opacity-60 mix-blend-multiply" />
          <Image
            src={secondaryBackgroundRoute}
            alt="secondary background"
            fill
            className="rounded-none border-none object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <Container className="absolute bottom-0 left-2 z-50 flex flex-col justify-end pb-12">
            <Box className="mr-auto items-start" direction="col" gap={2}>
              <h1 className="">Denver, Colorado</h1>
              <p className="text-text opacity-60">Headquarters</p>
            </Box>
          </Container>
        </Section>
      )}
      {/* Main CTA Section */}
      <Section className="flex h-screen items-center justify-center bg-background bg-text blue:bg-background dark:bg-background">
        <Container>
          <Box direction="col" className="relative h-full items-center justify-center">
            <Box className="relative h-[300px] w-[300px] overflow-hidden md:h-[449px] md:w-[449px]">
              {backgroundImageRoute && (
                <motion.div
                  style={{
                    background: gradientBackground
                  }}
                  className="h-[300px] w-[300px] shrink-0 rounded-full from-background blue:from-text/60 dark:from-text/60 md:h-[449px] md:w-[449px]"
                />
              )}
            </Box>

            <Box direction="col" className="absolute z-20 items-center">
              <h2 className="pb-1 font-sans text-[1.25rem] font-normal leading-[120%] tracking-[-0.045rem] opacity-60 md:pb-[1.56rem] md:text-[1.5rem]">
                {sectionSubheader}
              </h2>
              <h1 className="whitespace-nowrap pb-2 md:pb-[2.06rem] md:text-[4rem]">
                {sectionHeader}
              </h1>
              <Link href="/contact">
                <Button variant="default">{ctaButtonText}</Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Section>
    </div>
  );
}
