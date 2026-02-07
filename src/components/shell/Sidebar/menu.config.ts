import type { MenuItems } from './menu.types';
import { ROUTES } from '@/app/router';
import AnalyticsIcon from '@/assets/icons/analytics-60.svg';
import BoxIcon from '@/assets/icons/control-box-60.svg';
import SystemSettingsIcon from '@/assets/icons/system-settings.svg';
import SpecialProjectsIcon from '@/assets/icons/special-projects.svg';
import HomeIcon from '@/assets/icons/home.svg';
import ControlUsersIcon from '@/assets/icons/control-users-60.svg'
import ControlTimesableIcon from '@/assets/icons/control-timetable-60.svg';
import BoxesMenuIcon from '@/assets/icons/boxes-menu.svg';
import ApplicationIcon from '@/assets/icons/application.svg';
import AfishaIcon from '@/assets/icons/afisha.svg';

export const menu_items: MenuItems = {
  ADMIN: [
    {
      title: 'Коробочные решения',
      icon: AnalyticsIcon,
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
      title: 'Управления коробками',
      url: ROUTES.BOX_MANAGEMENT,
      icon: BoxIcon,
    },
    {
      title: 'Управление расписанием',
      url: ROUTES.SCHEDULE_MANAGEMENT,
      icon: ControlTimesableIcon,
    },
    {
      title: 'Управление правами и пользователями',
      url: ROUTES.USER_PERMISSIONS,
      icon: ControlUsersIcon,
    },
    {
      title: 'Стстемные настройки',
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
      title: 'Коробочные решения',
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
