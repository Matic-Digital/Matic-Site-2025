'use client';

// Components
import { ContactForm } from '@/components/forms/ContactForm';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { metadata } from './metadata';
import { Box, Container, Section } from '@/components/global/matic-ds';

/**
 * Contact page component
 */
export default function ContactPage() {
  return (
    <ScrollThemeTransition theme="light">
      <Section className="min-h-screen">
        <Container>
          <Box>
            <h1 className="">Contact</h1>
          </Box>
        </Container>
      </Section>
    </ScrollThemeTransition>
  );
}
