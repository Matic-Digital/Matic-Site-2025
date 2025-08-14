'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Work } from '@/types/contentful';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ServiceWorkSampleSliderProps {
  workSamples: Work[];
  className?: string;
}

export function ServiceWorkSampleSlider({
  workSamples,
  className = ''
}: ServiceWorkSampleSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!workSamples || workSamples.length === 0) {
    return null;
  }

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop={workSamples.length > 1}
        className="work-sample-slider"
      >
        {workSamples.map((work) => {
          // Use homepageMedia if available, otherwise fall back to featuredImage
          const slideMedia = work.homepageMedia ?? work.featuredImage;
          const isVideo = slideMedia?.contentType?.startsWith('video/');

          return (
            <SwiperSlide key={work.sys.id}>
              <div className="relative h-[400px] overflow-hidden rounded-lg md:h-[500px] lg:h-[600px]">
                {/* Main slide media - video or image */}
                {slideMedia && (
                  <>
                    {isVideo ? (
                      <video
                        src={slideMedia.url}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <Image
                        src={slideMedia.url}
                        alt={slideMedia.title || work.clientName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        priority
                      />
                    )}
                  </>
                )}

                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-end justify-between">
                    {/* Description on bottom left */}
                    <div className="max-w-md flex-1">
                      {/*
                        {work.logo && work.logo.url ? (
                          <Image
                            src={work.logo.url}
                            alt={work.logo.title || work.clientName}
                            width={160}
                            height={48}
                            className="mb-2 h-8 w-auto object-contain md:h-10"
                            priority={false}
                          />
                        ) : (
                          <h3 className="mb-2 text-xl font-normal text-white md:text-2xl">
                            {work.clientName}
                          </h3>
                        )}
                      */}
                      <h3 className="mb-2 text-xl font-normal text-white md:text-2xl">
                        {work.clientName}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/90 md:text-base">
                        {work.briefDescription}
                      </p>
                      {work.timeline && (
                        <p className="mt-2 hidden text-xs text-white/70 md:text-sm">
                          {work.timeline}
                        </p>
                      )}
                    </div>

                    {/* Button on bottom right */}
                    <div className="ml-6">
                      <Button
                        asChild
                        variant="default"
                        className="bg-white text-black transition-colors hover:bg-white/90"
                      >
                        <Link href={`/work/${work.slug}`}>View Project</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom navigation buttons - positioned at bottom right */}
      {workSamples.length > 1 && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={handlePrevSlide}
            className="flex h-12 w-12 items-center justify-center transition-opacity hover:opacity-80"
          >
            {/* Left arrow - same as right but rotated 180 degrees */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="19"
              viewBox="0 0 24 19"
              fill="none"
              style={{ transform: 'rotate(180deg)' }}
            >
              <g clipPath="url(#clip0_3126_1228_left)">
                <path
                  d="M23.7474 8.60796L15.6884 0.275251C15.3347 -0.0904482 14.7789 -0.0904482 14.4505 0.275251C14.0968 0.64095 14.0968 1.21562 14.4505 1.5552L21.0189 8.34675H0.884211C0.404211 8.34675 0 8.76469 0 9.261C0 9.7573 0.404211 10.1752 0.884211 10.1752H20.9937L14.4253 16.9668C14.0716 17.3325 14.0716 17.9072 14.4253 18.2467C14.6021 18.4296 14.8295 18.508 15.0568 18.508C15.2842 18.508 15.5116 18.4296 15.6884 18.2467L23.7474 9.91403C23.9242 9.73118 24 9.52221 24 9.261C24 8.99978 23.8989 8.79081 23.7474 8.60796Z"
                  fill="#000227"
                />
              </g>
              <defs>
                <clipPath id="clip0_3126_1228_left">
                  <rect width="24" height="18.507" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button
            onClick={handleNextSlide}
            className="flex h-12 w-12 items-center justify-center transition-opacity hover:opacity-80"
          >
            {/* Active right arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="19"
              viewBox="0 0 24 19"
              fill="none"
            >
              <g clipPath="url(#clip0_3126_1228)">
                <path
                  d="M23.7474 8.60796L15.6884 0.275251C15.3347 -0.0904482 14.7789 -0.0904482 14.4505 0.275251C14.0968 0.64095 14.0968 1.21562 14.4505 1.5552L21.0189 8.34675H0.884211C0.404211 8.34675 0 8.76469 0 9.261C0 9.7573 0.404211 10.1752 0.884211 10.1752H20.9937L14.4253 16.9668C14.0716 17.3325 14.0716 17.9072 14.4253 18.2467C14.6021 18.4296 14.8295 18.508 15.0568 18.508C15.2842 18.508 15.5116 18.4296 15.6884 18.2467L23.7474 9.91403C23.9242 9.73118 24 9.52221 24 9.261C24 8.99978 23.8989 8.79081 23.7474 8.60796Z"
                  fill="#000227"
                />
              </g>
              <defs>
                <clipPath id="clip0_3126_1228">
                  <rect width="24" height="18.507" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      )}

      <style jsx global>{`
        .work-sample-slider .swiper-slide {
          height: auto;
        }
      `}</style>
    </div>
  );
}
