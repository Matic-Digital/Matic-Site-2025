import { Box, Container, Section } from '@/components/global/matic-ds';
import { type Metadata } from 'next';
import { getAllServices, getAllServiceComponents, getServiceWorkTactics } from '@/lib/api';
import Image from 'next/image';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Description of the services page'
};

export default async function Services() {
  const [services, serviceComponents] = await Promise.all([
    getAllServices(),
    getAllServiceComponents()
  ]);

  // Get the first service component to determine ordering
  const mainServiceComponent = serviceComponents[0];
  if (!mainServiceComponent) return null;

  // Create a map of service IDs to their data for easy lookup
  const serviceMap = new Map(services.map((service) => [service.sys.id, service]));

  // Get ordered services based on the service component
  const orderedServices = mainServiceComponent.servicesCollection.items
    .map((componentService) => serviceMap.get(componentService.sys.id))
    .filter(Boolean); // Remove any undefined services

  // Fetch work tactics for each service that has a sample project
  const servicesWithTactics = await Promise.all(
    orderedServices.map(async (service) => {
      if (!service?.sampleProject?.sys.id) return { ...service, workTactics: null };
      const workTactics = await getServiceWorkTactics(service.sampleProject.sys.id);
      return { ...service, workTactics };
    })
  );

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
      <Section>
        <Container className="space-y-[1.88rem]">
          <h1 className="text-[3rem]">What we do</h1>
          <p className="text-[1.75rem] md:w-[41.625rem]">
            Matic creates brand, digital, and team solutions for businesses at every stage.
          </p>
        </Container>
      </Section>
      {servicesWithTactics.map((service) => (
        <Section key={service.sys?.id}>
          <Container>
            <Box className="md:gap-[3.62rem]" direction={{ base: 'col', md: 'row' }}>
              <Box className="" direction="col">
                <Box className="space-y-[0.75rem] md:max-w-[36.8125rem]" direction={{ base: 'col', md: 'col' }}>
                  <Box direction="row" className="items-center gap-4">
                    <Image
                      src={service.bannerIcon?.url ?? ''}
                      alt={service.name ?? ''}
                      width={48}
                      height={48}
                      className="aspect-square h-[48px] md:w-[4.25rem] md:h-[4.25rem] w-[48px] rounded-none border-none"
                    />
                    <h2 className="font-chalet-newyork text-[1.5rem] md:text-[2.25rem] md:leading-[110%] md:tracking-[-0.045rem] md:max-w-xs">{service.name}</h2>
                  </Box>
                  <h2 className="font-chalet-newyork text-[1.25rem] md:text-[1.5rem] leading-[130%] md:tracking-[-0.03rem] tracking-[-0.025rem]">
                    {service.bannerCopy}
                  </h2>
                </Box>
                <Box className="my-[2.25rem]">
                  {service.workTactics && (
                    <div className="flex flex-col gap-[0.25rem] md:grid md:grid-cols-2">
                      {service.workTactics.tactics?.map((tactic, index) => (
                        <p
                          key={index}
                          className="font-sans md:w-[17.78rem] text-[0.875rem] md:text-base leading-[160%] tracking-[-0.01375rem] text-text/80"
                        >
                          {tactic}
                        </p>
                      ))}
                    </div>
                  )}
                </Box>
              </Box>
              <Link
                href={`/work/${service.sampleProject?.slug ?? ''}`}
                className="flex flex-col gap-[0.5rem] md:min-w-[39rem] md:max-w-[39rem]"
              >
                <Image
                  src={service.sampleProject?.featuredImage?.url ?? ''}
                  alt={service.sampleProject?.clientName ?? ''}
                  width={1440}
                  height={720}
                  className="aspect-[335.00/229.20] h-[18.7rem] md:h-[35rem] rounded-none border-none object-cover"
                />
                <Box className="items-center justify-between">
                  <p className="font-sans text-[0.875rem] leading-[160%] tracking-[-0.01375rem] text-text/80">
                    {service.sampleProject?.clientName}
                  </p>
                  <ArrowRight className="h-4 w-4" />
                </Box>
              </Link>
            </Box>
          </Container>
        </Section>
      ))}
    </>
  );
}
