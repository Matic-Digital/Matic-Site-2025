'use client';

import React from 'react';
import { Box, Container } from '@/components/global/matic-ds';
import { ServiceAsset } from '@/components/services/ServiceAsset';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Service } from '@/types/contentful';

interface ServiceScrollSectionProps {
  services: Service[];
}

export function ServiceScrollSection({ services }: ServiceScrollSectionProps) {
  if (!services || services.length === 0) {
    return (
      <div className="mt-8 p-8 text-center">
        <p className="text-lg text-text/60">
          Services are currently unavailable. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-12 md:space-y-[20rem]">
      {services.map((service, index) => {
        const isOdd = index % 2 === 1;
        
        const contentSection = (
          <div className={`flex-1 ${isOdd ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="sticky top-[14rem] z-10">
              <Box direction="col" className="h-full">
                <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#076EFF]">
                  {service.name}
                </p>
                <h2 className="mb-4 text-3xl font-medium leading-[120%] tracking-[-0.06rem] md:text-4xl">
                  {service.bannerCopy}
                </h2>
                <div className="flex flex-col gap-[1.62rem] md:max-w-[38rem]">
                  <p className="mb-4 text-xl font-medium leading-[160%] tracking-[-0.0125rem] md:text-[1.25rem]">
                    {service.description}
                  </p>

                  {/* Products section - in same container as description */}
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
                    {service.productList?.map((product) => (
                      <p
                        key={product}
                        className="whitespace-normal text-base font-semibold leading-[160%] tracking-[-0.02rem] text-text/60 md:whitespace-nowrap"
                      >
                        {product}
                      </p>
                    ))}
                  </div>

                  {/* Button using bannerLinkCopy */}
                  {service.bannerLinkCopy && service.industryConnection?.slug && (
                    <div className="mt-4">
                      <Link href={`/services/${service.industryConnection.slug}`}>
                        <Button variant="default" className="rounded-sm">
                          {service.bannerLinkCopy}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </Box>
            </div>
          </div>
        );

        const assetSection = (service.sampleProject?.serviceAsset?.url || service.sampleAsset?.image?.url) && (
          <div className={`flex-1 ${isOdd ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="h-[40rem] w-full overflow-hidden rounded-lg">
              <ServiceAsset
                asset={(service.sampleProject?.serviceAsset || service.sampleAsset?.image)!}
                serviceName={service.name}
              />
            </div>
            {/* Work sample name and arrow - only show link if it's a sampleProject */}
            {service.sampleProject ? (
              <Link
                href={`/work/${service.sampleProject.slug}`}
                className="mt-4 flex items-center justify-between transition-opacity hover:opacity-70"
              >
                <p className="text-base font-medium text-maticblack">
                  {service.sampleProject.clientName}
                </p>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-maticblack"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : service.sampleAsset ? (
              <div className="mt-4">
                <p className="text-base font-medium text-maticblack">
                  {service.sampleAsset.title}
                </p>
              </div>
            ) : null}
          </div>
        );

        return (
          <div key={service.sys.id} className="relative w-full">
            {/* Service info and asset section */}
            <Box direction={{ base: 'col', lg: 'row' }} className="gap-8 lg:gap-8">
              {contentSection}
              {assetSection}
            </Box>
          </div>
        );
      })}
    </div>
  );
}
