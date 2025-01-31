'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Box } from '../global/matic-ds';

const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

type EmailSchema = z.infer<typeof emailSchema>;

interface NewsletterFormProps {
  variant?: 'inline' | 'button';
  buttonText?: string;
  className?: string;
}

export function NewsletterForm({
  variant = 'inline',
  buttonText = 'Subscribe',
  className
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      emailSchema.parse(email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success
      setEmail('');
      setSuccess('Successfully subscribed to newsletter');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodError = err as z.ZodError<EmailSchema>;
        setError(zodError.errors[0]?.message ?? 'Invalid email address');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={onSubmit} className={cn('space-y-2', className)}>
        <div className="flex items-center gap-2">
          <FloatingLabelInput
            type="email"
            label="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent"
            required
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={isLoading}
            className="h-10 w-10 shrink-0"
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Subscribe</span>
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {success && <p className="text-sm text-text">{success}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn('space-y-4', className)}>
      <FloatingLabelInput
        type="email"
        label="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-transparent"
        required
      />
      <Box direction="row" gap={2}>
        <p className="text-[0.75rem]">
          We’ll never sell or abuse your email. By submitting this form you accept our{' '}
          <a href="#" className="underline">
            Terms
          </a>
          .
        </p>
        <Button type="submit" variant="default" disabled={isLoading} className="w-fit">
          {isLoading ? 'Subscribing...' : buttonText}
        </Button>
      </Box>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-text">{success}</p>}
    </form>
  );
}
