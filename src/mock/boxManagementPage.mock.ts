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
      title: 'Название коробки',
    },
    {
      id: 'box_2',
      title: 'Название коробки',
    },
    {
      id: 'box_3',
      title: 'Название коробки',
    },
    {
      id: 'box_4',
      title: 'Название коробки',
    },
  ],
  specialProjects: [
    {
      id: 'specproject_1',
      title: 'Название спецпроекта',
      description: 'Описание проекта',
      isActive: true,
      image: null,
    },
    {
      id: 'specproject_2',
      title: 'Название спецпроекта',
    },
    {
      id: 'specproject_3',
      title: 'Название спецпроекта',
    },
    {
      id: 'specproject_4',
      title: 'Название спецпроекта',
    },
  ],
};
