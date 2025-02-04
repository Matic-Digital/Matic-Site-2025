import { Section, Container, Box } from '@/components/global/matic-ds';
import { WorkCopy } from '@/components/work/WorkCopy';
import { FigmaPrototype } from '@/components/work/FigmaPrototype';
import { WorkTactics } from '@/components/work/WorkTactics';
import { ImageGridBox } from '@/components/work/ImageGridBox';
import { WorkScrollingSection } from '@/components/work/WorkScrollingSection';
import { VideoSection } from '@/components/work/VideoSection';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { notFound } from 'next/navigation';
import { getWork, getWorkContent } from '@/lib/api';
import type {
  PreviewOptions,
  WorkCopyProps as WorkCopyType,
  FigmaPrototype as FigmaPrototypeType,
  WorkTactics as WorkTacticsType,
  ImageGridBox as ImageGridBoxType,
  WorkScrollingSection as WorkScrollingSectionType,
  VideoSection as VideoSectionType
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

  if (!work) {
    notFound();
  }

  // Fetch work content
  const workContent = await getWorkContent(work.content?.sys.id, { preview: false });

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
            <Box direction="col" gap={2} className="md:min-w-[1440px]">
              <h1 className="">{work.clientName}</h1>
              <h1 className="opacity-50">{work.sector}</h1>
              <p className="max-w-lg">{work.briefDescription}</p>
              <p className="">
                {work.categoriesCollection?.items?.map((item) => item.name).join(' • ')}
              </p>
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
            return <ImageGridBox key={imageGridBox.sys.id} {...imageGridBox} secondaryColor={work.sectionSecondaryColor?.value ?? ''} accentColor={work.sectionAccentColor?.value ?? ''} />;
          }
          if (item.__typename === 'WorkScrollingSection') {
            const workScrollingSection = item as WorkScrollingSectionType;
            return (
              <WorkScrollingSection key={workScrollingSection.sys.id} {...workScrollingSection} secondaryColor={work.sectionSecondaryColor?.value ?? ''} accentColor={work.sectionAccentColor?.value ?? ''} />
            );
          }
          if (item.__typename === 'VideoSection') {
            const videoSection = item as VideoSectionType;
            return <VideoSection key={videoSection.sys.id} {...videoSection} />;
          }
          return null;
        })}
      </ScrollThemeTransition>
    </>
  );
}
