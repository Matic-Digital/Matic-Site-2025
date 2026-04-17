'use client';

import { Container, Box, Section } from '@/components/global/matic-ds';
import type { Industry, ServiceComponent, Testimonial, Item } from '@/types/contentful';
import type { Insight } from '@/types';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FAQSection } from '@/components/global/FAQSection';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { Carousel } from '@/components/ui/carousel';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import TestimonialsItems from '@/components/services/TestimonialsItems';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ServicePageClientAltProps {
  industry: Industry;
  allIndustries: Industry[];
  serviceComponent?: ServiceComponent;
  testimonials: Testimonial[];
  insights: Insight[];
  isPreviewMode?: boolean;
}

export default function ServicePageClientAlt({
  industry,
  allIndustries,
  serviceComponent: _serviceComponent,
  testimonials: _testimonials,
  insights: _insights,
  isPreviewMode: _isPreviewMode = false
}: ServicePageClientAltProps) {
  // Custom rich text rendering options for CTA section
  const ctaRenderOptions: Options = {
    renderNode: {
      [BLOCKS.HEADING_3]: (_node, children) => (
        <h3 className="text-4xl font-bold text-maticblack">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_node, children) => (
        <h4 className="text-3xl font-semibold text-maticblack">{children}</h4>
      ),
      [BLOCKS.PARAGRAPH]: (_node, children) => (
        <p className="text-xl leading-[160%] tracking-[-0.025rem] text-maticblack">{children}</p>
      )
    }
  };
  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'dark'
          },
          {
            percentage: 20,
            theme: 'light'
          }
        ]}
      />
      {/* Hero Section */}
      <Section className="relative -mt-[var(--header-height,5rem)] bg-maticblack pt-[var(--header-height,5rem)]">
        {/* Background Image */}
        {industry.mainImage?.url && (
          <div className="absolute inset-0 z-0">
            <Image
              src={industry.mainImage.url}
              alt={industry.name}
              fill
              className="rounded-none border-none object-cover"
              priority
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-maticblack/50" />
          </div>
        )}
        <Container className="relative z-10">
          <Box direction="col" className="gap-8 pt-24">
            <div className="flex w-full flex-col gap-[1.62rem] md:w-[60%]">
              {industry.heroOverline && (
                <p className="text-sm font-semibold uppercase tracking-wider">
                  <Link href="/services" className="text-white/80 hover:text-white/80 hover:underline">SERVICES</Link>
                  <span className="text-white/80">{' / '}</span>
                  <span className="uppercase text-[#076EFF]">{industry.heroOverline}</span>
                </p>
              )}
              <h1 className="text-4xl font-bold text-white md:text-5xl">{industry.heroHeader}</h1>
              {industry.heroDescription && (
                <p className="text-lg text-white/80 md:text-2xl">{industry.heroDescription}</p>
              )}
            </div>
            
            {/* Page Navigation */}
            <div className="flex gap-8 overflow-x-auto pt-16">
              {allIndustries
                .filter((ind: Industry) => ind.pageVariant === 'Alt')
                .map((ind: Industry) => (
                  <Link
                    key={ind.sys.id}
                    href={`/services/${ind.slug}`}
                    className={`whitespace-nowrap text-xl font-medium transition-colors hover:text-white ${
                      ind.slug === industry.slug ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {ind.name}
                  </Link>
                ))}
            </div>
          </Box>
        </Container>
      </Section>

      {/* Service Items Section */}
      {industry.serviceItemCollection?.items && industry.serviceItemCollection.items.length > 0 && (
        <Section className="bg-white pb-[5rem]">
          <Container className="px-[1.5rem] pt-[4rem]">
            {industry.heroCtaTitle && (
              <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-[#076EFF]">
                {industry.heroCtaTitle}
              </p>
            )}
            <div className="mt-8 space-y-12 md:space-y-[20rem]">
              {industry.serviceItemCollection.items
                .filter((item: Item) => item.variant === 'Service Item')
                .map((item: Item) => (
                  <div
                    key={item.sys.id}
                    className="relative w-full border-b border-t border-gray-200 py-12"
                  >
                    {/* Service info and asset section */}
                    <Box direction={{ base: 'col', lg: 'row' }} className="gap-8 lg:gap-8">
                      {/* Left side - Service info */}
                      <div className="flex-1">
                        <div className="sticky top-[14rem] z-10">
                          <Box direction="col" className="h-full">
                            <h3 className="mb-4 whitespace-normal text-xl font-medium leading-[120%] tracking-[-0.06rem] text-maticblack md:whitespace-nowrap">
                              {item.title || item.internalName}
                            </h3>
                            <div className="flex flex-col gap-[1.62rem] md:max-w-[38rem]">
                              {item.richDescription && (
                                <div className="text-base font-medium leading-[160%] tracking-[-0.0125rem] text-maticblack">
                                  {documentToReactComponents(item.richDescription.json)}
                                </div>
                              )}
                              
                              {item.wordList && item.wordList.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {item.wordList.map((word) => (
                                    <div
                                      key={word}
                                      className="bg-white px-3 py-1.5 text-maticblack"
                                      style={{ 
                                        border: '1px solid #D9D9D9', 
                                        borderRadius: '3.125rem',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        lineHeight: '160%',
                                        letterSpacing: '-0.02rem'
                                      }}
                                    >
                                      {word}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Box>
                        </div>
                      </div>

                      {/* Right side - Service Asset */}
                      {item.image?.url && (
                        <div className="h-[24rem] flex-1">
                          <div className="h-[24rem] w-full overflow-hidden rounded-lg border-none">
                            <Image
                              src={item.image.url}
                              alt={item.title || item.internalName}
                              width={item.image.width || 800}
                              height={item.image.height || 600}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </Box>
                  </div>
                ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Industry CTA Section */}
      {industry.industryCta && (
        <Section className="bg-white py-24">
          <Container>
            <Box direction={{ base: 'col', lg: 'row' }} className="gap-12 lg:gap-16">
              {/* Left side - Title with Image Behind */}
              <div className="relative flex-1 overflow-visible">
                {industry.industryCta.image?.url && (
                  <div className="absolute -left-[30%] top-0 z-0 h-[54rem] w-[54rem]">
                    <Image
                      src={industry.industryCta.image.url}
                      alt={industry.industryCta.title}
                      fill
                      className="border-none object-cover"
                    />
                  </div>
                )}
                <div className="relative z-10 flex flex-col gap-6">
                  <h2 className="text-4xl font-bold leading-tight text-maticblack md:text-5xl lg:text-6xl">
                    {industry.industryCta.title}
                  </h2>
                  <Link href={industry.industryCta.buttonLink || '/contact'}>
                    <Button
                      variant="default"
                      className="w-fit rounded-sm border-2 border-maticblack bg-transparent px-6 py-3 text-maticblack hover:bg-maticblack hover:text-white"
                    >
                      {industry.industryCta.buttonText || 'Contact us'}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right side - Overline and Description */}
              <div className="flex flex-1 flex-col gap-6">
                {industry.industryCta.overline && (
                  <p className="text-sm font-medium uppercase tracking-wider text-[#076EFF]">
                    {industry.industryCta.overline}
                  </p>
                )}
                {industry.industryCta.richDescription && (
                  <div className="prose max-w-none text-base leading-relaxed text-maticblack">
                    {documentToReactComponents(
                      industry.industryCta.richDescription.json,
                      ctaRenderOptions
                    )}
                  </div>
                )}
              </div>
            </Box>
          </Container>
        </Section>
      )}

      {/* Work Samples Section */}
      {industry.workSamplesCollection?.items && industry.workSamplesCollection.items.length > 0 && (
        <Section className="bg-white py-24">
          <Container>
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-4xl font-bold text-maticblack md:text-5xl">Case studies</h2>
              <Link
                href="/work"
                className="rounded-sm bg-maticblack px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-maticblack/90"
              >
                See all work
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {industry.workSamplesCollection.items.map((work, index) => (
                <div key={work.sys.id} className="group relative overflow-hidden">
                  {/* Background Image */}
                  {work.featuredImage?.url && (
                    <div
                      className={`relative w-full overflow-hidden rounded-none ${index % 2 === 0 ? 'aspect-[4/3.45]' : 'aspect-[4/3]'}`}
                    >
                      <Image
                        src={work.featuredImage.url}
                        alt={work.clientName}
                        fill
                        className="rounded-none border-none object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="bg-white p-6">
                    <h3 className="mb-2 text-xl text-maticblack">{work.clientName}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-maticblack/70">
                      {work.briefDescription}
                    </p>
                    <Link
                      href={`/work/${work.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-maticblack transition-colors hover:text-maticblack/70"
                    >
                      See Work
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Insights/Blog Section */}
      <Section className="bg-maticblack py-24">
        <Container>
          <div className="m-4 rounded-[0.5rem] bg-white p-8">
            <Box direction="col" className="space-y-8">
              <div className="flex items-center justify-between text-maticblack">
                <h2 className="text-maticblack">{industry.name} blogs</h2>
                <Link href="/insights" className="group flex items-center gap-2">
                  <p>All entries</p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <ArrowRight className="h-4 w-4 text-maticblack transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </Link>
              </div>
              <InsightsGrid
                variant="recent"
                initialInsights={_insights}
                className="text-maticblack"
              />
            </Box>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      {industry.faqItemsCollection?.items && industry.faqItemsCollection.items.length > 0 && (
        <FAQSection
          faqItems={industry.faqItemsCollection.items.filter(
            (item: Item) => item.variant === 'FAQ'
          )}
        />
      )}

      {/* Testimonials Section */}
      <Section className="dark bg-[#076EFF]">
        <Container>
          <Carousel opts={{ align: 'start' }}>
            <Box direction="col" className="relative">
              <CarouselNavigation />
              <Image
                src="/Brandmark.svg"
                alt="Matic Digital"
                width={94}
                height={39}
                className="h-[2.4375rem] w-[5.875rem] rounded-none border-none"
              />
              <TestimonialsItems testimonials={_testimonials} />
            </Box>
          </Carousel>
        </Container>
      </Section>
    </>
  );
}
