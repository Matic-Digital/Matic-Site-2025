'use client';

// Components
import { ContactForm } from '@/components/forms/ContactForm';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { metadata } from './metadata';

/**
 * Contact page component
 */
export default function ContactPage() {
  return (
    <ScrollThemeTransition theme="light">
      <div className="min-h-screen">
        <ContactForm />
      </div>
    </ScrollThemeTransition>
  );
}
