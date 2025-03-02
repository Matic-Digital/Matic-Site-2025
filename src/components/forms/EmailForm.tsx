'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { FloatingLabelInput } from '../ui/floating-label';
import { Loader2, ArrowRight } from 'lucide-react';
import { Box } from '../global/matic-ds';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type FormValues = z.infer<typeof formSchema>;

interface EmailFormProps {
  onSubmit?: (values: FormValues) => Promise<void>;
  buttonText?: string;
  className?: string;
  labelBgClassName?: string;
  variant?: 'button' | 'arrow';
  buttonBgClassName?: string;
  webhookUrl?: string;
  source?: 'website_footer' | 'website_signals';
  borderClassName?: string;
}

export function EmailForm({
  onSubmit,
  buttonText = 'Submit',
  className,
  labelBgClassName,
  variant = 'button',
  buttonBgClassName,
  webhookUrl,
  source = 'website_footer',
  borderClassName
}: EmailFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function handleSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          mode: 'no-cors', 
          body: JSON.stringify({
            email: values.email,
            timestamp: new Date().toISOString(),
            source: source
          }),
        });
        
        if (onSubmit) {
          await onSubmit(values);
        }
        
        form.reset();
        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter.",
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  if (variant === 'arrow') {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("flex flex-col gap-4", className)}>
          <div className="relative">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      id="email"
                      label="Work Email"
                      type="email"
                      {...field}
                      className={cn(
                        "w-full pr-12 placeholder:text-transparent text-[hsl(var(--footer-text-hsl))] blue:text-maticblack focus:outline-none",
                        "[&:-webkit-autofill]:text-[hsl(var(--footer-text-hsl))]",
                        "[&:-webkit-autofill]:[text-fill-color:hsl(var(--footer-text-hsl))]"
                      )}
                      labelClassName={cn(
                        "text-[hsl(var(--footer-text-hsl))]",
                        labelBgClassName
                      )}
                      borderClassName={cn(
                        "border-[0.5px] blue:border-maticblack border-[hsl(var(--footer-text-hsl))]/20 hover:border-[hsl(var(--footer-text-hsl))]/50 focus:border-[hsl(var(--footer-text-hsl))] focus:ring-[0.5px] focus:ring-[hsl(var(--footer-text-hsl))] focus:ring-offset-0",
                        borderClassName
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              disabled={isLoading}
              className={cn(
                "absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 border-none",
                "!bg-transparent",
                buttonBgClassName,
                "hover:bg-transparent"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-[hsl(var(--footer-text-hsl))]" />
              ) : (
                <ArrowRight className="h-6 w-6 text-[hsl(var(--footer-text-hsl))]" />
              )}
            </Button>
          </div>
          <p className="text-[0.75rem] dark:text-text blue:text-maticblack leading-[120%] tracking-[-0.0225rem] whitespace-normal md:whitespace-nowrap">
            We&apos;ll never sell or abuse your email. By submitting this form you agree to our <a href="/terms" className="underline">Terms</a>.
          </p>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("space-y-4", className)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="email"
                  label="Your Email"
                  type="email"
                  placeholder="Work Email"
                  {...field}
                  className="w-full placeholder:text-transparent transition-all ease-in-out focus:outline-none"
                  labelClassName={cn(labelBgClassName, "transition-all ease-in-out")}
                  borderClassName={cn(
                    "border-[0.5px] border-text/20 hover:border-text/50 focus:border-text focus:ring-[0.5px] focus:ring-text focus:ring-offset-0 transition-all duration-500 ease-in-out",
                    borderClassName
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Box className="justify-between gap-4" direction={{base: 'col', md: 'col'}}>
          <p className="text-[0.75rem] dark:text-text blue:text-maticblack leading-[120%] tracking-[-0.0225rem] whitespace-normal md:whitespace-nowrap">
            We&apos;ll never sell or abuse your email. By submitting this form you agree to our <a href="/terms" className="underline">Terms</a>.
          </p>
          <Button type="submit" disabled={isLoading} className="transition-all duration-500 ease-in-out hover:scale-[0.98] w-fit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              buttonText
            )}
          </Button>
        </Box>
      </form>
    </Form>
  );
}
