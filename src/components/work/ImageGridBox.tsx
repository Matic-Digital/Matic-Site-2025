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
      <Container>
        <Box className="grid grid-cols-2 gap-2">
          {imagesCollection.items.map((image, index) => (
            <div 
              key={index} 
              className={`relative ${
                index === 0 
                  ? `col-span-2 h-[17rem] md:h-[40rem]` 
                  : index === 2 
                    ? 'aspect-[2/2.5]' 
                    : 'aspect-[2/3]'
              }`}
              style={{
                ...(index === 0 && { backgroundColor: accentColor }),
              }}
            >
              <Image 
                src={image.url} 
                alt={image.description ?? ''} 
                fill
                className={`object-cover rounded-none border-none`}
              />
            </div>
          ))}
        </Box>
      </Container>
    </Section>
  );
}
