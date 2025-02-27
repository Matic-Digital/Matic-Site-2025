'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Insight } from '@/types';
import { motion } from 'framer-motion';

interface InsightsSectionProps {
  insights: Insight[];
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <Section className="m-4 bg-background dark:bg-text">
      <Container>
        <Box direction="col" className="space-y-8">
          <div className="flex items-center justify-between text-text dark:text-maticblack">
            <h2 className="dark:text-maticblack">Journal</h2>
            <Link href="/insights" className="flex items-center gap-2 group">
              <p>All thinking and insights</p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}>
                <ArrowRight className="text-text h-4 w-4 dark:text-maticblack group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </div>
          <InsightsGrid 
            variant="recent" 
            initialInsights={insights} 
            className="text-text dark:text-maticblack"
          />
        </Box>
      </Container>
    </Section>
  );
}
