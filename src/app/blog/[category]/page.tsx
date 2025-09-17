import type { Metadata } from 'next';
import BlogPage from '../page';

// Function to get category metadata
function getCategoryMetadata(category: string): { title: string; description: string } {
  const categoryLower = category.toLowerCase();
  
  switch (categoryLower) {
    case 'insights':
      return {
        title: 'Marketing & Web Insights 2025 | Matic Digital',
        description: 'Expert analysis on digital marketing, UX design, and brand strategy. Trends, case studies, and playbooks to grow smarter in 2025.'
      };
    case 'branding':
      return {
        title: 'Branding Strategy & Identity 2025 | Matic Digital',
        description: 'Positioning, messaging, visual identity, and rebrands—actionable frameworks and best practices to build a standout brand.'
      };
    case 'design':
      return {
        title: 'UX/UI & Web Design Trends 2025 | Matic Digital',
        description: 'Research-backed UX, UI patterns, accessibility, and CRO tips. Design user-centric websites that look great and convert.'
      };
    case 'technology':
      return {
        title: 'MarTech & Web Performance 2025 | Matic Digital',
        description: 'Headless CMS, Core Web Vitals, SEO engineering, and AI. Technical guides to build faster, scalable sites that rank.'
      };
    case 'teams':
      return {
        title: 'Marketing & Design Team Playbooks 2025 | Matic Digital',
        description: 'Hiring, workflows, leadership, and collaboration for digital teams. Proven processes to ship better work, faster.'
      };
    case 'signals':
      return {
        title: 'Signals: Business, Design & Tech Trends 2025 | Matic Digital',
        description: 'Quick takes on marketing, design, and technology trends from Matic Digital—timely signals, insights, and frameworks to act on whats next.'
      };
    default:
      return {
        title: `${category} | Matic Digital Blog`,
        description: `Explore the latest insights and articles about ${category} from Matic Digital.`
      };
  }
}

// Generate metadata for the category page
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const { title, description } = getCategoryMetadata(category);
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  return [
    { category: 'insights' },
    { category: 'branding' },
    { category: 'design' },
    { category: 'technology' },
    { category: 'teams' },
    { category: 'signals' },
  ];
}

export default function CategoryPage() {
  return <BlogPage />;
}
