import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights | Matic',
  description: 'Latest insights and updates from Matic'
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
