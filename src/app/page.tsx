import { type Metadata } from 'next';
import {
  getHero,
  getAllWork,
  getAllPartners,
  getAllInsights,
  getAllWaysToEngage,
  getAllSignals,
  getAllCTAs,
  getServiceComponent
} from '@/lib/api';
import { WorkSection } from '@/components/global/WorkSection';
import { CTASection } from '@/components/global/CTASection';
import { EngageSection } from '@/components/global/EngageSection';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { Container } from '@/components/global/matic-ds';
import { Section } from '@/components/global/matic-ds';
import { ClientHero } from '@/components/global/ClientHero';
import { PartnershipSection } from '@/components/global/PartnershipSection';
import { JournalSection } from '@/components/global/JournalSection';
import { SignalsSection } from '@/components/global/SignalsSection';
import { ServiceItem } from '@/components/services/ServiceItem';
import { ThemeInitializer } from '@/components/theme/ThemeInitializer';

const colors = ['#076EFF', '#12B76A', '#DD2590', '#FB9910'];

/**
 * Landing page
 */
export const metadata: Metadata = {
  title: 'Matic Digital',
  description: 'Matic Digital'
};

export default async function HomePage() {
  const [hero, works, partners, insights, engage, signals, cta, serviceComponent] =
    await Promise.all([
      getHero(),
      getAllWork(),
      getAllPartners(),
      getAllInsights(3), // Only fetch 3 insights for the journal section
      getAllWaysToEngage(),
      getAllSignals(),
      getAllCTAs(),
      getServiceComponent('1xHRTfLve3BvEp2NWD6AZm')
    ]);

  if (!hero) {
    return null;
  }

  return (
    <>
      <div className="relative">
        <ClientHero hero={hero} />
        <Section>
          <Container>
            <h1 className="">{serviceComponent?.header}</h1>
          </Container>
        </Section>
        <Section className="py-0">
        {serviceComponent?.servicesCollection?.items.map((item, index) => (
          <ServiceItem
            key={item.sys.id}
            item={item}
            index={index}
            backgroundColor={colors[index % colors.length] ?? 'bg-[var(--primary)]'}
          />
        ))}
        </Section>
        <ScrollThemeTransition topAligned theme="dark">
          <WorkSection works={works.items} />
          <PartnershipSection partners={partners.items} />
          <JournalSection insights={insights.items} total={insights.total} />
          <SignalsSection signal={signals.items[0]} />
        </ScrollThemeTransition>
      </div>
    </>
  );
}
