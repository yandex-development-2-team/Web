import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { cn } from '@/utils/index';
import type { ComponentProps } from 'react';
import { CheckMarkIcon, MinusIcon } from '@/assets/icons';

type CheckedState = 'Minus' | 'CheckMark';

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  icon?: CheckedState;
};

function Checkbox({ className, icon, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'rounded-xs border border-(--color-foreground)',
        'bg-card',
        'h-4.5 w-4.5',
        'data-[state=checked]:bg-[#353434]',
        'data-[state=indeterminate]:bg-[#353434]',
        'inline-flex items-center justify-center',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        {icon === 'CheckMark' ? <CheckMarkIcon /> : <MinusIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
