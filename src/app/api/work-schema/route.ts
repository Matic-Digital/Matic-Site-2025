import { NextResponse } from 'next/server';
import { getAllWork } from '@/lib/api';

export const revalidate = 60; // cache lightly to reduce load but stay fresh

export async function GET() {
  try {
    const works = await getAllWork();
    const items = (works ?? []).map((w) => ({
      slug: w.slug,
      clientName: w.clientName,
      briefDescription: w.briefDescription,
      featuredImage: w.featuredImage?.url ?? null,
      homepageMedia: w.homepageMedia?.url ?? null,
      logo: w.logo?.url ?? null,
      categories: w.categoriesCollection?.items?.map((c) => c.name).filter(Boolean) ?? []
    }));

    return NextResponse.json({ items });
  } catch (e) {
    console.error('Failed to build work schema payload', e);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
