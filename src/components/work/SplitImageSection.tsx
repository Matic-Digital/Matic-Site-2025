import Image from 'next/image';
import { type SplitImageSection as SplitImageSectionType, type ContentfulAsset } from '@/types/contentful';
import { Box, Container, Section } from '../global/matic-ds';

interface SplitImageSectionProps {
  copy?: string;
  contentCollection: SplitImageSectionType['contentCollection'];
}

export function SplitImageSection({ copy, contentCollection }: SplitImageSectionProps) {
  if (!contentCollection?.items || contentCollection.items.length !== 2) {
    return null;
  }

  const [firstImage, secondImage] = contentCollection.items;

  const isVideo = (item: ContentfulAsset | undefined): boolean => {
    const url = item?.url?.toLowerCase() ?? '';
    return url.endsWith('.mp4') || url.endsWith('.webm');
  };

  const MediaContent = ({ item, className }: { item: ContentfulAsset | undefined, className?: string }) => {
    if (!item) return null;

    if (isVideo(item)) {
      return (
        <div className="relative w-full h-full">
          <video
            src={item.url}
            className={`w-full h-full object-cover rounded-none border-none absolute inset-0 ${className ?? ''}`}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      );
    }

    return (
      <Image
        src={item.url}
        alt={item.description ?? ''}
        fill
        className={`rounded-none border-none object-cover ${className ?? ''}`}
      />
    );
  };

  return (
    <Section className='pt-6 pb-[5.5rem] md:pb-[8.75rem]'>
      <Container>
        <Box direction="col" className="gap-8">
          {/* Mobile Layout */}
          <Box className="grid grid-cols-2 gap-[1.25rem] md:hidden">
            <div className="relative aspect-square -translate-y-6">
              <MediaContent item={firstImage} />
            </div>
            <div className="relative aspect-square translate-y-6">
              <MediaContent item={secondImage} />
            </div>
          </Box>
          {copy && <p className="text-center md:hidden pt-[1.25rem]">{copy}</p>}

          {/* Desktop Layout */}
          <Box className="hidden md:grid md:grid-cols-2 gap-[1.5rem]">
            <div className="relative aspect-square">
              <MediaContent item={firstImage} />
            </div>
            <Box direction="col" className="gap-8 pt-12">
              {copy && <p>{copy}</p>}
              <div className="relative aspect-square">
                <MediaContent item={secondImage} />
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
