'use client';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { type BannerImage as BannerImageType } from '@/types/contentful';
import dynamic from 'next/dynamic';
import type { ContentfulAsset } from '@/types/contentful';

// Dynamically import Lottie component to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { DotLottiePlayer } from '@dotlottie/react-player';

// Define a type for Lottie animation data
type LottieAnimationData = Record<string, unknown>;

interface BannerImageProps {
  name: string;
  content: BannerImageType['content'];
  lottieUrl?: string;
  sectionColor?: string;
}

// Helper function to determine media type
const getMediaType = (content?: ContentfulAsset, lottieUrl?: string): 'video' | 'lottie' | 'image' | 'none' => {
  // Check lottieUrl first - if present, prioritize it
  if (lottieUrl) {
    const url = lottieUrl.toLowerCase();
    if (url.endsWith('.json') || url.endsWith('.lottie') || url.includes('lottie.host')) return 'lottie';
  }
  
  if (!content?.url) return 'none';

  const url = content.url.toLowerCase();
  if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) return 'video';
  if (url.endsWith('.json') || url.endsWith('.lottie') || url.includes('lottie.host')) return 'lottie';
  return 'image';
};

export function BannerImage({ name, content, lottieUrl, sectionColor }: BannerImageProps) {
  // State for Lottie animations
  const [lottieData, setLottieData] = useState<LottieAnimationData | null>(null);
  const [isLoadingLottie, setIsLoadingLottie] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Memoize the media type to avoid recalculating it
  const mediaType = useMemo(() => getMediaType(content, lottieUrl), [content, lottieUrl]);

  // Track client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset Lottie states when content or lottieUrl changes
  useEffect(() => {
    setLottieData(null);
    setIsLoadingLottie(false);
    setLottieError(false);
  }, [content, lottieUrl]);

  // Load Lottie animation on client side
  useEffect(() => {
    if (!isMounted || mediaType !== 'lottie') return;

    // Determine the URL to use - prioritize lottieUrl
    const urlToUse = lottieUrl ?? content?.url;
    if (!urlToUse) return;

    // Skip JSON loading for lottie.host URLs - use DotLottiePlayer directly
    if (urlToUse.includes('lottie.host')) {
      setIsLoadingLottie(false);
      return;
    }

    setIsLoadingLottie(true);

    fetch(urlToUse)
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
  }, [mediaType, content?.url, lottieUrl, isMounted]);

  return (
    <section
      style={{
        backgroundColor: sectionColor
      }}
      className="relative flex items-center justify-center"
    >
      <div className="relative aspect-video w-full">
        {mediaType === 'video' && (
          <video
            src={content.url}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full rounded-none border-none object-cover"
            aria-label={content.description ?? name}
          />
        )}

        {mediaType === 'image' && (
          <Image
            src={content.url}
            alt={content.description ?? name}
            fill
            className="rounded-none border-none object-cover"
          />
        )}

        {mediaType === 'lottie' && isMounted && (
          <div className="absolute inset-0 h-full w-full">
            {(() => {
              const urlToUse = lottieUrl ?? content?.url;
              if (!urlToUse) return null;

              // Check if this is a lottie.host URL - use DotLottiePlayer
              const isLottieHostUrl = urlToUse.includes('lottie.host');
              
              if (isLottieHostUrl) {
                // Convert URL to .lottie format if needed
                let lottieUrlFormatted = urlToUse;
                if (urlToUse.includes('.json')) {
                  lottieUrlFormatted = urlToUse.replace('.json', '.lottie');
                }
                
                return (
                  <DotLottiePlayer
                    src={lottieUrlFormatted}
                    autoplay
                    loop
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    style={{
                      width: '100% !important',
                      height: '100% !important',
                      minWidth: '100%',
                      minHeight: '100%',
                      objectFit: 'cover',
                      margin: 0,
                      padding: 0
                    }}
                  />
                );
              }

              // Handle regular Lottie animations
              if (isLoadingLottie) {
                return (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
                  </div>
                );
              }

              if (lottieError) {
                return (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <p className="text-gray-500">Failed to load animation</p>
                  </div>
                );
              }

              if (lottieData) {
                return (
                  <Lottie
                    animationData={lottieData}
                    loop={true}
                    autoplay={true}
                    style={{
                      width: '100% !important',
                      height: '100% !important',
                      minWidth: '100%',
                      minHeight: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      maxWidth: 'none',
                      margin: 0,
                      padding: 0
                    }}
                    className="rounded-none border-none p-0 w-full h-full"
                    rendererSettings={{
                      preserveAspectRatio: 'xMinYMin slice'
                    }}
                  />
                );
              }

              return (
                <div className="flex h-full w-full items-center justify-center bg-gray-50">
                  <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
