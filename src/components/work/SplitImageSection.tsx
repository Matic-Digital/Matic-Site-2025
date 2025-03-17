'use client';

import Image from 'next/image';
import { type SplitImageSection as SplitImageSectionType, type ContentfulAsset } from '@/types/contentful';
import { Box, Container, Section } from '../global/matic-ds';
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie component to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface SplitImageSectionProps {
  copy?: string;
  contentCollection: SplitImageSectionType['contentCollection'];
}

// Define a type for Lottie animation data
type LottieAnimationData = Record<string, unknown>;

export function SplitImageSection({ copy, contentCollection }: SplitImageSectionProps) {
  // Helper function to determine media type - moved to top level
  const getMediaType = (item?: ContentfulAsset): 'video' | 'lottie' | 'image' | 'none' => {
    if (!item?.url) return 'none';
    
    const url = item.url.toLowerCase();
    if (url.endsWith('.mp4') || url.endsWith('.webm')) return 'video';
    if (url.endsWith('.json')) return 'lottie';
    return 'image';
  };
  
  // State declarations
  const [isMounted, setIsMounted] = useState(false);
  const [lottieData, setLottieData] = useState<Record<number, LottieAnimationData>>({});
  const [isLoadingLottie, setIsLoadingLottie] = useState<Record<number, boolean>>({});
  const [lottieError, setLottieError] = useState<Record<number, boolean>>({});
  
  // Safe access to content collection items
  const firstImage = contentCollection?.items?.[0];
  const secondImage = contentCollection?.items?.[1];
  
  // Memoize media types - using optional chaining to handle null case
  const mediaTypes = useMemo(() => {
    if (!contentCollection?.items) return [];
    return contentCollection.items.map((item, index) => ({
      index,
      type: getMediaType(item)
    }));
  }, [contentCollection?.items]);
  
  // Track client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Reset all Lottie states when items change
  useEffect(() => {
    // Reset all states
    setLottieData({});
    setIsLoadingLottie({});
    setLottieError({});
  }, [contentCollection?.items]);
  
  // Load Lottie animations on client side
  useEffect(() => {
    if (!isMounted || !contentCollection?.items) return;
    
    const lottieItems = mediaTypes.filter(item => item.type === 'lottie');
    if (lottieItems.length === 0) return;
    
    // Create a new object with loading states for all Lottie items
    const newLoadingState: Record<number, boolean> = {};
    lottieItems.forEach(({ index }) => {
      newLoadingState[index] = true;
    });
    setIsLoadingLottie(newLoadingState);
    
    // Load each Lottie animation
    lottieItems.forEach(({ index }) => {
      const item = contentCollection.items[index];
      if (!item?.url) {
        setIsLoadingLottie(prev => ({ ...prev, [index]: false }));
        setLottieError(prev => ({ ...prev, [index]: true }));
        return;
      }
      
      fetch(item.url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch Lottie animation: ${response.status}`);
          }
          return response.json();
        })
        .then((data: LottieAnimationData) => {
          setLottieData(prev => ({ ...prev, [index]: data }));
          setIsLoadingLottie(prev => ({ ...prev, [index]: false }));
        })
        .catch(error => {
          console.error(`Error loading Lottie animation for index ${index}:`, error);
          setIsLoadingLottie(prev => ({ ...prev, [index]: false }));
          setLottieError(prev => ({ ...prev, [index]: true }));
        });
    });
  }, [mediaTypes, contentCollection?.items, isMounted]);
  
  // Early return after all hooks
  if (!contentCollection?.items || contentCollection.items.length !== 2) {
    return null;
  }

  const MediaContent = ({ item, className, index }: { item: ContentfulAsset | undefined, className?: string, index: number }) => {
    if (!item) return null;
    
    const mediaType = getMediaType(item);
    
    // Handle video media type
    if (mediaType === 'video') {
      return (
        <div className="relative w-full h-full">
          <video
            src={item.url}
            className={`w-full h-full object-cover rounded-none border-none absolute inset-0 ${className ?? ''}`}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      );
    }
    
    // Handle Lottie animation
    if (mediaType === 'lottie') {
      return (
        <div className={`relative w-full h-full overflow-hidden ${className ?? ''}`}>
          {!isMounted || isLoadingLottie[index] ? (
            <div className="flex h-full w-full items-center justify-center absolute inset-0">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
            </div>
          ) : lottieError[index] ? (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 absolute inset-0">
              <p className="text-gray-500">Failed to load animation</p>
            </div>
          ) : lottieData[index] ? (
            <div className="absolute inset-0">
              <Lottie
                animationData={lottieData[index]}
                loop={true}
                autoplay={true}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  maxWidth: 'none',
                }}
                className="rounded-none border-none"
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid slice',
                }}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-50 absolute inset-0">
              <div className="h-16 w-16 rounded-full bg-gray-200"></div>
            </div>
          )}
        </div>
      );
    }
    
    // Handle image media type
    return (
      <Image
        src={item.url}
        alt={item.description ?? ''}
        fill
        className={`rounded-none border-none object-cover ${className ?? ''}`}
      />
    );
  };

  return (
    <Section className='pt-6 pb-[5.5rem] md:pb-[8.75rem]'>
      <Container>
        <Box direction="col" className="gap-8">
          {/* Mobile Layout */}
          <Box className="grid grid-cols-2 gap-[1.25rem] md:hidden">
            <div className="relative aspect-square -translate-y-6">
              <MediaContent item={firstImage} index={0} />
            </div>
            <div className="relative aspect-square translate-y-6">
              <MediaContent item={secondImage} index={1} />
            </div>
          </Box>
          {copy && <p className="text-center md:hidden pt-[1.25rem]">{copy}</p>}

          {/* Desktop Layout */}
          <Box className="hidden md:grid md:grid-cols-2 gap-[1.5rem]">
            <div className="relative aspect-square">
              <MediaContent item={firstImage} index={0} />
            </div>
            <Box direction="col" className="gap-8 pt-12">
              {copy && <p>{copy}</p>}
              <div className="relative aspect-square">
                <MediaContent item={secondImage} index={1} />
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
