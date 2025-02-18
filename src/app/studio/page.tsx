import { Box, Container, Section } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PricingTable } from '@/components/global/PricingTable';
import { GradientBox } from '@/components/studio/GradientBox';
import { Steps } from '@/components/studio/Steps';
import Image from 'next/image';
import { TestimonialBox } from '@/components/studio/TestimonialBox';
import { StudioForm } from '@/components/forms/StudioForm';
import PartnerBox from '@/components/studio/PartnerBox';
import { CarouselWithDots } from '@/components/ui/carousel-with-dots';
import { CaseStudyCarousel } from '@/components/studio/CaseStudyCarousel';
import { MobilePricingDropdown } from '@/components/studio/MobilePricingDropdown';
import { Logo } from '@/components/global/Logo';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { ArrowRight } from 'lucide-react';
import { type CaseStudyCarousel as CaseStudyCarouselType } from '@/types/contentful';
import { getCaseStudyCarousel, getAllTestimonials, getAllEngage, getAllWork } from '@/lib/api';
import { HeroSection } from '@/components/home/HeroSection';

interface Category {
  sys: {
    id: string;
  };
  name: string;
}

interface Work {
  featuredImage: {
    url: string;
  };
  clientName: string;
  categoriesCollection?: {
    items: Category[];
  };
}

interface Testimonial {
  sys: {
    id: string;
  };
  quote: string;
  reviewer: string;
  position: string;
}

interface CaseStudyCarouselData {
  sys: {
    id: string;
  };
  carouselHeader: string;
  carouselSubheader?: string;
  carouselContent: {
    items: Array<{
      sys: {
        id: string;
      };
      name: string;
      sampleReference: {
        sys: {
          id: string;
        };
        clientName: string;
        slug: string;
        briefDescription: string;
        sector: 'Technology' | 'Travel';
        timeline: string;
        sectionColor: {
          name: string;
          value: string;
        };
        sectionSecondaryColor: {
          name: string;
          value: string;
        };
        sectionAccentColor: {
          name: string;
          value: string;
        };
      };
      previewAsset: {
        sys: {
          id: string;
        };
        url: string;
        width: number;
        height: number;
      };
    }>;
  };
}

interface Engage {
  sys: {
    id: string;
  };
  // Add other fields based on your data structure
}

interface StudioPageProps {
  caseStudyCarousel: CaseStudyCarouselType | null;
  testimonials: Testimonial[];
  _engageItems: Engage[];
  allWork: Work[];
}

export default async function StudioPage() {
  const caseStudyCarousel = await getCaseStudyCarousel('7lWfWvJIh8610lqCAkV9Zb');
  const testimonials = await getAllTestimonials();
  const engageItems = await getAllEngage();
  const allWork = await getAllWork();

  return (
    <StudioPageClient
      caseStudyCarousel={caseStudyCarousel}
      testimonials={testimonials}
      _engageItems={engageItems}
      allWork={allWork}
    />
  );
}

