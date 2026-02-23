export const contentSettingsData = [
  {
    id: '11',
    label: 'Поле для приветствия',
    placeholder: 'Место для текста',
  },
  {
    id: '22',
    label: 'Текст для подтверждения записи',
    placeholder: 'Место для текста',
  },
  {
    id: '33',
    label: 'Напоминание №1 о мероприятии (за 1 неделю)',
    placeholder: 'Место для текста',
  },
  {
    id: '44',
    label: 'Напоминание №2 о мероприятии (за 24 часа)',
    placeholder: 'Место для текста',
  },
  {
    id: '555',
    label: 'Текст сообщения при отмене бронирования',
    placeholder: 'Место для текста',
  },
  {
    id: '64',
    label: 'Благодарность по завершению мероприятия',
    placeholder: 'Место для текста',
  },
  {
    id: '77',
    label: 'Текст системной ошибки',
    placeholder: 'Место для текста',
  },
];

export type PermissionItemType = {
  id: string;
  checked: boolean;
  name: string;
};

export type PermissinGoupType = {
  id: string;
  groupTitle: string;
  options: PermissionItemType[];
};

export const adminPermissionSettings: PermissinGoupType[] = [
  {
    id: 'applications',
    groupTitle: 'Заявки',
    options: [
      { id: '1', checked: true, name: 'Просмотр таблицы заявок' },
      { id: '2', checked: true, name: 'Редактирование таблицы заявок' },
      { id: '3', checked: true, name: 'Увдаление таблицы заявок' },
    ],
  },
  {
    id: 'special_projects',
    groupTitle: 'Спецпроекты',
    options: [
      { id: '1', checked: true, name: 'Просмотр спецпроектов' },
      { id: '2', checked: true, name: 'Редактирование спецпроектов' },
      { id: '3', checked: true, name: 'Удаление спецпроектов' },
    ],
  },
  {
    id: 'boxes',
    groupTitle: 'Коробки',
    options: [
      { id: '1', checked: true, name: 'Создание коробки' },
      { id: '2', checked: true, name: 'Редактирование коробки' },
      { id: '3', checked: true, name: 'Удаление коробки' },
    ],
  },
  {
    id: 'analytics',
    groupTitle: 'Аналитика',
    options: [
      { id: '1', checked: true, name: 'Просмотр' },
      { id: '2', checked: true, name: 'Скачивание' },
    ],
  },
  {
    id: 'presentations',
    groupTitle: 'Презентации',
    options: [
      { id: '1', checked: true, name: 'Просмотр презинтаций' },
      { id: '2', checked: true, name: 'Редактирование презинтаций' },
      { id: '3', checked: true, name: 'Удаление презинтаций' },
    ],
  },
  {
    id: 'other',
    groupTitle: 'Другое ',
    options: [
      { id: '1', checked: true, name: 'Афиша' },
      { id: '2', checked: true, name: 'Раздел о нас' },
      { id: '3', checked: true, name: 'FAQ' },
    ],
  },
];

