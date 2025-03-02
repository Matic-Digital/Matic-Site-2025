'use client';

import { type WorkCarousel } from '@/types/contentful';
import Image from 'next/image';
import { InfiniteSlider } from '../ui/infinite-slider';

interface WorkCarouselProps extends WorkCarousel {
  sectionColor?: string;
}

export function WorkCarousel({ contentCollection }: WorkCarouselProps) {
  return (
    <>
     <InfiniteSlider duration={50} className='bg-[#111111] p-[2.5rem]'>
      {contentCollection.items.map((item, index) => (
        <div key={index}>
          <Image 
            src={item.url} 
            alt={index.toString()}
            width={index % 2 === 0 ? 533 : 1440}
            height={index % 2 === 0 ? 300 : 900}
            className="rounded-none border-none h-[300px] w-auto object-contain"
          />
        </div>
      ))}
     </InfiniteSlider>
    </>
  );
}