function StudioPageClient({
  caseStudyCarousel,
  testimonials,
  _engageItems,
  allWork
}: StudioPageProps) {
  // Get 2 random work items
  const randomWork = [...allWork].sort(() => 0.5 - Math.random()).slice(0, 2);

  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 11.22,
            theme: 'dark'
          },
          {
            percentage: 33.81,
            theme: 'light'
          },
          {
            percentage: 73.31,
            theme: 'dark'
          },
          {
            percentage: 93.16,
            theme: 'light'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 15.48,
            theme: 'dark'
          },
          {
            percentage: 38.44,
            theme: 'light'
          },
          {
            percentage: 76.12,
            theme: 'dark'
          },
          {
            percentage: 93.40,
            theme: 'light'
          }
        ]}
      />
      <Section>
        <Container>
          <Box className="flex-col items-center justify-between md:flex-row" gap={8}>
            <Box className="gap-8 md:gap-8" direction="col">
              <Box className="gap-4" direction="col">
                <h3 className="flex items-center gap-2 text-[1rem] font-light leading-[-3%] md:text-[1.25rem]">
                  <Image
                    src="/studio.svg"
                    alt="studio"
                    width={138}
                    height={25}
                    className="max-h-[19px] max-w-[110px] rounded-none border-none md:max-h-[25px] md:max-w-[138px]"
                  />
                  by Matic Digital
                </h3>
                <h1 className="text-[2.25rem] md:text-[3.625rem]">
                  A modern agency subscription model that scales with you.
                </h1>
              </Box>
              <p className="flex max-w-[300px] flex-col gap-2 font-light leading-[140%] text-text md:max-w-[530px]">
                <span className="font-semibold">
                  Your on-demand creative & digital team — ready when you are.
                </span>
                No long-term contracts. No hidden fees. Just expert strategy, design, and
                development when you need it.
              </p>
              <Box className="mt-4 flex-col md:flex-row" gap={2}>
                <Link href="/contact">
                  <Button variant="darkblue">How Studio Works</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost">Services & specialities</Button>
                </Link>
              </Box>
            </Box>
            <Box className="relative isolate">
              <div
                className="absolute bottom-20 left-10 -z-10 aspect-square min-w-[252px] flex-shrink-0 rounded-[362.25px] mix-blend-screen md:h-[362.25px] md:w-[222.633px]"
                style={{
                  background: '#301A61',
                  filter: 'blur(105.45340728759766px)',
                  opacity: 1
                }}
              ></div>
              <div
                className="absolute left-12 top-32 -z-10 aspect-square min-w-[252px] flex-shrink-0 rounded-[329.8px] mix-blend-screen md:left-32 md:h-[215.263px] md:w-[329.8px]"
                style={{
                  background: '#FA58A2',
                  filter: 'blur(87.8778305053711px)',
                  opacity: 1
                }}
              ></div>
              <div
                className="absolute bottom-64 right-0 -z-10 aspect-square min-w-[252px] flex-shrink-0 rounded-[281.75px] mix-blend-screen md:bottom-48 md:right-20 md:h-[281.75px] md:w-[209.313px]"
                style={{
                  background: '#00C5D5',
                  filter: 'blur(105.45340728759766px)',
                  opacity: 1
                }}
              ></div>
              <div className="z-60 relative">
                <StudioForm />
              </div>
            </Box>
          </Box>
        </Container>
      </Section>
      <section
        className="dark py-24"
        style={{
          background: `radial-gradient(88.31% 96.66% at 50% 96.65%, hsl(237 75% 18%) 0%, hsl(237 100% 8%) 100%)`
        }}
      >
        <Container>
          <Box direction="col" className="text-white" gap={4}>
            <p className="text-[1rem] font-semibold leading-none text-text md:text-[1.25rem]">
              Why Studio?
            </p>
            <h2 className="font-chalet-newyork text-[2.25rem] text-text md:max-w-[724px] md:text-[2.5rem]">
              One simple subscription. Infinite possibilities.
            </h2>
            <p className="max-w-[335px] text-[0.875rem] font-light leading-[140%] text-text md:max-w-[724px] md:text-[1.5rem]">
              From branding and web development to marketing assets and product design—get what you
              need, when you need it
            </p>
            <div className="hidden md:block">
              <Box className="grid grid-cols-2 gap-4 pt-12">
                <GradientBox
                  image={{ src: '/FlexibleIcon.svg', alt: 'flexible' }}
                  header="Flexible"
                  copy="Adjust monthly as needed. Lorem ipsum dolor sit amet, consectetur adipiscing."
                />
                <GradientBox
                  image={{ src: '/StarIcon.svg', alt: 'star' }}
                  header="Top-Tier Talent"
                  copy="Access to expert designers, strategists, and develpers. Lorem ipsum dolor sit amet,"
                />
                <GradientBox
                  image={{ src: '/CostIcon.svg', alt: 'cost' }}
                  header="Predictable Costs"
                  copy="Flat pricing with no hidden fees. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                />
                <GradientBox
                  image={{ src: '/ClockIcon.svg', alt: 'clock' }}
                  header="Speed"
                  copy="Get the work you need, when you need it. Loremipsum dolor sit amet, consectetur."
                />
              </Box>
            </div>
          </Box>
        </Container>
        <div className="block pt-8 text-text md:hidden">
          <CarouselWithDots itemCount={4} inverted center showDots={false}>
            <div className="h-full w-[280px] px-2">
              <GradientBox
                image={{ src: '/FlexibleIcon.svg', alt: 'flexible' }}
                header="Flexible"
                copy="Adjust monthly as needed. Lorem ipsum dolor sit amet, consectetur adipiscing."
              />
            </div>
            <div className="h-full w-[280px] px-2">
              <GradientBox
                image={{ src: '/StarIcon.svg', alt: 'star' }}
                header="Top-Tier Talent"
                copy="Access to expert designers, strategists, and develpers. Lorem ipsum dolor sit amet,"
              />
            </div>
            <div className="h-full w-[280px] px-2">
              <GradientBox
                image={{ src: '/CostIcon.svg', alt: 'cost' }}
                header="Predictable Costs"
                copy="Flat pricing with no hidden fees. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
              />
            </div>
            <div className="h-full w-[280px] px-2">
              <GradientBox
                image={{ src: '/ClockIcon.svg', alt: 'clock' }}
                header="Speed"
                copy="Get the work you need, when you need it. Loremipsum dolor sit amet, consectetur."
              />
            </div>
          </CarouselWithDots>
        </div>
      </section>

      <Section className="dark bg-maticblack bg-[url('/Gradient.svg')] bg-cover bg-no-repeat">
        <Container>
          <Box className="flex-col gap-14 md:flex-row md:justify-between">
            <Box className="max-w-xl" direction="col">
              <Box className="flex-grow space-y-4 pt-16 text-text" direction="col">
                <Box
                  className="items-center text-center md:items-start md:text-left"
                  direction="col"
                  gap={2}
                >
                  <p className="font-semibold leading-none text-text md:text-[1.25rem]">
                    How Studio works
                  </p>
                  <h2 className="max-w-[420px] font-chalet-newyork text-[2.25rem] leading-[120%] tracking-[-1.08px] md:text-[2.5rem]">
                    A smarter way to scale your digital and creative efforts.
                  </h2>
                </Box>
                <p className="text-center text-[0.875rem] font-light leading-[160%] md:max-w-lg md:text-left md:text-[1.5rem] md:leading-[140%]">
                  Trusted by growing brands & innovators. Led by senior creatives & developers.
                </p>
                <Link href="/contact" className="">
                  <Button className="w-full md:w-fit">Get Started</Button>
                </Link>
              </Box>
              <Box className="hidden text-text md:flex">
                <p className="flex gap-2">
                  <span>
                    <Image
                      src="/Matic Logo White.svg"
                      alt="Logo"
                      width={24}
                      height={24}
                      className="rounded-none border-none"
                    />
                  </span>{' '}
                  Have a more custom project in mind?
                  <Link href="/contact">
                    <span className="font-semibold">Get in touch</span>
                  </Link>
                </p>
              </Box>
            </Box>
            <Box className="max-w-lg flex-grow" direction="col" gap={12}>
              <Steps
                number="1"
                header="Pick your plan"
                copy="Choose from three flexible tiers or customize your plan with add-on services to fit your exact needs."
              />
              <Steps
                number="2"
                header="Digital Team"
                copy="Choose from three flexible tiers or customize your plan with add-on services to fit your exact needs."
              />
              <Steps
                number="3"
                header="Scale & Adapt"
                copy="Choose from three flexible tiers or customize your plan with add-on services to fit your exact needs."
              />
              <Steps
                number="4"
                header="Stay Connected"
                copy="Choose from three flexible tiers or customize your plan with add-on services to fit your exact needs."
              />
            </Box>
            <Box className="mx-auto pb-16 text-white md:hidden">
              <div className="flex flex-col items-center gap-2 text-center text-sm font-light leading-[160%] [font-feature-settings:'liga'_off,'clig'_off]">
                <Logo />
                <div>
                  Have a more custom project
                  <br />
                  <span>in mind?</span>{' '}
                  <Link href="/contact" className="inline-flex">
                    <span className="font-semibold">Get in touch</span>
                  </Link>
                </div>
              </div>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="dark bg-text text-maticblack">
        <Container className="space-y-8">
          <Box direction="col" className="items-center" gap={2}>
            <h2 className="font-chalet-newyork text-[40px] font-medium leading-[48px] tracking-[-0.02em] md:text-center">
              Compare Lorem Ipsum
            </h2>
            <p className="max-w-xl text-[1.25rem] font-light leading-[160%] md:text-center">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </Box>
          <Box direction="col" className="mt-12 md:mt-24">
            <Box className="overflow-hidden" direction="col">
              {/* Desktop Pricing Table */}
              <div className="hidden md:block">
                <div className="rounded-lg border border-[#DFE0E9] bg-background text-text dark:bg-text dark:text-background">
                  <div className="grid grid-cols-4 divide-x divide-[#DFE0E9]">
                    <div className="min-w-0"></div>
                    <div className="min-w-0">
                      <div className="flex flex-col items-center gap-4 px-6 py-8">
                        <h4 className="text-center font-chalet-newyork text-[1.2rem] font-medium leading-[19px] text-[#6d32ed]">
                          Lorem Ipsum
                        </h4>
                        <div className="flex flex-col items-center">
                          <h1 className="font-chalet-newyork text-[3rem] font-medium text-text dark:text-background">
                            $4,997
                          </h1>
                          <p className="-mt-2 opacity-50">per month</p>
                        </div>
                        <Link href="/" className="w-full">
                          <Button variant="default" className="w-full bg-maticblack text-white">
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-col items-center gap-4 px-6 py-8">
                        <h4 className="text-center font-chalet-newyork text-[1.2rem] font-medium leading-[19px] text-[#6d32ed]">
                          Lorem Ipsum
                        </h4>
                        <div className="flex flex-col items-center">
                          <h1 className="font-chalet-newyork text-[3rem] font-medium text-text dark:text-background">
                            $9,997
                          </h1>
                          <p className="-mt-2 opacity-50">per month</p>
                        </div>
                        <Link href="/" className="w-full">
                          <Button
                            variant="default"
                            className="w-full dark:bg-maticblack dark:text-text"
                          >
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-col items-center gap-4 px-6 py-8">
                        <h4 className="text-center font-chalet-newyork text-[1.2rem] font-medium leading-[19px] text-[#6d32ed]">
                          Lorem Ipsum
                        </h4>
                        <div className="flex flex-col items-center">
                          <h1 className="font-chalet-newyork text-[3rem] font-medium text-text dark:text-background">
                            $14,997
                          </h1>
                          <p className="-mt-2 opacity-50">per month</p>
                        </div>
                        <Link href="/" className="w-full">
                          <Button
                            variant="default"
                            className="w-full dark:bg-maticblack dark:text-text"
                          >
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <PricingTable
                    isFirst={true}
                    title="Strategy & Marketing"
                    items={[
                      {
                        name: 'Brand & product creation',
                        values: [1000, 1000, 1000]
                      },
                      {
                        name: 'Content & storytelling',
                        values: [1000, 1000, 1000]
                      },
                      {
                        name: 'AI consulting',
                        values: [true, true, true]
                      },
                      {
                        name: 'Digital Marketing',
                        values: [true, true, true]
                      },
                      {
                        name: 'Market analysis & GTM',
                        values: [false, false, false]
                      },
                      {
                        name: 'Customer Intelligence',
                        values: [false, false, false]
                      },
                      {
                        name: 'Proof of concept & pilots',
                        values: [false, false, false]
                      }
                    ]}
                  />
                  <PricingTable
                    title="Creative & Design"
                    items={[
                      {
                        name: 'UX/UI Design',
                        values: [true, true, true]
                      },
                      {
                        name: 'Brand & visual design',
                        values: [true, true, true]
                      },
                      {
                        name: 'Identity & logo design',
                        values: [true, true, true]
                      },
                      {
                        name: 'Web design',
                        values: [true, true, true]
                      },
                      {
                        name: 'Prototyping',
                        values: [true, true, true]
                      },
                      {
                        name: 'Design systems',
                        values: [1000, 1000, 1000]
                      },
                      {
                        name: 'Marketing & social',
                        values: [false, false, false]
                      },
                      {
                        name: 'Video editing & production',
                        values: [false, false, false]
                      }
                    ]}
                  />
                  <PricingTable
                    title="Development & Engineering"
                    items={[
                      {
                        name: 'Techstack solution design',
                        values: [true, true, true]
                      },
                      {
                        name: 'Frontend development',
                        values: [true, true, true]
                      },
                      {
                        name: 'Full-Stack engineering',
                        values: [1000, 1000, 1000]
                      }
                    ]}
                  />
                </div>
              </div>

              {/* Mobile Pricing Table */}
              <div className="block md:hidden">
                <MobilePricingDropdown
                  sections={[
                    {
                      title: 'Strategy & Marketing',
                      items: [
                        {
                          name: 'Brand & product creation',
                          values: [1000, 1000, 1000]
                        },
                        {
                          name: 'Content & storytelling',
                          values: [1000, 1000, 1000]
                        },
                        {
                          name: 'AI consulting',
                          values: [true, true, true]
                        },
                        {
                          name: 'Digital Marketing',
                          values: [true, true, true]
                        },
                        {
                          name: 'Market analysis & GTM',
                          values: [false, false, false]
                        },
                        {
                          name: 'Customer Intelligence',
                          values: [false, false, false]
                        },
                        {
                          name: 'Proof of concept & pilots',
                          values: [false, false, false]
                        }
                      ]
                    },
                    {
                      title: 'Creative & Design',
                      items: [
                        {
                          name: 'UX/UI Design',
                          values: [true, true, true]
                        },
                        {
                          name: 'Brand & visual design',
                          values: [true, true, true]
                        },
                        {
                          name: 'Identity & logo design',
                          values: [true, true, true]
                        },
                        {
                          name: 'Web design',
                          values: [true, true, true]
                        },
                        {
                          name: 'Prototyping',
                          values: [true, true, true]
                        },
                        {
                          name: 'Design systems',
                          values: [1000, 1000, 1000]
                        },
                        {
                          name: 'Marketing & social',
                          values: [false, false, false]
                        },
                        {
                          name: 'Video editing & production',
                          values: [false, false, false]
                        }
                      ]
                    },
                    {
                      title: 'Development & Engineering',
                      items: [
                        {
                          name: 'Techstack solution design',
                          values: [true, true, true]
                        },
                        {
                          name: 'Frontend development',
                          values: [true, true, true]
                        },
                        {
                          name: 'Full-Stack engineering',
                          values: [1000, 1000, 1000]
                        }
                      ]
                    }
                  ]}
                />
              </div>
            </Box>
          </Box>
          <Box className="flex-col items-center justify-between rounded-lg bg-[radial-gradient(83.56%_129.5%_at_50%_-0.01%,#0C105B_0%,#000227_100%)] p-6 text-white md:flex-row md:p-12 space-y-4">
            <Box className="gap-2 md:max-w-3xl" direction="col">
              <h3 className="font-chalet-newyork text-[1.35rem] md:text-[1.5rem] font-medium leading-[140%] md:text-[2rem]">
                Schedule a call to see which tier is best for you!
              </h3>
              <p className="text-[0.875rem] font-light md:text-[1rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </p>
            </Box>
            <Box className="flex-col md:flex-row w-full md:w-fit" gap={2}>
              <Link href="/contact" className="flex md:w-auto w-full">
                <Button variant="default" className="w-full">Get Started</Button>
              </Link>
              <Link href="/contact" className="flex md:w-auto w-full">
                <Button variant="ghost" className="w-full">Another CTA</Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section>
        <Container className="space-y-10 pb-6">
          <h1 className="mx-auto text-center text-[2.5rem] md:w-[600px]">
            We deliver solutions with partners and tools like
          </h1>
        </Container>
        <div className="hidden md:block">
          <Box className="mx-auto md:w-[884px]" cols={{ base: 6, lg: 6 }} gap={{ base: 2, lg: 6 }}>
            <PartnerBox
              image={{ src: '/studio/contentful.svg', alt: 'contentful', width: 43, height: 48 }}
              name="Contentful"
            />
            <PartnerBox
              image={{ src: '/studio/hubspot.svg', alt: 'hubspot', width: 57, height: 57 }}
              name="HubSpot"
            />
            <PartnerBox
              image={{ src: '/studio/shopify.svg', alt: 'shopify', width: 42, height: 46 }}
              name="Shopify"
            />
            <PartnerBox
              image={{ src: '/studio/wordpress.svg', alt: 'wordpress', width: 52, height: 52 }}
              name="Wordpress"
            />
            <PartnerBox
              image={{ src: '/studio/webflow.svg', alt: 'webflow', width: 50, height: 31 }}
              name="Webflow"
            />
            <PartnerBox
              image={{ src: '/studio/figma.svg', alt: 'figma', width: 29, height: 44 }}
              name="Figma"
            />
            <PartnerBox
              image={{ src: '/studio/next.svg', alt: 'next', width: 48, height: 48 }}
              name="Next"
            />
            <PartnerBox
              image={{ src: '/studio/android.svg', alt: 'android', width: 59, height: 32 }}
              name="Android"
            />
            <PartnerBox
              image={{ src: '/studio/apple.svg', alt: 'ios', width: 40, height: 48 }}
              name="Apple iOS"
            />
            <PartnerBox
              image={{ src: '/studio/vercel.svg', alt: 'vercel', width: 50, height: 50 }}
              name="Vercel"
            />
            <PartnerBox
              image={{ src: '/studio/cloudflare.svg', alt: 'cloudflare', width: 63, height: 28 }}
              name="Cloudflare"
            />
            <PartnerBox
              image={{ src: '/studio/drive.svg', alt: 'drive', width: 53, height: 45 }}
              name="Drive"
            />
          </Box>
        </div>
        <div className="block space-y-2 md:hidden">
          <CarouselWithDots itemCount={6} showDots={false} autoplayDelay={3000} center>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/contentful.svg', alt: 'contentful', width: 43, height: 48 }}
                name="Contentful"
              />
            </div>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/hubspot.svg', alt: 'hubspot', width: 57, height: 57 }}
                name="HubSpot"
              />
            </div>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/shopify.svg', alt: 'shopify', width: 42, height: 46 }}
                name="Shopify"
              />
            </div>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/wordpress.svg', alt: 'wordpress', width: 52, height: 52 }}
                name="Wordpress"
              />
            </div>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/webflow.svg', alt: 'webflow', width: 50, height: 31 }}
                name="Webflow"
              />
            </div>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/figma.svg', alt: 'figma', width: 29, height: 44 }}
                name="Figma"
              />
            </div>
          </CarouselWithDots>
          <CarouselWithDots itemCount={6} showDots={false} autoplayDelay={3000} center reverse>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/next.svg', alt: 'next', width: 48, height: 48 }}
                name="Next"
              />
            </div>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/android.svg', alt: 'android', width: 59, height: 32 }}
                name="Android"
              />
            </div>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/apple.svg', alt: 'ios', width: 40, height: 48 }}
                name="Apple iOS"
              />
            </div>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/vercel.svg', alt: 'vercel', width: 50, height: 50 }}
                name="Vercel"
              />
            </div>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/cloudflare.svg', alt: 'cloudflare', width: 63, height: 28 }}
                name="Cloudflare"
              />
            </div>
            <div className="w-[120px]">
              <PartnerBox
                image={{ src: '/studio/drive.svg', alt: 'drive', width: 53, height: 45 }}
                name="Drive"
              />
            </div>
          </CarouselWithDots>
        </div>
        <p className="mx-auto max-w-xl text-center text-[1rem] font-light leading-[25.6px] pt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          Need something else?{' '}
          <a href="/contact" className="text-blue hover:text-blue/80">
            Let&apos;s talk
          </a>
        </p>
      </Section>
      <Section>{caseStudyCarousel && <CaseStudyCarousel carousel={caseStudyCarousel} />}</Section>
      <Section className="dark bg-[radial-gradient(64.51%_99.97%_at_50%_-0.01%,#0B0F50_0%,#000227_100%)] py-[80px] md:px-0">
        <Container className="space-y-12 text-text">
          <Box className="items-center pr-5" direction="col" gap={4}>
            <h1 className="text-[2.23rem] md:text-[2.5rem]">Transformative Client Experiences</h1>
            <p className="text-[0.875rem] font-light leading-[160%] md:max-w-[580px] md:text-center md:text-[1.5rem]">
              Discover what our satisfied customers have to say about their experiences with Studio
              by Matic Digital
            </p>
          </Box>
        </Container>
        <Box direction="col" className="pt-12 text-[hsl(var(--base-hsl))]" gap={16}>
          <div className="w-full">
            <CarouselWithDots itemCount={testimonials.length} inverted center>
              {testimonials.map((testimonial: Testimonial) => (
                <div
                  key={testimonial.sys.id}
                  className="min-w-0 flex-[0_0_80%] px-2 md:flex-[0_0_35%] md:pl-6 md:pr-0"
                >
                  <div className="mx-auto w-[280px] md:w-auto">
                    <TestimonialBox
                      quote={testimonial.quote}
                      name={testimonial.reviewer}
                      position={testimonial.position}
                    />
                  </div>
                </div>
              ))}
            </CarouselWithDots>
          </div>
        </Box>
      </Section>
      <div className="mt-24">
        <HeroSection />
      </div>

      {/* <Section className="dark bg-gradient-to-b from-maticblack to-[#041782]">
        <Container>
          <Box direction={{ base: 'col', md: 'row' }} className="gap-[31px]">
            <Box direction="col" className="w-full" gap={4}>
              <h1 className="py-[80px] text-text">Let&apos;s get it together</h1>
              <Box
                className="w-full justify-between"
                direction={{ base: 'col', md: 'row' }}
                gap={4}
              >
                <h2 className="font-chalet-newyork text-[2rem] leading-[120%] text-text md:max-w-[637px]">
                  Bring us your toughest challenges, highest aspirations and tactical needs.{' '}
                </h2>
                <Box className="max-w-[246px] md:max-w-[552px]" direction="col" gap={4}>
                  <p className="text-[0.875rem] text-text md:text-[1.125rem]">
                    Matic is an adaptive partner - delivered via full agency, monthly agency
                    subscription or team solutions - all working towards data-driven solutions to
                    build incredible brands, websites, and address new markets, starting with
                    collaborative workshops that uncover the “why” behind your goals to craft
                    sustainable, long-term results.
                  </p>
                  <Link href="/contact">
                    <Button variant="default">Get Started</Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="ghost">Explore our services</Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
        <EngageSection engageItems={_engageItems} />
      </Section> */}

      <Section className="light dark:bg-text">
        <Container>
          <Box direction="col" gap={8}>
            <h2 className="font-chalet-newyork text-text dark:text-maticblack">
              See more projects
            </h2>
            <Box direction={{ base: 'col', md: 'row' }} gap={4} className="justify-between">
              {randomWork.map((work) => (
                <Box key={work.clientName} direction="col" gap={2} className="w-full md:w-[573px]">
                  <div className="relative aspect-[4/3] w-full">
                    {work.featuredImage?.url && (
                      <Image
                        src={work.featuredImage.url}
                        alt={work.clientName}
                        fill
                        className="rounded-lg border-none bg-[#EFEFEF] object-cover"
                      />
                    )}
                  </div>
                  <h3 className="font-chalet-newyork text-2xl text-text dark:text-maticblack">
                    {work.clientName}
                  </h3>
                  <Box className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                    {work.categoriesCollection?.items
                      .sort(() => 0.5 - Math.random())
                      .slice(0, 2)
                      .map((category, index, array) => (
                        <span
                          key={category.sys.id}
                          className="flex items-center whitespace-nowrap text-text/80 dark:text-maticblack"
                        >
                          {category.name}
                          {index < array.length - 1 && (
                            <span className="mx-2 inline-block text-text/80 dark:text-maticblack">
                              •
                            </span>
                          )}
                        </span>
                      ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Section>
    </>
  );
}
