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
  const scrollBasedStyles = hasScrolled === undefined ? {
    overlay: 'bg-base mix-blend-screen',
    text: 'mix-blend-multiply text-text',
    textColor: 'text-text'
  } : {
    overlay: !hasScrolled ? 'bg-base mix-blend-screen transition-all duration-500' : 'bg-opacity-100 transition-all duration-500',
    text: !hasScrolled ? 'mix-blend-multiply text-text' : 'text-white',
    textColor: !hasScrolled ? 'text-text' : 'text-white'
  };

  return (
    <Section className="client-hero relative -top-24 left-0 right-0 -mt-24 -mb-20 flex h-[80vh] md:h-[100vh] overflow-hidden bg-[#040ECA]">
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
          "absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-500",
          scrollBasedStyles.overlay
        )}
      >
        <div className="w-full max-w-[100vw] px-6 md:px-12 lg:px-24">
          <h1
            className={`text-left lg:text-center md:text-[6rem] leading-none ${
              scrollBasedStyles.text
            }`}
          >
            {tagline}
          </h1>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="w-full max-w-[90rem] px-6 md:px-12 lg:px-24 flex justify-end">
            <div className="md:mt-[calc(theme(fontSize.8xl)+24rem)] mt-[calc(theme(fontSize.8xl)+5rem)] flex flex-col space-y-4">
              <p
                className={`font-normal max-w-[603px] md:text-[2rem] leading-[140%] ${
                  scrollBasedStyles.text
                }`}
              >
                {subheader}
              </p>
              <Link href={'/services'} className="pointer-events-auto flex items-center gap-4">
                <p className={`md:!text-[1.75rem] ${scrollBasedStyles.textColor}`}>Explore our services</p>
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
      <Box className="z-40 absolute w-full h-[15px] bottom-0">
        <div className="bg-[#040ECA] flex-grow"></div>
        <div className="bg-[#076EFF] flex-grow"></div>
        <div className="bg-[#12B76A] flex-grow"></div>
        <div className="bg-[#DD2590] flex-grow"></div>
        <div className="bg-[#FB9910] flex-grow"></div>
        <div className="bg-[#6D32ED] flex-grow"></div>
      </Box>
    </Section>
  );
}
