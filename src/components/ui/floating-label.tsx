'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  borderClassName?: string;
}

interface FloatingLabelTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  labelClassName?: string;
  borderClassName?: string;
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, labelClassName, borderClassName, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className={cn(
            "peer h-12 w-full rounded-sm bg-transparent px-3 py-2",
            "border border-[hsl(var(--footer-form-text-hsl))]/20",
            "hover:border-[hsl(var(--footer-form-text-hsl))]/50",
            "focus:outline-none focus:border-[0.5px] focus:ring-0 focus:ring-offset-0",
            borderClassName ?? "",
            className
          )}
          placeholder={label}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "pointer-events-none absolute left-2 -top-2.5 text-sm transition-[top,left,transform] text-[hsl(var(--footer-form-text-hsl))]",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[hsl(var(--footer-form-text-hsl))]",
            "peer-focus:-top-2.5 peer-focus:left-2 peer-focus:translate-y-0 peer-focus:text-sm",
            "peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-sm",
            "px-1",
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';

export const FloatingLabelTextarea = React.forwardRef<HTMLTextAreaElement, FloatingLabelTextareaProps>(
  ({ className, label, labelClassName, borderClassName, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            "peer min-h-[100px] w-full rounded-sm bg-transparent px-3 py-2",
            "border border-[hsl(var(--footer-form-text-hsl))]/20",
            "hover:border-[hsl(var(--footer-form-text-hsl))]/50",
            "focus:outline-none focus:border-[0.5px] focus:ring-0 focus:ring-offset-0",
            borderClassName ?? "",
            className
          )}
          placeholder={label}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "pointer-events-none absolute left-2 -top-2.5 text-sm transition-[top,left,transform] text-[hsl(var(--footer-form-text-hsl))]",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-[hsl(var(--footer-form-text-hsl))]",
            "peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm",
            "peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-sm",
            "px-1",
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingLabelTextarea.displayName = 'FloatingLabelTextarea';
