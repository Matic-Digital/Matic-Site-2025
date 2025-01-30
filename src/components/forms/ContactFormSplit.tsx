'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import cn from 'classnames';
import { PLACEHOLDER_IMAGE } from '@/constants/images';

const formSchema = z.object({
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
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(1000, 'Message cannot exceed 1000 characters')
    .refine((val) => !val.includes('<script>'), {
      message: 'Message contains invalid characters'
    }),
  formTitle: z
    .string()
    .default('Contact Form Split') // Default title for this form
});

type FormData = z.infer<typeof formSchema>;

export function ContactFormSplit() {
  const { toast } = useToast();
  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      formTitle: 'Contact Form Split'
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Submitting form:", values);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json() as { message: string };
        throw new Error(errorData.message);
      }

      const data = await response.json() as { message: string };

      router.push("/contact/success");
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send message";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
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
          <Image
            src={PLACEHOLDER_IMAGE}
            alt="Contact background"
            fill
            className="object-cover w-16 aspect-square mix-blend-overlay opacity-20"
          />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <p className="text-primary-foreground/90 mb-8">
            Have a question or want to work together? We&apos;d love to hear from you.
            Send us a message and we&apos;ll get back to you within 24 hours.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Our Location</h3>
                <p className="text-primary-foreground/90">123 Business Ave, Suite 100</p>
                <p className="text-primary-foreground/90">San Francisco, CA 94107</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Phone className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-primary-foreground/90">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5" />
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
                    <Input
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
                    <Input
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
                    <Input
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
                    <Textarea
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
