'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Box } from '../global/matic-ds';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { FloatingLabelInput, FloatingLabelTextarea } from '../ui/floating-label';
import Link from 'next/link';

interface GetInTouchFormProps {
  formTitle?: string;
  formDescription?: string;
  className?: string;
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.'
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.'
    }),
  company: z
    .string()
    .min(2, {
      message: 'Company name must be at least 2 characters.'
    })
    .max(50, {
      message: 'Company name must not be longer than 50 characters.'
    }),
  workEmail: z
    .string()
    .min(1, { message: 'This field is required.' })
    .email('This is not a valid email.'),
  phone: z
    .string()
    .min(1, { message: 'This field is required.' })
    .max(20, { message: 'Phone number must not be longer than 20 characters.' }),
  goals: z
    .string()
    .min(1, { message: 'This field is required.' })
    .max(500, { message: 'Message must not be longer than 500 characters.' })
});

type FormData = z.infer<typeof formSchema>;

export function GetInTouchForm({
  formTitle = 'Get in touch',
  formDescription = 'Fill out the form below and we&apos;ll get back to you as soon as possible.',
  className,
  ...props
}: GetInTouchFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      workEmail: '',
      phone: '',
      goals: ''
    }
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      toast({
        title: 'Success!',
        description: 'Your message has been sent.'
      });

      form.reset();
      router.push('/thank-you');
    } catch (_) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={className} {...props}>
      <div className="mb-8">
        <h1 className="">{formTitle ?? 'Get in touch'}</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    label="Name"
                    placeholder="Name"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    label="Company"
                    placeholder="Company"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    label="Work Email"
                    type="email"
                    placeholder="Work Email"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    label="Phone"
                    type="tel"
                    placeholder="Phone"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goals"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelTextarea
                    label="Goals"
                    {...field}
                    className="min-h-[100px] w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Box className="" gap={8}>
            <Box gap={4}>
              <p className="text-xs">
                We&apos;ll never sell or abuse your email. By submitting this form you accept our{' '}
                <Link href="/terms" className="underline">
                  Terms.
                </Link>
              </p>
            </Box>
            <Button type="submit" disabled={isLoading} className="">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send'
              )}
            </Button>
          </Box>
        </form>
      </Form>
    </div>
  );
}
