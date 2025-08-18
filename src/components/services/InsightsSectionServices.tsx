'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Insight } from '@/types';
import { motion } from 'framer-motion';

interface InsightsSectionServicesProps {
  insights: Insight[];
}

export function InsightsSectionServices({ insights }: InsightsSectionServicesProps) {
  return (
    <Section className="bg-maticblack pb-[5rem] pt-[2.5rem] dark:bg-text md:pb-[6.88rem] md:pt-[5.25rem]">
      <Container className="px-[1.5rem]">
        <Box
          direction="col"
          className="max-w-full space-y-8 overflow-hidden rounded-[1rem] bg-white pb-[1rem] pt-[1rem] md:pb-[6.31rem] md:pt-[4.06rem]"
        >
          <div className="flex flex-col gap-[2rem] px-[1.5rem] md:px-[3.81rem]">
            <div className="items-left flex flex-col justify-between gap-[1.5rem] text-text dark:text-maticblack">
              <h2 className="text-3xl dark:text-maticblack md:text-5xl">Articles & insights</h2>
              <Link href="/insights" className="group flex items-center gap-2">
                <p>All entries</p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <ArrowRight className="h-4 w-4 text-text transition-transform group-hover:translate-x-1 dark:text-maticblack" />
                </motion.div>
              </Link>
            </div>
            <InsightsGrid
              variant="recent"
              initialInsights={insights}
              className="text-text dark:text-maticblack"
            />
          </div>
        </Box>
      </Container>
    </Section>
  );
}
