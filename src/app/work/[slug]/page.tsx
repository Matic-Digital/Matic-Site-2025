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
import type { PreviewOptions, WorkCopy as WorkCopyType, FigmaPrototype as FigmaPrototypeType, WorkTactics as WorkTacticsType, ImageGridBox as ImageGridBoxType, WorkScrollingSection as WorkScrollingSectionType, VideoSection as VideoSectionType } from '@/types';
import type { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<Props['params']> 
}, _parent: ResolvingMetadata): Promise<Metadata> {
  const resolvedParams = await params;
  const work = await getWork(resolvedParams.slug);

  if (!work) {
    return {};
  }

  return {
    title: work.clientName,
    description: work.briefDescription,
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
        <section className="relative">
          <Container>
            <Box className="py-32">
              <h1 className="text-5xl font-bold">{work.clientName}</h1>
            </Box>
          </Container>
        </section>
        <Section>
          <Container>
            {workContent?.contentCollection?.items.map((item) => {
              if (item.__typename === 'WorkCopy') {
                const workCopy = item as WorkCopyType;
                return <WorkCopy key={workCopy.sys.id} {...workCopy} />;
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
                return <ImageGridBox key={imageGridBox.sys.id} {...imageGridBox} />;
              }
              if (item.__typename === 'WorkScrollingSection') {
                const workScrollingSection = item as WorkScrollingSectionType;
                return <WorkScrollingSection key={workScrollingSection.sys.id} {...workScrollingSection} />;
              }
              if (item.__typename === 'VideoSection') {
                const videoSection = item as VideoSectionType;
                return <VideoSection key={videoSection.sys.id} {...videoSection} />;
              }
              return null;
            })}
          </Container>
        </Section>
      </ScrollThemeTransition>
    </>
  );
}
