import { type ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/utils';

const buttonVariants = cva(
  cn(
    'button-text inline-flex w-min shrink-0 cursor-pointer items-center justify-center gap-3 rounded-lg whitespace-nowrap outline-2 outline-transparent transition-all disabled:pointer-events-none',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-1 [&_svg:not([class*='size-'])]:size-6",
  ),
  {
    variants: {
      variant: {
        ['default-primary']:
          'bg-primary hover:bg-accent active:bg-accent-strong disabled:bg-muted disabled:text-muted-foreground',
        ['default-secondary']:
          'bg-secondary text-secondary-foreground hover:border-accent border-primary active:outline-accent-strong disabled:border-muted disabled:text-muted-foreground border',
        ['danger-primary']:
          'bg-destructive text-secondary hover:bg-destructive-light active:bg-chart-2 disabled:bg-muted disabled:text-muted-foreground',
        ['danger-secondary']:
          'bg-secondary border-destructive-light text-destructive hover:border-destructive-light/50 active:border-chart-2 disabled:border-muted disabled:text-muted-foreground border-2 disabled:border',
        shadow:
          'bg-card hover:border-accent active:bg-primary justify-between border border-transparent shadow-[0_1px_3px_1px_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.3)]',
        link: 'text-foreground border-b-primary hover:border-b-accent-strong rounded-none border-b-1 active:shadow-[inset_0_-2px_0_0_var(--accent-strong)]',
        ghost:
          'hover:[&_svg]:stroke-accent-strong active:[&_svg]:stroke-pending-foreground disabled:[&_svg]:stroke-border border-none bg-none outline-none',
      },
      size: {
        default: 'px-8 py-3',
        ['icon-md']: "size-10 [&_svg:not([class*='size-'])]:size-6",
        ['icon-lg']: "size-12 [&_svg:not([class*='size-'])]:size-8",
        ['icon-xl']: "h-12 w-20 [&_svg:not([class*='size-'])]:size-8",
        shadow: 'p-3',
        link: 'p-0 pb-1',
      },
    },
    defaultVariants: {
      variant: 'default-primary',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default-primary',
  size = 'default',
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
