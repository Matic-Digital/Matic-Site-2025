import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { type Insight } from '@/types';
import { PLACEHOLDER_IMAGE } from '@/constants/images';

/** Props for individual insight card components */
interface InsightCardProps {
  insight: Insight;
  invertTheme?: boolean;
}

/**
 * Renders a single insight card with image and metadata
 */
export function InsightCard({ insight, invertTheme = false }: InsightCardProps) {
  const textClass = invertTheme ? 'text-background' : 'text-foreground';
  const hoverTextClass = invertTheme
    ? 'group-hover:text-background/80'
    : 'group-hover:text-foreground/80';

  return (
    <Link href={`/insights/${insight.slug}`} className="group block h-full no-underline">
      <Card className="h-full overflow-hidden rounded-none bg-transparent shadow-none transition-colors">
        <CardHeader className="p-0">
          <div className="relative h-[476px] w-full overflow-hidden">
            <Image
              src={insight.insightBannerImage?.url || PLACEHOLDER_IMAGE}
              alt={`Cover image for ${insight.title}`}
              width={382}
              height={476}
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-0 pt-4">
          {insight.category && (
            <p className={cn(
              'text-sm uppercase leading-5 transition-colors duration-150',
              textClass,
              hoverTextClass
            )}>
              {insight.category}
            </p>
          )}
          <CardTitle className={cn(
            'text-lg font-light leading-7 transition-colors duration-150',
            textClass,
            hoverTextClass
          )}>
            {insight.title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
