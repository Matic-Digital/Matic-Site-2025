'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import { ZAPIER_WEBHOOK_URL } from '@/lib/constants';

// UI Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Box } from '../global/matic-ds';

const helpOptions = ['New Project Inquiry', 'Partnerships', 'Careers', 'General Inquiry'] as const;

const budgetRanges = [
  'Select a budget range',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+'
] as const;

/** Zod schema for form validation with custom error messages */
const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .max(100, 'Email cannot exceed 100 characters')
    .transform((email) => email.toLowerCase()),
  company: z.string().min(1, 'Company is required'),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  budget: z.string().min(1, 'Budget is required'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(1000, 'Message cannot exceed 1000 characters')
    .refine((val) => !val.includes('<script>'), {
      message: 'Message contains invalid characters'
    }),
  formTitle: z.string().default('Contact Form Main') // Default title for this form
});

/** Type definition for form data based on Zod schema */
type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Contact form component with real-time validation and submission handling
 * Uses react-hook-form for form state management and Zod for validation
 */
export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      services: [],
      budget: '',
      message: '',
      formTitle: 'Contact Form Main'
    }
  });

  const selectedServices = watch('services') || [];

  const handleServiceToggle = (service: string) => {
    const currentServices = [...selectedServices];
    const serviceIndex = currentServices.indexOf(service);

    if (serviceIndex > -1) {
      currentServices.splice(serviceIndex, 1);
    } else {
      currentServices.push(service);
    }

    setValue('services', currentServices, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        if (key === 'services') {
          formData.append('services', JSON.stringify(val));
        } else {
          formData.append(key, val as string);
        }
      });

      formData.append('source', 'website_inquiry');
      formData.append('timestamp', new Date().toISOString());

      const response = await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      if (!response.ok && response.type !== 'opaque') {
        throw new Error('Failed to send message');
      }

      toast({
        title: 'Success',
        description: 'Your message has been sent successfully.'
      });

      // Reset form
      setValue('firstName', '');
      setValue('lastName', '');
      setValue('email', '');
      setValue('company', '');
      setValue('services', []);
      setValue('budget', '');
      setValue('message', '');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h1 className="font-medium">Get started!</h1>
          </CardTitle>
          <CardDescription>
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-text">How can we help?</label>
            <div className="flex w-full flex-wrap gap-2">
              {helpOptions.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleServiceToggle(service)}
                  className={`flex min-w-[10rem] items-center justify-center gap-2 rounded-[6px] border px-4 py-2 text-sm transition-all ${
                    selectedServices.includes(service)
                      ? 'bg-text text-background'
                      : 'border-text/10 bg-secondary/10'
                  }`}
                >
                  <span>{service}</span>
                </button>
              ))}
            </div>
            {errors.services && <p className="mt-1 text-sm text-pink">{errors.services.message}</p>}
          </div>
          <Box
            className="justify-between space-y-4 md:space-x-4 md:space-y-0"
            direction={{ base: 'col', md: 'row' }}
          >
            <div className="w-full space-y-2">
              <label htmlFor="firstName" className="text-sm text-text">
                First Name
              </label>
              <input
                type="text"
                {...register('firstName')}
                placeholder="First Name"
                className="w-full rounded-[6px] border-[0.5px] border-text/10 bg-secondary/10 px-4 py-2 text-sm text-text"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-pink">{errors.firstName.message}</p>
              )}
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="lastName" className="text-sm text-text">
                Last Name
              </label>
              <input
                type="text"
                {...register('lastName')}
                placeholder="Last Name"
                className="w-full rounded-[6px] border-[0.5px] border-text/10 bg-secondary/10 px-4 py-2 text-sm text-text"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-pink">{errors.lastName.message}</p>
              )}
            </div>
          </Box>
          <Box direction="col" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-text">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="Email"
                className="w-full rounded-[6px] border-[0.5px] border-text/10 bg-secondary/10 px-4 py-2 text-sm text-text"
              />
              {errors.email && <p className="mt-1 text-sm text-pink">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm text-text">
                Company
              </label>
              <input
                type="text"
                {...register('company')}
                placeholder="Company"
                className="w-full rounded-[6px] border-[0.5px] border-text/10 bg-secondary/10 px-4 py-2 text-sm text-text"
              />
              {errors.company && <p className="mt-1 text-sm text-pink">{errors.company.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm text-text">
                Monthly Budget
              </label>
              <div className="relative w-full">
                <select
                  {...register('budget')}
                  className="w-full appearance-none rounded-[6px] border-[0.5px] border-text/10 bg-secondary/10 px-4 py-2 pr-10 text-sm text-text"
                >
                  {budgetRanges.map((range) => (
                    <option key={range} value={range === 'Select a budget range' ? '' : range}>
                      {range}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              </div>
              {errors.budget && <p className="mt-1 text-sm text-pink">{errors.budget.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-text">
                Message
              </label>
              <textarea
                {...register('message')}
                placeholder="Message"
                className="w-full rounded-[6px] border-[0.5px] border-text/10 bg-secondary/10 px-4 py-2 text-sm text-text"
                rows={4}
              />
              {errors.message && <p className="mt-1 text-sm text-pink">{errors.message.message}</p>}
            </div>
          </Box>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-text text-background hover:bg-text/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Sending...</span>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
