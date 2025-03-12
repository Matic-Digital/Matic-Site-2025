'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CTASectionProps {
  backgroundImageRoute?: string;  // e.g. '/images/background.jpg'
  secondaryBackgroundRoute?: string;  // e.g. '/images/secondary.jpg'
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
    offset: ["start end", "end start"]
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
        <Section className="bg-text dark:bg-background blue:bg-background h-screen relative">
          {/* Color overlay */}
          <div 
            className="absolute inset-0 z-10 bg-[hsl(var(--base-hsl))] mix-blend-multiply opacity-60" 
          />
          <Image
            src={secondaryBackgroundRoute}
            alt="secondary background"
            fill
            className="object-cover border-none rounded-none"
            priority
          />
          <Container className='absolute bottom-0 right-2 flex flex-col justify-end pb-12 z-50'>
            <Box className="ml-auto items-center" gap={2}>
              <h2 className="opacity-60">HQ:<span className="opacity-60 font-sans font-normal"> Denver, Colorado</span></h2>
            </Box>
          </Container>
        </Section>
      )}
      {/* Main CTA Section */}
      <Section className="bg-text dark:bg-background blue:bg-background h-screen items-center justify-center flex bg-background">
        <Container>
          <Box direction="col" className="relative items-center justify-center h-full">
            <Box className="relative overflow-hidden w-[300px] h-[300px] md:w-[449px] md:h-[449px]">
              {backgroundImageRoute && (
                <motion.div 
                  style={{ 
                    background: gradientBackground
                  }}
                  className="w-[300px] h-[300px] md:w-[449px] md:h-[449px] shrink-0 rounded-full from-background dark:from-text/60 blue:from-text/60"
                />
              )}
            </Box>

            <Box direction="col" className="z-20 absolute items-center">
              <h2 className="font-sans font-normal leading-[120%] tracking-[-0.045rem] opacity-60 text-[1.25rem] md:text-[1.5rem] pb-1 md:pb-[1.56rem]">{sectionSubheader}</h2>
              <h1 className="md:text-[4rem] whitespace-nowrap pb-2 md:pb-[2.06rem]">{sectionHeader}</h1>
              <Link href='/contact'>
                <Button variant="default">
                  {ctaButtonText}
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Section>

    </div>
  );
}
