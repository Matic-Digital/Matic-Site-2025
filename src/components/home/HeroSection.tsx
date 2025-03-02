'use client';

import { Box, Section } from '@/components/global/matic-ds';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TextEffect } from '../ui/text-effect';
import cn from 'classnames';

export function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
              !isClient && "opacity-0"
            )}>
              {isClient ? (
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
                >
                  Change happens here.
                </TextEffect>
              ) : (
                <span 
                  aria-hidden="true"
                  className="text-left font-chalet-newyork text-[64px] font-normal leading-none md:text-[108px] lg:text-center"
                >
                  Change happens here.
                </span>
              )}
            </div>
          </h1>
        </div>
      </div>

      <div className="absolute inset-0 z-30">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex w-full max-w-[90rem] justify-end px-6 md:px-12 lg:px-24">
            <div className="mt-[calc(theme(fontSize.8xl)+14rem)] mt-[calc(theme(fontSize.8xl)+18rem)] flex flex-col space-y-4">
              <div className={cn(
                !isClient && "opacity-0"
              )}
                style={{ color: scrollBasedStyles.textColor }}
              >
                {isClient ? (
                  <TextEffect
                    per="line"
                    delay={0.75}
                    className="max-w-xl text-[1.5rem] font-normal md:text-[1.75rem]"
                  >
                    We create brand, digital and team solutions for businesses at every stage.
                  </TextEffect>
                ) : (
                  <span 
                    aria-hidden="true"
                    className="max-w-xl text-[2rem] font-normal md:text-[2.5rem]"
                  >
                    We create brand, digital and team solutions for businesses at every stage.
                  </span>
                )}
              </div>
              <Link
                href="/services"
                className="group flex items-center gap-4 transition-opacity hover:opacity-80"
              >
                <div className={cn(
                  !isClient && "opacity-0"
                )}
                  style={{ color: scrollBasedStyles.textColor }}
                >
                  {isClient ? (
                    <TextEffect
                      per="char"
                      delay={1}
                      className="text-[1.25rem] md:text-[1.5rem]"
                    >
                      What we do
                    </TextEffect>
                  ) : (
                    <span 
                      aria-hidden="true"
                      className="text-[1.25rem] md:text-[1.5rem]"
                    >
                      What we do
                    </span>
                  )}
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
