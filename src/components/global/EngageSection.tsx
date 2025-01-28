import { type Engage } from '@/types';
import { Container, Section } from '@/components/global/matic-ds';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface EngageSectionProps {
  engageItems: Engage[];
}

export function EngageSection({ engageItems }: EngageSectionProps) {
  const logoSrc = '/BG-elements.svg';
  return (
    <Section className="border-none relative z-[1] overflow-hidden py-24">
      <div className="absolute inset-0 z-0 bg-[#041782]" />
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src={logoSrc}
            alt="Background element"
            fill
            className="object-cover object-center border-none rounded-none blur-lg scale-150 opacity-70"
            priority
          />
        </div>
      </div>
      <Container className="relative z-[2]">
        <h2 className="text-background mb-24">Other ways to engage.</h2>
      </Container>

      <div className="relative w-full z-[3]">
        <Carousel
          opts={{
            align: 'start',
            slidesToScroll: 1,
            dragFree: true,
          }}
          className="w-full overflow-visible"
        >
          <CarouselContent className="-ml-4 gap-8 items-center ">
            {engageItems.reverse().map((way) => (
              <CarouselItem key={way.sys.id} className="pl-4 md:basis-[800px] md:max-w-[600px]">
                <div className="border border-[#2F44B0] p-8 h-full flex items-center justify-center">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="relative w-12 w-full md:w-[197px] md:h-[438px] flex-shrink-0">
                      {way.bannerImage?.url && (
                        <Image
                          src={way.bannerImage.url}
                          alt={way.engagementHeader ?? ''}
                          fill
                          className="object-cover rounded-none border-none"
                        />
                      )}
                    </div>
                    <div className="space-y-4 flex-grow flex flex-col justify-center">
                      <div className="space-y-8 flex flex-col">
                        <h3 className="text-background text-3xl font-medium">{way.engagementHeader}</h3>
                        <div className="space-y-4">
                          <p className="text-background/80 text-lg leading-relaxed whitespace-pre-wrap max-w-xl">
                            {way.engagementCopy}
                          </p>
                        </div>
                        <Link href={way.engagementLink} className="">
                          <Button variant="secondary" className="">
                            {way.signUpCopy}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Section>
  );
}
