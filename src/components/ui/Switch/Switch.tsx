import { Switch as SwitchPrimitive } from 'radix-ui';

import { cn } from '@/utils/index';

function Switch({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'relative',
        'ring-accent-strong ring-1 ring-inset',
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-card data-[state=unchecked]:ring-border data-[state=unchecked]:ring-2',
        'group/switch inline-flex shrink-0 items-center rounded-full',
        'data-[size=default]:h-8 data-[size=default]:w-13',
        'transition-all outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'absolute',
          'bg-card rounded-full group-data-[size=default]/switch:size-6',
          'pointer-events-none block ring-0 transition-transform',
          'data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-2',
          'data-[state=checked]:bg-card data-[state=checked]:size-6',
          'data-[state=unchecked]:bg-border data-[state=unchecked]:size-4',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
