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
      <div className="relative w-full">
        <input
          className={cn(
            "peer h-12 w-full rounded-sm bg-transparent px-3 py-2",
            borderClassName,
            className
          )}
          placeholder={label}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
            "transform-gpu transition-[top,left,transform] duration-200 ease-out",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[hsl(var(--footer-form-text-hsl))] peer-placeholder-shown:text-footer-form-text",
            "peer-focus:left-2 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-footer-form-text",
            "peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-footer-form-text",
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
      <div className="relative w-full">
        <textarea
          className={cn(
            "peer min-h-[100px] w-full rounded-sm bg-transparent px-3 py-2",
            borderClassName,
            className
          )}
          placeholder={label}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "pointer-events-none absolute left-3 top-4 text-text md:text-text blue:text-maticblack md:blue:text-text",
            "transform-gpu transition-[top,left,transform] duration-200 ease-out",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:left-3 peer-placeholder-shown:text-text md:peer-placeholder-shown:text-text blue:peer-placeholder-shown:text-maticblack md:blue:peer-placeholder-shown:text-text",
            "peer-focus:left-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-text md:peer-focus:text-text blue:peer-focus:text-maticblack md:blue:peer-focus:text-text",
            "peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-text md:peer-[:not(:placeholder-shown)]:text-text blue:peer-[:not(:placeholder-shown)]:text-maticblack md:blue:peer-[:not(:placeholder-shown)]:text-text",
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
