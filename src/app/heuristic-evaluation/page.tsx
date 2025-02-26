import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { TextEffect } from '@/components/ui/text-effect';
import { PLACEHOLDER_IMAGE } from '@/constants/images';
import EvaluationCard from '@/components/global/EvaluationCard';
import { Button } from '@/components/ui/button';
import { CarouselWithDots } from '@/components/ui/carousel-with-dots';
import { type Testimonial } from '@/types';
import { getAllTestimonials } from '@/lib/api';
import { TestimonialBox } from '@/components/studio/TestimonialBox';

export default async function HeuristicEvaluation() {
  const testimonials = await getAllTestimonials();
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
      <Section className="">
        <Container>test</Container>
      </Section>
      <Section>
        <Container className="space-y-8">
          <Box className="" direction="col">
            <TextEffect per="char" as="h1">
              What&apos;s included?
            </TextEffect>
            <TextEffect per="word" speedReveal={3} as="p" className="max-w-xl">
              Our Heuristic Review arms you with clear intelligence on how your website is
              performing, benchmarks you against three competitors, and provides actionable
              recommendations for improvement—all in 7 business days.
            </TextEffect>
          </Box>
          <Box className="ml-auto space-y-4 md:max-w-[1073px]" direction="col">
            <Box className="grid grid-cols-3 gap-4 md:max-w-[1073px]" direction="col">
              <EvaluationCard
                imageSrc={PLACEHOLDER_IMAGE}
                heading="Heuristic Evaluation Report"
                copy="We analyze how well your website engages visitors and converts them into customers. (note: it will be a document)"
              />
              <EvaluationCard
                imageSrc={PLACEHOLDER_IMAGE}
                heading="30 Minutes with an Expert"
                copy="We don't just hand over a PDF. You'll get a 30 minute consult to walk your team through the findings and recommendations."
              />
              <EvaluationCard
                imageSrc={PLACEHOLDER_IMAGE}
                heading="Actionable Recommendations"
                copy="We provide a prioritized list of fixes to improve user experience and revenue potential."
              />
              <EvaluationCard
                imageSrc={PLACEHOLDER_IMAGE}
                heading="Competitive Benchmarking"
                copy="See how your site compares to competitors in your space."
              />
              <EvaluationCard
                imageSrc={PLACEHOLDER_IMAGE}
                heading="Revenue Optimization"
                copy="Documented proof on whether your website has the right calls to action and messaging to drive results."
              />
            </Box>
            <Box className="grid grid-cols-3 gap-4 md:max-w-[1073px]">
              <Button variant="darkblue">See how your website stacks up</Button>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="dark bg-background">
        <Container>
            <h1 className="text-[2.23rem] md:text-[2.5rem]">Transformative client testimonials</h1>
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
    </>
  );
}
