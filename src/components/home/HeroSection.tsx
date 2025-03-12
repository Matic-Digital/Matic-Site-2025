'use client';

import { Box, Section } from '@/components/global/matic-ds';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TextEffect } from '../ui/text-effect';
import cn from 'classnames';

export function HeroSection() {
  // Use useEffect for isClient state to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set to true after component mounts to indicate client-side rendering
    setIsClient(true);
  }, []);

  // Initialize with a default value instead of undefined to ensure consistent initial render
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (isClient) {
      // Set initial scroll state only after client-side hydration
      setHasScrolled(window.scrollY > 0);

      const handleScroll = () => {
        setHasScrolled(window.scrollY > 0);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isClient]); // Only run this effect after isClient is true

  // Always provide consistent styles for initial render
  const scrollBasedStyles = {
    overlay: !hasScrolled
      ? 'bg-background mix-blend-screen transition-all duration-300 ease-in-out'
      : 'bg-background bg-opacity-0 mix-blend-screen transition-all duration-300 ease-in-out',
    text: !hasScrolled
      ? 'mix-blend-multiply transition-colors duration-300 ease-in-out'
      : 'text-white transition-colors duration-300 ease-in-out',
    textColor: hasScrolled ? 'white' : 'black'
  };

  return (
    <Section className="relative -mt-24 flex min-h-[800px] flex-col overflow-hidden pt-24 md:min-h-screen">
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
            <div className={cn(
              scrollBasedStyles.text,
              // Use a simpler approach for visibility
              isClient ? "opacity-100" : "opacity-0"
            )}>
              {/* Always render the TextEffect component, but conditionally trigger the animation */}
              <TextEffect
                per="char"
                delay={0.25}
                className="text-left font-chalet-newyork text-[64px] font-normal leading-none md:text-[108px] lg:text-center"
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { 
                        duration: 0.5,
                        staggerChildren: 0.02
                      }
                    }
                  },
                  item: {
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { duration: 0.3 }
                    }
                  }
                }}
                trigger={isClient}
              >
                Change happens here.
              </TextEffect>
            </div>
          </h1>
        </div>
      </div>

      <div className="absolute inset-0 z-30">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex w-full max-w-[90rem] justify-end px-6 md:px-12 lg:px-24">
            <div className="mt-[calc(theme(fontSize.8xl)+14rem)] mt-[calc(theme(fontSize.8xl)+18rem)] flex flex-col space-y-4">
              <div className={cn(
                isClient ? "opacity-100" : "opacity-0"
              )}
                style={{ color: scrollBasedStyles.textColor }}
              >
                {/* Always render the TextEffect component, but conditionally trigger the animation */}
                <TextEffect
                  per="line"
                  delay={0.75}
                  className="max-w-xl text-[1.5rem] font-normal md:text-[1.75rem]"
                  trigger={isClient}
                >
                  We create brand, digital and team solutions for businesses at every stage.
                </TextEffect>
              </div>
              <Link
                href="/services"
                className="group flex items-center gap-4 transition-opacity hover:opacity-80"
              >
                <div className={cn(
                  isClient ? "opacity-100" : "opacity-0"
                )}
                  style={{ color: scrollBasedStyles.textColor }}
                >
                  {/* Always render the TextEffect component, but conditionally trigger the animation */}
                  <TextEffect
                    per="char"
                    delay={1}
                    className="text-[1.25rem] md:text-[1.5rem]"
                    trigger={isClient}
                  >
                    What we do
                  </TextEffect>
                </div>
                <ArrowRight
                  style={{ color: scrollBasedStyles.textColor }}
                  className="h-[1.25em] w-[1.25em] opacity-0 transition-transform group-hover:translate-x-1 [animation:arrow-reveal_0.3s_ease-in-out_1.75s_forwards]"
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
