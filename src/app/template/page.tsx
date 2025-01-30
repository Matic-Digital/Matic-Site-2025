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
        <Container>

        <ThemeToggle />
        <div className="bg-background text-foreground space-y-8">
          <h2 className="font-medium text-foreground">Background</h2>
        </div>
        <div className="bg-popover space-y-8">
          <h2 className="font-medium text-popover-foreground">Popover</h2>
        </div>
        <div className="bg-primary space-y-8">
          <h2 className="font-medium text-primary-foreground">Primary</h2>
        </div>
        <div className="bg-secondary space-y-8">
          <h2 className="font-medium text-secondary-foreground">Secondary</h2>
        </div>
        <div className="bg-tertiary space-y-8">
          <h2 className="font-medium text-foreground">Tertiary</h2>
        </div>
        <div className="bg-quartinary space-y-8">
          <h2 className="font-medium text-foreground">Quartinary</h2>
        </div>
        <div className="bg-muted space-y-8">
          <h2 className="font-medium text-muted-foreground">Muted</h2>
        </div>
        <div className="bg-accent space-y-8">
          <h2 className="font-medium text-accent-foreground">Accent</h2>
        </div>
        <div className="bg-destructive space-y-8">
          <h2 className="font-medium text-destructive-foreground">Destructive</h2>
        </div>
        <div className="bg-border space-y-8">
          <h2 className="font-medium text-foreground">Border</h2>
        </div>
        <div className="bg-input space-y-8">
          <h2 className="font-medium text-foreground">Input</h2>
        </div>
        <div className="bg-ring space-y-8">
          <h2 className="font-medium text-background ">Ring</h2>
        </div>
        <div className="bg-radius space-y-8">
          <h2 className="font-medium text-foreground ">Radius</h2>
        </div>

        </Container>

        <Prose>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <h1 className="font-normal">Heading 1</h1>
                <h1 className="font-normal">Regular</h1>
              </Box>
              <Box direction="col" gap={4}>
                <h1 className="font-medium">Heading 1</h1>
                <h1 className="font-medium">Medium</h1>
              </Box>
              <Box direction="col" gap={4}>
                <h1 className="font-semibold">Heading 1</h1>
                <h1 className="font-semibold">Semi Bold</h1>
              </Box>
              <Box direction="col" gap={4}>
                <h1 className="font-bold">Heading 1</h1>
                <h1 className="font-bold">Bold</h1>
              </Box>
            </Box>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <h2 className="font-normal">Heading 2</h2>
                <h2 className="font-normal">Regular</h2>
              </Box>
              <Box direction="col" gap={4}>
                <h2 className="font-medium">Heading 2</h2>
                <h2 className="font-medium">Medium</h2>
              </Box>
              <Box direction="col" gap={4}>
                <h2 className="font-semibold">Heading 2</h2>
                <h2 className="font-semibold">Semi Bold</h2>
              </Box>
              <Box direction="col" gap={4}>
                <h2 className="font-bold">Heading 2</h2>
                <h2 className="font-bold">Bold</h2>
              </Box>
            </Box>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <h3 className="font-normal">Heading 3</h3>
                <h3 className="font-normal">Regular</h3>
              </Box>
              <Box direction="col" gap={4}>
                <h3 className="font-medium">Heading 3</h3>
                <h3 className="font-medium">Medium</h3>
              </Box>
              <Box direction="col" gap={4}>
                <h3 className="font-semibold">Heading 3</h3>
                <h3 className="font-semibold">Semi Bold</h3>
              </Box>
              <Box direction="col" gap={4}>
                <h3 className="font-bold">Heading 3</h3>
                <h3 className="font-bold">Bold</h3>
              </Box>
            </Box>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <h4 className="font-normal">Heading 4</h4>
                <h4 className="font-normal">Regular</h4>
              </Box>
              <Box direction="col" gap={4}>
                <h4 className="font-medium">Heading 4</h4>
                <h4 className="font-medium">Medium</h4>
              </Box>
              <Box direction="col" gap={4}>
                <h4 className="font-semibold">Heading 4</h4>
                <h4 className="font-semibold">Semi Bold</h4>
              </Box>
              <Box direction="col" gap={4}>
                <h4 className="font-bold">Heading 4</h4>
                <h4 className="font-bold">Bold</h4>
              </Box>
            </Box>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <h5 className="font-normal">Heading 5</h5>
                <h5 className="font-normal">Regular</h5>
              </Box>
              <Box direction="col" gap={4}>
                <h5 className="font-medium">Heading 5</h5>
                <h5 className="font-medium">Medium</h5>
              </Box>
              <Box direction="col" gap={4}>
                <h5 className="font-semibold">Heading 5</h5>
                <h5 className="font-semibold">Semi Bold</h5>
              </Box>
              <Box direction="col" gap={4}>
                <h5 className="font-bold">Heading 5</h5>
                <h5 className="font-bold">Bold</h5>
              </Box>
            </Box>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <h6 className="font-normal">Heading 6</h6>
                <h6 className="font-normal">Regular</h6>
              </Box>
              <Box direction="col" gap={4}>
                <h6 className="font-medium">Heading 6</h6>
                <h6 className="font-medium">Medium</h6>
              </Box>
              <Box direction="col" gap={4}>
                <h6 className="font-semibold">Heading 6</h6>
                <h6 className="font-semibold">Semi Bold</h6>
              </Box>
              <Box direction="col" gap={4}>
                <h6 className="font-bold">Heading 6</h6>
                <h6 className="font-bold">Bold</h6>
              </Box>
            </Box>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <p className="text-xl font-normal">Text XL</p>
                <p className="text-xl font-normal">Regular</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-xl font-medium">Text XL</p>
                <p className="text-xl font-medium">Medium</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-xl font-semibold">Text XL</p>
                <p className="text-xl font-semibold">Semi Bold</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-xl font-bold">Text XL</p>
                <p className="text-xl font-bold">Bold</p>
              </Box>
            </Box>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <p className="text-lg font-normal">Text lg</p>
                <p className="text-lg font-normal">Regular</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-lg font-medium">Text lg</p>
                <p className="text-lg font-medium">Medium</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-lg font-semibold">Text lg</p>
                <p className="text-lg font-semibold">Semi Bold</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-lg font-bold">Text lg</p>
                <p className="text-lg font-bold">Bold</p>
              </Box>
            </Box>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <p className="font-normal">Text</p>
                <p className="font-normal">Regular</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="font-medium">Text</p>
                <p className="font-medium">Medium</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="font-semibold">Text</p>
                <p className="font-semibold">Semi Bold</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="font-bold">Text</p>
                <p className="font-bold">Bold</p>
              </Box>
            </Box>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <p className="text-sm font-normal">Text lg</p>
                <p className="text-sm font-normal">Regular</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-sm font-medium">Text lg</p>
                <p className="text-sm font-medium">Medium</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-sm font-semibold">Text lg</p>
                <p className="text-sm font-semibold">Semi Bold</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-sm font-bold">Text lg</p>
                <p className="text-sm font-bold">Bold</p>
              </Box>
            </Box>
            <Box gap={12}>
              <Box direction="col" gap={4}>
                <p className="text-xs font-normal">Text xs</p>
                <p className="text-xs font-normal">Regular</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-xs font-medium">Text xs</p>
                <p className="text-xs font-medium">Medium</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-xs font-semibold">Text xs</p>
                <p className="text-xs font-semibold">Semi Bold</p>
              </Box>
              <Box direction="col" gap={4}>
                <p className="text-xs font-bold">Text xs</p>
                <p className="text-xs font-bold">Bold</p>
              </Box>
            </Box>
          </Prose>
        </Section>
  );
}
