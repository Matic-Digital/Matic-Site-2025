import { Box, Container, Section } from '@/components/global/matic-ds';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Description of the services page'
};

export default function Services() {
  return (
    <Section className="min-h-screen">
      <Container>
        <Box direction="col" className="space-y-12">
          <h1 className="text-[2.23rem] md:text-[2.5rem]">Services</h1>
        </Box>
      </Container>
    </Section>
  );
}
