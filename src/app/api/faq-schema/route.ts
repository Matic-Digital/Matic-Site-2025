import { NextResponse } from 'next/server';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { getFAQItems } from '@/lib/api';

export const revalidate = 60;

export async function GET() {
  try {
    const items = await getFAQItems();

    const faqs = (items ?? [])
      .filter((item) => item.variant === 'FAQ' && item.homepageToggle)
      .map((item) => ({
        id: item.sys.id,
        question: item.title ?? '',
        // Convert rich text JSON into plain text for schema consumption
        answer: item.richDescription?.json
          ? documentToPlainTextString(item.richDescription.json).trim()
          : ''
      }));

    return NextResponse.json({ items: faqs });
  } catch (e) {
    console.error('Failed to build FAQ schema payload', e);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
