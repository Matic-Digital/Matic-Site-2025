'use client';
import ServiceHero from '@/components/services/ServiceHero';

export default function ServicesPage() {
  return (
    <ServiceHero
      overline="Expertise ___ Martech & Adtech"
      heading="We help martech and adtech companies navigate inflection points and build brand and digital systems to scale."
      overlineColor="text-orange"
      imageSrc="https://images.ctfassets.net/17izd3p84uup/7HVu1INjNXqdXvdi6Ot3Nz/5b2ed22196bada6240c272cd35828634/Mask_group.svg"
      imageAlt="Martech Services"
      firstBoxDescription="A strategic partner for growth in a crowded, fast-moving market"
      secondBoxDescription="Marketing tech is crowded, complex, and constantly changing. We help martech and adtech companies cut through the noise with positioning that sticks, experiences that convert, and brand systems built to support growth after launch."
      secondBoxColor="bg-pink"
    />
  );
}
