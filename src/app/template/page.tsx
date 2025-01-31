// Dependencies
import type { Metadata } from 'next';

import { Section, Prose, Box, Container } from '@/components/global/matic-ds';
import { DEFAULT_METADATA } from '@/constants/metadata';
import { ThemeToggle } from '@/components/global/ThemeToggle';

/**
 * Metadata for the Template page
 */
export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  title: `Template | ${DEFAULT_METADATA.title}`,
  description: 'Template page showcasing various content elements and styles'
};

export default async function TemplatePage() {
  return (
    <Section>
      <Container className="bg-surface0">
        <Box direction="col" gap={4}>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
        </Box>
      </Container>
    </Section>
  );
}
