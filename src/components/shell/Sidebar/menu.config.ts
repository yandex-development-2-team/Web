import type { MenuItems } from './menu.types';
import { ROUTES } from '@/app/router';
import { 
  AnalyticsIcon, 
  HomeIcon, 
  BoxIcon, 
  SystemSettingsIcon, 
  SpecialProjectsIcon, 
  ControlUsersIcon, 
  ControlTimesableIcon,
  BoxesMenuIcon, 
  ApplicationIcon,
  AfishaIcon
} from '@/assets/icons';

export const menu_items: MenuItems = {
  ADMIN: [
    {
      title: 'Аналитика',
      icon: AnalyticsIcon,
      url: ROUTES.ANALYTICS,
      items: [
        {
          title: 'Средняя посещаемость на коробку',
          url: ROUTES.AVERAGE_BOX_ATTENDANCE,
        },
        {
          title: 'Работа с заявками',
          url: ROUTES.APPLICATIONS_WORK,
        },
        {
          title: 'Популярность коробочных решений',
          url: ROUTES.BOX_SOLUTIONS_POPULARITY,
        },
        {
          title: 'Экспорт данных',
          url: ROUTES.DATA_EXPORT,
        },
        {
          title: 'Аналитика пользователей',
          url: ROUTES.USERS_ANALYTICS,
        },
      ],
    },
    {
      title: 'Управление\n коробками',
      url: ROUTES.BOX_MANAGEMENT,
      icon: BoxIcon,
    },
    {
      title: 'Управление\n расписанием',
      url: ROUTES.SCHEDULE_MANAGEMENT,
      icon: ControlTimesableIcon,
    },
    {
      title: 'Управление правами\n и пользователями',
      url: ROUTES.USER_PERMISSIONS,
      icon: ControlUsersIcon,
    },
    {
      title: 'Системные настройки',
      url: ROUTES.SYSTEM_SETTINGS,
      icon: SystemSettingsIcon,
    },
  ],
  MANAGER: [
    {
      title: 'Главная',
      url: ROUTES.HOME,
      icon: HomeIcon,
    },
    {
      title: 'Коробочные\n решения',
      url: ROUTES.BOX_SOLUTIONS,
      icon: BoxesMenuIcon,
    },
    {
      title: 'Спецпроекты',
      url: ROUTES.APPLICATIONS_SPECIAL_PROJECTS,
      icon: SpecialProjectsIcon,
    },
    {
      title: 'Заявки',
      url: ROUTES.APPLICATIONS_WORK,
      icon: ApplicationIcon,
    },
    {
      title: 'Ссылки и ресурсы',
      url: ROUTES.LINKS_RESOURCES,
      icon: AfishaIcon,
    },
  ],
};
