import type { Column, MainPage } from '@/components/ui/DataTable/Table.types';
import { v4 as uuid } from 'uuid';

export const COLUMNS_MAIN_PAGE: Column<MainPage>[] = [
  {
    id: uuid(),
    title: 'Дата заявки',
    width: '130px',
    key: 'date',
    isSort: true,
    sortValue: (row) => row.date,
  },
  {
    id: uuid(),
    title: 'Tg-аккаунт',
    width: '187.5px',
    key: 'tg',
  },
  {
    id: uuid(),
    title: 'Имя клиента',
    width: '187.5px',
    key: 'name',
  },
  {
    id: uuid(),
    title: 'Услуга',
    width: '187.5px',
    key: 'service',
  },
  {
    id: uuid(),
    title: 'Название проекта',
    width: '187.5px',
    key: 'projectName',
  },
  {
    id: uuid(),
    title: 'Статус',
    width: '137px',
    key: 'status',
  },
];

export const DATA_MAIN_PAGE: MainPage[] = [
  {
    date: '01.01.2025',
    tg: '@tgclient',
    name: 'Иван Иванов',
    service: 'Спецпроект',
    projectName: 'Тертьяковка',
    status: 'В очереди',
  },
  {
    date: '01.01.2025',
    tg: '@tgclient',
    name: 'Иван Иванов',
    service: 'Спецпроект',
    projectName: 'Тертьяковка',
    status: 'В очереди',
  },
  {
    date: '01.01.2025',
    tg: '@tgclient',
    name: 'Иван Иванов',
    service: 'Спецпроект',
    projectName: 'Тертьяковка',
    status: 'В очереди',
  },
  {
    date: '03.01.2025',
    tg: '@tgclient',
    name: 'Иван Иванов',
    service: 'Спецпроект',
    projectName: 'Тертьяковка',
    status: 'В очереди',
  },
  {
    date: '01.01.2025',
    tg: '@tgclient',
    name: 'Иван Иванов',
    service: 'Спецпроект',
    projectName: 'Тертьяковка',
    status: 'В очереди',
  },
  {
    date: '01.01.2025',
    tg: '@tgclient',
    name: 'Иван Иванов',
    service: 'Спецпроект',
    projectName: 'Тертьяковка',
    status: 'В очереди',
  },
  {
    date: '01.01.2025',
    tg: '@tgclient',
    name: 'Иван Иванов',
    service: 'Спецпроект',
    projectName: 'Тертьяковка',
    status: 'В очереди',
  },
];
