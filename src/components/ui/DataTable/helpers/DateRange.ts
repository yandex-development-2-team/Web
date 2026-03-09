import { endOfDay, isValid, parse, parseISO, startOfDay } from 'date-fns';
import type { DateRange } from '../Table.types';

type DateLike = string | Date;

function toDate(value: DateLike): Date | null {
  if (value instanceof Date) return isValid(value) ? value : null;

  const iso = parseISO(value);
  if (isValid(iso)) return iso;

  const ru = parse(value, 'dd.MM.yyyy', new Date());
  return isValid(ru) ? ru : null;
}

type RangeGetter<T> = Extract<
  DateRange<T>,
  { getRange: (row: T) => { from: DateLike; to: DateLike } | null | undefined }
>;

function hasGetRange<T>(range: DateRange<T>): range is RangeGetter<T> {
  return 'getRange' in range;
}

export function filterRowsByDate<T>(rows: T[], range?: DateRange<T>): T[] {
  if (!range) return rows;

  const fromRaw = range.fromDate ? toDate(range.fromDate) : null;
  const toRaw = range.toDate ? toDate(range.toDate) : null;

  if (!fromRaw && !toRaw) return rows;

  let from = fromRaw ? startOfDay(fromRaw) : null;
  let to = toRaw ? endOfDay(toRaw) : null;

  if (from && to && from > to) {
    const tmp = from;
    from = to;
    to = tmp;
  }

  if (!hasGetRange(range)) {
    return rows.filter((row) => {
      const raw = range.getDate(row);
      if (!raw) return false;

      const d = toDate(raw);
      if (!d) return false;

      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });
  }

  return rows.filter((row) => {
    const r = range.getRange(row);
    if (!r) return false;

    const rangeFrom0 = toDate(r.from);
    const rangeTo0 = toDate(r.to);
    if (!rangeFrom0 || !rangeTo0) return false;

    let rangeFrom = startOfDay(rangeFrom0);
    let rangeTo = endOfDay(rangeTo0);

    if (rangeFrom > rangeTo) {
      const tmp = rangeFrom;
      rangeFrom = rangeTo;
      rangeTo = tmp;
    }

    if (from && rangeTo < from) return false;
    if (to && rangeFrom > to) return false;

    return true;
  });
}
