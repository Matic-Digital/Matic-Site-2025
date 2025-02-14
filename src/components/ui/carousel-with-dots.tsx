'use client';

import { Box } from '../global/matic-ds';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface CarouselWithDotsProps {
  children: React.ReactNode;
  itemCount: number;
  inverted?: boolean;
  autoplayDelay?: number;
}

export function CarouselWithDots({ 
  children, 
  itemCount, 
  inverted = false,
  autoplayDelay = 4000 
}: CarouselWithDotsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'center',
      containScroll: false,
      loop: true
    },
    [
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <Box direction="col" gap={4}>
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="backface-hidden md:-ml-6 flex touch-pan-y">
          {Array.isArray(children) ? 
            children.map((child, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-opacity duration-300 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                }`}
                onClick={() => scrollTo(index)}
              >
                {child}
              </div>
            ))
            : children
          }
        </div>
      </div>
      <Box className="flex justify-center" gap={2}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex 
                ? (inverted ? 'bg-white' : 'bg-black')
                : (inverted ? 'bg-white/40' : 'bg-[#D9D9D9]')
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </Box>
    </Box>
  );
}
