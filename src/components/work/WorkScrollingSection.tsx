import type { WorkScrollingSection as WorkScrollingSectionType } from '@/types';
import { Box } from '@/components/global/matic-ds';
import Image from 'next/image';

export function WorkScrollingSection({ imagesCollection }: WorkScrollingSectionType) {
  if (!imagesCollection?.items || imagesCollection.items.length < 2 || imagesCollection.items.length > 4) {
    return null;
  }

  return (
    <Box className="overflow-x-auto whitespace-nowrap">
      {imagesCollection.items.map((image, index) => (
        <div key={index} className="inline-block w-[500px] h-[300px] relative p-2">
          <Image 
            src={image.url} 
            alt={image.description ?? ''} 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      ))}
    </Box>
  );
}
