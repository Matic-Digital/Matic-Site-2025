import { Container, Section, Box } from '@/components/global/matic-ds';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page'
};

export default function About() {
  return (
    <>
      <ScrollThemeTransition theme="light">
        <Section className="min-h-screen">
          <Container>
            <Box className="">
              <h1 className="">About</h1>
            </Box>
          </Container>
        </Section>
      </ScrollThemeTransition>
    </>
  );
}
