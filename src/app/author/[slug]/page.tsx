// Next.js components and utilities
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';

// API functions
import { getAllTeamMemberSlugs, getTeamMemberBySlug, getRecentInsightsByAuthor } from '@/lib/api';
import { ContentfulPreviewScript } from '@/components/insights/ContentfulPreviewScript';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import type { Insight } from '@/types/contentful';
import { CTASection } from '@/components/global/CTASection';

type Props = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

type PageProps = {
  params: Promise<Props['params']>;
  searchParams: Promise<Props['searchParams']>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllTeamMemberSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  {
    params,
    searchParams
  }: {
    params: Promise<Props['params']>;
    searchParams: Promise<Props['searchParams']>;
  },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreviewMode = resolvedSearchParams.preview === 'true';

  const member = await getTeamMemberBySlug(resolvedParams.slug, isPreviewMode);

  if (!member) {
    return {
      title: 'Author Not Found',
      description: 'The author you are looking for does not exist.'
    };
  }

  const title = `${member.name}${member.title ? ` — ${member.title}` : ''} | Matic Digital`;
  const description =
    member.bio && member.bio.trim().length > 0
      ? `${member.bio.trim().slice(0, 155)}${member.bio.trim().length > 155 ? '…' : ''}`
      : member.title
        ? `${member.name} — ${member.title} at Matic Digital.`
        : `${member.name} at Matic Digital.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(member.headshot?.url
        ? {
            images: [
              {
                url: member.headshot.url,
                width: member.headshot.width ?? 800,
                height: member.headshot.height ?? 800,
                alt: member.name
              }
            ]
          }
        : {})
    }
  };
}

export default async function AuthorPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreviewMode = resolvedSearchParams.preview === 'true';

  const member = await getTeamMemberBySlug(resolvedParams.slug, isPreviewMode);

  if (!member) {
    notFound();
  }

  // Fetch up to 6 insights by this author
  const authorInsights = member?.sys?.id
    ? await getRecentInsightsByAuthor(member.sys.id, 6, isPreviewMode)
    : { items: [], total: 0 };

  const content = (
    <>
      <ScrollProgress
        breakpoints={[
          { percentage: 0, theme: 'light' },
          { percentage: 70, theme: 'dark' }
        ]}
        mobileBreakpoints={[
          { percentage: 0, theme: 'light' },
          { percentage: 75, theme: 'dark' }
        ]}
      />
      <Section className="py-10">
        <Container>
          {isPreviewMode && (
            <div className="bg-blue-600 mb-6 flex items-center justify-between p-2 text-sm text-white">
              <span>Preview Mode Enabled - Viewing unpublished content</span>
              <a
                href={`/api/exit-preview?redirect=/author/${resolvedParams.slug}`}
                className="text-blue-600 rounded bg-white px-3 py-1 transition-colors hover:bg-gray-100"
              >
                Exit Preview
              </a>
            </div>
          )}

          <div className="mt-2 flex flex-col gap-[3.81rem] md:flex-row md:items-start">
            {/* Left: Headshot */}
            {member.headshot?.url && (
              <div className="md:w-[15.3125rem] md:flex-none">
                <Image
                  src={member.headshot.url}
                  alt={member.name}
                  width={245}
                  height={275}
                  className="h-[17.17988rem] w-[15.3125rem] rounded-[0.75rem] border-none object-cover"
                  priority
                />
              </div>
            )}

            {/* Right: Details */}
            <div className="mt-[5rem] max-w-[50%] flex-1">
              <h1 className="text-4xl text-maticblack md:text-5xl">{member.name}</h1>
              {(member.title || member.location) && (
                <p className="mt-[0.7rem] text-xl font-medium text-maticblack">
                  {member.title}
                  {member.title && member.location ? ' - ' : ''}
                  {member.location}
                </p>
              )}

              {member.bio && (
                <div className="prose mt-[1.4rem] max-w-none">
                  <p className="text-xl font-medium text-maticblack">{member.bio}</p>
                </div>
              )}

              {member.socialsCollection?.items && member.socialsCollection.items.length > 0 && (
                <div className="mt-[3.3rem] flex items-center gap-6" aria-label="Social Profiles">
                  {member.socialsCollection.items.map((social) => (
                    <Link key={social.sys.id} href={social.url} target="_blank">
                      <Image
                        src={social.logo.url}
                        alt={social.name}
                        width={100}
                        height={100}
                        className="filter-footer aspect-square w-[25px] rounded-none border-none object-contain"
                      />
                    </Link>
                  ))}
                  <Link
                    href={`mailto:hello@maticdigital.com`}
                    className="text-maticblack transition-colors hover:text-blue"
                  >
                    <p className="text-[hsl(var(--footer-text-hsl))]">hello@maticdigital.com</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="mt-[7.04rem] h-[0.0625rem] w-full bg-maticblack opacity-50" />

          {/* Articles by Author */}
          <div className="mt-10">
            <h2 className="mb-[3.3rem] text-3xl text-maticblack">
              Articles by {member.name}
              {typeof authorInsights.total === 'number' && (
                <span className="ml-2 text-3xl font-normal text-[#A4A5B3]">
                  {authorInsights.total}
                </span>
              )}
            </h2>
            {authorInsights.items?.length ? (
              <InsightsGrid
                variant="recent"
                initialInsights={authorInsights.items as unknown as Insight[]}
              />
            ) : (
              <p className="text-[#A4A5B3]">No articles yet.</p>
            )}
          </div>
        </Container>
      </Section>
      <div className="dark bg-background">
        <CTASection
          sectionHeader={"Let's get it together."}
          sectionSubheader={"Need a partner for what's next?"}
          ctaButtonText={'Get in touch'}
          backgroundImageRoute="/about/cta.jpg"
        />
      </div>
    </>
  );

  return isPreviewMode ? (
    <ContentfulPreviewScript isPreviewMode={isPreviewMode}>{content}</ContentfulPreviewScript>
  ) : (
    content
  );
}
