import DefaultHero from '@/components/global/DefaultHero';
import { SplitContactForm } from '@/components/forms/SplitContactForm';
import { Container, Section } from '@/components/global/matic-ds';
import { getHeaderGrid } from '@/lib/api';
import HeadingGrid from '@/components/global/HeadingGrid';
import { CTASection } from '@/components/global/CTASection';
import { ScrollProgress } from '@/components/global/ScrollProgress';

/**
 * Contact page component
 */
export default async function ContactPage() {
  const headerGrid = await getHeaderGrid('6nyaBFyh1vCWzX8pZkMC8e');
  return (
    <>
      <ScrollProgress 
        breakpoints={[
          { percentage: 0, theme: 'light' },
          { percentage: 43.22, theme: 'dark' },
          { percentage: 74.43, theme: 'blue' },
        ]}
      />
      <DefaultHero heading="Let's get it together" subheading="We're excited to chat about what's next - your goals, challenges, and the opportunities waiting to be unlocked." />
      <Section className="">
        <Container>
          <SplitContactForm />
          <hr className="md:mt-[11.87rem] md:mb-[5.62rem]" />
          <HeadingGrid {...headerGrid} />
        </Container>
      </Section>
      <CTASection
        sectionHeader={"Let's get it together."}
        sectionSubheader={"Need a partner for what's next?"}
        ctaButtonText={'Get in touch'}
        backgroundImageRoute='/about/cta.jpg'
        secondaryBackgroundRoute='/cta-secondary.svg'
      />
    </>
  );
}