export const managerFirtsPermissionSettings: PermissinGoupType[] = [
  {
    id: 'applications',
    groupTitle: 'Заявки',
    options: [
      { id: '1', checked: true, name: 'Просмотр таблицы заявок' },
      { id: '2', checked: true, name: 'Редактирование таблицы заявок' },
      { id: '3', checked: false, name: 'Увдаление таблицы заявок' },
    ],
  },
  {
    id: 'special_projects',
    groupTitle: 'Спецпроекты',
    options: [
      { id: '1', checked: true, name: 'Просмотр спецпроектов' },
      { id: '2', checked: true, name: 'Редактирование спецпроектов' },
      { id: '3', checked: false, name: 'Удаление спецпроектов' },
    ],
  },
  {
    id: 'boxes',
    groupTitle: 'Коробки',
    options: [
      { id: '1', checked: true, name: 'Создание коробки' },
      { id: '2', checked: true, name: 'Редактирование коробки' },
      { id: '3', checked: false, name: 'Удаление коробки' },
    ],
  },
  {
    id: 'analytics',
    groupTitle: 'Аналитика',
    options: [
      { id: '1', checked: true, name: 'Просмотр' },
      { id: '2', checked: false, name: 'Скачивание' },
    ],
  },
  {
    id: 'presentations',
    groupTitle: 'Презентации',
    options: [
      { id: '1', checked: true, name: 'Просмотр презинтаций' },
      { id: '2', checked: true, name: 'Редактирование презинтаций' },
      { id: '3', checked: false, name: 'Удаление презинтаций' },
    ],
  },
  {
    id: 'other',
    groupTitle: 'Другое ',
    options: [
      { id: '1', checked: true, name: 'Афиша' },
      { id: '2', checked: true, name: 'Раздел о нас' },
      { id: '3', checked: true, name: 'FAQ' },
    ],
  },
];
export const managerSecondPermissionSettings: PermissinGoupType[] = [
  {
    id: 'applications',
    groupTitle: 'Заявки',
    options: [
      { id: '1', checked: true, name: 'Просмотр таблицы заявок' },
      { id: '2', checked: true, name: 'Редактирование таблицы заявок' },
      { id: '3', checked: false, name: 'Увдаление таблицы заявок' },
    ],
  },
  {
    id: 'special_projects',
    groupTitle: 'Спецпроекты',
    options: [
      { id: '1', checked: true, name: 'Просмотр спецпроектов' },
      { id: '2', checked: true, name: 'Редактирование спецпроектов' },
      { id: '3', checked: false, name: 'Удаление спецпроектов' },
    ],
  },
  {
    id: 'boxes',
    groupTitle: 'Коробки',
    options: [
      { id: '1', checked: true, name: 'Создание коробки' },
      { id: '2', checked: true, name: 'Редактирование коробки' },
      { id: '3', checked: false, name: 'Удаление коробки' },
    ],
  },
  {
    id: 'analytics',
    groupTitle: 'Аналитика',
    options: [
      { id: '1', checked: false, name: 'Просмотр' },
      { id: '2', checked: false, name: 'Скачивание' },
    ],
  },
  {
    id: 'presentations',
    groupTitle: 'Презентации',
    options: [
      { id: '1', checked: true, name: 'Просмотр презинтаций' },
      { id: '2', checked: true, name: 'Редактирование презинтаций' },
      { id: '3', checked: false, name: 'Удаление презинтаций' },
    ],
  },
  {
    id: 'other',
    groupTitle: 'Другое ',
    options: [
      { id: '1', checked: true, name: 'Афиша' },
      { id: '2', checked: false, name: 'Раздел о нас' },
      { id: '3', checked: true, name: 'FAQ' },
    ],
  },
];
export const managerThirdPermissionSettings: PermissinGoupType[] = [
  {
    id: 'applications',
    groupTitle: 'Заявки',
    options: [
      { id: '1', checked: true, name: 'Просмотр таблицы заявок' },
      { id: '2', checked: false, name: 'Редактирование таблицы заявок' },
      { id: '3', checked: false, name: 'Увдаление таблицы заявок' },
    ],
  },
  {
    id: 'special_projects',
    groupTitle: 'Спецпроекты',
    options: [
      { id: '1', checked: true, name: 'Просмотр спецпроектов' },
      { id: '2', checked: false, name: 'Редактирование спецпроектов' },
      { id: '3', checked: false, name: 'Удаление спецпроектов' },
    ],
  },
  {
    id: 'boxes',
    groupTitle: 'Коробки',
    options: [
      { id: '1', checked: true, name: 'Создание коробки' },
      { id: '2', checked: false, name: 'Редактирование коробки' },
      { id: '3', checked: false, name: 'Удаление коробки' },
    ],
  },
  {
    id: 'analytics',
    groupTitle: 'Аналитика',
    options: [
      { id: '1', checked: false, name: 'Просмотр' },
      { id: '2', checked: false, name: 'Скачивание' },
    ],
  },
  {
    id: 'presentations',
    groupTitle: 'Презентации',
    options: [
      { id: '1', checked: true, name: 'Просмотр презинтаций' },
      { id: '2', checked: false, name: 'Редактирование презинтаций' },
      { id: '3', checked: false, name: 'Удаление презинтаций' },
    ],
  },
  {
    id: 'other',
    groupTitle: 'Другое ',
    options: [
      { id: '1', checked: false, name: 'Афиша' },
      { id: '2', checked: false, name: 'Раздел о нас' },
      { id: '3', checked: false, name: 'FAQ' },
    ],
  },
];
