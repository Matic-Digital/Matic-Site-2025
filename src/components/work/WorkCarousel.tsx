'use client';

import { type WorkCarousel } from '@/types/contentful';
import { Box, Container } from '@/components/global/matic-ds';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';

interface WorkCarouselProps extends WorkCarousel {
  sectionColor: string;
}

export function WorkCarousel({ contentCollection, sectionColor }: WorkCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const items = contentCollection.items;

  useEffect(() => {
    if (!api) return;

    // Set up automatic scrolling
    const timer = setInterval(() => {
      api.scrollNext();
    }, 3000);

    // Clean up on unmount
    return () => clearInterval(timer);
  }, [api]);

  return (
    <div className="w-full overflow-hidden">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
          duration: 4000,
          containScroll: false,
          watchDrag: false
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {[...items, ...items].map((asset, index) => (
            <CarouselItem 
              key={`${asset.url}-${index}`} 
              className="max-w-fit shrink-0"
            >
              <div className="h-[300px] flex items-center justify-center px-2">
                {asset.contentType.startsWith('video/') ? (
                  <video autoPlay muted loop playsInline className="h-full w-auto object-contain">
                    <source src={asset.url} type={asset.contentType} />
                  </video>
                ) : (
                  <Image
                    src={asset.url}
                    alt={index.toString()}
                    width={533}
                    height={300}
                    className="h-full w-auto object-contain border-none rounded-none"
                    priority={index === 0}
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
