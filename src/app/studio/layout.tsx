import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'Studio page'
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
