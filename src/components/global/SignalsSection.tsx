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
  const { ref, inView } = useInView({ threshold: 1 });

  return (
    <Section id="signals-section" className="w-full py-20 md:py-[120px]">
      <Container ref={ref} className={`border-draw ${inView ? 'in-view' : ''} py-12 md:py-20`}>
        <Box direction="col" className="md:flex-row w-full md:justify-between space-y-12 md:space-y-0 ">
              <div className="w-fit relative md:pl-20">
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
      </Container>
    </Section>
  );
}
