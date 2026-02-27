import { format, parseISO, isValid } from 'date-fns';

// Отправка на бэк — дата без времени (ISO 8601 date-only)
// "2026-02-27" — нет UTC-смещения, нет сдвига дня
export const toISODate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

// Отправка на бэк — дата + время в локальном времени
// "2026-02-27T14:30:00" — без Z, бэк интерпретирует как UTC или сам разберётся
export const toISODateTime = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

// Получение с бэка — парсим строку "2026-02-27" → Date
// parseISO из date-fns правильно создаёт локальный Date без UTC-сдвига
export const fromISODate = (isoString: string): Date => {
  return parseISO(isoString);
};

// Проверка валидности
export const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && isValid(date);
};

// Для UI
export const formatDateUI = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd.MM.yyyy');
};
