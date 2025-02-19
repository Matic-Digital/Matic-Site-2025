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
      {/* Main CTA Section */}
      <Section className="h-screen items-center justify-center flex bg-background">
        <Container>
          <Box direction="col" className="relative items-center justify-center h-full">
            <Box className="relative overflow-hidden w-[449px] h-[449px]">
              {backgroundImageRoute && (
                <motion.div 
                  style={{ 
                    background: gradientBackground
                  }}
                  className="w-[449px] h-[449px] shrink-0 rounded-full from-background dark:from-text/60 blue:from-text/60"
                />
              )}
            </Box>

            <Box direction="col" className="z-20 absolute items-center" gap={4}>
              <p className="font-light md:text-[1.5rem] leading-[120%]">{sectionSubheader}</p>
              <h1 className="md:text-[4rem] whitespace-nowrap">{sectionHeader}</h1>
              <Link href='/contact'>
                <Button variant="default">
                  {ctaButtonText}
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Section>

      {/* Secondary Image Section */}
      {secondaryBackgroundRoute && (
        <Section className="h-screen relative">
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
          <Container className='absolute bottom-0 left-0 right-0 flex flex-col justify-end pb-12 z-50'>
            <Box className="items-center" gap={2}>
              <h1 className=" md:text-[28px]">HQ:</h1>
              <div className="text-white font-normal text-lg md:text-[28px] md:leading-[33.6px] font-inter">Denver, Colorado</div>
            </Box>
          </Container>
        </Section>
      )}
    </div>
  );
}
