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
  variant = 'Default',
  offset,
  _secondaryColor,
  _accentColor
}: ImageGridBoxProps) {
  // Ensure variant defaults to 'Default' if null or undefined
  const effectiveVariant = variant || 'Default';
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
    const items: (ContentfulAsset | null)[] = [null, null, null];
    
    // Get images from imagesCollection
    const imageAssets = imagesCollection?.items || [];
    
    // Get lottie URLs as an array
    const lottieUrls = [lottieUrl1, lottieUrl2, lottieUrl3];
    
    // First, fill with image assets in order
    imageAssets.forEach((imageAsset, index) => {
      if (index < 3 && imageAsset) {
        items[index] = imageAsset;
      }
    });
    
    // Then, override with Lottie URLs in their designated positions
    lottieUrls.forEach((lottieUrl, index) => {
      if (lottieUrl) {
        items[index] = {
          sys: { id: `lottie-${index}` },
          title: `Lottie Animation ${index + 1}`,
          description: `Lottie animation from URL ${index + 1}`,
          url: lottieUrl,
          width: 800,
          height: 600,
          size: 0,
          fileName: `lottie-${index + 1}.json`,
          contentType: 'application/json'
        } as ContentfulAsset;
      }
    });
    
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
  if (!displayItems || displayItems.length === 0 || displayItems.every(item => item === null)) {
    return null;
  }

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-2 w-full">
          {/* Full width item (first for default, last for reverse) */}
          {effectiveVariant === 'Default' && displayItems[0] && displayItems[0] !== null && (
            <div className="relative w-full h-auto min-h-[400px]">
              {(() => {
                const image = displayItems[0];
                const mediaType = getMediaType(image);

                // Handle video media type
                if (mediaType === 'video') {
                  return (
                    <div className="relative h-full w-full rounded-none">
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
                  const isLottieHostUrl = image.url.includes('lottie.host');
                  
                  if (isLottieHostUrl) {
                    let lottieUrl = image.url;
                    if (image.url.includes('.json')) {
                      lottieUrl = image.url.replace('.json', '.lottie');
                    }
                    
                    return (
                      <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: 0 }}>
                        <DotLottiePlayer
                          src={lottieUrl}
                          autoplay
                          loop
                          className="h-full w-full"
                          style={{
                            width: '105%',
                            height: '105%',
                            margin: '-2.5%',
                            padding: 0,
                            borderRadius: 0,
                            transform: 'scale(1.05)',
                            transformOrigin: 'center center'
                          }}
                        />
                      </div>
                    );
                  }
                  
                  return (
                    <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: 0 }}>
                      {!isMounted || isLoadingLottie[0] ? (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="h-8 w-8 animate-spin border-b-2 border-t-2 border-gray-900"></div>
                        </div>
                      ) : lottieError[0] ? (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <p className="text-gray-500">Failed to load animation</p>
                        </div>
                      ) : lottieData[0] ? (
                        <Lottie
                          animationData={lottieData[0]}
                          loop={true}
                          autoplay={true}
                          style={{
                            width: '105%',
                            height: '105%',
                            margin: '-2.5%',
                            padding: 0,
                            borderRadius: 0,
                            transform: 'scale(1.05)',
                            transformOrigin: 'center center'
                          }}
                          className="h-full w-full border-none"
                          rendererSettings={{
                            preserveAspectRatio: 'xMidYMid meet'
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-50">
                          <div className="h-16 w-16 bg-gray-200"></div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Handle image media type
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
              })()}
            </div>
          )}

          {/* Row of non-spanning items */}
          <div className={`flex gap-2 overflow-x-auto md:overflow-visible pb-2 ${effectiveVariant === 'Reverse' ? 'items-end' : 'items-start'}`}>
            {displayItems.map((image, index) => {
              // Skip the full-width item based on variant
              const isFullWidthItem = effectiveVariant === 'Reverse' 
                ? index === displayItems.length - 1 
                : index === 0;
              
              if (isFullWidthItem) return null;

              // Determine if this item should have the offset height
              const shouldHaveOffsetHeight = offset !== undefined && index === offset;
              
              return (
                <div
                  key={index}
                  className={`${
                    shouldHaveOffsetHeight 
                      ? 'relative md:sticky h-[200px] w-[160px] md:h-[582.66px] md:w-[473.91px]' 
                      : 'relative aspect-[2/3] flex-1 min-w-[120px] md:min-w-0'
                  }`}
                  style={{
                    ...(shouldHaveOffsetHeight ? { 
                      flexShrink: 0,
                      top: '25%'
                    } : {})
                  }}
                >
              {(() => {
                if (!image) return null;
                const mediaType = getMediaType(image);

                // Handle video media type
                if (mediaType === 'video') {
                  return (
                    <div className="relative h-full w-full rounded-none">
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
                      <div className="relative h-full w-full flex items-start overflow-hidden" style={{ borderRadius: 0 }}>
                        <DotLottiePlayer
                          src={lottieUrl}
                          autoplay
                          loop
                          className="h-full w-full"
                          style={{
                            width: '105%',
                            height: '105%',
                            margin: '-2.5%',
                            padding: 0,
                            alignSelf: 'flex-start',
                            borderRadius: 0,
                            transform: 'scale(1.05)',
                            transformOrigin: 'center center'
                          }}
                        />
                      </div>
                    );
                  }
                  
                  return (
                    <div className="relative h-full w-full flex items-start overflow-hidden" style={{ borderRadius: 0 }}>
                      {!isMounted || isLoadingLottie[index] ? (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="h-8 w-8 animate-spin border-b-2 border-t-2 border-gray-900"></div>
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
                            width: '105%',
                            height: '105%',
                            margin: '-2.5%',
                            padding: 0,
                            alignSelf: 'flex-start',
                            borderRadius: 0,
                            transform: 'scale(1.05)',
                            transformOrigin: 'center center'
                          }}
                          className="h-full w-full border-none"
                          rendererSettings={{
                            preserveAspectRatio: 'xMidYMid meet'
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-50">
                          <div className="h-16 w-16 bg-gray-200"></div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Handle image media type
                if (shouldHaveOffsetHeight) {
                  return (
                    <Image
                      src={image.url}
                      alt={image.description ?? ''}
                      fill
                      className="rounded-none border-none object-cover"
                      sizes="473px"
                      style={{ objectFit: 'cover' }}
                    />
                  );
                } else {
                  return (
                    <Image
                      src={image.url}
                      alt={image.description ?? ''}
                      fill
                      className="rounded-none border-none object-contain object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'contain', objectPosition: 'top' }}
                    />
                  );
                }
              })()}
                </div>
              );
            })}
          </div>

          {/* Full width item for reverse variant */}
          {effectiveVariant === 'Reverse' && displayItems[displayItems.length - 1] && (
            <div className="relative w-full h-auto min-h-[400px]">
              {(() => {
                const image = displayItems[displayItems.length - 1];
                if (!image) return null;
                const mediaType = getMediaType(image);

                // Handle video media type
                if (mediaType === 'video') {
                  return (
                    <div className="relative h-full w-full rounded-none">
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
                  const isLottieHostUrl = image.url.includes('lottie.host');
                  const lastIndex = displayItems.length - 1;
                  
                  if (isLottieHostUrl) {
                    let lottieUrl = image.url;
                    if (image.url.includes('.json')) {
                      lottieUrl = image.url.replace('.json', '.lottie');
                    }
                    
                    return (
                      <div className="relative h-full w-full rounded-none">
                        <DotLottiePlayer
                          src={lottieUrl}
                          autoplay
                          loop
                          className="h-full w-full rounded-none"
                          style={{
                            width: '100%',
                            height: '100%',
                            margin: 0,
                            padding: 0,
                            borderRadius: 0
                          }}
                        />
                      </div>
                    );
                  }
                  
                  return (
                    <div className="relative h-full w-full rounded-none">
                      {!isMounted || isLoadingLottie[lastIndex] ? (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="h-8 w-8 animate-spin border-b-2 border-t-2 border-gray-900"></div>
                        </div>
                      ) : lottieError[lastIndex] ? (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <p className="text-gray-500">Failed to load animation</p>
                        </div>
                      ) : lottieData[lastIndex] ? (
                        <Lottie
                          animationData={lottieData[lastIndex]}
                          loop={true}
                          autoplay={true}
                          style={{
                            width: '100%',
                            height: '100%',
                            margin: 0,
                            padding: 0,
                            borderRadius: 0
                          }}
                          className="h-full w-full rounded-none border-none"
                          rendererSettings={{
                            preserveAspectRatio: 'xMidYMid meet'
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-50">
                          <div className="h-16 w-16 bg-gray-200"></div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Handle image media type
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
              })()}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
