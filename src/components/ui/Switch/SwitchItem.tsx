import { useId } from 'react';
import { cn } from '@/utils';
import { Switch } from './Switch';

interface SwitchItemProps {
  id?: string;
  label?: string;
  name?: string;
  checked?: boolean;
  onToggle?: () => void;
  className?: string;
  defaultValue?: boolean;
}

export function SwitchItem({
  className,
  id,
  label,
  name,
  checked,
  onToggle,
  defaultValue = false,
  ...props
}: SwitchItemProps) {
  const gegerateId = useId();
  const switchId = id || gegerateId;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Switch
        {...props}
        id={switchId}
        name={name}
        defaultChecked={defaultValue}
        onCheckedChange={onToggle}
        checked={checked}
      />
      {label && <label htmlFor={switchId}>{label}</label>}
    </div>
  );
}
