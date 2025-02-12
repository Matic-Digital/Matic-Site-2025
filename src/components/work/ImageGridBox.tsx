import type { ImageGridBox as ImageGridBoxType } from '@/types';
import { Box, Container, Section } from '@/components/global/matic-ds';
import Image from 'next/image';

interface ImageGridBoxProps extends ImageGridBoxType {
  secondaryColor: string;
  accentColor: string;
}

export function ImageGridBox({ imagesCollection, secondaryColor, accentColor }: ImageGridBoxProps) {
  if (!imagesCollection?.items || imagesCollection.items.length !== 3) {
    return null;
  }

  return (
    <Section>
      <Container className="max-w-none">
        <Box className="grid grid-cols-2 gap-2">
          {imagesCollection.items.map((image, index) => (
            <div 
              key={index} 
              className={`relative ${
                index === 0 
                  ? 'col-span-2 w-full h-auto' 
                  : index === 2 
                    ? 'aspect-[2/2.5]' 
                    : 'aspect-[2/3]'
              }`}
            >
              {index === 0 ? (
                <Image 
                  src={image.url} 
                  alt={image.description ?? ''} 
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto rounded-none border-none"
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
              ) : (
                <Image 
                  src={image.url} 
                  alt={image.description ?? ''} 
                  fill
                  className="rounded-none border-none object-cover"
                  sizes="50vw"
                />
              )}
            </div>
          ))}
        </Box>
      </Container>
    </Section>
  );
}
