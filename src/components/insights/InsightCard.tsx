import Image from 'next/image';
import Link from 'next/link';

import { Box } from '@/components/global/matic-ds';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { type Insight } from '@/types';
import { PLACEHOLDER_IMAGE } from '@/constants/images';

/** Props for individual insight card components */
interface InsightCardProps {
  insight: Insight;
  onMouseEnter: (slug: string) => void;
}

/**
 * Renders a single insight card with image and metadata
 */
export function InsightCard({ insight, onMouseEnter }: InsightCardProps) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      onMouseEnter={() => onMouseEnter(insight.slug)}
      className="group block h-full no-underline"
    >
      <Card className="h-full overflow-hidden transition-colors">
        <CardContent className="overflow-hidden p-0">
          <Image
            src={insight.insightBannerImage?.url ?? PLACEHOLDER_IMAGE}
            alt={`Cover image for ${insight.title}`}
            height={263}
            width={350}
            className="aspect-[4/3] w-full rounded-none object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </CardContent>
        <CardHeader>
          <CardTitle className="line-clamp-2">{insight.title}</CardTitle>
          <CardFooter className="px-0 pt-2">
            <Box direction="col" gap={1} className="text-xs">
              <div>ID: {insight.sys.id}</div>
              <div>Category: {insight.category}</div>
              <div>Date: {new Date(insight.postDate).toLocaleDateString()}</div>
            </Box>
          </CardFooter>
        </CardHeader>
      </Card>
    </Link>
  );
}
