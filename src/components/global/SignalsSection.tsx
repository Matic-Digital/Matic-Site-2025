'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { RiveAnimation } from './RiveAnimation';
import { Fit, Alignment } from '@rive-app/react-canvas';
import { EmailForm } from '../forms/EmailForm';

interface SignalsSectionProps {
  logoRoute?: string;
  tagline?: string;
  subheader?: string;
}

export function SignalsSection({
  logoRoute = "/signalsLogo.svg",
  tagline = 'Signals is a newsletter you’ll actually want to read',
  subheader = 'Sharp takes on business, design, and tech. No fluff, just the takeaways you need.'
}: SignalsSectionProps = {}) {
  return (
    <Section id="signals-section" className="w-full py-20 md:py-[120px] overflow-hidden">
      <Container className="py-12 md:py-20">
        <div className="flex justify-center">
          <div className="relative w-[calc(100%+240px)] h-[606px]">
            <RiveAnimation
              src="/border.riv"
              width={1435}
              height={606}
              fit={Fit.Fill}
              alignment={Alignment.Center}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full flex items-center justify-center px-[120px]">
                <Box direction="col" className="md:flex-row w-full justify-between space-y-16 md:space-y-0">
                  <div className="w-fit relative md:pl-20">
                    <div
                      className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-text"
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
                  <Box
                    direction="col"
                    gap={4}
                    className="max-w-xl px-0 md:p-8"
                  >
                    <h1 className="text-text text-[1.75rem] md:text-[2rem]">
                      {tagline}
                    </h1>
                    <p className="max-w-[26rem] text-[1rem] md:text-[1.125rem] leading-relaxed text-text">
                      {subheader}
                    </p>
                    <EmailForm
                      labelBgClassName="bg-background"
                      buttonText="Subscribe"
                    />
                  </Box>
                </Box>
              </div>
            </RiveAnimation>
          </div>
        </div>
      </Container>
    </Section>
  );
}
