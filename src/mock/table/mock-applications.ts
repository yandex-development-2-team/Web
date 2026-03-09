import type {
  Applications,
  Column,
} from '@/components/ui/DataTable/Table.types';
import { v4 as uuid } from 'uuid';

export const COLUMNS_TRAFFIC: Column<Applications>[] = [
  {
    id: uuid(),
    title: 'Период',
    width: '293.33px',
    key: 'period',
  },
  {
    id: uuid(),
    title: 'Количество записей',
    width: '293.33px',
    key: 'numberEnties',
  },
  {
    id: uuid(),
    title: 'Реальные посещения',
    width: '293.33px',
    key: 'visits',
  },
];

export const DATA_TRAFFIC: Applications[] = [
  {
    period: 'С 20.09.2025 — 20.10.2025',
    numberEnties: '25 чел.',
    visits: '20 чел.',
  },
];
