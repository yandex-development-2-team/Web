import type {
  AnalyticUserTable,
  Column,
} from '@/components/ui/DataTable/Table.types';
import { v4 as uuid } from 'uuid';

export const COLUMNS_ANALYTIC_USER: Column<AnalyticUserTable>[] = [
  {
    id: uuid(),
    title: 'Пользователь',
    isSort: true,
    sortValue: (row) => row.name,
    width: '320px',
    key: 'name',
  },
  {
    id: uuid(),
    title: 'Количество записей',
    key: 'numEntries',
    isSort: false,
    width: '164px',
  },
  {
    id: uuid(),
    title: 'Частота визитов',
    key: 'numVisited',
    isSort: false,
    width: '137px',
  },
  { id: uuid(), title: 'Коробки', key: 'boxes', isSort: false, width: '304px' },
  { id: uuid(), title: 'Отмены', width: '107px', key: 'cancelling' },
];

export const DATA_ANALYTIC_USER: AnalyticUserTable[] = [
  {
    id: uuid(),
    name: '@serg',
    numEntries: 5,
    numVisited: 5,
    boxes: 'Третьяковка',
    cancelling: 0,
  },
  {
    id: uuid(),
    name: '@dfxfsah',
    numEntries: 3,
    numVisited: 2,
    boxes: 'Русский музей',
    cancelling: 1,
  },
  {
    id: uuid(),
    name: '@dfxfsah',
    numEntries: 3,
    numVisited: 2,
    boxes: 'Русский музей',
    cancelling: 1,
  },
  {
    id: uuid(),
    name: '@dfxfsah',
    numEntries: 3,
    numVisited: 2,
    boxes: 'Русский музей',
    cancelling: 1,
  },
  {
    id: uuid(),
    name: '@dfxfsah',
    numEntries: 3,
    numVisited: 2,
    boxes: 'Русский музей',
    cancelling: 1,
  },
  {
    id: uuid(),
    name: '@dfxfsah',
    numEntries: 3,
    numVisited: 2,
    boxes: 'Русский музей',
    cancelling: 1,
  },
  {
    id: uuid(),
    name: '@dfxfsah',
    numEntries: 3,
    numVisited: 2,
    boxes: 'Русский музей',
    cancelling: 1,
  },
  {
    id: uuid(),
    name: '@dfxfsah',
    numEntries: 3,
    numVisited: 2,
    boxes: 'Русский музей',
    cancelling: 1,
  },
];
