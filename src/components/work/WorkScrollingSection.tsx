import type { WorkScrollingSection as WorkScrollingSectionType } from '@/types';
import { Box } from '@/components/global/matic-ds';
import Image from 'next/image';

interface WorkScrollingSectionProps {
  imagesCollection: WorkScrollingSectionType['imagesCollection'];
  secondaryColor: string;
  accentColor: string;
}

export function WorkScrollingSection({ imagesCollection, secondaryColor, accentColor }: WorkScrollingSectionProps) {
  if (!imagesCollection?.items || imagesCollection.items.length < 2) {
    return null;
  }

  const [firstImage, secondImage, thirdImage, fourthImage = thirdImage] = imagesCollection.items;
  const isTwoImages = imagesCollection.items.length === 2;

  return (
    <section className={`relative min-h-[800px] md:min-h-[2400px] px-4 md:px-12 pt-8 md:pt-24 max-w-screen overflow-hidden grid ${
      !isTwoImages ? 'grid-cols-2 grid-rows-3 gap-2 md:gap-4' : 'grid-cols-2 gap-0'
    }`}>
      {/* Background rows */}
      <div className="absolute inset-0 grid grid-rows-3 -mx-[100vw]">
        <div className="min-h-[266px] md:min-h-[800px]" style={{ backgroundColor: secondaryColor }} />
        <div className="min-h-[266px] md:min-h-[800px]" style={{ backgroundColor: accentColor }} />
        <div className="min-h-[266px] md:min-h-[800px]" style={{ backgroundColor: secondaryColor }} />
      </div>

      {isTwoImages ? (
        <>
          {/* Two images side by side */}
          <div className="relative -mr-[35rem]">
            <Image 
              src={firstImage?.url ?? ''} 
              alt={firstImage?.description ?? ''} 
              fill
              className="object-contain border-none rounded-none"
              sizes="50vw"
            />
          </div>
          <div className="relative -ml-[8rem]">
            <Image 
              src={secondImage?.url ?? ''} 
              alt={secondImage?.description ?? ''} 
              fill
              className="object-contain border-none rounded-none"
              sizes="50vw"
            />
          </div>
        </>
      ) : (
        <>
          {/* First column - image spanning all rows */}
          <div className="relative row-span-3">
            <Image 
              src={firstImage?.url ?? ''} 
              alt={firstImage?.description ?? ''} 
              fill
              className="object-contain border-none rounded-none"
              sizes="50vw"
            />
          </div>

          {/* Second column */}
          <>
            {/* Second column - top image spanning 2 rows */}
            <div className="relative row-span-2">
              <Image 
                src={secondImage?.url ?? ''} 
                alt={secondImage?.description ?? ''} 
                fill
                className="object-contain border-none rounded-none"
                sizes="50vw"
              />
            </div>

            {/* Second column - bottom row with two images */}
            <div className="relative grid grid-cols-2 gap-2 md:gap-4">
              <div className="relative -translate-y-4 md:-translate-y-12 scale-75 -mr-1">
                <Image 
                  src={thirdImage?.url ?? ''} 
                  alt={thirdImage?.description ?? ''} 
                  fill
                  className="object-contain border-none rounded-none"
                  sizes="25vw"
                />
              </div>
              <div className="relative translate-y-4 md:translate-y-12 scale-75 -ml-1">
                <Image 
                  src={fourthImage?.url ?? thirdImage?.url ?? ''} 
                  alt={fourthImage?.description ?? thirdImage?.description ?? ''} 
                  fill
                  className="object-contain border-none rounded-none"
                  sizes="25vw"
                />
              </div>
            </div>
          </>
        </>
      )}
    </section>
  );
}
