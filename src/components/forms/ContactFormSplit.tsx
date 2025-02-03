'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { FloatingLabelInput, FloatingLabelTextarea } from '../ui/floating-label';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'First name must be at least 2 characters.',
    })
    .max(30, {
      message: 'First name must not be longer than 30 characters.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Last name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Last name must not be longer than 30 characters.',
    }),
  email: z
    .string()
    .min(1, { message: 'This field is required.' })
    .email('This is not a valid email.'),
  message: z
    .string()
    .min(1, { message: 'This field is required.' })
    .max(500, { message: 'Message must not be longer than 500 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export function ContactFormSplit() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      toast({
        title: 'Success!',
        description: 'Your message has been sent.',
      });

      form.reset();
      router.push('/thank-you');
    } catch (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __error
    ) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 rounded-lg overflow-hidden">
      {/* Contact Information Side */}
      <div className="relative bg-primary p-8 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70">
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <p className="text-primary-foreground/90 mb-8">
            Have a question or want to work together? We&apos;d love to hear from you.
            Send us a message and we&apos;ll get back to you within 24 hours.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Our Location</h3>
                <p className="text-primary-foreground/90">123 Business Ave, Suite 100</p>
                <p className="text-primary-foreground/90">San Francisco, CA 94107</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-primary-foreground/90">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-primary-foreground/90">contact@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="p-8 bg-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      label="First Name"
                      placeholder="First Name"
                      {...field}
                      className={cn(
                        "w-full",
                        form.formState.errors.firstName && "border-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      label="Last Name"
                      placeholder="Last Name"
                      {...field}
                      className={cn(
                        "w-full",
                        form.formState.errors.lastName && "border-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      label="Email"
                      type="email"
                      placeholder="Email"
                      {...field}
                      className={cn(
                        "w-full",
                        form.formState.errors.email && "border-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelTextarea
                      label="Message"
                      placeholder="Your message"
                      {...field}
                      className={cn(
                        "w-full min-h-[100px]",
                        form.formState.errors.message && "border-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
