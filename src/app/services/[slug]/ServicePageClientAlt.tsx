'use client';

import { Container, Box, Section } from '@/components/global/matic-ds';
import type { Industry, ServiceComponent, Testimonial, Item } from '@/types/contentful';
import type { Insight } from '@/types';
import { ScrollProgress } from '@/components/global/ScrollProgress';

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
  allIndustries: _allIndustries,
  serviceComponent: _serviceComponent,
  testimonials: _testimonials,
  insights: _insights,
  isPreviewMode: _isPreviewMode = false
}: ServicePageClientAltProps) {
  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          }
        ]}
      />
      <Section className="bg-white">
        <Container>
          <Box direction="col" className="gap-8 py-24">
            <h1 className="text-4xl font-bold text-maticblack md:text-6xl">
              {industry.name} - Alt Variant
            </h1>
            <p className="text-xl text-maticblack/80">
              This is a placeholder for the Alt variant service page. Design and build out the
              custom layout here.
            </p>
            
            {/* Display Service Items if they exist */}
            {industry.serviceItemCollection?.items && industry.serviceItemCollection.items.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-semibold">Service Items</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {industry.serviceItemCollection.items
                    .filter((item: Item) => item.variant === 'Service Item')
                    .map((item: Item) => (
                      <div
                        key={item.sys.id}
                        className="rounded-lg border border-gray-200 p-6 shadow-sm"
                      >
                        {item.image?.url && (
                          <img
                            src={item.image.url}
                            alt={item.title || item.internalName}
                            className="mb-4 h-48 w-full rounded object-cover"
                          />
                        )}
                        <h3 className="mb-2 text-lg font-semibold">
                          {item.title || item.internalName}
                        </h3>
                        {item.richDescription && (
                          <div className="text-sm text-gray-600">
                            {/* Rich text will need proper rendering - this is placeholder */}
                            <p>Description available</p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8">
              <p className="text-center text-gray-500">
                Alt variant content will be designed and implemented here
              </p>
            </div>
          </Box>
        </Container>
      </Section>
    </>
  );
}
