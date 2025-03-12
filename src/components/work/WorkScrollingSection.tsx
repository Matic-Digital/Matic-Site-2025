'use client';

import type { WorkScrollingSection as WorkScrollingSectionType } from '@/types';
import { Lens } from '../magicui/Lens';
import { useEffect, useState } from 'react';

interface WorkScrollingSectionProps {
  imagesCollection: WorkScrollingSectionType['imagesCollection'];
  secondaryColor: string;
  accentColor: string;
}

export function WorkScrollingSection({
  imagesCollection,
  secondaryColor,
  accentColor
}: WorkScrollingSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      console.log('Mobile check:', window.innerWidth < 768); // Debug log
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!imagesCollection?.items || imagesCollection.items.length < 2) {
    return null;
  }

  const [firstImage, secondImage, thirdImage, fourthImage = thirdImage] = imagesCollection.items;
  const isTwoImages = imagesCollection.items.length === 2;
  const isThreeImages = imagesCollection.items.length === 3;

  return (
    <div className="relative w-full overflow-hidden">
      {isTwoImages ? (
        <div>
          {/* Background colors */}
          <div className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 flex flex-col">
            <div className="flex-1" style={{ backgroundColor: secondaryColor }} />
            <div className="flex-1" style={{ backgroundColor: accentColor }} />
            <div className="flex-1" style={{ backgroundColor: secondaryColor }} />
          </div>

          {/* Content container */}
          <div className="relative px-4 md:px-12 md:pt-24 pb-24">
            {isMobile ? (
              // Mobile view - horizontal layout with minimal gap and taller section
              <div className="flex flex-row justify-center items-center gap-0 mx-auto max-w-[1400px] px-1 min-h-[1000px]">
                <div className="w-[49%] h-full flex justify-center items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={firstImage?.url ?? ''}
                    alt={firstImage?.description ?? ''}
                    className="w-full h-[800px] object-contain rounded-none border-none"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
                <div className="w-[49%] h-full flex justify-center items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={secondImage?.url ?? ''}
                    alt={secondImage?.description ?? ''}
                    className="w-[80%] h-[800px] object-contain rounded-none border-none"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
              </div>
            ) : (
              // Desktop view
              <div className="flex flex-row justify-center items-end min-h-[2400px] mx-auto max-w-[1400px] gap-10">
                <div className="flex items-end justify-center">
                  <div className="relative overflow-hidden" 
                    style={{ 
                      maxWidth: '100%',
                      width: firstImage?.width,
                      height: firstImage?.height,
                      aspectRatio: firstImage?.width && firstImage?.height ? 
                        `${firstImage.width / firstImage.height}` : 'auto'
                    }}>
                    <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                      <div style={{ 
                        width: '100%', 
                        height: '100%',
                        aspectRatio: firstImage?.width && firstImage?.height ? 
                          `${firstImage.width / firstImage.height}` : 'auto'
                      }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={firstImage?.url ?? ''}
                          alt={firstImage?.description ?? ''}
                          width={firstImage?.width}
                          height={firstImage?.height}
                          className="rounded-none border-none w-full h-full object-contain"
                        />
                      </div>
                    </Lens>
                  </div>
                </div>
                <div className="flex items-end justify-center">
                  <div className="relative overflow-hidden" 
                    style={{ 
                      maxWidth: '100%',
                      width: secondImage?.width,
                      height: secondImage?.height,
                      aspectRatio: secondImage?.width && secondImage?.height ? 
                        `${secondImage.width / secondImage.height}` : 'auto'
                    }}>
                    <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                      <div style={{ 
                        width: '100%', 
                        height: '100%',
                        aspectRatio: secondImage?.width && secondImage?.height ? 
                          `${secondImage.width / secondImage.height}` : 'auto'
                      }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={secondImage?.url ?? ''}
                          alt={secondImage?.description ?? ''}
                          width={secondImage?.width}
                          height={secondImage?.height}
                          className="rounded-none border-none w-full h-full object-contain"
                        />
                      </div>
                    </Lens>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : isThreeImages ? (
        <div>
          {(() => {
            // Calculate a larger display size while maintaining aspect ratio
            const scaleFactor = 1.2; // Reduce from 1.5 to 1.2 to prevent overlapping
            const heights = [firstImage, secondImage, thirdImage].map(img => 
              img?.height ? img.height * scaleFactor : 0
            );
            const maxHeight = Math.max(...heights);
            
            // Add some extra padding to ensure background extends below images
            const totalHeight = maxHeight + 100; // Add 100px extra to ensure background extends below
            
            // Divide the height into three equal sections
            const sectionHeight = totalHeight / 3;
            
            return (
              <>
                {/* Background colors that hug the images */}
                <div className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 flex flex-col" style={{ height: totalHeight }}>
                  <div style={{ height: sectionHeight, backgroundColor: secondaryColor }} />
                  <div style={{ height: sectionHeight, backgroundColor: accentColor }} />
                  <div style={{ height: sectionHeight, backgroundColor: secondaryColor }} />
                </div>

                {/* Content container */}
                <div className="relative px-4 md:px-12 md:pt-24 pb-24">
                  <div className="flex flex-col md:flex-row justify-center h-full mx-auto" style={{ gap: '2.5rem' }}>
                    {[firstImage, secondImage, thirdImage].map((image, index) => {
                      // Calculate a larger display size while maintaining aspect ratio
                      const displayWidth = image?.width ? image.width * scaleFactor : undefined;
                      const displayHeight = image?.height ? image.height * scaleFactor : undefined;
                      const aspectRatio = image?.width && image?.height ? 
                        image.width / image.height : undefined;
                      
                      return (
                        <div 
                          key={image?.url ?? index.toString()} 
                          className="flex items-end"
                          style={{ 
                            marginTop: 'auto',
                            height: isMobile ? 'auto' : maxHeight,
                            flex: '1 1 0%'
                          }}
                        >
                          <div 
                            className="relative mx-auto overflow-hidden" 
                            style={{ 
                              width: isMobile ? '100%' : displayWidth, 
                              height: isMobile ? 'auto' : displayHeight,
                              maxWidth: '100%', // Prevent overflow
                              aspectRatio: aspectRatio ? String(aspectRatio) : 'auto'
                            }}
                          >
                            <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                              <div style={{ 
                                width: '100%', 
                                height: '100%',
                                aspectRatio: aspectRatio ? String(aspectRatio) : 'auto'
                              }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={image?.url ?? ''}
                                  alt={image?.description ?? ''}
                                  width="100%"
                                  height="100%"
                                  className="rounded-none border-none w-full h-full object-contain"
                                  style={{ objectPosition: 'bottom' }}
                                />
                              </div>
                            </Lens>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      ) : (
        <div>
          {/* Background colors */}
          <div className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 flex flex-col">
            <div className="flex-1" style={{ backgroundColor: secondaryColor }} />
            <div className="flex-1" style={{ backgroundColor: accentColor }} />
            <div className="flex-1" style={{ backgroundColor: secondaryColor }} />
          </div>

          {/* Content container */}
          <div className="relative px-4 md:px-12 md:pt-24 pb-24">
            <div className="flex justify-center mx-auto">
              {/* For mobile, use a single column layout */}
              {isMobile ? (
                <div className="flex flex-col gap-8 w-full max-w-[1400px]">
                  {/* First image */}
                  <div className="w-full">
                    <div className="relative overflow-hidden w-full" 
                      style={{ 
                        aspectRatio: firstImage?.width && firstImage?.height ? 
                          `${firstImage.width / firstImage.height}` : 'auto'
                      }}>
                      <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                        <div className="w-full h-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={firstImage?.url ?? ''}
                            alt={firstImage?.description ?? ''}
                            className="rounded-none border-none w-full h-full object-contain"
                          />
                        </div>
                      </Lens>
                    </div>
                  </div>
                  
                  {/* Second image */}
                  <div className="w-full">
                    <div className="relative overflow-hidden w-full" 
                      style={{ 
                        aspectRatio: secondImage?.width && secondImage?.height ? 
                          `${secondImage.width / secondImage.height}` : 'auto'
                      }}>
                      <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                        <div className="w-full h-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={secondImage?.url ?? ''}
                            alt={secondImage?.description ?? ''}
                            className="rounded-none border-none w-full h-full object-contain"
                          />
                        </div>
                      </Lens>
                    </div>
                  </div>
                  
                  {/* Third and fourth images in a row */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="w-full">
                      <div className="relative overflow-hidden w-full" 
                        style={{ 
                          aspectRatio: thirdImage?.width && thirdImage?.height ? 
                            `${thirdImage.width / thirdImage.height}` : 'auto'
                        }}>
                        <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                          <div className="w-full h-full">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={thirdImage?.url ?? ''}
                              alt={thirdImage?.description ?? ''}
                              className="rounded-none border-none w-full h-full object-contain"
                            />
                          </div>
                        </Lens>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="relative overflow-hidden w-full" 
                        style={{ 
                          aspectRatio: fourthImage?.width && fourthImage?.height ? 
                            `${fourthImage.width / fourthImage.height}` : 'auto'
                        }}>
                        <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                          <div className="w-full h-full">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={fourthImage?.url ?? thirdImage?.url ?? ''}
                              alt={fourthImage?.description ?? thirdImage?.description ?? ''}
                              className="rounded-none border-none w-full h-full object-contain"
                            />
                          </div>
                        </Lens>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop layout with grid */
                <div className="grid grid-cols-2 grid-rows-3 gap-2 md:gap-4 min-h-[800px] md:min-h-[2400px] max-w-[1400px]">
                  {/* First column - image spanning all rows */}
                  <div className="row-span-3 flex items-end justify-center">
                    <div className="relative overflow-hidden" 
                      style={{ 
                        maxWidth: '100%',
                        width: firstImage?.width, 
                        height: firstImage?.height,
                        aspectRatio: firstImage?.width && firstImage?.height ? 
                          `${firstImage.width / firstImage.height}` : 'auto'
                      }}>
                      <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                        <div style={{ width: '100%', height: '100%' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={firstImage?.url ?? ''}
                            alt={firstImage?.description ?? ''}
                            className="rounded-none border-none w-full h-full object-contain"
                          />
                        </div>
                      </Lens>
                    </div>
                  </div>

                  {/* Second column - top image spanning 2 rows */}
                  <div className="row-span-2 flex items-end justify-center">
                    <div className="relative overflow-hidden" 
                      style={{ 
                        maxWidth: '100%',
                        width: secondImage?.width, 
                        height: secondImage?.height,
                        aspectRatio: secondImage?.width && secondImage?.height ? 
                          `${secondImage.width / secondImage.height}` : 'auto'
                      }}>
                      <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                        <div style={{ width: '100%', height: '100%' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={secondImage?.url ?? ''}
                            alt={secondImage?.description ?? ''}
                            className="rounded-none border-none w-full h-full object-contain"
                          />
                        </div>
                      </Lens>
                    </div>
                  </div>

                  {/* Second column - bottom row with two images */}
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div className="flex items-end justify-center -translate-y-4 md:-translate-y-12">
                      <div className="relative overflow-hidden scale-75" 
                        style={{ 
                          maxWidth: '100%',
                          width: thirdImage?.width, 
                          height: thirdImage?.height,
                          aspectRatio: thirdImage?.width && thirdImage?.height ? 
                            `${thirdImage.width / thirdImage.height}` : 'auto'
                        }}>
                        <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                          <div style={{ width: '100%', height: '100%' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={thirdImage?.url ?? ''}
                              alt={thirdImage?.description ?? ''}
                              className="rounded-none border-none w-full h-full object-contain"
                            />
                          </div>
                        </Lens>
                      </div>
                    </div>
                    <div className="flex items-end justify-center translate-y-4 md:translate-y-12">
                      <div className="relative overflow-hidden scale-75" 
                        style={{ 
                          maxWidth: '100%',
                          width: fourthImage?.width ?? thirdImage?.width, 
                          height: fourthImage?.height ?? thirdImage?.height,
                          aspectRatio: (fourthImage?.width && fourthImage?.height) ? 
                            `${fourthImage.width / fourthImage.height}` : 
                            (thirdImage?.width && thirdImage?.height) ? 
                              `${thirdImage.width / thirdImage.height}` : 'auto'
                        }}>
                        <Lens zoomFactor={2} lensSize={200} isStatic={false} ariaLabel="Zoom Area">
                          <div style={{ width: '100%', height: '100%' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={fourthImage?.url ?? thirdImage?.url ?? ''}
                              alt={fourthImage?.description ?? thirdImage?.description ?? ''}
                              className="rounded-none border-none w-full h-full object-contain"
                            />
                          </div>
                        </Lens>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
