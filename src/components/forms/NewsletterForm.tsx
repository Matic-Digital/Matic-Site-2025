'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

type EmailSchema = z.infer<typeof emailSchema>;

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      emailSchema.parse(email);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success
      setEmail('');
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

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={error ? 'border-red-500' : ''}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
}
