import 'react-router-dom';

export const ROUTES = {
  // Основные маршруты
  HOME: '/', // Главная
  BOX_SOLUTIONS: '/box-solutions', // Раздел "Коробочные решения"
  BOX_DETAILS: '/box-solutions/:boxId', // Коробочные решения (конкретная коробка)
  SPECIAL_PROJECTS: '/special-projects', // Раздел "Спецпроекты"

  APPLICATIONS_BOX: '/applications-box', // Раздел "Заявки на коробочные решения
  APPLICATIONS_BOX_DETAILS: '/applications-box/:boxId', // Заявки на коробочные решения (конкретная коробка)

  APPLICATIONS_SPECIAL_PROJECTS: '/applications-special-projects', // Раздел "Заявки на спецпроекты
  APPLICATIONS_SPECIAL_PROJECTS_DETAILS:
    '/applications-special-projects/:projectId', // Заявки на спецпроекты (конкретный спецпроект)

  LINKS_RESOURCES: '/links-resources', // Раздел "Ссылки и ресурсы"
  SUPPORT: '/support', // Поддержка

  // Аналитика (вложенные маршруты)
  ANALYTICS: '/analytics', // раздел "Аналитика"
  // Вложенные маршруты
  AVERAGE_BOX_ATTENDANCE: '/analytics/average-box-attendance', // Средняя посещаемость
  APPLICATIONS_WORK: '/analytics/applications-work', // Работа с заявками
  BOX_SOLUTIONS_POPULARITY: '/analytics/box-solutions-popularity', // Популярность коробочных решений
  DATA_EXPORT: '/analytics/data-export', // Экспорт данных в различные форматы
  USERS_ANALYTICS: '/analytics/users-analytics', // Аналитика пользователей и их активности

  // Управление
  SCHEDULE_MANAGEMENT: '/schedule-management', // Управление расписанием
  BOX_MANAGEMENT: '/box-management', // Управление коробками
  USER_PERMISSIONS: '/user-permissions', // Управление правами пользователей
  SYSTEM_SETTINGS: '/system-settings', // Системные настройки
} as const;

export type PathParams = {
  [ROUTES.BOX_DETAILS]: {
    boxId: string;
  };
  [ROUTES.APPLICATIONS_BOX_DETAILS]: {
    boxId: string;
  };
  [ROUTES.APPLICATIONS_SPECIAL_PROJECTS_DETAILS]: {
    projectId: string;
  };
};

export function href<T extends keyof PathParams>(
  route: T,
  params: PathParams[T],
): string {
  let path = route as string;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value as string);
  });
  return path;
}

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}
