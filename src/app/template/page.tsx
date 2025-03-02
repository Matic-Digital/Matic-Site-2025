// Dependencies
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Section, Box, Container } from '@/components/global/matic-ds';
import { DEFAULT_METADATA } from '@/constants/metadata';

/**
 * Metadata for the Template page
 */
export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  title: `Template | ${DEFAULT_METADATA.title}`,
  description: 'Template page showcasing various content elements and styles'
};

function TemplateContent() {
  return (
    <Box direction="col" gap={4}>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <p>Paragraph</p>
    </Box>
  );
}

export default async function TemplatePage() {
  return (
    <Section>
      <Container>
        <Suspense>
          <TemplateContent />
        </Suspense>
      </Container>
    </Section>
  );
}
