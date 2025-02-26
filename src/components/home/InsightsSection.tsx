'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Insight } from '@/types';
import { motion } from 'framer-motion';
import { TextEffect } from '../ui/text-effect';

interface InsightsSectionProps {
  insights: Insight[];
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <Section className="m-4 bg-background dark:bg-text">
      <Container>
        <Box direction="col" className="space-y-8">
          <div className="flex items-center justify-between text-text dark:text-maticblack">
            <TextEffect per="char" as="h1" className="text-text dark:text-maticblack">Journal</TextEffect>
            <Link href="/insights" className="flex items-center gap-2 group">
              <TextEffect per="word" as="p" className="text-text dark:text-maticblack">All thinking and insights</TextEffect>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}>
                <ArrowRight className="text-text dark:text-maticblack group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </div>
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
