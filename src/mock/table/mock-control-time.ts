import type {
  Column,
  ControlTimeTable,
} from '@/components/ui/DataTable/Table.types';
import { v4 as uuid } from 'uuid';

export const COLUMNS_CONTROL_TIME_PLACE: Column<ControlTimeTable>[] = [
  {
    id: uuid(),
    title: 'Дата',
    isSort: true,
    sortValue: (row) => row.date,
    width: '120px',
    key: 'date',
  },
  {
    id: uuid(),
    title: 'Время',
    isSort: true,
    sortValue: (row) => row.time,
    width: '96px',
    key: 'time',
  },
  {
    id: uuid(),
    title: 'Название',
    width: '264px',
    key: 'name',
  },
  {
    id: uuid(),
    title: 'Количество мест',
    width: '148px',
    key: 'countPlaces',
  },
  {
    id: uuid(),
    title: 'Забронированные',
    width: '204px',
    key: 'countBooked',
  },
];

export const COLUMNS_CONTROL_TIME_NAME: Column<ControlTimeTable>[] = [
  {
    id: uuid(),
    title: 'Название',
    isSort: true,
    sortValue: (row) => row.placeName,
    width: '304px',
    key: 'placeName',
  },
  { id: uuid(), title: 'Время', isSort: false, width: '80px', key: 'time' },
  { id: uuid(), title: 'Место', isSort: false, width: '304px', key: 'place' },
];

export const DATA_CONTROL_TIME: ControlTimeTable[] = [
  {
    id: uuid(),
    placeName: 'Научный день рождения',
    time: '15:00',
    place: 'Экспериментариум',
    date: '01.01.2025',
    name: 'Третьяковка',
    countPlaces: 200,
    countBooked: 150,
  },
  {
    id: uuid(),
    placeName: 'Встреча с друзьями',
    time: '15:00',
    place: 'Экспериментариум',
    date: '01.01.2025',
    name: 'Третьяковка',
    countPlaces: 200,
    countBooked: 150,
  },
  {
    id: uuid(),
    placeName: 'Тимбилдинг',
    time: '17:00',
    place: 'Экспериментариум',
    date: '01.01.2025',
    name: 'Третьяковка',
    countPlaces: 200,
    countBooked: 150,
  },
  {
    id: uuid(),
    placeName: 'Шоу «Нитра»',
    time: '19:00',
    place: 'Экспериментариум',
    date: '01.01.2025',
    name: 'Третьяковка',
    countPlaces: 200,
    countBooked: 150,
  },
];
