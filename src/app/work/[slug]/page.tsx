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

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const work = await getWork(resolvedParams.slug);
  const workContent = await getWorkContent(work?.content?.sys.id, { preview: false });

  if (!work) {
    notFound();
  }

  const tactics = workContent?.contentCollection?.items.find(item => item.__typename === 'WorkTactics') as WorkTacticsType;

  return (
    <>
      <ScrollThemeTransition theme="light">
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
                  <p className="text-[0.875rem] font-light uppercase opacity-40">
                    Categories
                  </p>
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
        {workContent?.contentCollection?.items.map((item) => {
          if (item.__typename === 'WorkCopy') {
            const workCopy = item as WorkCopyType;
            return <WorkCopy key={workCopy.header} {...workCopy} />;
          }
          if (item.__typename === 'FigmaPrototype') {
            const figmaPrototype = item as FigmaPrototypeType;
            return <FigmaPrototype key={figmaPrototype.sys.id} {...figmaPrototype} />;
          }
          if (item.__typename === 'WorkTactics') {
            const workTactics = item as WorkTacticsType;
            return <WorkTactics key={workTactics.sys.id} {...workTactics} />;
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
            const splitImageSection = item as SplitImageSectionType;
            return (
              <SplitImageSection
                key={splitImageSection.sys.id}
                name={splitImageSection.name}
                copy={splitImageSection.copy}
                contentCollection={splitImageSection.contentCollection}
              />
            );
          }
          if (item.__typename === 'FramedAsset') {
            const framedAsset = item as FramedAssetType;
            return (
              <FramedAsset
                key={framedAsset.sys.id}
                name={framedAsset.name}
                asset={framedAsset.asset}
                sectionColor={work.sectionColor?.value ?? ''}
              />
            );
          }
          if (item.__typename === 'BannerImage') {
            const bannerImage = item as BannerImageType;
            return (
              <BannerImage
                key={bannerImage.sys.id}
                name={bannerImage.name}
                content={bannerImage.content}
                sectionColor={work.sectionColor?.value ?? ''}
              />
            );
          }
          if (item.__typename === 'WorkCarousel') {
            const workCarousel = item as WorkCarouselType;
            return (
              <WorkCarousel
                key={workCarousel.sys.id}
                {...workCarousel}
                sectionColor={work.sectionColor?.value ?? ''}
              />
            );
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
