export type TimeRangeType = { from: number; to: number };

export const STEP = 60;
export const MAX_MINUTES = 24 * 60;

export const formatMinutesToTime = (m: number): string => {
  const hours = Math.floor(m / 60)
    .toString()
    .padStart(2, '0');
  const mins = (m % 60).toString().padStart(2, '0');
  return `${hours}:${mins}`;
};

export const getNextStepValue = (current: number, delta: number): number => {
  return (current + delta + MAX_MINUTES) % MAX_MINUTES;
};

export function formatCurrentRange(timeRange: TimeRangeType) {
  if (!timeRange.from || !timeRange.to || timeRange.from === timeRange.to) {
    return '';
  }

  if (timeRange.from && timeRange.to) {
    return `${formatMinutesToTime(timeRange.from)} - ${formatMinutesToTime(timeRange.to)} (${Math.floor(timeRange.to - timeRange.from) / 60}ч)`;
  }
}
