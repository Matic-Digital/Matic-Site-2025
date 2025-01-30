import * as React from "react"
import { cn } from "@/lib/utils"

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  labelClassName?: string
  borderClassName?: string
  focusBorderClassName?: string
}

interface FloatingLabelTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  labelClassName?: string
  borderClassName?: string
  focusBorderClassName?: string
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, type, labelClassName, borderClassName, focusBorderClassName, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "peer h-12 w-full rounded-sm bg-transparent px-3 py-2 focus:outline-none focus:ring-0",
            "border",
            borderClassName ?? "border-foreground/30",
            focusBorderClassName ?? "focus:border-foreground/50",
            className
          )}
          placeholder={props.placeholder ?? label}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "pointer-events-none absolute left-2 -top-2.5 text-sm text-foreground/50 transition-all",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-foreground/50",
            "peer-focus:-top-2.5 peer-focus:left-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-foreground/50",
            "peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-sm",
            "px-1 bg-background",
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
    );
  }
)
FloatingLabelInput.displayName = "FloatingLabelInput"

export const FloatingLabelTextarea = React.forwardRef<HTMLTextAreaElement, FloatingLabelTextareaProps>(
  ({ className, label, labelClassName, borderClassName, focusBorderClassName, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            "peer min-h-[100px] w-full rounded-sm bg-transparent px-3 py-2 focus:outline-none focus:ring-0 placeholder-transparent",
            "border",
            borderClassName ?? "border-foreground/30",
            focusBorderClassName ?? "focus:border-foreground/50",
            className
          )}
          placeholder={label}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "pointer-events-none absolute left-2 -top-2.5 text-sm text-foreground/50 transition-all",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-foreground/50",
            "peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-foreground/50",
            "peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-sm",
            "px-1 bg-background",
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
    );
  }
)
FloatingLabelTextarea.displayName = "FloatingLabelTextarea"
