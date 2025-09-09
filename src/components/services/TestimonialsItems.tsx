'use client';

import React from 'react';
import { CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel';
import { Box } from '@/components/global/matic-ds';
import Image from 'next/image';
import type { Testimonial } from '@/types/contentful';

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsItems({ testimonials }: Props) {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  if (!testimonials || testimonials.length === 0) {
    return (
      <CarouselContent>
        <CarouselItem>
          <Box direction="col" className="min-h-[27rem] items-center justify-center pt-16">
            <p className="text-lg text-text/60">No testimonials available at this time.</p>
          </Box>
        </CarouselItem>
      </CarouselContent>
    );
  }

  return (
    <CarouselContent className="pr-[8%] sm:pr-[12%] md:pr-[15%] lg:pr-[20%]">
      {testimonials.map((testimonial, index) => {
        const isActive = index === selectedIndex;
        const isNext = index === (selectedIndex + 1) % testimonials.length;
        const opacityClass = isActive ? 'opacity-100' : isNext ? 'opacity-60' : 'opacity-100';
        return (
          <CarouselItem
            key={testimonial.sys.id}
            className={`basis-[92%] transition-opacity duration-300 sm:basis-[88%] md:basis-[85%] lg:basis-[80%] ${opacityClass}`}
          >
            <Box direction="col" className="min-h-[27rem] justify-between pt-16">
              <blockquote className="border-none pl-0 text-[1.25rem] font-normal not-italic text-text md:w-[40.25rem] md:text-[2.25rem]">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <Box direction="col" className="">
                <p className="text-base font-semibold leading-[160%] tracking-[-0.0125rem] text-text md:text-[1.25rem]">
                  {testimonial.reviewer}
                </p>
                <p className="text-base font-normal leading-[160%] tracking-[-0.0125rem] text-text md:text-[1.25rem]">
                  {testimonial.position}
                </p>
                <Image
                  src="/ratings.svg"
                  alt="ratings"
                  width={107}
                  height={18}
                  className="rounded-none border-none"
                />
              </Box>
            </Box>
          </CarouselItem>
        );
      })}
    </CarouselContent>
  );
}
