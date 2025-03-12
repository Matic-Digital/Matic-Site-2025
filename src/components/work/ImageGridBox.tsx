import type { ImageGridBox as ImageGridBoxType, ContentfulAsset } from '@/types';
import { Box, Container, Section } from '@/components/global/matic-ds';
import Image from 'next/image';

interface ImageGridBoxProps extends ImageGridBoxType {
  _secondaryColor: string;
  _accentColor: string;
}

export function ImageGridBox({ imagesCollection, _secondaryColor, _accentColor }: ImageGridBoxProps) {
  if (!imagesCollection?.items || imagesCollection.items.length !== 3) {
    return null;
  }

  const isVideo = (item: ContentfulAsset): boolean => {
    const url = item?.url?.toLowerCase() ?? '';
    return url.endsWith('.mp4') || url.endsWith('.webm');
  };

  return (
    <Section>
      <Container>
        <Box className={`grid grid-cols-2 gap-2`}>
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
              {isVideo(image) ? (
                <div className="relative w-full h-full">
                  <video
                    src={image.url}
                    className={`w-full h-full object-cover rounded-none border-none ${index === 0 ? '' : 'absolute inset-0'}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              ) : index === 0 ? (
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
