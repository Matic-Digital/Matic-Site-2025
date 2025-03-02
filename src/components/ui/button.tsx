import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'transition-all bg-text hover:bg-text/90 text-background rounded-[6px]',
        inverted: 'transition-all bg-background hover:bg-background/90 text-text rounded-[6px]',
        darkblue: 'transition-all bg-darkblue hover:bg-darkblue/90 text-background rounded-[6px] text-background dark:text-text',
        blue: 'transition-all bg-blue hover:bg-blue/90 text-background rounded-[6px]',
        green: 'transition-all bg-green hover:bg-green/90 text-background rounded-[6px]',
        pink: 'transition-all bg-pink hover:bg-pink/90 text-background rounded-[6px]',
        orange: 'transition-all bg-orange hover:bg-orange/90 text-background rounded-[6px]',
        purple: 'transition-all bg-purple hover:bg-purple/90 text-background rounded-[6px]',
        ghost: 'transition-all bg-transparent hover:bg-transparent text-text rounded-[6px] border border-text/80',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
