import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { InsightsList } from '@/components/insights/InsightsList';
import type { Insight } from '@/types/contentful';

interface JournalSectionProps {
  insights: Insight[];
  total: number;
}

export function JournalSection({ insights, total }: JournalSectionProps) {
  return (
    <Section id="journal-section">
      <Container>
        <Box className="justify-between mb-12">
          <h2 className="">Journal</h2>
          <Box className="items-center justify-between">
            <Link href="/insights">All thinking and updates</Link>
            <ArrowRight />
          </Box>
        </Box>
        <Box>
          <InsightsList initialInsights={insights} initialTotal={total} />
        </Box>
      </Container>
    </Section>
  );
}
