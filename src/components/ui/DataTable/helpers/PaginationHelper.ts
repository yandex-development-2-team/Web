import type {
  PaginateArgs,
  PaginationItem,
  PaginationRangeArgs,
} from '../Table.types';

const clamp = (num: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, num));
};

const range = (from: number, to: number): number[] => {
  const out: number[] = [];

  if (from > to) return [];

  for (let i = from; i <= to; i++) {
    out.push(i);
  }

  return out;
};

export function getPaginationRange({
  currentPage,
  totalPages,
  nearCount = 2,
}: PaginationRangeArgs): PaginationItem[] {
  const totalPage = Math.max(1, totalPages);
  const currPage = clamp(currentPage, 1, totalPage);
  const firstItem = Math.max(2, currPage - nearCount);
  const lastItem = Math.min(totalPage - 1, currPage + nearCount);
  const showLeftDots = firstItem > 2;
  const showRightDots = lastItem < totalPage - 1;
  const items: PaginationItem[] = [1];

  if (totalPage === 1) return [1];

  if (showLeftDots) {
    items.push('dots');
  } else {
    items.push(...range(2, firstItem - 1));
  }

  items.push(...range(firstItem, lastItem));

  if (showRightDots) {
    items.push('dots');
  } else {
    items.push(...range(lastItem + 1, totalPage - 1));
  }

  items.push(totalPage);

  return items;
}

export function paginateRows<T>({
  currentPage,
  pageSize,
  rows,
}: PaginateArgs<T>) {
  const totalPage = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.max(1, Math.min(currentPage, totalPage));
  const start = (safePage - 1) * pageSize;
  const paginatedRows = rows.slice(start, start + pageSize);

  return { paginatedRows, totalPage, safePage };
}
