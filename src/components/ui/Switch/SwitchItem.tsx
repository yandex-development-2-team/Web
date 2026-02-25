import { useId } from 'react';
import { cn } from '@/utils';
import { Switch } from './Switch';

interface SwitchItemProps {
  id?: string;
  label?: string;
  name?: string;
  checked?: boolean;
  onToggle?: () => string;
  className?: string;
}

export function SwitchItem({
  className,
  id,
  label,
  name,
  checked,
  onToggle,
}: SwitchItemProps) {
  const gegerateId = useId();
  const switchId = id || gegerateId;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Switch
        id={switchId}
        name={name}
        defaultChecked={checked}
        onCheckedChange={onToggle}
      />
      {label && <label htmlFor={switchId}>{label}</label>}
    </div>
  );
}
