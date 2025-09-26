'use client';
import type { ImageGridBox as ImageGridBoxType, ContentfulAsset } from '@/types';
import { Box, Container, Section } from '@/components/global/matic-ds';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie component to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { DotLottiePlayer } from '@dotlottie/react-player';

interface ImageGridBoxProps extends ImageGridBoxType {
  _secondaryColor: string;
  _accentColor: string;
}

// Define a type for Lottie animation data
type LottieAnimationData = Record<string, unknown>;

export function ImageGridBox({
  imagesCollection,
  lottieUrl1,
  lottieUrl2,
  lottieUrl3,
  _secondaryColor,
  _accentColor
}: ImageGridBoxProps) {
  // Helper function to determine media type - moved to top level
  const getMediaType = (item?: ContentfulAsset | null): 'video' | 'lottie' | 'image' | 'none' => {
    if (!item?.url) return 'none';

    const url = item.url.toLowerCase();
    if (url.endsWith('.mp4') || url.endsWith('.webm')) return 'video';
    if (url.endsWith('.json') || url.endsWith('.lottie') || url.includes('lottie.host')) return 'lottie';
    return 'image';
  };

  // State for Lottie animations
  const [lottieData, setLottieData] = useState<Record<number, LottieAnimationData>>({});
  const [isLoadingLottie, setIsLoadingLottie] = useState<Record<number, boolean>>({});
  const [lottieError, setLottieError] = useState<Record<number, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);

  // Create display items by merging images and lottie URLs for mixed content support
  const displayItems = useMemo(() => {
    const items: (ContentfulAsset | null)[] = [];
    
    // Get images from imagesCollection
    const imageAssets = imagesCollection?.items || [];
    
    // Get lottie URLs as an array - keep them in their original positions
    const lottieUrls = [lottieUrl1, lottieUrl2, lottieUrl3];
    
    // Fill positions 0, 1, 2 by checking both sources for each position
    for (let i = 0; i < 3; i++) {
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
  }, [imagesCollection?.items, lottieUrl1, lottieUrl2, lottieUrl3]);

  // Memoize media types - using displayItems instead of imagesCollection
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
  }, [imagesCollection?.items, lottieUrl1, lottieUrl2, lottieUrl3]);

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

  // Early return after all hooks - require either images or Lottie URLs
  if (!displayItems || displayItems.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container>
        <Box className={`grid grid-cols-2 gap-2`}>
          {displayItems.map((image, index) => (
            <div
              key={index}
              className={`relative ${
                index === 0
                  ? 'col-span-2 h-auto w-full'
                  : index === 2
                    ? 'aspect-[2/2.5]'
                    : 'aspect-[2/3]'
              }`}
            >
              {(() => {
                if (!image) return null;
                const mediaType = getMediaType(image);

                // Handle video media type
                if (mediaType === 'video') {
                  return (
                    <div className="relative h-full w-full">
                      <video
                        src={image.url}
                        className="h-full w-full rounded-none border-none object-cover"
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
                  const isLottieHostUrl = image.url.includes('lottie.host');
                  
                  if (isLottieHostUrl) {
                    // Convert URL to .lottie format if needed
                    let lottieUrl = image.url;
                    if (image.url.includes('.json')) {
                      lottieUrl = image.url.replace('.json', '.lottie');
                    }
                    
                    return (
                      <div className="relative h-full w-full overflow-hidden">
                        <DotLottiePlayer
                          src={lottieUrl}
                          autoplay
                          loop
                          className="h-full w-full"
                          style={{
                            width: '120%',
                            height: '120%',
                            margin: 0,
                            padding: 0,
                            transform: 'translate(-10%, -10%)'
                          }}
                        />
                      </div>
                    );
                  }
                  
                  return (
                    <div className="relative h-full w-full overflow-hidden">
                      {!isMounted || isLoadingLottie[index] ? (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
                        </div>
                      ) : lottieError[index] ? (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <p className="text-gray-500">Failed to load animation</p>
                        </div>
                      ) : lottieData[index] ? (
                        <Lottie
                          animationData={lottieData[index]}
                          loop={true}
                          autoplay={true}
                          style={{
                            width: '120%',
                            height: '120%',
                            margin: 0,
                            padding: 0,
                            transform: 'translate(-10%, -10%)'
                          }}
                          className="h-full w-full rounded-none border-none"
                          rendererSettings={{
                            preserveAspectRatio: 'xMinYMin slice'
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-50">
                          <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Handle image media type
                if (index === 0) {
                  return (
                    <Image
                      src={image.url}
                      alt={image.description ?? ''}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-auto w-full rounded-none border-none"
                      style={{ width: '100%', height: 'auto' }}
                      priority
                    />
                  );
                } else {
                  return (
                    <Image
                      src={image.url}
                      alt={image.description ?? ''}
                      fill
                      className="rounded-none border-none object-cover"
                      sizes="50vw"
                    />
                  );
                }
              })()}
            </div>
          ))}
        </Box>
      </Container>
    </Section>
  );
}
