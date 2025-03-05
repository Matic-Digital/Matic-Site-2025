import type { WorkScrollingSection as WorkScrollingSectionType } from '@/types';
import { Lens } from '../magicui/Lens';

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
  if (!imagesCollection?.items || imagesCollection.items.length < 2) {
    return null;
  }

  const [firstImage, secondImage, thirdImage, fourthImage = thirdImage] = imagesCollection.items;
  const isTwoImages = imagesCollection.items.length === 2;
  const isThreeImages = imagesCollection.items.length === 3;

  return (
    <div className="relative w-full">
      {isTwoImages ? (
        <div>
          {/* Background colors */}
          <div className="absolute inset-0 -mx-[100vw] flex flex-col">
            <div className="flex-1" style={{ backgroundColor: secondaryColor }} />
            <div className="flex-1" style={{ backgroundColor: accentColor }} />
            <div className="flex-1" style={{ backgroundColor: secondaryColor }} />
          </div>

          {/* Content container */}
          <div className="relative px-4 md:px-12 md:pt-24 pb-24">
            <div className="flex flex-row justify-center items-end min-h-[800px] md:min-h-[2400px] mx-auto max-w-[1400px]">
              <div className="flex items-end justify-center">
                <div className="relative" style={{ width: firstImage?.width, height: firstImage?.height }}>
                  <Lens zoomFactor={1.5} lensSize={300} isStatic={false} ariaLabel="Zoom Area">
                    <div style={{ width: firstImage?.width, height: firstImage?.height }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={firstImage?.url ?? ''}
                        alt={firstImage?.description ?? ''}
                        width={firstImage?.width}
                        height={firstImage?.height}
                        className="rounded-none border-none max-w-none"
                      />
                    </div>
                  </Lens>
                </div>
              </div>
              <div className="flex items-end justify-center ml-10" style={{ marginLeft: '2.5rem' }}>
                <div className="relative" style={{ width: secondImage?.width, height: secondImage?.height }}>
                  <Lens zoomFactor={1.5} lensSize={300} isStatic={false} ariaLabel="Zoom Area">
                    <div style={{ width: secondImage?.width, height: secondImage?.height }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={secondImage?.url ?? ''}
                        alt={secondImage?.description ?? ''}
                        width={secondImage?.width}
                        height={secondImage?.height}
                        className="rounded-none border-none max-w-none"
                      />
                    </div>
                  </Lens>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isThreeImages ? (
        <div>
          {/* Calculate the height of the tallest image */}
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
                <div className="absolute inset-0 -mx-[100vw] flex flex-col" style={{ height: totalHeight }}>
                  <div style={{ height: sectionHeight, backgroundColor: secondaryColor }} />
                  <div style={{ height: sectionHeight, backgroundColor: accentColor }} />
                  <div style={{ height: sectionHeight, backgroundColor: secondaryColor }} />
                </div>

                {/* Content container */}
                <div className="relative px-4 md:px-12 md:pt-24 pb-24">
                  <div className="flex flex-row justify-center h-full mx-auto" style={{ gap: '2.5rem' }}>
                    {[firstImage, secondImage, thirdImage].map((image, index) => {
                      // Calculate a larger display size while maintaining aspect ratio
                      const displayWidth = image?.width ? image.width * scaleFactor : undefined;
                      const displayHeight = image?.height ? image.height * scaleFactor : undefined;
                      
                      return (
                        <div 
                          key={image?.url ?? index.toString()} 
                          className="flex items-end"
                          style={{ 
                            marginTop: 'auto',
                            height: maxHeight,
                            flex: '1 1 0%'
                          }}
                        >
                          <div 
                            className="relative mx-auto" 
                            style={{ 
                              width: displayWidth, 
                              height: displayHeight,
                              maxWidth: '100%' // Prevent overflow
                            }}
                          >
                            <Lens zoomFactor={1.5} lensSize={300} isStatic={false} ariaLabel="Zoom Area">
                              <div style={{ width: displayWidth, height: displayHeight }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={image?.url ?? ''}
                                  alt={image?.description ?? ''}
                                  width={displayWidth}
                                  height={displayHeight}
                                  className="rounded-none border-none max-w-none"
                                  style={{ 
                                    objectPosition: 'bottom',
                                    maxHeight: 'none'
                                  }}
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
          <div className="absolute inset-0 -mx-[100vw] flex flex-col">
            <div className="flex-1" style={{ backgroundColor: secondaryColor }} />
            <div className="flex-1" style={{ backgroundColor: accentColor }} />
            <div className="flex-1" style={{ backgroundColor: secondaryColor }} />
          </div>

          {/* Content container */}
          <div className="relative px-4 md:px-12 md:pt-24 pb-24">
            <div className="flex justify-center mx-auto">
              <div className="grid grid-cols-2 grid-rows-3 gap-2 md:gap-4 min-h-[800px] md:min-h-[2400px] max-w-[1400px]">
                {/* First column - image spanning all rows */}
                <div className="row-span-3 flex items-end justify-center">
                  <div className="relative" style={{ width: firstImage?.width, height: firstImage?.height }}>
                    <Lens zoomFactor={1.5} lensSize={300} isStatic={false} ariaLabel="Zoom Area">
                      <div style={{ width: firstImage?.width, height: firstImage?.height }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={firstImage?.url ?? ''}
                          alt={firstImage?.description ?? ''}
                          width={firstImage?.width}
                          height={firstImage?.height}
                          className="rounded-none border-none max-w-none"
                        />
                      </div>
                    </Lens>
                  </div>
                </div>

                {/* Second column - top image spanning 2 rows */}
                <div className="row-span-2 flex items-end justify-center">
                  <div className="relative" style={{ width: secondImage?.width, height: secondImage?.height }}>
                    <Lens zoomFactor={1.5} lensSize={300} isStatic={false} ariaLabel="Zoom Area">
                      <div style={{ width: secondImage?.width, height: secondImage?.height }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={secondImage?.url ?? ''}
                          alt={secondImage?.description ?? ''}
                          width={secondImage?.width}
                          height={secondImage?.height}
                          className="rounded-none border-none max-w-none"
                        />
                      </div>
                    </Lens>
                  </div>
                </div>

                {/* Second column - bottom row with two images */}
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div className="flex items-end justify-center -translate-y-4 md:-translate-y-12">
                    <div className="relative scale-75" style={{ width: thirdImage?.width, height: thirdImage?.height }}>
                      <Lens zoomFactor={1.5} lensSize={300} isStatic={false} ariaLabel="Zoom Area">
                        <div style={{ width: thirdImage?.width, height: thirdImage?.height }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={thirdImage?.url ?? ''}
                            alt={thirdImage?.description ?? ''}
                            width={thirdImage?.width}
                            height={thirdImage?.height}
                            className="rounded-none border-none max-w-none"
                          />
                        </div>
                      </Lens>
                    </div>
                  </div>
                  <div className="flex items-end justify-center translate-y-4 md:translate-y-12">
                    <div className="relative scale-75" style={{ width: fourthImage?.width ?? thirdImage?.width, height: fourthImage?.height ?? thirdImage?.height }}>
                      <Lens zoomFactor={1.5} lensSize={300} isStatic={false} ariaLabel="Zoom Area">
                        <div style={{ width: fourthImage?.width ?? thirdImage?.width, height: fourthImage?.height ?? thirdImage?.height }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={fourthImage?.url ?? thirdImage?.url ?? ''}
                            alt={fourthImage?.description ?? thirdImage?.description ?? ''}
                            width={fourthImage?.width ?? thirdImage?.width}
                            height={fourthImage?.height ?? thirdImage?.height}
                            className="rounded-none border-none max-w-none"
                          />
                        </div>
                      </Lens>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
