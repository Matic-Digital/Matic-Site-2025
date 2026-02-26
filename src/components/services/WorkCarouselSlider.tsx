'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@/components/global/matic-ds';

interface WorkSample {
  sys: {
    id: string;
  };
  clientName: string;
  slug: string;
  briefDescription: string;
  snippetColor?: {
    value: string;
  };
  logo?: {
    url: string;
  };
}

interface WorkCarouselSliderProps {
  samples: WorkSample[];
}

export default function WorkCarouselSlider({ samples }: WorkCarouselSliderProps) {
  // Duplicate samples to ensure smooth infinite looping
  const duplicatedSamples = [...samples, ...samples];
  
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={1.3}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      speed={800}
      watchSlidesProgress={true}
      breakpoints={{
        640: {
          slidesPerView: 2.3,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3.3,
          spaceBetween: 20
        }
      }}
      className="w-full"
    >
      {duplicatedSamples.map((sample, index) => (
        <SwiperSlide key={`${sample.sys.id}-${index}`} className="aspect-[4/3]">
          <Link href={`/work/${sample.slug}`} className="block h-full w-full">
            <div
              style={{ backgroundColor: sample.snippetColor?.value ?? '#000000' }}
              className="h-full w-full rounded-[0.5rem] p-[2rem]"
            >
              <Box direction="col" className="h-full justify-between">
                <p className="whitespace-normal break-words text-text dark:text-background">
                  {sample.briefDescription}
                </p>
                <Image
                  src={sample.logo?.url ?? ''}
                  alt={sample.clientName}
                  width={176}
                  height={40}
                  className="h-[2.5rem] w-auto self-start rounded-none border-none object-contain brightness-0"
                />
              </Box>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
