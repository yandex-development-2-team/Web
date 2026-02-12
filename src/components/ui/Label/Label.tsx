import { type ComponentProps } from 'react';
import { Label as LabelPrimitive } from 'radix-ui';

import { cn } from '@/utils';

function Label({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn('xxs-text text-ring', className)}
      {...props}
    />
  );
}

export { Label };
