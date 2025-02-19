'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { EmailForm } from '../forms/EmailForm';
import { useInView } from '@/hooks/useInView';

interface SignalsSectionProps {
  logoRoute: string;
  tagline: string;
  subheader: string;
}

export function SignalsSection({ logoRoute, tagline, subheader }: SignalsSectionProps) {
  const [containerRef, isInView] = useInView({
    threshold: 0.8,
    rootMargin: '0px',
  });

  return (
    <Section id="signals-section" className="w-full py-20 md:py-[120px]">
      <Container className=''>
        <div
          ref={containerRef}
          className="rounded-xl backdrop-blur-[80px] relative overflow-hidden"
          style={{
            boxShadow: isInView ? '0px 2.5px 60px 0px rgba(235, 1, 168, 0.15)' : 'none',
            backdropFilter: 'blur(40px)',
            transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Gradient background */}
          <div 
            className={`absolute inset-0 rounded-xl ${isInView ? 'opacity-100 animate-move-gradient' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `
                linear-gradient(133.62deg, rgba(255, 255, 255, 0.7) -0.76%, rgba(255, 255, 255, 0.21) 19.4%, rgba(255, 255, 255, 0) 55.19%),
                radial-gradient(28.69% 18.4% at 100% 88.65%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.21) 36.04%, rgba(255, 255, 255, 0) 100%),
                radial-gradient(69.55% 80.99% at 111.14% 9.19%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.21) 36.04%, rgba(255, 255, 255, 0) 100%),
                radial-gradient(14.21% 12.88% at 2.65% 109.68%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%),
                linear-gradient(199deg, rgba(221, 37, 144, 0.7) 4%, rgba(109, 50, 237, 0.7) 82.69%),
                radial-gradient(30.32% 30.32% at 50% 0%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%),
                radial-gradient(32.31% 32.31% at 100% 102.45%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)
              `,
              backgroundSize: '200% 200%',
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
          />

          {/* Content container */}
          <div 
            className={`relative rounded-lg  bg-background ${isInView ? 'animate-reveal-border' : 'animate-hide-border'}`}
            style={{ 
              margin: '0px',
              padding: '1rem'
            }}
          >
            <Box direction="col" className="md:flex-row md:pl-[150px] md:justify-between space-y-12 md:space-y-0 ">
              <div className="w-fit relative">
                <div
                  className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-text transition-all duration-500 ease-in-out"
                  style={{
                    WebkitMaskImage: `url(${logoRoute})`,
                    maskImage: `url(${logoRoute})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                  }}
                />
              </div>
              <Box direction="col" gap={4} className="max-w-xl px-0 md:p-8">
                <h1 className="text-text text-[1.75rem] md:text-[2rem] transition-all ease-in-out">{tagline}</h1>
                <p className="max-w-[26rem] text-[1rem] md:text-[1.125rem] leading-relaxed text-text transition-all ease-in-out">{subheader}</p>
                <EmailForm
                  labelBgClassName="bg-background"
                  buttonText="Subscribe"
                />
              </Box>
            </Box>
          </div>
        </div>
      </Container>
    </Section>
  );
}
