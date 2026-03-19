import { useEffect, useState } from 'react';
import { TimeStepper } from './TimeStepper';
import { MAX_MINUTES, STEP, type TimeRangeType } from './constants';

interface TimeIntervalPickerProps {
  value?: TimeRangeType;
  onChange?: (val: TimeRangeType) => void;
}

const DEFAULT_MINITES = 540;

export function TimeIntervalPicker({
  value,
  onChange,
}: TimeIntervalPickerProps) {
  const [from, setFrom] = useState(Number(value?.from) || DEFAULT_MINITES);
  const [to, setTo] = useState(Number(value?.to) || DEFAULT_MINITES);

  const handleFromChange = (newFrom: number) => {
    const nextFrom = (newFrom + MAX_MINUTES) % MAX_MINUTES;
    setFrom(nextFrom);
    if (nextFrom >= to) {
      setTo((nextFrom + STEP) % MAX_MINUTES);
    }
  };

  const handleToChange = (newTo: number) => {
    const nextTo = (newTo + MAX_MINUTES) % MAX_MINUTES;
    if (nextTo === from) {
      setTo(newTo);
      setFrom(newTo);
    } else if (nextTo > from || nextTo === 0) {
      setTo(nextTo);
    }
  };

  useEffect(() => {
    onChange?.({ from, to });
  }, [from, to]);

  return (
    <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
      <TimeStepper label="с" minutes={from} onChange={handleFromChange} />
      <TimeStepper label="до" minutes={to} onChange={handleToChange} />
    </div>
  );
}
