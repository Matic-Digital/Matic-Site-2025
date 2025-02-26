import Image from 'next/image';
import { SplitImageSection as SplitImageSectionType } from '@/types/contentful';
import { Box, Container, Section } from '../global/matic-ds';

interface SplitImageSectionProps {
  name: string;
  copy?: string;
  contentCollection: SplitImageSectionType['contentCollection'];
}

export function SplitImageSection({ name, copy, contentCollection }: SplitImageSectionProps) {
  if (!contentCollection?.items || contentCollection.items.length !== 2) {
    return null;
  }

  const [firstImage, secondImage] = contentCollection.items;

  return (
    <Section className='pt-6 pb-[5.5rem] md:pb-[8.75rem]'>
      <Container>
        <Box direction="col" className="gap-8">
          {/* Mobile Layout */}
          <Box className="grid grid-cols-2 gap-[1.25rem] md:hidden">
            <div className="relative aspect-square -translate-y-6">
              <Image
                src={firstImage?.url ?? ''}
                alt={firstImage?.description ?? ''}
                fill
                className="rounded-none border-none object-cover"
              />
            </div>
            <div className="relative aspect-square translate-y-6">
              <Image
                src={secondImage?.url ?? ''}
                alt={secondImage?.description ?? ''}
                fill
                className="rounded-none border-none object-cover"
              />
            </div>
          </Box>
          {copy && <p className="text-center md:hidden pt-[1.25rem]">{copy}</p>}

          {/* Desktop Layout */}
          <Box className="hidden md:grid md:grid-cols-2 gap-[1.5rem]">
            <div className="relative aspect-square">
              <Image
                src={firstImage?.url ?? ''}
                alt={firstImage?.description ?? ''}
                fill
                className="rounded-none border-none object-cover"
              />
            </div>
            <Box direction="col" className="gap-8 pt-12">
              {copy && <p>{copy}</p>}
              <div className="relative aspect-square">
                <Image
                  src={secondImage?.url ?? ''}
                  alt={secondImage?.description ?? ''}
                  fill
                  className="rounded-none border-none object-cover"
                />
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
