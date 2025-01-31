import type { Metadata } from 'next';
import {
  getHero,
  getAllWork,
  getAllPartners,
  getAllInsights,
  getAllSignals,
  getServiceComponent
} from '@/lib/api';
import { ClientHero } from '@/components/global/ClientHero';
import { PartnershipSection } from '@/components/global/PartnershipSection';
import { ServiceItem } from '@/components/services/ServiceItem';
import { Container, Section } from '@/components/global/matic-ds';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { SignalsSection } from '@/components/global/SignalsSection';

const colors = ['var(--rosewater)', 'var(--flamingo)', 'var(--pink)', 'var(--yellow)'];

/**
 * Landing page
 */
export const metadata: Metadata = {
  title: 'Matic Digital',
  description: 'Matic Digital - Digital Product Agency'
};

export default async function HomePage() {
  const [hero, partners, insights, signals, serviceComponent] = await Promise.all([
    getHero(),
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
      {/* <ScrollThemeTransition theme="light"> */}
        <ClientHero hero={hero} />
        <Section>
          <Container>
            <h1 className="">{serviceComponent?.header}</h1>
          </Container>
        </Section>
        <Section className="py-0">
          {serviceComponent?.servicesCollection?.items.map((item, index) => (
            <ServiceItem key={item.sys.id} item={item} index={index} colors={colors} />
          ))}
        </Section>
      {/* </ScrollThemeTransition> */}
        <ScrollThemeTransition topAligned theme="dark">
          <PartnershipSection partners={partners.items} />
          <SignalsSection signal={signals.items[0]} />
        </ScrollThemeTransition>
    </>
  );
}
