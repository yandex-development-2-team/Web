import type { ReactNode } from 'react';

type Column<T, K extends keyof T = keyof T> = {
  id: string;
  title: string;
  key: K;
  isSort?: boolean;
  width?: string;
  getValue?: (row: T) => ReactNode;
  sortValue?: (row: T) => string | null | undefined;
  filterValue?: (row: T) => string | null | undefined;
};

type ControlsTable = 'showBy' | 'showMore' | 'pagination';

type RowSelectionProps = {
  enabled?: boolean;
  onChange?: (ids: string[]) => void;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  defaultRowCount?: number;
  showMoreCountRows?: number;
  showControls?: ControlsTable;
  isLoading: boolean;
  isError: boolean;
  filter?: string;
  rowSelected?: RowSelectionProps;
};

type SortDirection = 'asc' | 'desc';

type AnalyticUserTable = {
  id: string;
  name: string;
  numEntries: number;
  numVisited: number;
  boxes: string;
  cancelling: number;
};

type ControlTimeTable = {
  id?: string;
  placeName: string;
  place: string;
  date: string;
  time: string;
  name: string;
  countPlaces: number;
  countBooked: number;
};

type RequrestBoxes = {
  id: string;
  name: string;
  tg: string;
  date: string;
  namePlace: string;
  status: string;
  manager: string;
};

type MainPage = {
  id?: string;
  date: string;
  tg: string;
  name: string;
  service: string;
  projectName: string;
  status: string;
};

type Traffic = {
  id?: string;
  period: string;
  trafficDay: string;
  dynamicsPeriod: string;
};

type Applications = {
  id?: string;
  period: string;
  numberEnties: string;
  visits: string;
};

type UsersManagement = {
  id?: string;
  name: string;
  department: string;
  post: string;
  level: string | number;
  number: string;
  email: string;
};

type PaginationItem = number | 'dots';

type PaginationRangeArgs = {
  currentPage: number;
  totalPages: number;
  nearCount?: number;
};

type PaginateArgs<T> = {
  rows: T[];
  currentPage: number;
  pageSize: number;
};

export type {
  Column,
  DataTableProps,
  SortDirection,
  AnalyticUserTable,
  ControlTimeTable,
  ControlsTable,
  PaginationItem,
  PaginationRangeArgs,
  PaginateArgs,
  RequrestBoxes,
  MainPage,
  Traffic,
  Applications,
  UsersManagement,
};
