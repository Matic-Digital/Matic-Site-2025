import { Box, Container, Section } from '@/components/global/matic-ds';
import {type Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Description of the services page',
};

export default function Services() {
    return (
        <Section>
            <Container>
                <Box className="">
                    <h2 className="">Services</h2>
                </Box>
            </Container>
        </Section>
    );
}