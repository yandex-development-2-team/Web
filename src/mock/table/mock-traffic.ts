import type { Column, Traffic } from '@/components/ui/DataTable/Table.types';
import { v4 as uuid } from 'uuid';

export const COLUMNS_TRAFFIC: Column<Traffic>[] = [
  {
    id: uuid(),
    title: 'Период',
    width: '293.33px',
    key: 'period',
  },
  {
    id: uuid(),
    title: 'Средняя посещаесть в день',
    width: '293.33px',
    key: 'trafficDay',
  },
  {
    id: uuid(),
    title: 'Динамика к предыдущему периоду',
    width: '293.33px',
    key: 'dynamicsPeriod',
  },
];

export const DATA_TRAFFIC: Traffic[] = [
  {
    period: 'С 20.09.2025 — 20.10.2025',
    trafficDay: '10 чел.',
    dynamicsPeriod: '+2 чел.',
  },
  {
    period: 'С 20.09.2025 — 20.10.2025',
    trafficDay: '20 чел.',
    dynamicsPeriod: '+3 чел.',
  },
];
