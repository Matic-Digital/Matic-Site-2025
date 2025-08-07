'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RecaptchaCheckboxProps {
  onVerify: (token: string) => void;
  className?: string;
  labelClassName?: string;
}

export function RecaptchaCheckbox({ onVerify, className, labelClassName }: RecaptchaCheckboxProps) {
  const [checked, setChecked] = useState(false);

  // Simple verification handler that generates a mock token
  // In a real implementation, this would be replaced with actual reCAPTCHA verification
  const handleCheckboxChange = (value: boolean) => {
    setChecked(value);

    if (value) {
      // Generate a simple timestamp-based token for verification
      // This is just a placeholder - in production you would use actual reCAPTCHA
      const mockToken = `human-verification-${Date.now()}`;
      onVerify(mockToken);
    } else {
      onVerify(''); // Clear the token when unchecked
    }
  };

  return (
    <div className={cn('relative flex items-center space-x-2', className)}>
      <Checkbox
        id="recaptcha"
        checked={checked}
        onCheckedChange={handleCheckboxChange}
        className="rounded-[4px] border-text/50 hover:border-text/80 data-[state=checked]:bg-text data-[state=checked]:text-background"
      />
      <Label
        htmlFor="recaptcha"
        className={cn(
          'whitespace-normal text-sm md:whitespace-nowrap',
          'text-text/80',
          labelClassName
        )}
      >
        I&apos;m human
      </Label>
    </div>
  );
}
