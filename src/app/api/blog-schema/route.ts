import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/api';

export const revalidate = 60; // light cache

export async function GET() {
  try {
    // Minimal query to avoid complexity limits
    const query = `
      query BlogSchemaMinimal($limit: Int!, $skip: Int!) {
        insightsCollection(limit: $limit, skip: $skip, order: postDate_DESC) {
          items {
            slug
            title
            category
            postDate
            insightBannerImage { url }
          }
          total
        }
      }
    `;

    // Page through modestly to populate landing list
    const pageSize = 50;
    let skip = 0;
    type InsightItem = {
      slug: string;
      title: string;
      category?: string | null;
      postDate?: string | null;
      insightBannerImage?: { url?: string | null } | null;
    };
    type QueryResult = {
      insightsCollection?: {
        items?: InsightItem[];
        total?: number;
      } | null;
    };
    let allItems: InsightItem[] = [];
    // Fetch first page
    const first = await fetchGraphQL<QueryResult>(query, { limit: pageSize, skip });
    const total = first?.insightsCollection?.total ?? 0;
    allItems = first?.insightsCollection?.items ?? [];
    // If more than one page, fetch one more page to keep things light
    if (total > pageSize) {
      skip = pageSize;
      const second = await fetchGraphQL<QueryResult>(query, { limit: pageSize, skip });
      allItems = allItems.concat(second?.insightsCollection?.items ?? []);
    }

    const posts = (allItems ?? []).map((p) => ({
      slug: p.slug,
      category: p.category ?? undefined,
      title: p.title,
      postDate: p.postDate ?? undefined,
      imageUrl: p.insightBannerImage?.url ?? undefined
    }));

    return NextResponse.json({ items: posts });
  } catch (e) {
    console.error('Failed to build blog schema payload', e);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
