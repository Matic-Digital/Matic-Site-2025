import { Section, Container, Box } from '@/components/global/matic-ds';
import { WorkCopy } from '@/components/work/WorkCopy';
import { WorkTactics } from '@/components/work/WorkTactics';
import { ImageGridBox } from '@/components/work/ImageGridBox';
import { WorkScrollingSection } from '@/components/work/WorkScrollingSection';
import { VideoSection } from '@/components/work/VideoSection';
import { SplitImageSection } from '@/components/work/SplitImageSection';
import { FramedAsset } from '@/components/work/FramedAsset';
import { BannerImage } from '@/components/work/BannerImage';
import { WorkCarousel } from '@/components/work/WorkCarousel';
import { ImageComparison } from '@/components/work/ImageComparison';
import { notFound } from 'next/navigation';
import { getWorkBySlug, getWorkContent } from '@/lib/api';
import type {
  WorkCopyProps as WorkCopyType,
  WorkTactics as WorkTacticsType,
  ImageGridBox as ImageGridBoxType,
  WorkScrollingSection as WorkScrollingSectionType,
  VideoSection as VideoSectionType,
  SplitImageSection as SplitImageSectionType,
  FramedAsset as FramedAssetType,
  BannerImage as BannerImageType,
  WorkCarousel as WorkCarouselType,
  ImageComparison as ImageComparisonType
} from '@/types';
import type { Metadata } from 'next';
import { ScrollProgress } from '@/components/global/ScrollProgress';

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

