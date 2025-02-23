'use client';

import { Box, Section } from '@/components/global/matic-ds';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  const scrollBasedStyles = hasScrolled === undefined ? {
    overlay: 'bg-background mix-blend-screen',
    text: 'mix-blend-multiply',
    textColor: 'black'
  } : {
    overlay: !hasScrolled ? 'bg-background mix-blend-screen transition-all duration-300 ease-in-out' : 'bg-background bg-opacity-0 mix-blend-screen transition-all duration-300 ease-in-out',
    text: !hasScrolled ? 'mix-blend-multiply transition-colors duration-300 ease-in-out' : 'text-white transition-colors duration-300 ease-in-out',
    textColor: hasScrolled ? 'white' : 'black'
  };

  return (
    <Section className='relative flex flex-col -mt-24 pt-24 min-h-[800px] md:min-h-[800px] overflow-hidden'>
      <video
        src="/bannersphere.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover border-none rounded-none"
      />
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${
          scrollBasedStyles.overlay
        }`}
      >
        <div className="w-full max-w-[100vw] px-6 md:px-12 lg:px-24">
          <h1
            className={`text-left lg:text-center text-[64px] md:text-[108px] font-chalet-newyork font-normal leading-none transition-all duration-300 ease-in-out ${
              scrollBasedStyles.text
            }`}
          >
            Change happens here.
          </h1>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="w-full max-w-[90rem] px-6 md:px-12 lg:px-24 flex justify-end">
            <div className="mt-[calc(theme(fontSize.8xl)+14rem)] mt-[calc(theme(fontSize.8xl)+18rem)] flex flex-col space-y-4">
              <p
                style={{ color: scrollBasedStyles.textColor }}
                className="font-normal max-w-xl text-[1.25rem] md:text-[1.75rem]"
              >
                We create brand, digital and team solutions for businesses at every stage.
              </p>
              <Link href="/contact" className="flex items-center gap-4">
                <p style={{ color: scrollBasedStyles.textColor }} className="text-[1.25rem] md:text-[1.5rem]">What we do</p>
                <ArrowRight className="w-[1.25em] h-[1.25em]"/>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Box className="z-40 absolute w-full h-[15px] bottom-0 hidden dark:flex">
        <div className="bg-darkblue flex-grow"></div>
        <div className="bg-blue flex-grow"></div>
        <div className="bg-green flex-grow"></div>
        <div className="bg-pink flex-grow"></div>
        <div className="bg-orange flex-grow"></div>
        <div className="bg-purple flex-grow"></div>
      </Box>
    </Section>
  );
}
