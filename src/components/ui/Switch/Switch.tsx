import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from 'react';
import { Switch as SwitchPrimitive } from 'radix-ui';
import { cn } from '@/utils';

type SwitchProps = Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  'onCheckedChange'
> & {
  onCheckedChange?: (checked: boolean) => void;
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, name, checked, defaultChecked, onChange, onBlur, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const setRef = useMemo(
      () => (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref],
    );

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleCheckedChange = useCallback(
      (value: boolean) => {
        const input = inputRef.current;
        if (input) {
          input.checked = value;
          onChange?.({ target: input } as React.ChangeEvent<HTMLInputElement>);
        }
        props.onCheckedChange?.(value);
      },
      [onChange, props.onCheckedChange],
    );

    return (
      <>
        <input
          ref={setRef}
          type="checkbox"
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onBlur={onBlur}
          className="sr-only"
          tabIndex={-1}
          aria-hidden
        />
        <SwitchPrimitive.Root
          data-slot="switch"
          className={cn(
            'peer relative inline-flex h-8 w-13 shrink-0 cursor-pointer items-center rounded-full border-0 outline-none transition-colors',
            'focus-visible:ring-ring ring-2 ring-offset-2 ring-offset-background focus-visible:ring-primary',
            'data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={handleCheckedChange}
          {...props}
        >
          <SwitchPrimitive.Thumb
            className={cn(
              'pointer-events-none block h-6 w-6 rounded-full bg-card shadow-sm ring-0 transition-transform',
              'data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-2',
            )}
          />
        </SwitchPrimitive.Root>
      </>
    );
  },
);

Switch.displayName = 'Switch';

export { Switch };
