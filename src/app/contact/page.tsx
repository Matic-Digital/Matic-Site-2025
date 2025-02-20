'use client';

// Components
import { ContactForm } from '@/components/forms/ContactForm';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';

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
        <Container>
          <Box direction="col" className="">
            <Box direction="col" className="">
              <h1 className="">Let&apos;s get it together</h1>
              <p className="">Whatever your &ldquo;it&rdquo; is, we&apos;d love to connect with you - get in touch to start the conversation. We promise to make it fun!</p>
            </Box>
            <Box className="">
              <ContactForm />
            </Box>
          </Box>
        </Container>
      </Section>
    </>
  );
}
