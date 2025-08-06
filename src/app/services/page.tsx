import { Container, Box, Section } from '@/components/global/matic-ds';
import { getServiceComponent, getWorkSnippet } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { TextAnimate } from '@/components/magicui/TextAnimate';
import { BlurFade } from '@/components/magicui/BlurFade';
import { PartnershipSectionVariant } from '@/components/global/PartnershipSectionVariant';

const partnerLogos = [
  { id: '1', logoUrl: '/partners/contentful.svg' },
  { id: '2', logoUrl: '/partners/figma.svg' },
  { id: '3', logoUrl: '/partners/hive.svg' },
  { id: '4', logoUrl: '/partners/hubspot.svg' },
  { id: '5', logoUrl: '/partners/notion.svg' },
  { id: '6', logoUrl: '/partners/shopify.svg' },
  { id: '7', logoUrl: '/partners/vercel.svg' },
  { id: '8', logoUrl: '/partners/webflow.svg' },
  { id: '9', logoUrl: '/partners/wordpress.svg' },
  { id: '10', logoUrl: '/partners/wordpress.svg' }
];

export default async function ServicesPage() {
  const serviceComponent = await getServiceComponent('1xHRTfLve3BvEp2NWD6AZm');
  const workSnippet = await getWorkSnippet('5nX0MRoFCRnM2KaJNvCW34');
  return (
    <>
      <Section>
        <Container className="px-[1.5rem] pt-[4rem]">
          <h1 className="text-maticblack">
            We help companies navigate inflection points and create systems for lasting growth.
          </h1>
          {/* Display service items without scroll functionality */}
          {serviceComponent?.servicesCollection?.items && (
            <div className="mt-8 space-y-12 md:space-y-[4.19rem]">
              {serviceComponent.servicesCollection.items.map((service, _index) => (
                <div key={service.sys.id} className="h-[33.25rem] w-full">
                  {/* Service info section */}
                  <div className="sticky top-0 z-10 bg-background">
                    <Box direction="col" className="gap-4">
                      <Box
                        direction={{ base: 'col', md: 'row' }}
                        className="items-left gap-4 md:mb-4 md:items-center md:gap-[2.06rem]"
                      >
                        <Image
                          src={service.bannerIcon?.url ?? ''}
                          alt={service.name}
                          width={58}
                          height={58}
                          className="aspect-square w-[3.625rem] rounded-none border-none"
                        />
                        <h3 className="whitespace-normal text-xl font-bold leading-[120%] tracking-[-0.06rem] md:whitespace-nowrap md:text-2xl">
                          {service.name}
                        </h3>
                      </Box>
                      <div className="md:max-w-[38rem] md:pl-[5.75rem]">
                        <p className="mb-4 text-lg font-medium leading-[160%] tracking-[-0.0125rem] md:text-[1.25rem]">
                          {service.bannerCopy}
                        </p>

                        {/* Products section - in same container as description */}
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
                          {service.productList?.map((product) => (
                            <p
                              key={product}
                              className="whitespace-normal text-base leading-[160%] tracking-[-0.02rem] text-text/60 md:whitespace-nowrap"
                            >
                              {product}
                            </p>
                          ))}
                        </div>
                      </div>
                    </Box>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section className="dark bg-background">
        <Container>
          <Box direction="col" className="gap-[5.25rem]">
            <TextAnimate animate="blurInUp" as="h2" by="line" className="md:max-w-[47.375rem]" once>
              {workSnippet?.heading ?? ''}
            </TextAnimate>
            <Box className="flex flex-wrap gap-[1.25rem]">
              {workSnippet?.samplesCollection?.items.map((sample, index) => {
                const row = Math.floor(index / 3); // For 3 columns on desktop
                const delay = row * 0.1 + (index % 3) * 0.05; // Staggered delay based on row and column

                return (
                  <Link
                    href={`/work/${sample.slug}`}
                    key={sample.sys.id}
                    className="aspect-[4/3] w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.833rem)] md:min-w-[25rem]"
                  >
                    <BlurFade
                      inView
                      inViewMargin="-100px"
                      direction="up"
                      useBlur={false}
                      delay={delay}
                      className="h-full w-full"
                    >
                      <div
                        style={{ backgroundColor: sample.snippetColor?.value ?? '#000000' }}
                        className="h-full w-full rounded-[0.5rem] p-[2rem]"
                      >
                        <Box direction="col" className="h-full justify-between">
                          <p className="whitespace-normal text-text dark:text-background">
                            {sample.briefDescription}
                          </p>
                          <Image
                            src={sample.logo?.url ?? ''}
                            alt={sample.clientName}
                            width={176} /* 11rem = 176px */
                            height={40} /* 2.5rem = 40px */
                            className="h-[2.5rem] w-auto self-start rounded-none border-none object-contain brightness-0"
                          />
                        </Box>
                      </div>
                    </BlurFade>
                  </Link>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Section>
      <PartnershipSectionVariant
        sectionHeader="Built by partnership"
        sectionSubheader="We partner and build with the most trusted and extensible platforms on the planet."
        partners={partnerLogos}
      />
      <Section>
        <Container>
          <Box direction="col" className="md:gap-[4.44rem]">
            <Box direction="col" className="md:gap-[1.62rem]">
              <p className="font-bold text-blue md:text-xl">
                This is your new section content. You can customize this however you need.
              </p>
              <h2 className="text-4xl font-bold text-maticblack md:text-5xl">New Section</h2>
              <p className="text-maticblack md:text-2xl">
                This is your new section content. You can customize this however you need.
              </p>
            </Box>
            <Image
              src="/services-our-process.svg"
              alt="Description"
              width={124}
              height={124}
              className="h-auto w-full border-none"
            />
          </Box>
          <Box direction="col" className="md:gap-[4.25rem]">
            <Box direction="row" className="md:gap-[2.62rem]">
              <div>
                <h1>test heading</h1>
                <p>test Description</p>
              </div>
              <div>
                <h1>test heading</h1>
                <p>test Description</p>
              </div>
            </Box>
            <Box direction="row" className="md:gap-[2.62rem]">
              <div>
                <h1>test heading</h1>
                <p>test Description</p>
              </div>
              <div>
                <h1>test heading</h1>
                <p>test Description</p>
              </div>
            </Box>
          </Box>
        </Container>
      </Section>
    </>
  );
}
