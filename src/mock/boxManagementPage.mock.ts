export type StatisticItemType = {
  id: string;
  title: string;
  count: string;
  isHighlighted?: boolean;
};

export const NOT_IMPLEMENTED_ID = 'not-implemented';

export const STATISTIC_OF_DAY: StatisticItemType[] = [
  {
    id: 'created',
    title: 'Созданные',
    count: '5',
  },
  {
    id: 'in-work',
    title: 'В работе',
    count: '25',
  },
  {
    id: 'implemented',
    title: 'Реализованные',
    count: '10',
  },
  {
    id: 'not-implemented',
    title: 'Не реализованные',
    count: '4',
    isHighlighted: true,
  },
];

export type ProjectItem = {
  id: string;
  name: string;
  title?: string;
  isActive?: boolean;
  description?: string;
  image?: File | null;
};

export const BOXES_AND_SPECPROJECTS_LIST: {
  boxes: ProjectItem[];
  specialProjects: ProjectItem[];
} = {
  boxes: [
    {
      id: 'box_1',
      name: 'Название коробки',
    },
    {
      id: 'box_2',
      name: 'Название коробки',
    },
    {
      id: 'box_3',
      name: 'Название коробки',
    },
    {
      id: 'box_4',
      name: 'Название коробки',
    },
  ],
  specialProjects: [
    {
      id: 'specproject_1',
      name: 'Название спецпроекта',
      description: 'Описание проекта',
      isActive: true,
      image: null,
      title: 'Название спецпроекта',
    },
    {
      id: 'specproject_2',
      name: 'Название спецпроекта',
    },
    {
      id: 'specproject_3',
      name: 'Название спецпроекта',
    },
    {
      id: 'specproject_4',
      name: 'Название спецпроекта',
    },
  ],
};
