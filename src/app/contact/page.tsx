// Next.js metadata types
import type { Metadata } from 'next';

// Components
import { ContactFormSplit } from '@/components/forms/ContactFormSplit';

/**
 * Metadata for the contact page
 */
export const metadata: Metadata = {
  title: 'Contact Us - Matic Digital',
  description: 'Get in touch with us for your next digital project.',
};

/**
 * Contact page component
 * Displays a contact form and company information
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactFormSplit />
    </div>
  );
}
