import { getAllCapabilities, getHero, getAllWork } from '@/lib/api';
import { WhatWeDo } from '@/components/global/WhatWeDo';
import { WorkSection } from '@/components/global/WorkSection';
import { ClientHero } from '@/components/global/ClientHero';
import { PartnershipSection } from '@/components/global/PartnershipSection';
import { JournalSection } from '@/components/global/JournalSection';
import { SignalsSection } from '@/components/global/SignalsSection';
import { CTASection } from '@/components/global/CTASection';
import { EngageSection } from '@/components/global/EngageSection';
import { getAllPartners, getAllClients } from '@/lib/api';
import { getAllInsights, getAllWaysToEngage, getAllSignals, getAllCTAs } from '@/lib/api';

/**
 * Landing page
 */
export default async function HomePage() {
  const [capabilities, hero, works, partners, clients, insights, engage, signals, cta] =
    await Promise.all([
      getAllCapabilities(),
      getHero(),
      getAllWork(),
      getAllPartners(),
      getAllClients(),
      getAllInsights(),
      getAllWaysToEngage(),
      getAllSignals(),
      getAllCTAs()
    ]);

  if (!hero) {
    return null;
  }

  return (
    <>
      <ClientHero hero={hero} />
      <WhatWeDo capabilities={capabilities.items} />
      <WorkSection works={works.items} />
      <PartnershipSection partners={partners.items} clients={clients.items} />
      <JournalSection insights={insights.items} total={insights.total} />
      <SignalsSection signal={signals.items[0]} />
      <CTASection cta={cta.items[0]} />
      <EngageSection engageItems={engage.items} />
    </>
  );
}
