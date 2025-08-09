'use client';

import { type Engage } from '@/types';
import { Container, Section } from '@/components/global/matic-ds';
import { CarouselWithDots } from '@/components/ui/carousel-with-dots';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface EngageSectionProps {
  engageItems: Engage[];
}

export function EngageSection({ engageItems }: EngageSectionProps) {
  return (
    <Section className="relative z-[1] overflow-hidden border-none py-24">
      <Container>
        <div className="absolute inset-0 z-0 bg-[var(--foreground)]" />
        <h2 className="mb-24 font-chalet-newyork text-text">Other ways to engage.</h2>
      </Container>

      <CarouselWithDots
        itemCount={engageItems.length}
        inverted={true}
        showDots={false}
        autoplayDelay={6000}
        center={true}
      >
        {[...engageItems].reverse().map((way) => (
          <div
            key={way.sys.id}
            className="mr-4 h-full w-[280px] border border-text md:mr-[3.5625rem] md:min-w-[573px]"
          >
            <div className="flex flex-col gap-8 p-8 md:flex-row">
              <div className="relative min-h-[400px] w-full md:min-h-[438px] md:w-[198px]">
                {way.bannerImage?.url && (
                  <Image
                    src={way.bannerImage.url}
                    alt={way.engagementHeader ?? ''}
                    fill
                    className="rounded-none border-none object-cover"
                  />
                )}
              </div>
              <div className="justify-center space-y-4 md:flex-1">
                <div className="flex h-full flex-col justify-center space-y-4">
                  <h3 className="font-chalet-newyork text-text">{way.engagementHeader}</h3>
                  <p className="whitespace-pre-wrap text-base leading-relaxed text-text/80">
                    {way.engagementCopy}
                  </p>
                  {way.engagementLink && (
                    <Button asChild variant="default" className="w-fit">
                      <Link href={way.engagementLink}>{way.signUpCopy}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CarouselWithDots>
    </Section>
  );
}
