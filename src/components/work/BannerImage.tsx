'use client';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { type BannerImage as BannerImageType } from '@/types/contentful';
import dynamic from 'next/dynamic';
import type { ContentfulAsset } from '@/types/contentful';

// Dynamically import Lottie component to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false
});

// Define a type for Lottie animation data
type LottieAnimationData = Record<string, unknown>;

interface BannerImageProps {
  name: string;
  content: BannerImageType['content'];
  sectionColor?: string;
}

// Helper function to determine media type
const getMediaType = (content?: ContentfulAsset): 'video' | 'lottie' | 'image' | 'none' => {
  if (!content?.url) return 'none';
  
  const url = content.url.toLowerCase();
  if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) return 'video';
  if (url.endsWith('.json')) return 'lottie';
  return 'image';
};

export function BannerImage({ name, content, sectionColor }: BannerImageProps) {
  // State for Lottie animations
  const [lottieData, setLottieData] = useState<LottieAnimationData | null>(null);
  const [isLoadingLottie, setIsLoadingLottie] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Memoize the media type to avoid recalculating it
  const mediaType = useMemo(() => getMediaType(content), [content]);
  
  // Track client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Reset Lottie states when content changes
  useEffect(() => {
    setLottieData(null);
    setIsLoadingLottie(false);
    setLottieError(false);
  }, [content]);
  
  // Load Lottie animation on client side
  useEffect(() => {
    if (!isMounted || mediaType !== 'lottie' || !content?.url) return;
    
    setIsLoadingLottie(true);
    
    fetch(content.url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch Lottie animation: ${response.status}`);
        }
        return response.json();
      })
      .then((data: LottieAnimationData) => {
        setLottieData(data);
        setIsLoadingLottie(false);
      })
      .catch(error => {
        console.error('Error loading Lottie animation:', error);
        setIsLoadingLottie(false);
        setLottieError(true);
      });
  }, [mediaType, content?.url, isMounted]);

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
            {isLoadingLottie && (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <p className="text-lg">Loading animation...</p>
              </div>
            )}
            
            {lottieError && (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <p className="text-lg text-red-500">Failed to load animation</p>
              </div>
            )}
            
            {!isLoadingLottie && !lottieError && lottieData && (
              <Lottie
                animationData={lottieData}
                loop={true}
                autoplay={true}
                className="h-full w-full object-cover"
                aria-label={content.description ?? name}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
