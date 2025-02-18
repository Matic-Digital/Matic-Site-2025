"use client";

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
    <Section className="border-none relative z-[1] overflow-hidden py-24">
      <Container>
        <div className="absolute inset-0 z-0 bg-[var(--foreground)]" />
        <h2 className="text-text mb-24 font-chalet-newyork">Other ways to engage.</h2>
      </Container>
      
      <CarouselWithDots 
        itemCount={engageItems.length} 
        inverted={true} 
        showDots={false}
        autoplayDelay={6000}
        center={true}
      >
        {[...engageItems].reverse().map((way) => (
          <div key={way.sys.id} className="w-[280px] md:min-w-[573px] border border-text h-full mr-4 md:mr-[3.5625rem]">
            <div className="flex flex-col md:flex-row gap-8 p-8">
              <div className="relative w-full min-h-[400px] md:min-h-[438px] md:w-[198px]">
                {way.bannerImage?.url && (
                  <Image
                    src={way.bannerImage.url}
                    alt={way.engagementHeader ?? ''}
                    fill
                    className="object-cover rounded-none border-none"
                  />
                )}
              </div>
              <div className="space-y-4 md:flex-1 justify-center">
                <div className="space-y-4 flex flex-col h-full justify-center">
                  <h3 className="text-text font-chalet-newyork">{way.engagementHeader}</h3>
                  <p className="text-text/80 text-base leading-relaxed whitespace-pre-wrap">
                    {way.engagementCopy}
                  </p>
                  {way.engagementLink && (
                    <Button asChild variant="default" className="w-fit">
                      <Link href={way.engagementLink}>
                        {way.signUpCopy}
                      </Link>
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
