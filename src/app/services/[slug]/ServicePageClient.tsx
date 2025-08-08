'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container, Section } from '@/components/global/matic-ds';
import ServiceHero from '@/components/services/ServiceHero';
import type { Industry } from '@/types/contentful';
import { ArrowRight } from 'lucide-react';

interface ServicePageClientProps {
  industry: Industry;
  allIndustries: Industry[];
  isPreviewMode?: boolean;
}

export function findSecondBoxColor(slug: string) {
  switch (slug) {
    case 'energy':
      return 'bg-[#060EC2]';
    case 'martech':
      return 'bg-[#DD2590]';
    case 'health':
      return 'bg-[#12B76A]';
  }
}

export function ServicePageClient({
  industry,
  allIndustries,
  isPreviewMode: _isPreviewMode = false
}: ServicePageClientProps) {
  return (
    <>
      {/* Service Hero Component */}
      <ServiceHero
        overline={industry.heroOverline}
        heading={industry.heroHeader}
        description={`Transform your ${industry.name.toLowerCase()} business with our cutting-edge digital solutions and industry expertise.`}
        overlineColor="text-orange"
        imageSrc={industry.mainImage.url}
        imageAlt={`${industry.name} industry solutions`}
        firstBoxDescription={industry.heroCtaTitle}
        secondBoxDescription={industry.heroCtaDescription}
        secondBoxColor={findSecondBoxColor(industry.slug)}
      />

      {/* Placeholder for Services Section - will be added back once GraphQL works */}
      <Section className="py-24">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">{industry.name} Services</h2>
            <p className="text-xl text-gray-600">
              Coming soon - services for the {industry.name.toLowerCase()} industry
            </p>
          </div>
        </Container>
      </Section>

      {/* Placeholder for Work Sample Section - will be added back once GraphQL works */}
      <Section className="bg-gray-50 py-24">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Featured Work</h2>
            <p className="text-xl text-gray-600">Coming soon - featured work samples</p>
          </div>
        </Container>
      </Section>

      {/* Other Industries Section */}
      <Section className="py-24">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Other Industries</h2>
            <p className="text-xl text-gray-600">Explore our expertise across different sectors</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allIndustries
              .filter((otherIndustry) => otherIndustry.slug !== industry.slug)
              .slice(0, 3)
              .map((otherIndustry) => (
                <Link
                  key={otherIndustry.sys.id}
                  href={`/services/${otherIndustry.slug}`}
                  className="group block overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={otherIndustry.mainImage.url}
                      alt={otherIndustry.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="group-hover:text-blue-600 text-xl font-semibold">
                      {otherIndustry.name}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>

          {allIndustries.length > 4 && (
            <div className="mt-12 text-center">
              <Link
                href="/services"
                className="inline-flex items-center rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
              >
                <span>View All Services</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-blue-600 py-24 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Ready to transform your {industry.name.toLowerCase()} business?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Let&apos;s discuss how our specialized {industry.name.toLowerCase()} solutions can
              help you achieve your goals.
            </p>
            <Link
              href="/contact"
              className="text-blue-600 inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold transition-colors hover:bg-gray-100"
            >
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
