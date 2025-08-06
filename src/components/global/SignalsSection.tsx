'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { RiveAnimation } from './RiveAnimation';
import { Fit, Alignment } from '@rive-app/react-webgl2';
import { EmailForm } from '../forms/EmailForm';
import { CarouselWithDots } from '../ui/carousel-with-dots';
import { TestimonialBox } from '../studio/TestimonialBox';
import { useEffect, useState } from 'react';
import { InView } from '../ui/in-view';
import { ZAPIER_WEBHOOK_URL } from '@/lib/constants';
import { useTestimonials } from '@/hooks/useTestimonials';

interface SignalsSectionProps {
  logoRoute?: string;
  tagline?: string;
  subheader?: string;
  testimonials?: Array<{
    quote: string;
    reviewer: string;
    position: string;
    sys: {
      id: string;
    };
  }>;
}

export function SignalsSection({
  logoRoute = '/signalsLogo.svg',
  tagline = 'Signals is a newsletter you’ll actually want to read',
  subheader = 'Sharp takes on business, design, and tech. No fluff, just the takeaways you need.',
  testimonials = []
}: SignalsSectionProps = {}) {
  const [isMobile, setIsMobile] = useState(false);
  // Add a key to force re-render
  const [key, setKey] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const { testimonials: fetchedTestimonials, loading } = useTestimonials();

  const allTestimonials = testimonials.length > 0 ? testimonials : fetchedTestimonials;

  // Force initial check for mobile on component mount
  useEffect(() => {
    // Initial check for mobile - run immediately
    const width = window.innerWidth;
    setWindowWidth(width);
    const mobileCheck = width <= 460;
    setIsMobile(mobileCheck);
    console.log('Initial width check:', width, 'isMobile:', mobileCheck);
    setKey(Date.now()); // Force a re-render with a unique key
  }, []);

  // Set up resize listener
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      const newIsMobile = width <= 460;

      console.log('Resize width check:', width, 'isMobile:', newIsMobile);

      if (isMobile !== newIsMobile) {
        setIsMobile(newIsMobile);
        setKey(Date.now()); // Force a re-render with a unique key
        console.log('Mobile state changed to:', newIsMobile);
      }
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  return (
    <Section
      id="signals-section"
      className="optimize-gpu w-full overflow-hidden py-20 md:py-[120px]"
    >
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed right-0 top-0 z-50 bg-black p-2 text-xs text-white opacity-80">
          <div>Width: {windowWidth}px</div>
          <div>isMobile: {isMobile ? 'true' : 'false'}</div>
          <div>Rive: {isMobile ? 'border-mobile.riv' : 'border.riv'}</div>
          <div>Artboard: {isMobile ? 'Border 2' : 'Default'}</div>
          <div>Key: {key}</div>
        </div>
      )}
      <Container className="py-12 md:py-20">
        <div className="flex justify-center">
          <div className={`relative ${isMobile ? 'h-[926px] w-[428px]' : 'h-[750px] w-[1440px]'}`}>
            <RiveAnimation
              key={`rive-animation-${key}-${isMobile ? 'mobile' : 'desktop'}`}
              src={isMobile ? '/border-mobile.riv' : '/border.riv'}
              artboard={isMobile ? 'Border 2' : undefined}
              width={isMobile ? 428 : 1440}
              height={isMobile ? 926 : 750}
              fit={Fit.Contain}
              alignment={Alignment.Center}
              className="absolute inset-0"
            >
              <div className="relative flex h-full w-full items-center justify-center px-0 md:px-[120px]">
                <Box
                  direction="col"
                  className="w-full justify-between space-y-8 md:flex-row md:space-y-0"
                >
                  <div className="relative flex w-full justify-center md:w-fit md:justify-start md:pl-20">
                    <div
                      className="h-[200px] w-[300px] bg-text md:h-[300px] md:w-[300px]"
                      style={{
                        WebkitMaskImage: `url(${logoRoute})`,
                        maskImage: `url(${logoRoute})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center'
                      }}
                    />
                  </div>
                  <Box direction="col" gap={4} className="w-full px-8 md:max-w-xl md:p-8 md:px-0">
                    <h1 className="tracking-[-0.045rem] md:text-[2.25rem]">{tagline}</h1>
                    <p className="leading-[140%] text-text">{subheader}</p>
                    <EmailForm
                      className="w-full max-w-[438px] dark:text-text"
                      buttonText="Subscribe"
                      variant="button"
                      labelBgClassName="bg-background dark:bg-background blue:bg-text text-text dark:text-white blue:text-maticblack"
                      buttonBgClassName="text-text dark:text-maticblack dark:bg-maticblack blue:text-maticblack bg-background hover:bg-maticblack hover:text-background"
                      webhookUrl={ZAPIER_WEBHOOK_URL}
                      source="website_signals"
                      onSubmit={async (data) => {
                        // Optional additional handling after webhook submission
                        console.log('Signals subscription:', data.email);
                      }}
                    />
                  </Box>
                </Box>
              </div>
            </RiveAnimation>
          </div>
        </div>
      </Container>
      <InView>
        {allTestimonials.length > 0 && !loading && (
          <div className="w-full py-20 md:py-[120px]">
            <div className="w-full">
              <CarouselWithDots itemCount={allTestimonials.length} inverted center>
                {allTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.sys.id}
                    className="min-w-0 flex-[0_0_80%] px-2 md:flex-[0_0_35%] md:pl-6 md:pr-0"
                  >
                    <div className="mx-auto w-[280px] md:w-auto">
                      <TestimonialBox
                        quote={testimonial.quote}
                        name={testimonial.reviewer}
                        position={testimonial.position}
                      />
                    </div>
                  </div>
                ))}
              </CarouselWithDots>
            </div>
          </div>
        )}
      </InView>
    </Section>
  );
}
