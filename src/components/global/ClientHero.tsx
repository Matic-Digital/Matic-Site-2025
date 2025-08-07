'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Box, Section } from '@/components/global/matic-ds';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ClientHeroProps {
  tagline: string;
  subheader: string;
  className?: string;
  children?: React.ReactNode;
}

export function ClientHero({ tagline, subheader, className, children }: ClientHeroProps) {
  // Initialize as undefined to prevent hydration mismatch
  const [hasScrolled, setHasScrolled] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Set initial scroll state
    setHasScrolled(window.scrollY > 0);

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render styles dependent on scroll until after hydration
  const scrollBasedStyles =
    hasScrolled === undefined
      ? {
          overlay: 'bg-base mix-blend-screen',
          text: 'mix-blend-multiply text-text',
          textColor: 'text-text'
        }
      : {
          overlay: !hasScrolled
            ? 'bg-base mix-blend-screen transition-all duration-500'
            : 'bg-opacity-100 transition-all duration-500',
          text: !hasScrolled ? 'mix-blend-multiply text-text' : 'text-white',
          textColor: !hasScrolled ? 'text-text' : 'text-white'
        };

  return (
    <Section className="client-hero relative -top-24 left-0 right-0 -mb-20 -mt-24 flex h-[80vh] overflow-hidden bg-[#040ECA] md:h-[100vh]">
      {/* {hero.backgroundAsset && (
        <video
          src={hero.backgroundAsset?.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover border-none rounded-none"
        />
      )} */}
      <div
        className={cn(
          'absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-500',
          scrollBasedStyles.overlay
        )}
      >
        <div className="w-full max-w-[100vw] px-6 md:px-12 lg:px-24">
          <h1
            className={`text-left leading-none md:text-[6rem] lg:text-center ${
              scrollBasedStyles.text
            }`}
          >
            {tagline}
          </h1>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex w-full max-w-[90rem] justify-end px-6 md:px-12 lg:px-24">
            <div className="mt-[calc(theme(fontSize.8xl)+5rem)] flex flex-col space-y-4 md:mt-[calc(theme(fontSize.8xl)+24rem)]">
              <p
                className={`max-w-[603px] font-normal leading-[140%] md:text-[2rem] ${
                  scrollBasedStyles.text
                }`}
              >
                {subheader}
              </p>
              <Link href={'/services'} className="pointer-events-auto flex items-center gap-4">
                <p className={`md:!text-[1.75rem] ${scrollBasedStyles.textColor}`}>
                  Explore our services
                </p>
                <ArrowRight className={scrollBasedStyles.textColor} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn('client-hero', className)}
      >
        {children}
      </motion.div>
      <Box className="absolute bottom-0 z-40 h-[15px] w-full">
        <div className="flex-grow bg-[#040ECA]"></div>
        <div className="flex-grow bg-[#076EFF]"></div>
        <div className="flex-grow bg-[#12B76A]"></div>
        <div className="flex-grow bg-[#DD2590]"></div>
        <div className="flex-grow bg-[#FB9910]"></div>
        <div className="flex-grow bg-[#6D32ED]"></div>
      </Box>
    </Section>
  );
}
