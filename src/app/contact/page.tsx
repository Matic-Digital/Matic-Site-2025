// Next.js metadata types
import type { Metadata } from 'next';

// Components
import { Container, Box } from '@/components/global/matic-ds';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactFormMinimal } from '@/components/forms/ContactFormMinimal';
import { ContactFormSplit } from '@/components/forms/ContactFormSplit';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Metadata for the contact page
 */
export const metadata: Metadata = {
  title: 'Contact Us | Matic',
  description: 'Get in touch with our team'
};

/**
 * Contact page component
 * Displays a contact form and company information
 */
export default function ContactPage() {
  return (
    <main className="container py-12 md:py-16 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
          Contact Us
        </h1>
        <p className="text-muted-foreground text-center mb-12">
          Choose your preferred form style below and get in touch with us.
        </p>

        <Tabs defaultValue="classic" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="classic">Classic</TabsTrigger>
            <TabsTrigger value="minimal">Minimal</TabsTrigger>
            <TabsTrigger value="split">Split Layout</TabsTrigger>
          </TabsList>
          
          
          <TabsContent value="split" className="space-y-4">
            <ContactFormSplit />
          </TabsContent>
          
          <TabsContent value="classic" className="space-y-4">
            <ContactForm />
          </TabsContent>
          <TabsContent value="minimal" className="space-y-4">
            <ContactFormMinimal />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