type PageProps = {
  params: Promise<Props['params']>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const work = await getWorkBySlug(resolvedParams.slug, { preview: true });

  if (!work) {
    return {};
  }

  const fallbackTitle = `${work.clientName} | Matic Digital`;
  const title = work.seoTitle ?? fallbackTitle;
  const description = work.seoDescription ?? work.briefDescription;
  const ogUrl = work.ogImage?.url ?? work.featuredImage?.url ?? '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogUrl
        ? [
            {
              url: ogUrl,
              width: 1200,
              height: 630,
              alt: work.clientName
            }
          ]
        : undefined
    }
  };
}

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
  const work = await getWorkBySlug(resolvedParams.slug, { preview: true });

  if (!work) {
    notFound();
  }

  const workContent = await getWorkContent(work.content.sys.id, true);
  const tacticsItem = workContent?.contentCollection?.items.find(
    (item) => item.__typename === 'WorkTactics'
  );
  const tactics =
    tacticsItem && 'tactics' in tacticsItem ? (tacticsItem as WorkTacticsType) : undefined;
  const sectionColor = work.sectionColor?.value || '';
  const initialTheme = isColorDark(sectionColor) ? 'dark' : 'light';

  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: initialTheme
          },
          {
            percentage: 6.89,
            theme: 'light'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: initialTheme
          },
          {
            percentage: 4.35,
            theme: 'light'
          }
        ]}
      />
      <section
        className="relative -mt-24 flex pb-[5rem] pt-[11.25rem] md:min-h-[106vh] md:pb-[16.25rem] md:pt-[10.75rem]"
        style={{
          backgroundColor: work.sectionColor?.value
        }}
      >
        <Container className="flex items-center justify-center">
          <Box direction="col" className="max-w-[1440px] gap-[3rem]">
            <Box className="" direction="col">
              <h1 className="text-[2.125rem] leading-[120%] tracking-[-0.06375rem] md:text-[3.5rem] md:tracking-[-0.105rem]">
                {work.clientName}
              </h1>
              <p className="text-[2.125rem] leading-[120%] tracking-[-0.06375rem] opacity-50 md:text-[3.5rem] md:tracking-[-0.105rem]">
                {work.sector}
              </p>
            </Box>
            <Box className="flex flex-col gap-8 md:flex-row md:gap-24">
              <Box className="gap-[1.25rem]" direction="col">
                <p className="max-w-lg text-base leading-[140%] md:max-w-[41rem] md:text-[1.75rem]">
                  {work.briefDescription}
                </p>
                <Box className="flex flex-col gap-8 md:flex-row md:gap-24 md:gap-[1.52rem]">
                  <Box className="" direction="col" gap={2}>
                    <p className="text-[0.8125rem] md:text-base">
                      {work.categoriesCollection?.items
                        ?.map((item) => item.name)
                        .filter(Boolean)
                        .join(' • ')}
                    </p>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </section>
      <Section className="relative -mt-12 bg-background pt-0 text-text dark:bg-text dark:text-background">
        <div className="">
          {workContent?.contentCollection?.items.map((item, index) => {
            if (item.__typename === 'WorkCopy') {
              const workCopyItem = item as unknown as WorkCopyType;
              if ('header' in workCopyItem) {
                return <WorkCopy key={index} {...workCopyItem} />;
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
                  _secondaryColor={work.sectionSecondaryColor?.value ?? ''}
                  _accentColor={work.sectionAccentColor?.value ?? ''}
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
                return (
                  <FramedAsset
                    key={index}
                    {...framedAssetItem}
                    sectionColor={work.sectionColor?.value ?? ''}
                  />
                );
              }
              return null;
            }
            if (item.__typename === 'BannerImage') {
              const bannerImageItem = item as unknown as BannerImageType;
              if ('content' in bannerImageItem) {
                return (
                  <BannerImage
                    key={index}
                    {...bannerImageItem}
                    sectionColor={work.sectionColor?.value ?? ''}
                  />
                );
              }
              return null;
            }
            if (item.__typename === 'WorkCarousel') {
              const carouselItem = item as unknown as WorkCarouselType;
              if ('contentCollection' in carouselItem) {
                return <WorkCarousel key={index} {...carouselItem} />;
              }
              return null;
            }
            if (item.__typename === 'ImageComparison') {
              const imageComparisonItem = item as unknown as ImageComparisonType;
              if ('beforeImage' in imageComparisonItem && 'afterImage' in imageComparisonItem) {
                return <ImageComparison key={index} {...imageComparisonItem} />;
              }
              return null;
            }
            return null;
          })}
        </div>
      </Section>
      <Section>
        <Container>
          <hr className="mb-[1.75rem]" />
          <Box
            className="items-center justify-between gap-[2.25rem] md:items-start"
            direction={{ base: 'col', md: 'row' }}
          >
            <Box className="items-center md:items-start" direction="col">
              <p className="text-[0.75rem] uppercase leading-[120%] opacity-40">Client</p>
              <p className="text-[0.875rem] font-semibold">{work.clientName}</p>
            </Box>
            <Box className="items-center md:items-start" direction="col">
              <p className="text-[0.75rem] uppercase leading-[120%] opacity-40">Industry</p>
              <p className="text-[0.875rem] font-semibold">{work.sector}</p>
            </Box>
            <Box className="items-center md:items-start" direction="col">
              <p className="text-[0.75rem] uppercase leading-[120%] opacity-40">Tactics</p>
              <Box direction="col" className="items-center gap-[0.25rem] md:items-start">
                {tactics?.tactics?.map((tactic, index) => (
                  <p key={index} className="text-[0.875rem] font-semibold leading-[160%]">
                    {tactic}
                  </p>
                ))}
              </Box>
            </Box>
            <Box className="items-center md:items-start" direction="col">
              <p className="text-[0.75rem] uppercase leading-[120%] opacity-40">Timeline</p>
              <p className="text-[0.875rem] font-semibold">
                {work.timeline ? new Date(work.timeline).getFullYear() : 'Present'}
              </p>
            </Box>
          </Box>
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16">
            <div className="space-y-4">
              <h2 className="text-[1.5rem] font-chalet-newyork">Client</h2>
              <p className="text-[0.875rem] leading-[160%]">{work.clientName}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-[1.5rem] font-chalet-newyork">Industry</h2>
              <p className="text-[0.875rem] leading-[160%]">{work.sector}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-[1.5rem] font-chalet-newyork">Timeline</h2>
              <p className="text-[0.875rem] leading-[160%]">{work.timeline ? new Date(work.timeline).getFullYear() : 'Present'}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-[1.5rem] font-chalet-newyork">Tactics</h2>
              <p className="text-[0.875rem] leading-[160%] whitespace-pre-line">{tactics?.tactics?.join('\n')}</p>
            </div>
          </div> */}
        </Container>
      </Section>
    </>
  );
}
