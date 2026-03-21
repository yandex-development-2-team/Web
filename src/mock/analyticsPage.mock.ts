import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type NewBlockType = {
  id?: string;
  title: string;
  subTitle: string;
  icon: ReactNode;
  link: string;
};

export type StatisticItemType = {
  id: string;
  title: string;
  count: string;
  isHighlighted?: boolean;
};

export const STATISTIC_OF_DAY: StatisticItemType[] = [
  {
    id: 'accepted_applications',
    title: 'Принято заявок',
    count: '12',
  },
  {
    id: 'in-work',
    title: 'В работе',
    count: '6',
  },
  {
    id: 'processing_applications',
    title: 'Обработано заявок',
    count: '3',
  },
];

export const STATISTIC_OF_WEEK: StatisticItemType[] = [
  {
    id: 'accepted_applications',
    title: 'Принято заявок',
    count: '22',
  },
  {
    id: 'in-work',
    title: 'В работе',
    count: '26',
  },
  {
    id: 'processing_applications',
    title: 'Обработано заявок',
    count: '23',
  },
];

type ItemType = {
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager1' | 'manager2' | 'manager3';
  status: 'online' | 'offline';
  id?: string;
};

export const TEAM_OF_DAY: ItemType[] = [
  {
    id: uuidv4(),
    firstName: 'Илья',
    lastName: 'Иванов',
    role: 'manager1',
    status: 'online',
  },
  {
    id: uuidv4(),
    firstName: 'Никита',
    lastName: 'Огурцов',
    role: 'manager2',
    status: 'offline',
  },
  {
    id: uuidv4(),
    firstName: 'Пупыркина',
    lastName: 'Светлана',
    role: 'manager3',
    status: 'online',
  },
  // {
  //   id: uuidv4(),
  //   firstName: 'Пупыркина',
  //   lastName: 'Светлана',
  //   role: 'manager3',
  //   status: 'online',
  // },
  // {
  //   id: uuidv4(),
  //   firstName: 'Пупыркина',
  //   lastName: 'Светлана',
  //   role: 'manager3',
  //   status: 'online',
  // },
];
