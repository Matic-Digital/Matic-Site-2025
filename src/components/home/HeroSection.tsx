'use client';

import { Box, Section } from '@/components/global/matic-ds';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TextEffect } from '../ui/text-effect';

export function HeroSection() {
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
          overlay: 'bg-background mix-blend-screen',
          text: 'mix-blend-multiply',
          textColor: 'black'
        }
      : {
          overlay: !hasScrolled
            ? 'bg-background mix-blend-screen transition-all duration-300 ease-in-out'
            : 'bg-background bg-opacity-0 mix-blend-screen transition-all duration-300 ease-in-out',
          text: !hasScrolled
            ? 'mix-blend-multiply transition-colors duration-300 ease-in-out'
            : 'text-white transition-colors duration-300 ease-in-out',
          textColor: hasScrolled ? 'white' : 'black'
        };

  return (
    <Section className="relative -mt-24 flex min-h-[800px] flex-col overflow-hidden pt-24 md:min-h-[800px]">
      <video
        src="/bannersphere.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full rounded-none border-none object-cover"
      />
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${
          scrollBasedStyles.overlay
        }`}
      >
        <div className="w-full max-w-[100vw] px-6 md:px-12 lg:px-24">
          <h1>
            <TextEffect
              per="char"
              className={`text-left font-chalet-newyork text-[64px] font-normal leading-none transition-all duration-300 ease-in-out md:text-[108px] lg:text-center ${
                scrollBasedStyles.text
              }`}
            >
              Change happens here.
            </TextEffect>
          </h1>
        </div>
      </div>

      <div className="absolute inset-0 z-30">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex w-full max-w-[90rem] justify-end px-6 md:px-12 lg:px-24">
            <div className="mt-[calc(theme(fontSize.8xl)+14rem)] mt-[calc(theme(fontSize.8xl)+18rem)] flex flex-col space-y-4">
              <TextEffect
                per="line"
                delay={0.75}
                style={{ color: scrollBasedStyles.textColor }}
                className="max-w-xl text-[1.25rem] font-normal md:text-[1.75rem]"
              >
                We create brand, digital and team solutions for businesses at every stage.
              </TextEffect>
              <Link
                href="/services"
                className="group flex items-center gap-4 transition-opacity hover:opacity-80"
              >
                <TextEffect
                  per="char"
                  delay={1}
                  style={{ color: scrollBasedStyles.textColor }}
                  className="text-[1.25rem] md:text-[1.5rem]"
                >
                  What we do
                </TextEffect>
                <ArrowRight
                  style={{ color: scrollBasedStyles.textColor }}
                  className="h-[1.25em] w-[1.25em] opacity-0 transition-transform group-hover:translate-x-1 [animation:arrow-reveal_0.3s_ease-in-out_1.25s_forwards]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Box className="absolute bottom-0 z-40 hidden h-[15px] w-full dark:flex">
        <div className="flex-grow bg-darkblue"></div>
        <div className="flex-grow bg-blue"></div>
        <div className="flex-grow bg-green"></div>
        <div className="flex-grow bg-pink"></div>
        <div className="flex-grow bg-orange"></div>
        <div className="flex-grow bg-purple"></div>
      </Box>
    </Section>
  );
}
