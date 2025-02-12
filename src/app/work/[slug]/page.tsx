import { Section, Container, Box } from '@/components/global/matic-ds';
import { WorkCopy } from '@/components/work/WorkCopy';
import { FigmaPrototype } from '@/components/work/FigmaPrototype';
import { WorkTactics } from '@/components/work/WorkTactics';
import { ImageGridBox } from '@/components/work/ImageGridBox';
import { WorkScrollingSection } from '@/components/work/WorkScrollingSection';
import { VideoSection } from '@/components/work/VideoSection';
import { SplitImageSection } from '@/components/work/SplitImageSection';
import { FramedAsset } from '@/components/work/FramedAsset';
import { BannerImage } from '@/components/work/BannerImage';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { WorkCarousel } from '@/components/work/WorkCarousel';
import { notFound } from 'next/navigation';
import { getWork, getWorkContent } from '@/lib/api';
import type {
  PreviewOptions,
  WorkCopyProps as WorkCopyType,
  FigmaPrototype as FigmaPrototypeType,
  WorkTactics as WorkTacticsType,
  ImageGridBox as ImageGridBoxType,
  WorkScrollingSection as WorkScrollingSectionType,
  VideoSection as VideoSectionType,
  SplitImageSection as SplitImageSectionType,
  FramedAsset as FramedAssetType,
  BannerImage as BannerImageType,
  WorkCarousel as WorkCarouselType
} from '@/types';
import type { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  {
    params
  }: {
    params: Promise<Props['params']>;
  },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const work = await getWork(resolvedParams.slug);

  if (!work) {
    return {};
  }

  return {
    title: work.clientName,
    description: work.briefDescription
  };
}

type PageProps = {
  params: Promise<Props['params']>;
};

