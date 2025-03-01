'use client';

import { Box, Container } from '@/components/global/matic-ds';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function WorkCategoriesSkeleton() {
  const categories = Array.from({ length: 5 });
  
  return (
    <Box className="mb-8 flex flex-wrap gap-4">
      <div className="no-scrollbar flex w-full gap-[0.625rem] overflow-x-auto md:w-auto md:flex-wrap">
        {categories.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3,
              delay: i * 0.1,
              ease: [0.21, 0.45, 0.32, 0.9]
            }}
            className="h-[2.625rem] w-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-sm"
          />
        ))}
      </div>
    </Box>
  );
}

export function WorkGridItemSkeleton({ variant }: { variant: 'full' | 'half' }) {
  return (
    <Box className={cn("w-full", variant === 'full' && "md:col-span-2")}>
      <div className={cn(
        "relative w-full bg-gray-100 dark:bg-gray-800 animate-pulse",
        variant === 'full' ? "h-[680px]" : "h-[810px]"
      )} />
      <Box className="mt-4" gap={2}>
        <div className="h-6 w-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
        <div className="h-4 w-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
      </Box>
    </Box>
  );
}

export function WorkGridSkeleton() {
  return (
    <Container className="overflow-hidden">
      <WorkCategoriesSkeleton />
      <div className="flex flex-col gap-3">
        <div className="grid gap-3 md:grid-cols-2">
          <WorkGridItemSkeleton variant="full" />
          <Box className="flex flex-col gap-3">
            <WorkGridItemSkeleton variant="half" />
            <WorkGridItemSkeleton variant="half" />
          </Box>
          <Box className="flex flex-col gap-3">
            <WorkGridItemSkeleton variant="half" />
            <WorkGridItemSkeleton variant="half" />
          </Box>
        </div>
      </div>
    </Container>
  );
}
