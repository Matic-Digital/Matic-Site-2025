'use client';
import ServiceHero from '@/components/services/ServiceHero';

export default function ServicesPage() {
  return (
    <ServiceHero
      overline="Expertise ___ Health & Fitness"
      heading="We help healthcare and fitness companies build engagement, drive outcomes, and scale brand and digital systems."
      overlineColor="text-orange"
      imageSrc="https://images.ctfassets.net/17izd3p84uup/7HVu1INjNXqdXvdi6Ot3Nz/5b2ed22196bada6240c272cd35828634/Mask_group.svg"
      imageAlt="Health Services"
      firstBoxDescription="A strategic partner for clarity and growth in a transforming industry."
      secondBoxDescription="Where trust, outcomes, and experience meet. From digital services to hospital systems, we help brands in the health and fitness space position for relevance, design for trust, and build systems that support better outcomes for people, providers, and partners."
      secondBoxColor="bg-green"
    />
  );
}
