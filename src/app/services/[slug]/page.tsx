// Next.js components and utilities
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

// API functions
import {
  getAllIndustries,
  getIndustry,
  getServiceComponent,
  getInsightsFromDifferentCategories,
  getAllTestimonials
} from '@/lib/api';
import ServicePageClient from './ServicePageClient';

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
  const industries = await getAllIndustries();
  return industries.items.map((industry) => ({
    slug: industry.slug
  }));
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
  const industry = await getIndustry(resolvedParams.slug, { preview: isPreviewMode });

  if (!industry) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.'
    };
  }

  const fallbackTitle = `${industry.name} Services - Matic Digital`;
  const fallbackDescription = `Explore our ${industry.name.toLowerCase()} services and solutions. See how we help businesses in the ${industry.name.toLowerCase()} industry achieve their digital goals.`;
  const ogUrl = industry.ogImage?.url ?? industry.mainImage?.url ?? '';

  return {
    title: industry.seoTitle ?? fallbackTitle,
    description: industry.seoDescription ?? fallbackDescription,
    openGraph: {
      title: industry.seoTitle ?? fallbackTitle,
      description: industry.seoDescription ?? fallbackDescription,
      images: ogUrl
        ? [
            {
              url: ogUrl,
              width: 1200,
              height: 630,
              alt: `${industry.name} Services`
            }
          ]
        : undefined
    }
  };
}

export default async function ServicePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreviewMode = resolvedSearchParams.preview === 'true';
  const [industry, allIndustries, serviceComponent, insights, testimonials] = await Promise.all([
    getIndustry(resolvedParams.slug, { preview: isPreviewMode }),
    getAllIndustries(10, {}, isPreviewMode),
    getServiceComponent('1xHRTfLve3BvEp2NWD6AZm'),
    getInsightsFromDifferentCategories(),
    getAllTestimonials()
  ]);

  // Redirect to 404 page if industry not found
  if (!industry) {
    notFound();
  }

  return (
    <>
      <ServicePageClient
        industry={industry}
        allIndustries={allIndustries.items}
        serviceComponent={serviceComponent ?? undefined}
        testimonials={testimonials}
        insights={insights}
        isPreviewMode={isPreviewMode}
      />
    </>
  );
}
