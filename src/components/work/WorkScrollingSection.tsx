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

  return (
    <section className="grid grid-cols-2 grid-rows-3 relative min-h-[800px] md:min-h-[2400px] gap-2 md:gap-4 px-4 md:px-12 pt-8 md:pt-24 max-w-screen overflow-hidden">
      {/* Background rows */}
      <div className="absolute inset-0 grid grid-rows-3 -mx-[100vw]">
        <div className="min-h-[266px] md:min-h-[800px]" style={{ backgroundColor: secondaryColor }} />
        <div className="min-h-[266px] md:min-h-[800px]" style={{ backgroundColor: accentColor }} />
        <div className="min-h-[266px] md:min-h-[800px]" style={{ backgroundColor: secondaryColor }} />
      </div>

      {/* First column - image spanning all rows */}
      <div className="relative row-span-3">
        <Image 
          src={firstImage?.url ?? ''} 
          alt={firstImage?.description ?? ''} 
          fill
          className="object-contain border-none rounded-none"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Second column - top image spanning 2 rows */}
      <div className="relative row-span-2">
        <Image 
          src={secondImage?.url ?? ''} 
          alt={secondImage?.description ?? ''} 
          fill
          className="object-contain border-none rounded-none"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Second column - bottom row with two images */}
      <div className="relative grid grid-cols-2 gap-2 md:gap-4">
        <div className="relative -translate-y-4 md:-translate-y-12 scale-75">
          <Image 
            src={thirdImage?.url ?? ''} 
            alt={thirdImage?.description ?? ''} 
            fill
            className="object-contain border-none rounded-none"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
        <div className="relative translate-y-4 md:translate-y-12 scale-75">
          <Image 
            src={fourthImage?.url ?? thirdImage?.url ?? ''} 
            alt={fourthImage?.description ?? thirdImage?.description ?? ''} 
            fill
            className="object-contain border-none rounded-none"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      </div>
    </section>
  );
}
