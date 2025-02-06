import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { PricingTable } from '@/components/global/PricingTable';
import { ClientHero } from '@/components/global/ClientHero';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'Studio page'
};

export default function Studio() {
  return (
    <ScrollThemeTransition theme="light">
      <Section>
        <Container>
          <Box className="justify-between">
            <Box className="max-w-lg" direction="col">
              <h1 className="">A modern agency subscription model that scales with you.</h1>
              <p className="flex flex-col">
                <span className="font-semibold">
                  Your on-demand creative & digital team -- ready when you are.
                </span>
                No long-term contracts. No hidden fees. Just expert strategy, design, and
                development when you need it.
              </p>
              <Box className="">
                <Link href="/contact">
                  <Button>How Studio Works</Button>
                </Link>
                <Link href="/contact">
                  <Button>Services & specialities</Button>
                </Link>
              </Box>
            </Box>
            <Box className="">form</Box>
          </Box>
        </Container>
      </Section>
      <Section className="[background:radial-gradient(88.31%_96.66%_at_50%_96.65%,#000227_0%,#0B0F50_100%)]">
        <Container>
          <Box direction="col" className="text-white">
            <p className="">Why Studio?</p>
            <h2 className="">One simple subscription. Infinite possibilities.</h2>
            <p className="">
              From branding and web development to marketing assets and product design—get what you
              need, when you need it
            </p>
            <Box className="" cols={{ sm: 2, md: 2 }}>
              <Box className="">1</Box>
              <Box className="">2</Box>
              <Box className="">3</Box>
              <Box className="">4</Box>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="">
        <Container>
          <Box className="justify-between">
            <Box className="" direction="col">
              <Box className="" direction="col">
                <p className="">How Studio works</p>
                <h2 className="">A smarter way to scale your digital and creative efforts.</h2>
                <p className="">
                  Trusted by growing brands & innovators. Led by senior creatives & developers.
                </p>
                <Link href="/contact">
                  <Button>Get Started</Button>
                </Link>
              </Box>
              <Box className="">
                <p className="flex">
                  <span>Logo</span> Have a more custom project in mind?{' '}
                  <span className="font-semibold">Get in touch</span>
                </p>
              </Box>
            </Box>
            <Box className="" direction="col">
              <Box className="">1</Box>
              <Box className="">2</Box>
              <Box className="">3</Box>
              <Box className="">4</Box>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="">
        <Container>
          <Box direction="col" className="items-center">
            <h2 className="">Compare Lorem Ipsum</h2>
            <p className="max-w-lg text-center">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </Box>
          <Box className="overflow-hidden rounded-lg" direction="col">
            <PricingTable
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
          <Box className="items-center justify-between rounded-lg bg-text text-[hsl(var(--base-hsl))] px-12 py-12">
            <Box className="max-w-2xl" direction="col">
                <h3 className="">Schedule a call to see which tier is best for you!</h3>
                <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </p>
            </Box>
            <Box className="">
              <Link href="/contact">
                <Button>Get Started</Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section>
        <Container>
            <h1 className="">We deliver solutions with partners and tools like</h1>
        </Container>
      </Section>
      <Section>
        <Container>
            <h1 className="">The work and outcomes</h1>
            <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. We power early-stage and enterprise alike. See more here</p>
        </Container>
      </Section>
      <Section className="[background:radial-gradient(88.31%_96.66%_at_50%_96.65%,#000227_0%,#0B0F50_100%)]">
        <Container className="text-white">
            <Box className="items-center" direction="col">
                <h1 className="text-white">Transformative Client Experiences</h1>
                <p className="max-w-md text-center">Discover what our satisfied customers have to say about their experiences with Studio by Matic Digital</p>
            </Box>
            <Box className="">
                <Box className="">1</Box>
                <Box className="">2</Box>
                <Box className="">3</Box>
                <Box className="">4</Box>
            </Box>
        </Container>
      </Section>
    </ScrollThemeTransition>
  );
}
