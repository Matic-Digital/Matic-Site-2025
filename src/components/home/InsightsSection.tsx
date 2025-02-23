'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Insight } from '@/types';

interface InsightsSectionProps {
  insights: Insight[];
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <Section className="m-4">
      <Container>
        <Box direction="col" className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 100
            }}
            className="flex items-center justify-between"
          >
            <h1 className="text-text">Journal</h1>
            <Link href="/insights" className="flex items-center gap-2 group">
              <p className="text-text">All thinking and insights</p>
              <ArrowRight className="text-text group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <InsightsGrid variant="recent" insights={insights} />
        </Box>
      </Container>
    </Section>
  );
}
