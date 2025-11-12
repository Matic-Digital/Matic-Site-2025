'use client';

import Image from 'next/image';
import {
  type SplitImageSection as SplitImageSectionType,
  type ContentfulAsset
} from '@/types/contentful';
import { Box, Container, Section } from '../global/matic-ds';
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { DotLottiePlayer } from '@dotlottie/react-player';

// Dynamically import Lottie component to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface SplitImageSectionProps {
  copy?: string;
  contentCollection: SplitImageSectionType['contentCollection'];
  lottieUrl1?: string;
  lottieUrl2?: string;
}

// Define a type for Lottie animation data
type LottieAnimationData = Record<string, unknown>;

export function SplitImageSection({ copy, contentCollection, lottieUrl1, lottieUrl2 }: SplitImageSectionProps) {
  // Helper function to determine media type
  const getMediaType = (item?: ContentfulAsset | null): 'video' | 'lottie' | 'image' | 'none' => {
    if (!item?.url) return 'none';

    const url = item.url.toLowerCase();
    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) return 'video';
    if (url.endsWith('.json') || url.endsWith('.lottie') || url.includes('lottie.host')) return 'lottie';
    return 'image';
  };

  // State declarations
  const [isMounted, setIsMounted] = useState(false);
  const [lottieData, setLottieData] = useState<Record<number, LottieAnimationData>>({});
  const [isLoadingLottie, setIsLoadingLottie] = useState<Record<number, boolean>>({});
  const [lottieError, setLottieError] = useState<Record<number, boolean>>({});

  // Create display items by merging images and lottie URLs for mixed content support
  const displayItems = useMemo(() => {
    const items: (ContentfulAsset | null)[] = [];
    
    // Get images from contentCollection
    const imageAssets = contentCollection?.items || [];
    
    // Get lottie URLs as an array
    const lottieUrls = [lottieUrl1, lottieUrl2];
    
    // Fill positions 0, 1 by checking both sources for each position
    for (let i = 0; i < 2; i++) {
      const imageAsset = i < imageAssets.length ? imageAssets[i] : undefined;
      const lottieUrl = i < lottieUrls.length ? lottieUrls[i] : undefined;
      
      if (imageAsset) {
        // Use the image asset if available at this position
        items[i] = imageAsset;
      } else if (lottieUrl) {
        // Create a mock asset for the lottie URL at this position
        items[i] = {
          sys: { id: `lottie-${i}` },
          title: `Lottie Animation ${i + 1}`,
          description: `Lottie animation from URL ${i + 1}`,
          url: lottieUrl,
          width: 800,
          height: 600,
          size: 0,
          fileName: `lottie-${i + 1}.json`,
          contentType: 'application/json'
        } as ContentfulAsset;
      } else {
        // Fill empty slots with null
        items[i] = null;
      }
    }
    
    return items;
  }, [contentCollection?.items, lottieUrl1, lottieUrl2]);

  // Safe access to display items
  const firstImage = displayItems[0];
  const secondImage = displayItems[1];

  // Memoize media types - using displayItems instead of contentCollection
  const mediaTypes = useMemo(() => {
    if (!displayItems || displayItems.length === 0) return [];
    return displayItems.map((item, index) => ({
      index,
      type: getMediaType(item)
    }));
  }, [displayItems]);

  // Track client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset all Lottie states when items change - use stable dependencies
  useEffect(() => {
    // Reset all states
    setLottieData({});
    setIsLoadingLottie({});
    setLottieError({});
  }, [contentCollection?.items, lottieUrl1, lottieUrl2]);

  // Load Lottie animations on client side
  useEffect(() => {
    if (!isMounted || !displayItems || displayItems.length === 0) return;

    const lottieItems = mediaTypes.filter((item) => item.type === 'lottie');
    if (lottieItems.length === 0) return;

    // Create a new object with loading states for all Lottie items
    const newLoadingState: Record<number, boolean> = {};
    lottieItems.forEach(({ index }) => {
      newLoadingState[index] = true;
    });
    setIsLoadingLottie(newLoadingState);

    // Load each Lottie animation
    lottieItems.forEach(({ index }) => {
      const item = displayItems[index];
      if (!item?.url) {
        setIsLoadingLottie((prev) => ({ ...prev, [index]: false }));
        setLottieError((prev) => ({ ...prev, [index]: true }));
        return;
      }

      // Skip JSON loading for lottie.host URLs - use DotLottiePlayer directly
      if (item.url.includes('lottie.host')) {
        setIsLoadingLottie((prev) => ({ ...prev, [index]: false }));
        // Don't set error - we'll handle this with DotLottiePlayer
        return;
      }

      // Handle other Lottie URL formats (direct JSON URLs)
      fetch(item.url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch Lottie animation: ${response.status}`);
          }
          return response.json();
        })
        .then((data: LottieAnimationData) => {
          setLottieData((prev) => ({ ...prev, [index]: data }));
          setIsLoadingLottie((prev) => ({ ...prev, [index]: false }));
        })
        .catch((error) => {
          console.error(`Error loading Lottie animation for index ${index}:`, error);
          setIsLoadingLottie((prev) => ({ ...prev, [index]: false }));
          setLottieError((prev) => ({ ...prev, [index]: true }));
        });
    });
  }, [mediaTypes, displayItems, isMounted]);

  // Early return after all hooks - check if we have at least some content
  if (!displayItems || displayItems.every(item => item === null)) {
    return null;
  }

  const MediaContent = ({
    item,
    className,
    index
  }: {
    item: ContentfulAsset | null | undefined;
    className?: string;
    index: number;
  }) => {
    if (!item) return null;

    const mediaType = getMediaType(item);

    // Handle video media type
    if (mediaType === 'video') {
      return (
        <div className="relative h-full w-full">
          <video
            src={item.url}
            className={`absolute inset-0 h-full w-full rounded-none border-none object-cover ${className ?? ''}`}
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
      // Check if this is a lottie.host URL - use DotLottiePlayer
      const isLottieHostUrl = item.url.includes('lottie.host');
      
      if (isLottieHostUrl) {
        // Convert URL to .lottie format if needed
        let lottieUrl = item.url;
        if (item.url.includes('.json')) {
          lottieUrl = item.url.replace('.json', '.lottie');
        }
        
        return (
          <div className="relative h-full w-full overflow-hidden">
            <DotLottiePlayer
              src={lottieUrl}
              autoplay
              loop
              className="h-full w-full"
              style={{
                width: index === 0 ? '120%' : '100%',
                height: index === 0 ? '120%' : '100%',
                margin: 0,
                padding: 0,
                ...(index === 0 && { transform: 'translate(-10%, -10%)' })
              }}
            />
          </div>
        );
      }
      
      return (
        <div className={`relative h-full w-full overflow-hidden ${className ?? ''}`}>
          {!isMounted || isLoadingLottie[index] ? (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
            </div>
          ) : lottieError[index] ? (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-100">
              <p className="text-gray-500">Failed to load animation</p>
            </div>
          ) : lottieData[index] ? (
            <div className="absolute inset-0">
              <Lottie
                animationData={lottieData[index]}
                loop={true}
                autoplay={true}
                style={{
                  width: index === 0 ? '100%' : '100%',
                  height: index === 0 ? '100%' : '100%',
                  margin: 0,
                  padding: 0,
                  ...(index === 0 && { transform: 'translate(-10%, -10%)' })
                }}
                className="h-full w-full rounded-none border-none"
                rendererSettings={{
                  preserveAspectRatio: index === 0 ? 'xMinYMin slice' : 'xMidYMid meet'
                }}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-50">
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
    <Section className="pb-[5.5rem] pt-6 md:pb-[8.75rem]">
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
          {copy && <p className="pt-[1.25rem] text-center md:hidden">{copy}</p>}

          {/* Desktop Layout */}
          <Box className="hidden gap-2 md:grid md:grid-cols-2">
            <div className="relative aspect-[4/5]">
              <MediaContent item={firstImage} index={0} />
            </div>
            <Box direction="col" className="gap-6 pt-12">
              {copy && <p className="mb-4">{copy}</p>}
              <div className="relative aspect-[4/5]">
                <MediaContent item={secondImage} index={1} />
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}