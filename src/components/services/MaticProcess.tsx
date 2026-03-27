import { Container, Box, Section } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function MaticProcess() {
  return (
    <Section className="bg-white">
      <Container>
        <Box direction="col" className="gap-[2rem]">
          <Box direction="col" className="gap-[2rem] md:gap-[4.44rem]">
            <Box direction="col" className="gap-[1.62rem] md:max-w-[48.5625rem]">
              <p className="font-bold text-blue md:text-xl">From insight to execution</p>
              <h2 className="text-4xl font-bold text-maticblack md:text-5xl md:font-normal">
                Our Process
              </h2>
              <p className="text-maticblack md:text-2xl">
                We close the gaps with our tested frameworks built to align teams early, sharpen
                purpose, and deliver solutions that scale.
              </p>
            </Box>
            {/* Mobile Image */}
            <Image
              src="/services-our-process-mobile.svg"
              alt="Description mobile"
              width={124}
              height={124}
              className="h-auto w-full border-none md:hidden"
            />
            {/* Desktop Image */}
            <Image
              src="/services-our-process.svg"
              alt="Description"
              width={124}
              height={124}
              className="hidden h-auto w-full border-none md:block"
            />
          </Box>
          <Box direction="col" className="gap-[2rem] md:gap-[4.25rem]">
            {/* First Row: 01 and 02 */}
            <Box
              direction="col"
              className="gap-[2rem] md:flex-row md:gap-x-[4.25rem] md:gap-y-[2.62rem]"
            >
              <div className="flex w-full flex-col items-start gap-[0.75rem] md:max-w-[35.625rem]">
                <h3 className="text-2xl font-bold text-blue md:text-3xl md:font-normal">
                  <span className="opacity-60">01</span> Immersion
                </h3>
                <p className="text-maticblack md:text-xl">
                  <span className="font-bold">Know everything.</span> We uncover customer insight,
                  category dynamics, and whitespace. This phase immerses us in your market,
                  audience, and operations to find new opportunities and unmet needs.
                </p>
              </div>
              <div className="flex w-full flex-col items-start gap-[0.75rem] md:max-w-[35.625rem]">
                <h3 className="text-2xl font-bold text-green md:text-3xl md:font-normal">
                  <span className="opacity-60">02</span> Creation
                </h3>
                <p className="text-maticblack md:text-xl">
                  <span className="font-bold">Set the strategy. Build the system.</span> Together,
                  we define a clear vision, design brand systems, and architect the tools that
                  will power your growth with scalable identity to backend infrastructure.
                </p>
              </div>
            </Box>
            {/* Second Row: 03 and 04 */}
            <Box
              direction="col"
              className="gap-[2rem] md:flex-row md:gap-x-[4.25rem] md:gap-y-[2.62rem]"
            >
              <div className="flex w-full flex-col items-start gap-[0.75rem] md:max-w-[35.625rem]">
                <h3 className="text-2xl font-bold text-orange md:text-3xl md:font-normal">
                  <span className="opacity-60">03</span> Implementation
                </h3>
                <p className="text-maticblack md:text-xl">
                  <span className="font-bold">Bring it to life.</span> We activate your strategy
                  through marketing, websites, and digital platforms. Our team launches, connects,
                  and integrates the experiences that deliver measurable results.
                </p>
              </div>
              <div className="flex w-full flex-col items-start gap-[2rem] md:max-w-[35.625rem] md:gap-[1.69rem]">
                <div className="flex flex-col items-start gap-[0.75rem]">
                  <h3 className="text-2xl font-bold text-[#060EC2] md:text-3xl md:font-normal">
                    <span className="opacity-60">04</span> Transformation
                  </h3>
                  <p className="text-maticblack md:text-xl">
                    <span className="font-bold">Scale & evolve.</span> With scalable systems,
                    measurable performance, and data-driven insight, your team is positioned for
                    growth, new technologies like AI, and adaptive resources. We stay involved to
                    help you measure what matters, learn from the data, and evolve continuously.
                  </p>
                </div>
                <Link href="/contact">
                  <Button className="whitespace-nowrap dark:bg-background dark:text-text">
                    Get in touch
                  </Button>
                </Link>
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
