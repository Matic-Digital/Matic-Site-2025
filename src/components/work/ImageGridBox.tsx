import type { ImageGridBox as ImageGridBoxType } from '@/types';
import { Box } from '@/components/global/matic-ds';
import Image from 'next/image';

export function ImageGridBox({ imagesCollection }: ImageGridBoxType) {
  if (!imagesCollection?.items || imagesCollection.items.length !== 3) {
    return null;
  }

  return (
    <Box className="grid grid-cols-3 gap-4">
      {imagesCollection.items.map((image, index) => (
        <div key={index} className="relative aspect-square">
          <Image 
            src={image.url} 
            alt={image.description ?? ''} 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}
    </Box>
  );
}
