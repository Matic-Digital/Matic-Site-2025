import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { InsightsList } from '@/components/insights/InsightsList';
import type { Insight } from '@/types/contentful';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';

interface JournalSectionProps {
  insights: Insight[];
  total: number;
}

export function JournalSection({ insights, total }: JournalSectionProps) {
  return (
      <Section id="journal-section" className="dark:bg-foreground m-8">
        <Container>
          <Box className="justify-between mb-12">
            <h1 className="text-background">Journal</h1>
            <Box className="items-center justify-between space-x-2">
              <Link href="/insights" className="text-background">All thinking and updates</Link>
              <ArrowRight className="text-background" />
            </Box>
          </Box>
          <Box>
            <InsightsList 
              initialInsights={insights} 
              initialTotal={total} 
              selectedCategory={null}
              invertTheme={true}
            />
          </Box>
        </Container>
      </Section>
  );
}
