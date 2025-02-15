import { Container, Section, Box } from '@/components/global/matic-ds';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page'
};

export default function About() {
  return (
    <Section className="min-h-screen">
      <Container>
        <Box direction="col" className="space-y-12">
          <h1 className="text-[2.23rem] md:text-[2.5rem]">About</h1>
        </Box>
      </Container>
    </Section>
  );
}
