import { format } from 'date-fns';

export const formatDateUI = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'dd.MM.yyyy');
};

export const formatDateAPI = (date: Date) => {
  return date.toISOString();
};
