import { Container, Section, Box } from '@/components/global/matic-ds';
import Link from 'next/link';
import type { Service } from '@/types/contentful';

interface ServiceListVariantProps {
  services: Service[];
}

export default function ServiceListVariant({ services }: ServiceListVariantProps) {
  return (
    <Section className="bg-white text-maticblack">
      <Container>
        <Box direction="col" className="gap-[3rem]">
          {/* Overline */}
          <p className="text-[1rem] font-[600] leading-[100%]" style={{ color: '#076EFF' }}>
            TACTICS & DELIVERY
          </p>

          <Box direction="col" className="gap-0">
            {services.map((service, index) => (
              <Link
                key={service.sys.id}
                href={
                  service.industryConnection?.slug
                    ? `/services/${service.industryConnection.slug}`
                    : '#'
                }
                className={`group flex cursor-pointer flex-col gap-[4rem] rounded-[0.5rem] py-[1.5rem] transition-all duration-300 hover:bg-maticblack hover:px-[1.5rem] md:flex-row md:items-center ${
                  index !== services.length - 1 ? 'border-border border-b' : ''
                }`}
              >
                {/* Service Name - Left */}
                <div className="w-full">
                  <h3 className="text-[2rem] font-[400] leading-[140%] text-maticblack transition-colors duration-300 group-hover:text-white">
                    {service.name}
                  </h3>
                </div>

                {/* Service Description - Right */}
                <div className="flex-shrink-0">
                  <p className="whitespace-nowrap text-[1.25rem] font-[400] leading-[140%] text-maticblack transition-colors duration-300 group-hover:text-white">
                    {service.homepageCopy || service.bannerCopy}
                  </p>
                </div>

                {/* Arrow - Far Right (appears on hover) */}
                <div className="shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="18"
                    viewBox="0 0 25 18"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1181_28276)">
                      <path d="M20.9443 7.65625H0V10.3414H20.9443V7.65625Z" fill="white" />
                      <path
                        d="M15.1362 18L13.2422 16.1175L20.4063 9L13.2422 1.88252L15.1362 0L24.1879 9L15.1362 18Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1181_28276">
                        <rect width="24.1875" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </Link>
            ))}
          </Box>

          {/* Button */}
          <div className="flex justify-start">
            <Link
              href="/services"
              className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-[6px] bg-maticblack px-4 py-2 text-[1rem] font-[400] leading-[100%] text-white transition-all hover:scale-95 hover:text-white"
            >
              See all services
            </Link>
          </div>
        </Box>
      </Container>
    </Section>
  );
}
