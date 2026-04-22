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
    <>
      <style jsx global>{`
        .work-carousel-slider .swiper-wrapper {
          align-items: stretch;
        }
        .work-carousel-slider .swiper-slide {
          height: auto;
        }
      `}</style>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView="auto"
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        speed={800}
        watchSlidesProgress={true}
        className="w-full work-carousel-slider"
      >
      {duplicatedSamples.map((sample, index) => (
        <SwiperSlide key={`${sample.sys.id}-${index}`} style={{ width: '25.6875rem' }} className="!h-full">
          <Link href={`/work/${sample.slug}`} className="block h-full">
            <div
              style={{ backgroundColor: sample.snippetColor?.value ?? '#000000' }}
              className="h-full min-h-[19.25rem] w-full rounded-[0.5rem] p-[2rem]"
            >
              <Box direction="col" className="flex h-full min-h-full flex-col justify-between">
                <p className="line-clamp-4 whitespace-normal break-words text-xl dark:text-background pb-[5.5rem]">
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
    </>
  );
}
