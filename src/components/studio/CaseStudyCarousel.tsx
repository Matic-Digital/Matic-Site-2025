'use client';

import { type CaseStudyCarousel as CaseStudyCarouselType } from '@/types/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { Box } from '../global/matic-ds';
import { useCallback, useState, useEffect } from 'react';
import { Dot } from 'lucide-react';
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
      <Box direction="col" gap={4}>
        <h1 className="text-[2.5rem] leading-[120%]">{carousel.carouselHeader}</h1>
        {carousel.carouselSubheader && (
          <p className="text-[1rem] max-w-[600px] -mt-2 font-light leading-[160%] ">{carousel.carouselSubheader}
          <a href="/contact" className="text-blue hover:text-blue ml-1">See more here</a>
          </p>
        )}
      </Box>
      <Box direction="col" gap={4}>
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="backface-hidden -ml-4 flex touch-pan-y">
            {items.map((item, index) => (
              <div
                key={item.sys.id}
                className="relative min-h-[532px] min-w-0 flex-[0_0_100%] bg-[#F8F9FC] pl-4"
              >
                <Box direction="row" className="h-full">
                  <Box className="flex-grow justify-end p-12" direction="col" gap={4}>
                    <Box className="" direction="col" gap={2}>
                      <h2 className="text-[1rem]">{item.sampleReference.sector}</h2>
                      <h1 className="text-[1.75rem]">{item.sampleReference.clientName}</h1>
                    </Box>
                    <p className="max-w-md">{item.sampleReference.briefDescription}</p>
                    <Link href={`/work/${item.sampleReference.slug}`}>
                      <Button>View case study</Button>
                    </Link>
                  </Box>
                  <div className="relative h-full w-[800px]">
                    <Image
                      src={item.previewAsset.url}
                      alt={item.name}
                      fill
                      className="rounded-none border-none object-contain"
                      priority
                    />
                  </div>
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
