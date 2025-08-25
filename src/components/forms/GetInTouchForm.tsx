'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Box } from '../global/matic-ds';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { FloatingLabelInput, FloatingLabelTextarea } from '../ui/floating-label';
import Link from 'next/link';
import { ZAPIER_WEBHOOK_URL } from '@/lib/constants';
import { RecaptchaCheckbox } from '../ui/recaptcha-checkbox';

interface GetInTouchFormProps {
  onSubmit?: (values: FormData) => Promise<void>;
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
    .max(500, { message: 'Message must not be longer than 500 characters.' }),
  recaptchaToken: z.string().min(1, { message: 'Please verify that you are human.' })
});

type FormData = z.infer<typeof formSchema>;

export function GetInTouchForm({ className }: GetInTouchFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      workEmail: '',
      phone: '',
      goals: '',
      recaptchaToken: ''
    }
  });

  // Update form when recaptcha token changes
  useEffect(() => {
    if (recaptchaToken) {
      form.setValue('recaptchaToken', recaptchaToken);
    }
  }, [recaptchaToken, form]);

  // Handle recaptcha verification
  const handleRecaptchaVerify = async (token: string) => {
    if (!token) {
      setRecaptchaToken('');
      return;
    }

    try {
      // Verify the token with our server-side API
      const response = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      interface VerifyResponse {
        success: boolean;
        verified: boolean;
        errors?: string[];
      }

      const data = (await response.json()) as VerifyResponse;

      if (data.success && data.verified) {
        // Only set the token if verification was successful
        setRecaptchaToken(token);
      } else {
        // Clear the token if verification failed
        setRecaptchaToken('');
        toast({
          title: 'Verification Failed',
          description: 'reCAPTCHA verification failed. Please try again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      setRecaptchaToken('');
      toast({
        title: 'Verification Error',
        description: 'An error occurred during verification. Please try again.',
        variant: 'destructive'
      });
    }
  };

  async function onSubmitHandler(data: FormData) {
    // Prevent form submission if reCAPTCHA token is missing or empty
    if (!data.recaptchaToken) {
      toast({
        title: 'Verification Required',
        description: 'Please verify that you are human before submitting the form.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = {
        name: data.name,
        company: data.company,
        email: data.workEmail,
        phone: data.phone,
        message: data.goals,
        timestamp: new Date().toISOString(),
        source: 'website_contact',
        recaptchaToken: data.recaptchaToken
      };

      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        mode: 'no-cors',
        body: JSON.stringify(formData)
      });

      toast({
        title: 'Success!',
        description: "Your message has been sent. We'll get back to you soon."
      });

      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-4"></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    id="name"
                    label="Name"
                    {...field}
                    className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
                    labelClassName="bg-secondary dark:bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
                    borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
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
                    id="company"
                    label="Company"
                    {...field}
                    className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
                    labelClassName="bg-secondary dark:bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
                    borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
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
                    id="email"
                    label="Work Email"
                    type="email"
                    {...field}
                    className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
                    labelClassName="bg-secondary dark:bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
                    borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
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
                    id="phone"
                    label="Phone"
                    type="tel"
                    {...field}
                    className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
                    labelClassName="bg-secondary dark:bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
                    borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
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
                    id="goals"
                    label="Goals"
                    {...field}
                    className="min-h-[100px] w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
                    labelClassName="dark:bg-background bg-secondary blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
                    borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <RecaptchaCheckbox
            onVerify={handleRecaptchaVerify}
            className="mb-4"
            labelClassName="text-text md:text-text blue:text-maticblack md:blue:text-text whitespace-normal md:whitespace-nowrap"
          />
          {form.formState.errors.recaptchaToken && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.recaptchaToken.message}
            </p>
          )}

          <Box className="" gap={8}>
            <Box gap={4}>
              <p className="text-xs text-text blue:text-maticblack md:text-text md:blue:text-text">
                We&apos;ll never sell or abuse your email. By submitting this form you accept our{' '}
                <Link href="/terms" className="underline">
                  Terms.
                </Link>
              </p>
            </Box>
            <Button
              type="submit"
              disabled={isLoading || !recaptchaToken}
              className="bg-text text-background hover:bg-text hover:text-background blue:bg-background blue:text-white md:blue:bg-white md:blue:text-background"
            >
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
