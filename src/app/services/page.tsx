import { Box, Container, Section } from '@/components/global/matic-ds';
import {type Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Description of the services page',
};

export default function Services() {
    return (
        <Section className="min-h-screen">
            <Container>
                <Box className="">
                    <h1 className="">Services</h1>
                </Box>
            </Container>
        </Section>
    );
}