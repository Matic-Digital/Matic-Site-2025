'use client';

// Components
import { ContactForm } from '@/components/forms/ContactForm';
import { metadata } from './metadata';
import { Box, Container, Section } from '@/components/global/matic-ds';

/**
 * Contact page component
 */
export default function ContactPage() {
  return (
    <Section className="min-h-screen">
      <Container>
        <Box direction="col" className="space-y-12">
          <h1 className="text-[2.23rem] md:text-[2.5rem]">Contact</h1>
          <ContactForm />
        </Box>
      </Container>
    </Section>
  );
}
