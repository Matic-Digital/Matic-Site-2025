'use client';

// Components
import { ContactForm } from '@/components/forms/ContactForm';
import DefaultHero from '@/components/global/DefaultHero';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import Image from 'next/image';
import Link from 'next/link';

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
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          }
        ]}
      />
      <DefaultHero heading="Let&apos;s get it together" subheading="Whatever your &ldquo;it&rdquo; is, we&apos;d love to connect with you - get in touch to start the conversation. We promise to make it fun!" />
    </>
  );
}
