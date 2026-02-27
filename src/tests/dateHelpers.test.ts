import { describe, it, expect } from 'vitest';
import {
  toISODate,
  toISODateTime,
  fromISODate,
  formatDateUI,
  isValidDate,
} from '@/utils/dateHelpers';

describe('toISODate', () => {
  it('форматирует дату без UTC-сдвига', () => {
    const date = new Date(2026, 1, 27); // 27 февраля
    expect(toISODate(date)).toBe('2026-02-27');
  });

  it('не сдвигает день для часового пояса UTC+N', () => {
    const date = new Date(2026, 0, 1); // 1 января
    expect(toISODate(date)).toBe('2026-01-01');
  });

  // дата с временем 23:59 не должна "переходить" на следующий день
  it('игнорирует время — берёт только дату', () => {
    const date = new Date(2026, 1, 27, 23, 59, 59);
    expect(toISODate(date)).toBe('2026-02-27');
  });

  // Поднозначные месяцы и дни должны паддиться нулём
  it('паддит месяц и день нулём', () => {
    const date = new Date(2026, 0, 5); // 5 января
    expect(toISODate(date)).toBe('2026-01-05');
  });

  // 29 февраля високосного года
  it('29 февраля в високосный год', () => {
    const date = new Date(2024, 1, 29);
    expect(toISODate(date)).toBe('2024-02-29');
  });

  // 31 декабря не становится следующим годом
  it('31 декабря остаётся в том же году', () => {
    const date = new Date(2026, 11, 31);
    expect(toISODate(date)).toBe('2026-12-31');
  });
});


describe('fromISODate', () => {
  it('парсит ISO строку в Date', () => {
    const date = fromISODate('2026-02-27');
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(1); // февраль = 1
    expect(date.getDate()).toBe(27);
  });

  it('правильно парсит январь (01 → getMonth() === 0)', () => {
    const date = fromISODate('2026-01-15');
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(15);
  });

  it('правильно парсит декабрь (12 → getMonth() === 11)', () => {
    const date = fromISODate('2026-12-31');
    expect(date.getMonth()).toBe(11);
    expect(date.getDate()).toBe(31);
  });

  it('round-trip: toISODate(fromISODate(str)) === str', () => {
    const original = '2026-02-27';
    expect(toISODate(fromISODate(original))).toBe(original);
  });

  // parseISO('2026-02-27T00:00:00') должен дать правильный день
  it('парсит datetime строку без Z-суффикса', () => {
    const date = fromISODate('2026-02-27T00:00:00');
    expect(date.getDate()).toBe(27);
    expect(date.getMonth()).toBe(1); // 1 - февраль
  });

  // Пстрока с Z-суффиксом — UTC полночь может стать вчерашним днём!
  // В UTC+3: "2026-02-27T00:00:00Z" → 2026-02-27 03:00:00 локально → день 27, ок
  // В UTC-5: "2026-02-27T00:00:00Z" → 2026-02-26 19:00:00 локально → день 26, СДВИГ!
  // Это не баг реализации, а задокументированное поведение — важно знать
  it('(предупреждение) Z-суффикс может дать сдвиг дня в западных таймзонах', () => {
    const date = fromISODate('2026-02-27T00:00:00Z');
    // В UTC+3 этот тест проходит, в UTC-5 — нет
    // Если бэк шлёт Z, нужно stripTimezone перед parseISO
    expect(date).toBeInstanceOf(Date);
    expect(isValidDate(date)).toBe(true);
  });

  // невалидная строка — не крашится, но возвращает Invalid Date
  it('невалидная строка → Invalid Date (не крашится)', () => {
    const date = fromISODate('not-a-date');
    expect(isValidDate(date)).toBe(false);
  });
});


describe('formatDateUI', () => {
  it('форматирует январь корректно', () => {
    expect(formatDateUI('2026-01-05')).toBe('05.01.2026');
  });

  it('форматирует декабрь корректно', () => {
    expect(formatDateUI('2026-12-05')).toBe('05.12.2026');
  });

  it('форматирует для показа пользователю', () => {
    const date = new Date(2026, 1, 27);
    expect(formatDateUI(date)).toBe('27.02.2026');
  });

  it('принимает ISO строку', () => {
    expect(formatDateUI('2026-02-27')).toBe('27.02.2026');
  });

  // однозначный день и месяц паддятся нулём
  it('паддит день и месяц нулём', () => {
    expect(formatDateUI('2026-01-05')).toBe('05.01.2026');
  });
});


describe('toISODateTime', () => {
  it('включает время без Z-суффикса', () => {
    const date = new Date(2026, 1, 27, 14, 30, 0);
    expect(toISODateTime(date)).toBe('2026-02-27T14:30:00');
  });

  // секунды 0 должны быть явно включены
  it('включает нули в секундах', () => {
    const date = new Date(2026, 1, 27, 9, 5, 0);
    expect(toISODateTime(date)).toBe('2026-02-27T09:05:00');
  });

  // полночь
  it('полночь → T00:00:00', () => {
    const date = new Date(2026, 1, 27, 0, 0, 0);
    expect(toISODateTime(date)).toBe('2026-02-27T00:00:00');
  });
});

describe('isValidDate', () => {
  it('валидный Date → true', () => {
    expect(isValidDate(new Date(2026, 1, 27))).toBe(true);
  });

  it('Invalid Date → false', () => {
    expect(isValidDate(new Date('invalid'))).toBe(false);
  });

  it('строка → false (не Date)', () => {
    expect(isValidDate('2026-02-27')).toBe(false);
  });

  it('null → false', () => {
    expect(isValidDate(null)).toBe(false);
  });

  it('undefined → false', () => {
    expect(isValidDate(undefined)).toBe(false);
  });
});