// Function to determine if a color is dark
function isColorDark(color: string): boolean {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    // Ensure we have a valid 6-character hex
    if (hex.length !== 6) return false;
    
    try {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      
      // Calculate relative luminance
      // Using the formula: (0.299 * R + 0.587 * G + 0.114 * B)
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    } catch {
      return false;
    }
  }
  
  // Handle rgb/rgba colors
  if (color.startsWith('rgb')) {
    try {
      const matches = color.match(/\d+/g);
      if (!matches || matches.length < 3) return false;
      
      const r = Number(matches[0]);
      const g = Number(matches[1]);
      const b = Number(matches[2]);
      
      if (isNaN(r) || isNaN(g) || isNaN(b)) return false;
      
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    } catch {
      return false;
    }
  }
  
  return false;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const work = await getWork(resolvedParams.slug);
  const workContent = await getWorkContent(work?.content?.sys.id, { preview: false });

  if (!work) {
    notFound();
  }

  const tacticsItem = workContent?.contentCollection?.items.find(item => item.__typename === 'WorkTactics');
  const tactics = tacticsItem && 'tactics' in tacticsItem ? tacticsItem as WorkTacticsType : undefined;
  const sectionColor = work.sectionColor?.value || '';
  const initialTheme = isColorDark(sectionColor) ? 'dark' : 'light';

  return (
    <>
      <ScrollThemeTransition theme={initialTheme}>
        <section
          className="relative -mt-24 flex min-h-[60vh]"
          style={{
            backgroundColor: work.sectionColor?.value
          }}
        >
          <Container className="flex items-center justify-center">
            <Box direction="col" gap={2} className="max-w-[1440px]">
              <h1 className="">{work.clientName}</h1>
              <h1 className="opacity-50">{work.sector}</h1>
              <p className="max-w-lg">{work.briefDescription}</p>
              <Box className="flex flex-col gap-8 md:flex-row md:gap-24">
                <Box className="" direction="col" gap={2}>
                  <p className="">
                    {work.categoriesCollection?.items
                      ?.map((item) => item.name)
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </Box>
              </Box>
            </Box>
          </Container>
        </section>
      </ScrollThemeTransition>
      <ScrollThemeTransition theme={'light'} topAligned>

        {workContent?.contentCollection?.items.map((item, index) => {
          if (item.__typename === 'WorkCopy') {
            const workCopyItem = item as unknown as WorkCopyType;
            if ('header' in workCopyItem) {
              return <WorkCopy key={index} {...workCopyItem} />;
            }
            return null;
          }
          if (item.__typename === 'FigmaPrototype') {
            const figmaItem = item as unknown as FigmaPrototypeType;
            if ('embedLink' in figmaItem) {
              return <FigmaPrototype key={index} {...figmaItem} />;
            }
            return null;
          }
          if (item.__typename === 'WorkTactics') {
            const tacticsItem = item as unknown as WorkTacticsType;
            if ('tactics' in tacticsItem) {
              return <WorkTactics key={index} {...tacticsItem} />;
            }
            return null;
          }
          if (item.__typename === 'ImageGridBox') {
            const imageGridBox = item as ImageGridBoxType;
            return (
              <ImageGridBox
                key={imageGridBox.sys.id}
                {...imageGridBox}
                secondaryColor={work.sectionSecondaryColor?.value ?? ''}
                accentColor={work.sectionAccentColor?.value ?? ''}
              />
            );
          }
          if (item.__typename === 'WorkScrollingSection') {
            const workScrollingSection = item as WorkScrollingSectionType;
            return (
              <WorkScrollingSection
                key={workScrollingSection.sys.id}
                {...workScrollingSection}
                secondaryColor={work.sectionSecondaryColor?.value ?? ''}
                accentColor={work.sectionAccentColor?.value ?? ''}
              />
            );
          }
          if (item.__typename === 'VideoSection') {
            const videoSection = item as VideoSectionType;
            return <VideoSection key={videoSection.sys.id} {...videoSection} />;
          }
          if (item.__typename === 'SplitImageSection') {
            const splitImageItem = item as unknown as SplitImageSectionType;
            if ('contentCollection' in splitImageItem) {
              return <SplitImageSection key={index} {...splitImageItem} />;
            }
            return null;
          }
          if (item.__typename === 'FramedAsset') {
            const framedAssetItem = item as unknown as FramedAssetType;
            if ('asset' in framedAssetItem) {
              return <FramedAsset 
                key={index} 
                {...framedAssetItem} 
                sectionColor={work.sectionColor?.value ?? ''} 
              />;
            }
            return null;
          }
          if (item.__typename === 'BannerImage') {
            const bannerImageItem = item as unknown as BannerImageType;
            if ('content' in bannerImageItem) {
              return <BannerImage 
                key={index} 
                {...bannerImageItem} 
                sectionColor={work.sectionColor?.value ?? ''} 
              />;
            }
            return null;
          }
          if (item.__typename === 'WorkCarousel') {
            const carouselItem = item as unknown as WorkCarouselType;
            if ('contentCollection' in carouselItem) {
              return <WorkCarousel 
                key={index} 
                {...carouselItem} 
                sectionColor={work.sectionAccentColor?.value ?? ''} 
              />;
            }
            return null;
          }
          return null;
        })}
        <Section>
          <Container>
            <Box className="justify-between">
              <Box className="" direction="col" gap={2}>
                <p className="text-[0.875rem] font-light uppercase opacity-40">Client</p>
                <p className="">{work.clientName}</p>
              </Box>
              <Box className="" direction="col" gap={2}>
                <p className="text-[0.875rem] font-light uppercase opacity-40">Industry</p>
                <p className="">{work.sector}</p>
              </Box>
              <Box className="" direction="col" gap={2}>
                <p className="text-[0.875rem] font-light uppercase opacity-40">Tactics</p>
                <p className="whitespace-pre-line">{tactics?.tactics?.join('\n')}</p>
              </Box>
              <Box className="" direction="col" gap={2}>
                <p className="text-[0.875rem] font-light uppercase opacity-40">Timeline</p>
                <p className="">{work.timeline ? new Date(work.timeline).getFullYear() : 'Present'}</p>
              </Box>
            </Box>
          </Container>
        </Section>
      </ScrollThemeTransition>
    </>
  );
}
