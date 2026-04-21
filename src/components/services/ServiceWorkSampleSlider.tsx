'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Work } from '@/types/contentful';
import { InfiniteSlider } from '@/components/ui/infinite-slider';

interface ServiceWorkSampleSliderProps {
  workSamples: Work[];
  className?: string;
}

export function ServiceWorkSampleSlider({
  workSamples,
  className = ''
}: ServiceWorkSampleSliderProps) {
  if (!workSamples || workSamples.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <InfiniteSlider duration={50} gap={20} className="py-4">
        {workSamples.map((work, index) => {
          // Use sliderAsset if available, otherwise fall back to homepageMedia or featuredImage
          const slideMedia = work.sliderAsset ?? work.homepageMedia ?? work.featuredImage;
          const isVideo = slideMedia?.contentType?.startsWith('video/');
          const isRestricted = work.workSampleStatus === 'Coming Soon' || work.workSampleStatus === 'NDA';
          const statusText = work.workSampleStatus === 'Coming Soon' ? 'Coming Soon' : work.workSampleStatus === 'NDA' ? 'NDA' : '';

          const slideContent = (
            <div className="relative h-[29.625rem] overflow-hidden rounded-lg">
              {/* Main slide media - video or image */}
              {slideMedia && (
                <>
                  {isVideo ? (
                    <video
                      src={slideMedia.url}
                      className="h-full w-full border-none object-cover"
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
                      className="border-none object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      priority
                    />
                  )}
                </>
              )}

              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Client logo - top left */}
              {(work.sliderLogo || work.logo) && (work.sliderLogo?.url || work.logo?.url) && (
                <div className="absolute left-6 top-6 md:left-8 md:top-8 max-w-[50%]">
                  <Image
                    src={work.sliderLogo?.url || work.logo?.url || ''}
                    alt={(work.sliderLogo?.title || work.logo?.title) || work.clientName}
                    width={400}
                    height={120}
                    className="h-auto w-full rounded-none border-none object-contain object-left"
                    priority={false}
                  />
                </div>
              )}

              {/* Bottom left content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="max-w-md">
                  <div className="flex flex-col gap-2">
                    {isRestricted && (
                      <div className="inline-flex w-fit rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                        <span className="text-sm font-medium text-white">
                          {statusText}
                        </span>
                      </div>
                    )}
                    {work.sliderCopy && (
                      <h3 className="text-xl font-normal text-white md:text-2xl">
                        {work.sliderCopy}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );

          return (
            <div key={`${work.sys.id}-${index}`} style={{ width: '25.75rem' }}>
              {isRestricted ? (
                slideContent
              ) : (
                <Link href={`/work/${work.slug}`} className="block">
                  {slideContent}
                </Link>
              )}
            </div>
          );
        })}
      </InfiniteSlider>
    </div>
  );
}
