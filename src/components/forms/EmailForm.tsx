'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { FloatingLabelInput } from '../ui/floating-label';
import { Loader2 } from 'lucide-react';
import { Box } from '../global/matic-ds';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type FormValues = z.infer<typeof formSchema>;

interface EmailFormProps {
  onSubmit?: (values: FormValues) => Promise<void>;
  buttonText?: string;
  className?: string;
  labelBgClassName?: string;
}

export function EmailForm({
  onSubmit = async (values: FormValues) => { console.log('Form submitted:', values); },
  buttonText = 'Submit',
  className,
  labelBgClassName
}: EmailFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function handleSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      await onSubmit(values);
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
    setIsLoading(false);
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
                  placeholder="Your Email"
                  {...field}
                  className="w-full placeholder:text-transparent transition-all duration-500 ease-in-out"
                  labelClassName={cn(labelBgClassName, "transition-all duration-500 ease-in-out")}
                  borderClassName="border-[0.5px] border-text/20 hover:border-text/50 focus:border-text focus:ring-[0.5px] focus:ring-text transition-all duration-500 ease-in-out"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Box className="justify-between gap-4" direction={{base: 'col', md: 'row'}}>
          <p className="text-xs text-text max-w-[16rem] flex-grow">
            We&apos;ll never sell or abuse your email. By submitting this form you agree to our <a href="/terms" className="underline">Terms</a>.
          </p>
          <Button type="submit" disabled={isLoading} className="transition-all duration-500 ease-in-out hover:scale-[0.98]">
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
