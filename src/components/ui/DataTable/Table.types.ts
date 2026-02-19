import type { ReactNode } from 'react';

interface Column<T, K extends keyof T = keyof T> {
  id: string;
  title: string;
  key: K;
  isSort?: boolean;
  width?: string;
  getValue?: (row: T) => ReactNode;
  sortValue?: (row: T) => string | null | undefined;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
}

type SortDirection = 'asc' | 'desc';

interface AnalyticUser {
  id?: string;
  name: string;
  numEntries: number;
  numVisited: number;
  boxes: string;
  cancelling: number;
}

export type { Column, DataTableProps, SortDirection, AnalyticUser };
