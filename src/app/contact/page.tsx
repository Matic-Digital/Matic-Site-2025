import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { SignalsSection } from '@/components/global/SignalsSection';
import StepCard from '@/components/global/StepCard';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

/**
 * Contact page component
 */
export default function ContactPage() {
  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 17.19,
            theme: 'dark'
          },
          {
            percentage: 35.32,
            theme: 'light'
          },
          {
            percentage: 72.8,
            theme: 'dark'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 20.04,
            theme: 'dark'
          },
          {
            percentage: 42.97,
            theme: 'light'
          },
          {
            percentage: 67.09,
            theme: 'dark'
          }
        ]}
      />
      <Section className="bg-background dark:bg-text">
        <Container className="space-y-[0.5rem] md:space-y-[1.88rem]">
          <Box className="justify-between" direction={{ base: 'col', md: 'row' }}>
            <Box direction="col" className="justify-center gap-[8rem]">
              <Box className="" direction="col">
                <h1 className="text-[4rem]">Let&apos;s get it together</h1>
                <p className="text-[0.875rem] md:w-[41.625rem] md:text-[1.25rem] md:leading-[160%] md:tracking-[-0.0125rem]">
                  Whatever your &ldquo;it&rdquo; is, we&apos;d love to connect with you - get in touch to
                  start the conversation. We promise to make it fun!
                </p>
              </Box>

              <Accordion
                className="flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700"
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                variants={{
                  expanded: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 }
                }}
              >
                <AccordionItem value="response" className="py-2">
                  <AccordionTrigger value="response" className="w-full text-left text-zinc-950 dark:text-zinc-50">
                    <h2 className="text-[1.5rem] leading-[140%]">
                      How soon can you expect a response?
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent value="response">
                    <p className="text-zinc-500 dark:text-zinc-400">
                      We typically respond within 1–2 business days.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="best" className="py-2">
                  <AccordionTrigger value="best" className="w-full text-left text-zinc-950 dark:text-zinc-50">
                    <h2 className="text-[1.5rem] leading-[140%]">
                      What&apos;s the best way to start a project with Matic?
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent value="best">
                    <p className="text-zinc-500 dark:text-zinc-400">lorem ipsum</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="consult" className="py-2">
                  <AccordionTrigger value="consult" className="w-full text-left text-zinc-950 dark:text-zinc-50">
                    <h2 className="text-[1.5rem] leading-[140%]">
                      Do you offer free consultations?
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent value="consult">
                    <p className="text-zinc-500 dark:text-zinc-400">lorem ipsum</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Box>
            <Box className="w-full md:w-[36rem]">
              <ContactForm />
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="dark bg-background py-[7.5rem] md:px-[5.19rem]">
        <Container className="space-y-[3.75rem]">
          <Box className="gap-[1.19rem]" direction="col">
            <h1 className="leading-[120%] tracking-[-0.09rem] md:w-1/2 md:text-[3rem]">
              Your website isn&apos;t driving revenue? We&apos;ll tell you why.
            </h1>
            <p className="text-[0.875rem] leading-[160%] tracking-[-0.00875rem] text-text md:max-w-[39rem]">
              For <span className="font-bold">$499</span> we&apos;ll contuct a quick heuristic
              analysis of your website and deliver a straightforward report in 3-5 business days,
              highlighting key friction points and actionable fixes.
            </p>
          </Box>
          <Box className="gap-[4rem] md:ml-[13.2rem]" cols={{ base: 2, md: 3 }}>
            <StepCard
              number={1}
              heading="Performance Insights"
              description="We analyze how well your website engages visitors and converts them into customers."
            />
            <StepCard
              number={2}
              heading="Actionable Recommendations"
              description="We provide a prioritized list of fixes to improve user experience and revenue potential."
            />
            <StepCard
              number={3}
              heading="Walkthrough with an Expert"
              description="We don't just hand over a PDF. We guide you through the findings and next steps."
            />
            <StepCard
              number={4}
              heading="Competitive Benchmarking"
              description="See how your site compares to three competitors in your space."
            />
            <StepCard
              number={5}
              heading="Conversion Optimization"
              description="Discover if your website has the right CTAs, messaging, and user flow to drive results."
            />
            <StepCard
              number={6}
              heading="Fast Turnaround"
              description="Get your report in 3-5 business days."
            />
            <Box className="col-span-2 items-center gap-4" direction={{ base: 'col', md: 'row' }}>
              <p className="text-base font-semibold leading-[130%] tracking-[-0.025rem] text-text md:text-[1.25rem]">
                No fluff. Just insights that move the needle.
              </p>
              <Link href="/">
                <Button variant="darkblue">Buy Now</Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="bg-background py-[6rem] dark:bg-text dark:text-maticblack">
        <Container>
          <Image
            src="/about/BannerImageAlt.png"
            alt="Contact"
            width={1274}
            height={698}
            className="w-full border-none md:aspect-[1274.00/698.93]"
          />
          <Box className="my-[2rem] gap-[4rem] md:my-[4rem]" direction={{ base: 'col', md: 'row' }}>
            <Image
              src={`/about/Banner Image.png`}
              alt="Contact"
              width={1274}
              height={698}
              className="border-none md:h-[42.75rem] md:max-w-[605px] object-cover"
            />
            <Box
              direction="col"
              className="dark h-[42.75rem] rounded-lg bg-background p-[3rem] md:mt-[12.5rem]"
            >
              <Box className="gap-[0.63rem]" direction="col">
                <h1 className="">Contact</h1>
                <hr className="my-0 opacity-30" />
              </Box>
              <Box className="flex-grow">
                <p className="pt-[1.25rem] text-base leading-[150%] tracking-[-0.02rem] text-text">
                  Whatever your &ldquo;it&rdquo; is, we&apos;d love to connect with you - get in touch to
                  start the conversation. We promise to make it fun!
                </p>
              </Box>
              <Box className="" direction="col">
                <hr className="my-0 opacity-30" />
                <Box className="gap-[1.25rem] py-[1.25rem]">
                  <p className="w-[8.0625rem] text-text opacity-50">Email</p>
                  <Link
                    href="mailto:hello@maticdigital.com"
                    className="text-base font-semibold leading-[130%] tracking-[-0.02rem] text-text"
                  >
                    hello@maticdigital.com
                  </Link>
                </Box>
              </Box>
              <Box className="" direction="col">
                <hr className="my-0 opacity-30" />
                <Box className="gap-[1.25rem] py-[1.25rem]">
                  <p className="w-[8.0625rem] text-text opacity-50">Phone</p>
                  <p className="text-base font-semibold leading-[130%] tracking-[-0.02rem] text-text">
                    (720) 762-3480
                  </p>
                </Box>
              </Box>
              <Box className="" direction="col">
                <hr className="my-0 opacity-30" />
                <Box className="gap-[1.25rem] py-[1.25rem]">
                  <p className="w-[8.0625rem] text-text opacity-50">Address</p>
                  <Box className="" direction="col">
                    <p className="text-base font-semibold leading-[130%] tracking-[-0.02rem] text-text">
                      3457 Ringsby Ct, Denver, CO 80216
                    </p>
                    <p className="text-text opacity-50">(By appointment only)</p>
                  </Box>
                </Box>
              </Box>
              <Box className="" direction="col">
                <hr className="my-0 opacity-30" />
                <Box className="gap-[1.25rem] py-[1.25rem]">
                  <p className="w-[8.0625rem] text-text opacity-50">Socials</p>
                  <Box className="gap-[0.75rem] gap-x-[2.25rem]" cols={2}>
                    <Link
                      className="flex gap-1 text-base font-semibold leading-[130%] tracking-[-0.02rem] text-text"
                      href="https://www.linkedin.com/company/matic-digital/"
                      target="_blank"
                    >
                      LinkedIn <ArrowUpRight />
                    </Link>
                    <Link
                      className="flex gap-1 text-base font-semibold leading-[130%] tracking-[-0.02rem] text-text"
                      href="https://www.facebook.com/p/Matic-Digital-100094332087021/"
                      target="_blank"
                    >
                      Facebook <ArrowUpRight />
                    </Link>
                    <Link
                      className="flex gap-1 text-base font-semibold leading-[130%] tracking-[-0.02rem] text-text"
                      href="https://www.instagram.com/maticdigital/"
                      target="_blank"
                    >
                      Instagram <ArrowUpRight />
                    </Link>
                    <Link
                      className="flex gap-1 text-base font-semibold leading-[130%] tracking-[-0.02rem] text-text"
                      href="https://x.com/i/flow/login?redirect_after_login=/MaticDigital"
                      target="_blank"
                    >
                      Twitter <ArrowUpRight />
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="dark bg-background">
        <SignalsSection />
      </Section>
    </>
  );
}
