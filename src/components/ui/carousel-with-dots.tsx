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
  showDots?: boolean;
  spacing?: string;
  center?: boolean;
  direction?: 'ltr' | 'rtl';
  reverse?: boolean;
}

export function CarouselWithDots({
  children,
  itemCount,
  inverted = false,
  autoplayDelay = 4000,
  showDots = true,
  center = false,
  reverse = false
}: CarouselWithDotsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: center ? 'center' : 'start',
      containScroll: false,
      loop: true,
      skipSnaps: false,
      slidesToScroll: 1,
      startIndex: 0,
      direction: reverse ? 'rtl' : 'ltr'
    },
    [
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true
      })
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const currentSnap = emblaApi.selectedScrollSnap();
    const itemCount = Array.isArray(children) ? children.length : 0;
    const index = currentSnap % itemCount;
    setCurrentIndex(index);
  }, [emblaApi, children]);

  const scrollTo = useCallback(
    (index: number, isDuplicate = false) => {
      if (!emblaApi) return;
      const itemCount = Array.isArray(children) ? children.length : 0;
      const currentSnap = emblaApi.selectedScrollSnap();
      const currentSet = Math.floor(currentSnap / itemCount);

      // If we're in the first set and clicking a duplicate, move to second set
      if (currentSet === 0 && isDuplicate) {
        emblaApi.scrollTo(itemCount + index);
      }
      // If we're in the second set and clicking an original, move to first set
      else if (currentSet === 1 && !isDuplicate) {
        emblaApi.scrollTo(index);
      }
      // Otherwise stay in current set
      else {
        emblaApi.scrollTo(currentSet * itemCount + index);
      }
    },
    [emblaApi, children]
  );

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
      <div
        className={`w-full overflow-hidden ${center ? 'px-4 md:px-[3.5625rem]' : ''}`}
        ref={emblaRef}
      >
        <div
          className={`backface-hidden flex touch-pan-y ${reverse ? 'flex-row-reverse pr-0.5' : 'pl-0.5'}`}
        >
          {Array.isArray(children) ? (
            <>
              {children.map((child, index) => (
                <div
                  key={`original-${index}`}
                  className={`cursor-pointer transition-opacity duration-300 ${reverse ? 'ml-4' : 'mr-4'} ${
                    index === currentIndex ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                  }`}
                  onClick={() => scrollTo(index, false)}
                >
                  {child}
                </div>
              ))}
              {children.map((child, index) => (
                <div
                  key={`duplicate-${index}`}
                  className={`cursor-pointer transition-opacity duration-300 ${reverse ? 'ml-4' : 'mr-4'} ${
                    index === currentIndex ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                  }`}
                  onClick={() => scrollTo(index, true)}
                >
                  {child}
                </div>
              ))}
            </>
          ) : (
            children
          )}
        </div>
      </div>
      {showDots && (
        <Box className="flex justify-center" gap={2}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex
                  ? inverted
                    ? 'bg-white'
                    : 'bg-black'
                  : inverted
                    ? 'bg-white/40'
                    : 'bg-[#D9D9D9]'
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
