'use client';

import type { WorkTactics as WorkTacticsType } from '@/types';
import type { ContentfulAsset } from '@/types/contentful';
import Image from 'next/image';
import { Box, Container, Section } from '../global/matic-ds';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie component to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Helper function to determine media type
const getMediaType = (asset?: ContentfulAsset) => {
  if (!asset?.url) return 'none';

  const url = asset.url.toLowerCase();
  if (url.endsWith('.mp4')) return 'video';
  if (url.endsWith('.json')) return 'lottie';
  return 'image';
};

// Define a type for Lottie animation data
type LottieAnimationData = Record<string, unknown>;

export function WorkTactics({ tactics, tacticsImage }: WorkTacticsType) {
  const [lottieData, setLottieData] = useState<LottieAnimationData | null>(null);
  const [isLoadingLottie, setIsLoadingLottie] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Memoize the media type to avoid recalculating it
  const mediaType = useMemo(() => getMediaType(tacticsImage), [tacticsImage]);

  // Use this to track client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Reset states when tacticsImage changes
    setLottieData(null);
    setLottieError(false);
    setIsLoadingLottie(false);

    if (mediaType === 'lottie' && tacticsImage?.url) {
      setIsLoadingLottie(true);
      fetch(tacticsImage.url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch Lottie animation: ${response.status}`);
          }
          return response.json();
        })
        .then((data: LottieAnimationData) => {
          setLottieData(data);
          setIsLoadingLottie(false);
        })
        .catch((error) => {
          console.error('Error loading Lottie animation:', error);
          setIsLoadingLottie(false);
          setLottieError(true);
        });
    }
  }, [tacticsImage, mediaType, isMounted]);
  return (
    <Section className="flex flex-col md:flex-row md:items-center">
      <Container className="mb-[2.25rem] md:sticky md:top-60 md:mb-[2.25rem] md:w-[18.125rem]">
        <Box gap={{ base: 8, sm: 8, md: 2 }} direction={{ sm: 'row', md: 'col' }} className="">
          <h2 className="font-sans text-[0.875rem] uppercase leading-[160%] opacity-40">Tactics</h2>
          <ul className="m-0 flex w-full list-none flex-col gap-2">
            {tactics.map((tactic, index) => (
              <li key={index} className="text-[1.125rem] font-light leading-[140%]">
                {tactic}
              </li>
            ))}
          </ul>
        </Box>
      </Container>

      {/* Helper function to render the appropriate media based on type */}
      {tacticsImage && (
        <div className="relative h-[300px] w-full max-w-[1100px] sm:h-[400px] md:h-[810px]">
          {mediaType === 'video' && (
            <video
              src={tacticsImage.url}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full rounded-none border-none object-cover"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                maxWidth: 'none'
              }}
              preload="auto"
              poster={tacticsImage.url.replace('.mp4', '.jpg')}
            />
          )}

          {mediaType === 'lottie' && (
            <div className="h-full w-full overflow-hidden">
              {!isMounted || isLoadingLottie ? (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
                </div>
              ) : lottieError ? (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <p className="text-gray-500">Failed to load animation</p>
                </div>
              ) : lottieData ? (
                <Lottie
                  animationData={lottieData}
                  loop={true}
                  autoplay={true}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    maxWidth: 'none'
                  }}
                  className="rounded-none border-none"
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice'
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-50">
                  <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                </div>
              )}
            </div>
          )}

          {(mediaType === 'image' || mediaType === 'none') && (
            <Image
              src={tacticsImage.url}
              alt={tacticsImage.description || 'Tactics illustration'}
              fill
              className="rounded-none border-none object-cover"
            />
          )}
        </div>
      )}
    </Section>
  );
}
