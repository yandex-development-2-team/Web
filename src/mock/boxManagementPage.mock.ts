export type StatisticItemType = {
  id: string;
  title: string;
  count: string;
  isHighlighted?: boolean;
};

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
  title: string;
  isActive?: boolean;
  description?: string;
  image?: File | null;
  date?: string;
  timeRange?: {
    from: number;
    to: number;
  };
  location?: string;
  rules?: string | string[];
  cost?: string | number;
  organizer?: string;
};

export const BOXES_AND_SPECPROJECTS_LIST: {
  boxes: ProjectItem[];
  specialProjects: ProjectItem[];
} = {
  boxes: [
    {
      id: 'box_1',
      title: 'Private Excursion',
      description:
        'Уютное путешествие по шедеврам русского искусства с персональным гидом.',
      isActive: true,
    },
    {
      id: 'box_2',
      title: 'Evening Gallery Walk',
      description:
        'Камерный маршрут по вечерним экспозициям с музыкальным сопровождением.',
      isActive: false,
    },
    {
      id: 'box_3',
      title: 'Curator Talk',
      description:
        'Авторская встреча с куратором и подробным разбором ключевых работ.',
      isActive: true,
    },
    {
      id: 'box_4',
      title: 'Family Weekend',
      description:
        'Семейный формат с интерактивом, короткими экскурсиями и заданиями.',
      isActive: true,
    },
  ],
  specialProjects: [
    {
      id: 'specproject_1',
      title: 'Museum Residency',
      description:
        'Спецпроект с лекциями, кураторскими маршрутами и творческими практиками.',
      isActive: true,
      image: null,
    },
    {
      id: 'specproject_2',
      title: 'Open Studio',
      description:
        'Публичная программа с художниками и серией открытых студий.',
      isActive: false,
    },
    {
      id: 'specproject_3',
      title: 'Night at the Museum',
      description:
        'Ночная серия событий с перформансами, экскурсиями и дискуссиями.',
      isActive: true,
    },
    {
      id: 'specproject_4',
      title: 'Archive Lab',
      description:
        'Исследовательский проект о музейных архивах и работе с коллекцией.',
      isActive: true,
    },
  ],
};
