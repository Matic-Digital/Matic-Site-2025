import { Container, Section, Box } from '@/components/global/matic-ds';
import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'About page',
};

export default function About() {
    return (
        <>
        <Section>
            <Container>
                <Box className="">
                    <h2 className="">About</h2>
                </Box>
            </Container>
        </Section>
        </>
    );
}