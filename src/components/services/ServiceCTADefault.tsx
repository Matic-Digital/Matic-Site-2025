'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface ServiceCTADefaultProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function ServiceCTADefault({ title, description, buttonText, buttonLink }: ServiceCTADefaultProps) {
  if (!title && !description) {
    return null;
  }

  const ctaButtonText = buttonText || 'Contact us';
  const ctaButtonLink = buttonLink || '/contact';

  return (
    <Section className="bg-maticblack py-24">
      <Container>
        <div className="relative w-full overflow-hidden rounded-lg bg-[#060EC2] px-8 py-12 md:px-16 md:py-16">
          {/* Blue box background SVG */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/default-service-cta-bg.svg"
              alt=""
              fill
              className="rounded-none border-none object-cover"
            />
          </div>
          <Box direction={{ base: 'col', lg: 'row' }} className="relative z-10 gap-8 items-stretch">
            {/* Left side - Title, Description, and Button stacked */}
            <Box direction="col" className="lg:flex-1">
              <div className="flex flex-col gap-[2.5rem]">
                {title && (
                  <h2 className="text-[2rem] text-white leading-[140%]" style={{ fontWeight: 400 }}>
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="max-w-3xl text-[1.25rem] text-white leading-[140%]" style={{ fontWeight: 400 }}>
                    {description}
                  </p>
                )}
              </div>
              <Link href={ctaButtonLink} className="mt-[2rem]">
                <Button
                  variant="default"
                  className="w-fit rounded-sm border-2 border-white bg-white px-6 py-3 text-maticblack hover:bg-transparent hover:text-white"
                >
                  {ctaButtonText}
                </Button>
              </Link>
            </Box>

            {/* Right side - Static Card with Background Image */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-lg bg-maticblack p-8 min-h-[27.53906rem] lg:max-w-[26.75rem]">
              {/* Background SVG */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/default-service-cta-card.svg"
                  alt=""
                  fill
                  className="rounded-none border-none object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex flex-col gap-4">
                  <p className="text-[1rem] font-semibold uppercase tracking-wider text-[#076EFF] leading-[100%]" style={{ fontWeight: 600 }}>
                    Insights
                  </p>
                  <p className="text-[1.5rem] text-white leading-[140%]" style={{ fontWeight: 400 }}>
                    What's moving in AI, design, technology, and the industries we serve. From the team building in it.
                  </p>
                </div>

                <Link
                  href="/blog/signals"
                  className="group mt-6 flex items-center gap-2 text-[1.125rem] text-white leading-[140%] transition-colors hover:text-white/90"
                  style={{ fontWeight: 600 }}
                >
                  Explore Signals
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="23" viewBox="0 0 31 23" fill="none" className="transition-transform group-hover:translate-x-1">
                    <g clipPath="url(#clip0_1_854)">
                      <path d="M26.443 9.66602H0V13.0561H26.443V9.66602Z" fill="white"/>
                      <path d="M19.11 22.7257L16.7188 20.3489L25.7637 11.3628L16.7188 2.37675L19.11 0L30.5381 11.3628L19.11 22.7257Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_1_854">
                        <rect width="30.5376" height="22.7257" rx="8" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
            </div>
          </Box>
        </div>
      </Container>
    </Section>
  );
}
