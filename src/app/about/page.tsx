import { Container, Section, Box } from '@/components/global/matic-ds';
import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'About page',
};

export default function About() {
    return (
        <>
        <Section className="min-h-screen">
            <Container>
                <Box className="">
                    <h1 className="">About</h1>
                </Box>
            </Container>
        </Section>
        </>
    );
}