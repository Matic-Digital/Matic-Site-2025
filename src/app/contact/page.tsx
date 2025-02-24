'use client';

// Components
import { ContactForm } from '@/components/forms/ContactForm';
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
      <Section className="min-h-screen">
        <Container className="space-y-8">
          <Box direction="col" className="space-y-8">
            <Box direction="col" className="">
              <h1 className="">Let&apos;s get it together</h1>
              <p className="max-w-xl">
                Whatever your &ldquo;it&rdquo; is, we&apos;d love to connect with you - get in touch
                to start the conversation. We promise to make it fun!
              </p>
            </Box>
            <Box
              direction={{ base: 'col', md: 'row' }}
              className="justify-evenly space-y-8 md:space-y-0"
            >
              <ContactForm />
              <Box direction="col" className="text-center space-y-12">
                <Box className="space-y-2" direction="col">
                  <h2 className="text-lg font-medium mb-4">Business Inquiries</h2>
                  <p className="text-xl font-medium">Josh Fuller</p>
                  <p className="text-sm text-text/70 mb-2">CEO & Founder</p>
                  <Link href="mailto:josh@maticdigital.com" className="text-sm hover:opacity-70 hover:text-text transition-opacity">josh@maticdigital.com</Link>
                </Box>
                <Box className="space-y-2" direction="col">
                  <h2 className="text-lg font-medium mb-4">Careers</h2>
                  <p className="text-sm text-text/70 mb-2">Share your experience</p>
                  <Link href="mailto:work@maticdigital.com" className="text-sm hover:opacity-70 hover:text-text transition-opacity">work@maticdigital.com</Link>
                </Box>
                <Box className="space-y-2" direction="col">
                  <h2 className="text-lg font-medium mb-4">General</h2>
                  <p className="text-sm text-text/70 mb-2">(720) 762-3480</p>
                  <Link href="mailto:hello@maticdigital.com" className="text-sm hover:opacity-70 hover:text-text transition-opacity">hello@maticdigital.com</Link>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box direction="col" className="relative w-full aspect-[9/16] md:aspect-video p-12 text-white justify-between">
            <div className="absolute inset-0 w-full h-full">
              <div className="relative w-full h-full group">
                <Image
                  src="/location.png"
                  alt="Denver"
                  fill
                  className="object-cover opacity-100 group-hover:opacity-0 duration-500 transition-opacity"
                />
                <Image
                  src="/cta-secondary.svg"
                  alt="CTA"
                  fill
                  className="object-cover opacity-0 group-hover:opacity-100 duration-500 transition-opacity"
                />
              </div>
            </div>
            <Box className="relative z-50 pointer-events-none" direction="col">
              <h1 className="text-white md:text-[96px]">Denver</h1>
              <p className="md:max-w-4xl md:text-[32px]">Our team is spread out, but our HQ is now located in Reno, Denver. We’d love to connect—whether it’s grabbing a coffee or hopping on Zoom. Let’s chat!</p>
            </Box>
            <Box direction="col" className="relative z-50 pointer-events-none">
              <h2 className="text-xl font-medium">Studio Location</h2>
              <p className="text-2xl font-semibold">3457 Ringsby Ct,</p>
              <p className="text-2xl font-semibold">Denver, Colorado 80216</p>
            </Box>
          </Box>
        </Container>
      </Section>
    </>
  );
}
