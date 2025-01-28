import { Box, Container, Section } from '@/components/global/matic-ds';
import {type Metadata} from 'next'
import { type Work, type WorkResponse, type EngageResponse, type CTAResponse } from '@/types';
import {getAllWork, getAllWaysToEngage, getAllCTAs} from '@/lib/api'
import { WorkGrid } from '@/components/work/WorkGrid';
import { CTASection } from '@/components/global/CTASection';
import { EngageSection } from '@/components/global/EngageSection';

/**
 * Metadata for the work page
 */
export const metadata: Metadata = {
  title: 'Work | Matic',
  description: 'Explore our projects and services'
};

export default async function Work() {
  const workResponse: WorkResponse = await getAllWork();
  const works = workResponse.items;
  const engageResponse: EngageResponse = await getAllWaysToEngage();
  const engageItems = engageResponse.items;
  const ctaResponse: CTAResponse = await getAllCTAs();
  const ctas = ctaResponse.items;

  return (
    <Section>
        <Container width="full" className="space-y-8">
          <Container>

            <Box className="" direction="col" gap={4}>
                <h1 className="text-5xl font-medium">
                  Work, tactics and outcomes
                </h1>
                <p className="max-w-lg">
                We&apos;ve propelled our partners into their next growth stage, transformed their business and driven lasting loyalty through meaningful collaborations.
                </p>
            </Box>
          </Container>
            <WorkGrid works={works} />
        </Container>
            <CTASection cta={ctas[0]} />
            <EngageSection engageItems={engageItems} />
    </Section>
  )
}