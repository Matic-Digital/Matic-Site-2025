'use client';

import { Box, Container } from '@/components/global/matic-ds';
import { ScrollDetector } from '@/components/global/ScrollDetector';

type HeroGradientProps = {
  text: string;
};

export function HeroGradient({ text }: HeroGradientProps) {
  return (
    <>
      <ScrollDetector />
      <Box className="relative md:h-[60rem] -mt-[4.875rem] py-24">
        {/* Background gradient */}
        <div 
          className="
            absolute
            inset-0
            bg-[url('/homepage-gradient.png')] 
            bg-cover 
            bg-center 
            opacity-0 
            transition-opacity
            duration-700
            [.scroll-active_&]:opacity-100
          "
          aria-hidden="true"
        />
        
        {/* Hero content */}
        <Container className="relative h-full">
          <Box className="h-full flex items-center">
            <div className="relative">
              {/* Base white text layer */}
              <h1 
                className="
                  md:text-[11.75rem] 
                  font-extrabold 
                  leading-none 
                  text-white
                  opacity-0
                  transition-opacity
                  duration-700
                  [.scroll-active_&]:opacity-100
                "
              >
                {text}
              </h1>
              
              {/* Gradient mask layer */}
              <h1 
                className="
                  absolute
                  inset-0
                  md:text-[11.75rem] 
                  font-extrabold 
                  leading-none 
                  transition-opacity
                  duration-700
                  bg-clip-text 
                  text-transparent 
                  bg-[url('/homepage-gradient.png')]
                  bg-cover
                  bg-center
                  opacity-100
                  [.scroll-active_&]:opacity-0
                "
                aria-hidden="true"
              >
                {text}
              </h1>
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
}
