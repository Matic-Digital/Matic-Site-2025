'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { FloatingLabelInput } from '@/components/ui/floating-label';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field is required.' })
    .email('This is not a valid email.')
});

type FormData = z.infer<typeof formSchema>;

interface NewsletterFormProps {
  className?: string;
  variant?: 'button' | 'arrow';
  labelBgClassName?: string;
  buttonBgClassName?: string;
}

export function NewsletterForm({ 
  className, 
  variant = 'button',
  labelBgClassName = 'bg-[hsl(var(--footer-form-input-bg-hsl))]',
  buttonBgClassName = 'bg-[hsl(var(--footer-form-text-hsl))]'
}: NewsletterFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      // TODO: Implement newsletter subscription
      console.log('Newsletter subscription:', data);
      toast({
        title: 'Success!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (variant === 'arrow') {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <FloatingLabelInput
                      id="email"
                      label="Work Email"
                      type="email"
                      {...field}
                      className="w-full pr-12 placeholder:text-transparent"
                      labelClassName={cn(
                        labelBgClassName,
                        "text-[hsl(var(--footer-form-text-hsl))]"
                      )}
                      borderClassName="border-[hsl(var(--footer-form-text-hsl))]/50 hover:border-[hsl(var(--footer-form-text-hsl))]/80"
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      disabled={isLoading}
                      className={cn(
                        "absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-[hsl(var(--footer-form-text-hsl))] hover:text-[hsl(var(--footer-form-text-hsl))]",
                        buttonBgClassName,
                        "hover:bg-transparent"
                      )}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                      <span className="sr-only">Subscribe</span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-4">
                  <FloatingLabelInput
                    id="email"
                    label="Work Email"
                    type="email"
                    {...field}
                    className="w-full placeholder:text-transparent"
                    labelClassName={cn(
                      labelBgClassName,
                      "text-[hsl(var(--footer-form-text-hsl))]"
                    )}
                    borderClassName="border-[hsl(var(--footer-form-text-hsl))]/50 hover:border-[hsl(var(--footer-form-text-hsl))]/80"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className={cn(
                      buttonBgClassName,
                      "text-[hsl(var(--footer-form-input-bg-hsl))]",
                      "hover:bg-[hsl(var(--footer-form-text-hsl))]"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
