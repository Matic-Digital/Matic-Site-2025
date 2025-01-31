import type { Metadata } from 'next';
import { getHero, getAllWork, getAllPartners, getAllInsights, getAllSignals, getServiceComponent } from '@/lib/api';
import { ClientHero } from '@/components/global/ClientHero';
import { WorkSection } from '@/components/global/WorkSection';
import { JournalSection } from '@/components/global/JournalSection';
import { PartnershipSection } from '@/components/global/PartnershipSection';
import { ServiceItem } from '@/components/services/ServiceItem';
import { Container, Section } from '@/components/global/matic-ds';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { SignalsSection } from '@/components/global/SignalsSection';

const colors = ['#076EFF', '#12B76A', '#DD2590', '#FB9910'];

/**
 * Landing page
 */
export const metadata: Metadata = {
  title: 'Matic Digital',
  description: 'Matic Digital - Digital Product Agency',
};

export default async function HomePage() {
  const [hero, works, partners, insights, signals, serviceComponent] =
    await Promise.all([
      getHero(),
      getAllWork(),
      getAllPartners(),
      getAllInsights(), 
      getAllSignals(),
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
            colors={colors}
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
