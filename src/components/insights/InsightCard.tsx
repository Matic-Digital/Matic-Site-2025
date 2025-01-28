import Image from 'next/image';
import Link from 'next/link';

import { Box } from '@/components/global/matic-ds';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      <Card className="h-full overflow-hidden transition-colors shadow-none rounded-none bg-transparent">
        <CardContent className="overflow-hidden p-0">
          <Image
            src={insight.insightBannerImage?.url ?? PLACEHOLDER_IMAGE}
            alt={`Cover image for ${insight.title}`}
            height={500}
            width={500}
            className="aspect-[2/3] w-[23rem] rounded-none object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </CardContent>
        <CardHeader className="p-0 pt-6">
          <Box>
            <p className="font-bold uppercase opacity-50 text-xs">{insight.category}</p>
          </Box>
          <CardTitle className="line-clamp-2 font-normal">{insight.title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
