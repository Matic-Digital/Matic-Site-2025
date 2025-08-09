'use client';

import { type CaseStudyCarousel as CaseStudyCarouselType } from '@/types/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Container } from '../global/matic-ds';
import { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '../ui/button';

interface CaseStudyCarouselProps {
  carousel: CaseStudyCarouselType;
}

export function CaseStudyCarousel({ carousel }: CaseStudyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'keepSnaps'
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const items = carousel.carouselContent.items;

  return (
    <Box direction="col" gap={8}>
      <Container>
        <Box direction="col" gap={4}>
          <h1 className="text-[2.5rem] leading-[120%]">{carousel.carouselHeader}</h1>
          {carousel.carouselSubheader && (
            <p className="-mt-2 max-w-[600px] text-[1rem] font-light leading-[160%]">
              {carousel.carouselSubheader}
              <a href="/contact" className="ml-1 text-blue hover:text-blue">
                See more here
              </a>
            </p>
          )}
        </Box>
      </Container>
      <Box direction="col" gap={4}>
        <div
          className="relative w-full overflow-hidden px-0 md:px-[calc((100%-1248px)/2)]"
          ref={emblaRef}
        >
          <div className="backface-hidden flex touch-pan-y justify-start gap-0 md:gap-7">
            {items.map((item, index) => (
              <div
                key={item.sys.id}
                className={`min-w-0 flex-[0_0_100%] cursor-pointer px-4 transition-all duration-300 md:flex-[0_0_1248px] md:px-0 ${
                  index === currentIndex
                    ? ''
                    : 'opacity-30 grayscale hover:opacity-50 hover:grayscale-0'
                }`}
                onClick={() => scrollTo(index)}
              >
                <Box className="h-full min-h-[532px] flex-col overflow-hidden rounded-lg bg-[#F8F9FC] md:flex-row-reverse">
                  <div className="relative order-first h-[300px] md:h-full md:flex-[0_0_800px]">
                    <Image
                      src={item.previewAsset.url}
                      alt={item.name}
                      fill
                      className="rounded-none border-none object-cover"
                      priority
                    />
                  </div>
                  <Box className="flex-grow justify-end p-6 md:p-12" direction="col" gap={4}>
                    <Box className="" direction="col" gap={2}>
                      <h2 className="text-[1rem]">{item.sampleReference.sector}</h2>
                      <h1 className="text-[1.75rem]">{item.sampleReference.clientName}</h1>
                    </Box>
                    <p className="max-w-md">{item.sampleReference.briefDescription}</p>
                    <Link href={`/work/${item.sampleReference.slug}`}>
                      <Button>View case study</Button>
                    </Link>
                  </Box>
                </Box>
              </div>
            ))}
          </div>
        </div>
        <Box className="flex justify-center" gap={3}>
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-black' : 'bg-[#D9D9D9]'
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
