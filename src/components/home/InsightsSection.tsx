'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { InView } from '@/components/ui/in-view';
import type { Insight } from '@/types';

interface InsightsSectionProps {
  insights: Insight[];
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <Section className="m-4 bg-background dark:bg-text">
      <Container>
        <Box direction="col" className="space-y-8">
          <InView>
            <div className="flex items-center justify-between text-text dark:text-maticblack">
              <h1 className="text-text dark:text-maticblack">Journal</h1>
              <Link href="/insights" className="flex items-center gap-2 group">
                <p className="text-text dark:text-maticblack">All thinking and insights</p>
                <ArrowRight className="text-text dark:text-maticblack group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </InView>
          <InsightsGrid 
            variant="recent" 
            insights={insights} 
            className="text-text dark:text-maticblack"
          />
        </Box>
      </Container>
    </Section>
  );
}
