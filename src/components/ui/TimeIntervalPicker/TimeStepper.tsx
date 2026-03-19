import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ChevronDownIcon } from '@/assets/icons';
import { formatMinutesToTime, getNextStepValue, STEP } from './constants';

interface TimeStepperProps {
  label: string;
  minutes?: number;
  onChange?: (val: number) => void;
  initialMinutes?: number;
}

export function TimeStepper({
  label,
  minutes: controlledMinutes,
  onChange,
  initialMinutes = 0,
}: TimeStepperProps) {
  const [internalMinutes, setInternalMinutes] = useState(initialMinutes);

  const isControlled = controlledMinutes !== undefined;
  const currentMinutes = isControlled ? controlledMinutes : internalMinutes;

  const handleChange = (newValue: number) => {
    if (!isControlled) {
      setInternalMinutes(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div
      className="grid grid-cols-[1fr_1fr_auto] items-center gap-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-[16px]">{label}</div>

      <div className="border-border w-full max-w-18.5 rounded-lg border px-4 py-1.5 text-[16px] font-semibold underline">
        {formatMinutesToTime(currentMinutes)}
      </div>

      <div className="text-ring flex flex-col [&_svg]:stroke-1">
        <Button
          size={'icon-md'}
          variant={'ghost'}
          className="text-border size-3 rotate-180 [&_svg]:size-3"
          type="button"
          onClick={() => handleChange(getNextStepValue(currentMinutes, STEP))}
        >
          <ChevronDownIcon />
        </Button>
        <Button
          size={'icon-md'}
          variant={'ghost'}
          className="text-border size-3 [&_svg]:size-3"
          type="button"
          onClick={() => handleChange(getNextStepValue(currentMinutes, -STEP))}
        >
          <ChevronDownIcon />
        </Button>
      </div>
    </div>
  );
}
