import { Container, Section, Box } from '@/components/global/matic-ds';
import { type Metadata } from 'next';
import { getTeamGrid, getAllEngage, getLogoCarousel } from '@/lib/api';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { EngageSection } from '@/components/global/EngageSection';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/constants/images';
import ApproachText from '@/components/global/ApproachText';
import TeamMember from '@/components/global/TeamMember';
import { InfiniteSlider } from '@/components/ui/infinite-slider';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page'
};

export default async function About() {
  const teamGrid = await getTeamGrid('1BbC51PcSZOFLduIX8XRHW');
  console.log('TeamGrid data:', JSON.stringify(teamGrid, null, 2));
  const _engageItems = await getAllEngage();
  const logoCarousel = await getLogoCarousel('5VFEg6GLTKMOEBxWUo1qak');
  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'dark'
          },
          {
            percentage: 12.13,
            theme: 'light'
          },
          {
            percentage: 52.77,
            theme: 'dark'
          },
          {
            percentage: 85.55,
            theme: 'blue'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'dark'
          },
          {
            percentage: 4.65,
            theme: 'light'
          },
          {
            percentage: 38.88,
            theme: 'dark'
          },
          {
            percentage: 76.50,
            theme: 'light'
          }
        ]}
      />
      <Section className="relative -mt-24 h-[361px] md:h-[750px]">
        <Image
          src={PLACEHOLDER_IMAGE}
          alt="insight"
          width={1200}
          height={750}
          className="absolute inset-0 z-10 h-full w-full rounded-none border-none object-cover"
        />
      </Section>
      <Section className="relative space-y-14 overflow-hidden bg-background dark:bg-text dark:text-background">
        <Container>
          <Box direction={{ base: 'col', md: 'row' }} className="space-y-8 justify-between">
            <h1 className="text-text dark:text-background">Our story</h1>
            <Box className="md:max-w-[875px] text-text dark:text-background" direction="col" gap={4}>
              <p className="text-[1.75rem] leading-[140%] tracking-[-0.72px]">
                We are a design and strategy firm collaborating with top design leaders from tech
                brands and emerging businesses to develop digital solutions that are simple,
                practical, and scalable
              </p>
              <p className="text-base font-light leading-[160%] tracking-[-0.16px]">
                If you&apos;re seeking an agency that fosters a strong remote work culture, you&apos;ve found
                the right place. We value openness, curiosity, and a willingness to learn. If you
                thrive in a team that prioritizes high-quality work over loud voices, reach out to
                us.
              </p>
            </Box>
          </Box>
        </Container>
        <InfiniteSlider duration={100}>
          {[...(logoCarousel?.carouselImagesCollection?.items ?? []), ...(logoCarousel?.carouselImagesCollection?.items ?? [])].map((image, index) => (
            <Image
              key={`${image.sys.id}-${index}`}
              src={image.url}
              alt={image.title}
              width={131}
              height={45}
              className="w-full h-[45px] px-2 rounded-none border-none object-contain brightness-0"
            />
          ))}
        </InfiniteSlider>
      </Section>
      <Section className="bg-background dark:bg-text dark:text-background">
        <Container>
          <Box direction={{ base: 'col', md: 'row' }} className="justify-between space-y-8">
            <h1 className="dark:text-background">Our approach</h1>
            <Box className="max-w-[827px] flex-grow" direction="col" gap={4}>
              <ApproachText
                number={1}
                header="Lorem ipsum dolor"
                copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
              />
              <Box className="justify-end">
                <ApproachText
                  number={2}
                  header="Lorem ipsum dolor"
                  copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
                />
              </Box>
              <Box className="">
                <ApproachText
                  number={3}
                  header="Lorem ipsum dolor"
                  copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
                />
              </Box>
              <Box className="justify-end">
                <ApproachText
                  number={4}
                  header="Lorem ipsum dolor"
                  copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
                />
              </Box>
              <ApproachText
                number={5}
                header="Lorem ipsum dolor"
                copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
              />
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="bg-background dark:bg-text dark:text-background">
        <Container>
          <Box direction={{ base: 'col', md: 'row' }} className="justify-between">
            <Box direction={'col'} className="md:max-w-[370px]">
              <h1 className="dark:text-background">Working with us</h1>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo.
              </p>
            </Box>
            <Box direction={'col'}>
              <Box className="" gap={4}>
                <Box className="" direction={'col'}>
                  <Image
                    src={PLACEHOLDER_IMAGE}
                    alt="image 1"
                    width={508}
                    height={283}
                    className="rounded-none border-none object-cover"
                  />
                  <p className="">caption</p>
                </Box>
                <Box className="" direction={'col'}>
                  <Image
                    src={PLACEHOLDER_IMAGE}
                    alt="image 1"
                    width={297}
                    height={175}
                    className="rounded-none border-none object-cover"
                  />
                  <p className="">caption</p>
                </Box>
              </Box>
              <Box className="" gap={4}>
                <Box className="" direction={'col'}>
                  <Image
                    src={PLACEHOLDER_IMAGE}
                    alt="image 1"
                    width={297}
                    height={175}
                    className="rounded-none border-none object-cover"
                  />
                  <p className="">caption</p>
                </Box>
                <Box className="" direction={'col'}>
                  <Image
                    src={PLACEHOLDER_IMAGE}
                    alt="image 1"
                    width={508}
                    height={283}
                    className="rounded-none border-none object-cover"
                  />
                  <p className="">caption</p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="dark bg-background">
        <Container>
          <Box className="justify-between" direction={{ base: 'col', md: 'row' }} gap={8}>
            <Box direction="col" gap={4} className="md:min-w-[314px] md:max-w-[314px]">
              <h1 className="text-text">{teamGrid?.heading}</h1>
              <p className="text-text">{teamGrid?.subheading}</p>
            </Box>
            <Box className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {teamGrid?.teamMembersCollection?.items?.map((member) => (
                <TeamMember
                  key={member.sys.id}
                  fullName={member.fullName}
                  role={member.role}
                  headshot={member.headshot}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="dark bg-gradient-to-b from-maticblack to-[#041782]">
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
      </Section>
    </>
  );
}
