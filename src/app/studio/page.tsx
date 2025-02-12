import { Box, Container, Section } from '@/components/global/matic-ds';
import { type Metadata } from 'next';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PricingTable } from '@/components/global/PricingTable';
import { GradientBox } from '@/components/studio/GradientBox';
import { Steps } from '@/components/studio/Steps';
import Image from 'next/image';
import { TestimonialBox } from '@/components/studio/TestimonialBox';
import { StudioForm } from '@/components/forms/StudioForm';
import PartnerBox from '@/components/studio/PartnerBox';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CarouselWithDots } from '@/components/ui/carousel-with-dots';
import { CaseStudyCarousel } from '@/components/studio/CaseStudyCarousel';
import { getCaseStudyCarousel, getAllTestimonials } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'Studio page'
};

export default async function StudioPage() {
  const caseStudyCarousel = await getCaseStudyCarousel('7lWfWvJIh8610lqCAkV9Zb');
  const testimonials = await getAllTestimonials();

  return (
    <ScrollThemeTransition theme="light">
      <Section>
        <Container>
          <Box className="items-center justify-between">
            <Box className="" direction="col" gap={8}>
              <Box className="" direction="col" gap={4}>
                <h3 className="flex gap-2 text-[1.25rem] font-medium leading-[-3%]">
                  <Image
                    src="/studio.svg"
                    alt="studio"
                    width={138}
                    height={25}
                    className="rounded-none border-none"
                  />
                  by Matic Digital
                </h3>
                <h1 className="text-[3.625rem]">
                  A modern agency subscription model that scales with you.
                </h1>
              </Box>
              <p className="flex max-w-[530px] flex-col">
                <span className="font-semibold">
                  Your on-demand creative & digital team — ready when you are.
                </span>
                No long-term contracts. No hidden fees. Just expert strategy, design, and
                development when you need it.
              </p>
              <Box className="mt-4" gap={2}>
                <Link href="/contact">
                  <Button>How Studio Works</Button>
                </Link>
                <Link href="/contact">
                  <Button>Services & specialities</Button>
                </Link>
              </Box>
            </Box>
            <Box className="relative isolate">
              <div
                className="absolute left-10 -z-10 h-[500px] w-[100px] mix-blend-screen"
                style={{
                  background:
                    'radial-gradient(circle at center, #0019FF 0%, rgba(0, 25, 255, 0) 70%)',
                  filter: 'blur(150px)',
                  opacity: 1
                }}
              ></div>
              <div
                className="absolute right-10 top-0 -z-10 h-[165px] w-[192px] mix-blend-screen"
                style={{
                  background:
                    'radial-gradient(circle at center, #FFA589 0%, rgba(255, 165, 137, 0) 70%)',
                  filter: 'blur(100px)',
                  opacity: 1
                }}
              ></div>
              <div
                className="absolute bottom-10 right-20 -z-10 h-[361px] w-[241px] mix-blend-screen"
                style={{
                  background:
                    'radial-gradient(circle at center, #00C5D5 0%, rgba(0, 197, 213, 0) 70%)',
                  filter: 'blur(100px)',
                  opacity: 1
                }}
              ></div>
              <div className="relative z-10">
                <StudioForm />
              </div>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="py-24 [background:radial-gradient(88.31%_96.66%_at_50%_96.65%,#000227_0%,#0B0F50_100%)]">
        <Container>
          <Box direction="col" className="text-white" gap={4}>
            <p className="text-[1.25rem] font-semibold leading-none">Why Studio?</p>
            <h2 className="font-chalet-newyork text-[2.5rem]">One simple subscription. Infinite possibilities.</h2>
            <p className="max-w-[724px] text-[1.5rem] font-light leading-[140%]">
              From branding and web development to marketing assets and product design—get what you
              need, when you need it
            </p>
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
          </Box>
        </Container>
      </Section>

      <Section className="bg-[url('/Gradient.svg')] bg-text bg-cover bg-center bg-no-repeat">
        <Container>
          <Box className="justify-between">
            <Box className="max-w-xl" direction="col">
              <Box className="flex-grow space-y-8 text-white" direction="col">
                <Box className="" direction="col" gap={4}>
                  <p className="text-[1.25rem] font-semibold leading-none">How Studio works</p>
                  <h2 className="max-w-[420px] text-[2.5rem] font-chalet-newyork">
                    A smarter way to scale your digital and creative efforts.
                  </h2>
                </Box>
                <p className="max-w-lg text-[1.5rem] font-light leading-[140%]">
                  Trusted by growing brands & innovators. Led by senior creatives & developers.
                </p>
                <Link href="/contact" className="">
                  <Button>Get Started</Button>
                </Link>
              </Box>
              <Box className="text-white">
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
          </Box>
        </Container>
      </Section>
      <Section>
        <Container className="space-y-8">
          <Box direction="col" className="items-center" gap={2}>
            <h2 className="text-[40px] leading-[48px] tracking-[-0.02em] font-chalet-newyork font-medium text-center">Compare Lorem Ipsum</h2>
            <p className="max-w-xl text-center text-[1.25rem] font-light leading-[160%]">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </Box>
          <Box className="overflow-hidden border border-[#DFE0E9] rounded-lg" direction="col">
            <Box className="flex">
              <Box className="border-r border-b border-[#DFE0E9] w-1/4">
                <div className="py-8 px-6"></div>
              </Box>
              <Box direction="col" gap={4} className="border-b border-[#DFE0E9] w-1/4 items-center justify-center px-6 py-8">
                <h4 className="text-center text-[1.2rem] text-[#6d32ed] font-medium leading-[19px] font-chalet-newyork">Lorem Ipsum</h4>
                <Box direction="col" className="items-center">
                  <h1 className="text-[3rem] font-chalet-newyork font-medium">$4,997</h1>
                  <p className="opacity-50 -mt-2">per month</p>
                </Box>
                <Link href="/" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </Box>
              <Box direction="col" gap={4} className="border-l border-r border-b border-[#DFE0E9] w-1/4 items-center justify-center px-6 py-8">
                <h4 className="text-center text-[1.2rem] text-[#6d32ed] font-medium leading-[19px] font-chalet-newyork">Lorem Ipsum</h4>
                <Box direction="col" className="items-center">
                  <h1 className="text-[3rem] font-chalet-newyork font-medium">$9,997</h1>
                  <p className="opacity-50 -mt-2">per month</p>
                </Box>
                <Link href="/" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </Box>
              <Box direction="col" gap={4} className="border-b border-[#DFE0E9] w-1/4 items-center justify-center px-6 py-8">
                <h4 className="text-center text-[1.2rem] text-[#6d32ed] font-medium leading-[19px] font-chalet-newyork">Lorem Ipsum</h4>
                <Box direction="col" className="items-center">
                  <h1 className="text-[3rem] font-chalet-newyork font-medium">$14,997</h1>
                  <p className="opacity-50 -mt-2">per month</p>
                </Box>
                <Link href="/" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </Box>
            </Box>
            <PricingTable
              isFirst={true}
              title="Websites & apps"
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
                  values: [false, true, true]
                },
                {
                  name: 'Customer Intelligence',
                  values: [false, true, true]
                },
                {
                  name: 'Proof of concept & pilots',
                  values: [false, false, true]
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
                  values: [false, true, true]
                },
                {
                  name: 'Video editing & production',
                  values: [false, false, true]
                }
              ]}
            />
            <PricingTable
              isLast={true}
              title="Websites & apps"
              items={[
                {
                  name: 'Techstack solution design',
                  values: [1000, 1000, 1000]
                },
                {
                  name: 'Frontend development',
                  values: [1000, 1000, 1000]
                },
                {
                  name: 'Headless CMS development',
                  values: [true, true, true]
                },
                {
                  name: 'Custom software',
                  values: [true, true, true]
                },
                {
                  name: 'Mobile app development',
                  values: [false, false, true]
                },
                {
                  name: 'eCommerce',
                  values: [false, false, true]
                }
              ]}
            />
          </Box>
          <Box className="items-center justify-between rounded-lg px-12 py-12 text-[hsl(var(--base-hsl))] [background:radial-gradient(83.56%_129.5%_at_50%_-0.01%,#0C105B_0%,#000227_100%)]">
            <Box className="max-w-3xl" direction="col">
              <h3 className="text-[2rem] leading-[140%] font-chalet-newyork font-medium">Schedule a call to see which tier is best for you!</h3>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </p>
            </Box>
            <Box className="">
              <Link href="/contact">
                <Button className="bg-white text-text hover:bg-white/90 active:bg-white/70">Get Started</Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section>
        <Container className="space-y-10">
          <h1 className="text-[2.5rem] mx-auto w-[600px] text-center">We deliver solutions with partners and tools like</h1>
          <Box className="w-[884px] mx-auto" cols={6} gap={6}>
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
          <p className="text-center max-w-xl mx-auto text-[1rem] leading-[25.6px] font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Need something else? <a href="/contact" className="text-blue hover:text-blue/80">Let&apos;s talk</a>
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          {caseStudyCarousel && <CaseStudyCarousel carousel={caseStudyCarousel} />}
        </Container>
      </Section>
      <Section className="[background:radial-gradient(88.31%_96.66%_at_50%_96.65%,#000227_0%,#0B0F50_100%)]">
        <Container className="text-white space-y-12">
          <Box className="items-center" direction="col" gap={4}>
            <h1 className="text-white text-[2.5rem]">Transformative Client Experiences</h1>
            <p className="max-w-[580px] font-light text-center text-[1.5rem]">
              Discover what our satisfied customers have to say about their experiences with Studio
              by Matic Digital
            </p>
          </Box>
          <Box direction="col" gap={16}>
            <CarouselWithDots itemCount={testimonials.length} inverted>
              {testimonials.map((testimonial) => (
                <div key={testimonial.sys.id} className="min-w-0 flex-[0_0_35%] pl-6">
                  <TestimonialBox
                    quote={testimonial.quote}
                    name={testimonial.reviewer}
                    position={testimonial.position}
                  />
                </div>
              ))}
            </CarouselWithDots>
          </Box>
        </Container>
      </Section>
    </ScrollThemeTransition>
  );
}
