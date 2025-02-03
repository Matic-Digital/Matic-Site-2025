'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type Hero } from '@/types/contentful';
import { Section } from '@/components/global/matic-ds';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ClientHeroProps {
  hero: Hero;
  className?: string;
  children?: React.ReactNode;
}

export function ClientHero({ hero, className, children }: ClientHeroProps) {
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
    <Section className="client-hero relative -top-24 left-0 right-0 -mt-24 -mb-20 flex h-[80vh] md:h-[100vh] overflow-hidden bg-blue">
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
            className={`text-left lg:text-center md:text-[6rem] font-bold leading-none ${
              scrollBasedStyles.text
            }`}
          >
            {hero.tagline}
          </h1>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="w-full max-w-[90rem] px-6 md:px-12 lg:px-24 flex justify-end">
            <div className="mt-[calc(theme(fontSize.8xl)+24rem)] flex flex-col space-y-4">
              <p
                className={`font-normal max-w-[603px] !text-[2rem] leading-[140%] ${
                  scrollBasedStyles.text
                }`}
              >
                {hero.subheader}
              </p>
              <Link href={'/services'} className="pointer-events-auto flex items-center gap-4">
                <p className={`!text-[1.75rem] ${scrollBasedStyles.textColor}`}>What we do</p>
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
    </Section>
  );
}
