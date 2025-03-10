'use client';

import { Box } from '@/components/global/matic-ds';
import { useCarousel } from '@/components/ui/carousel';
import Image from 'next/image';

export function CarouselNavigation() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <Box className="absolute right-0 top-0 z-10 flex gap-1">
      <button
        className="flex h-10 w-10 items-center justify-center disabled:opacity-50"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <div className="relative h-6 w-6 rotate-180 transform">
          <Image 
            src="/Layer_1.svg" 
            alt="Previous" 
            fill 
            className="object-contain border-none rounded-none"
          />
        </div>
      </button>
      <button
        className="flex h-10 w-10 items-center justify-center disabled:opacity-50"
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <div className="relative h-6 w-6">
          <Image 
            src="/Layer_1.svg" 
            alt="Next" 
            fill 
            className="object-contain border-none rounded-none"
          />
        </div>
      </button>
    </Box>
  );
}
