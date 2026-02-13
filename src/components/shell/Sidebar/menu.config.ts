import type { MenuItems } from './menu.types';
import { ROUTES } from '@/app/router';
import AnalyticsIcon from '@/assets/icons/withoutSvgOmg/analytics-60.svg?react';
import BoxIcon from '@/assets/icons/withoutSvgOmg/control-box-60.svg?react';
import SystemSettingsIcon from '@/assets/icons/withoutSvgOmg/system-settings-60.svg?react';
import SpecialProjectsIcon from '@/assets/icons/withoutSvgOmg/special-projects-60.svg?react';
import HomeIcon from '@/assets/icons/withoutSvgOmg/home-60.svg?react';
import ControlUsersIcon from '@/assets/icons/withoutSvgOmg/control-users-60.svg?react';
import ControlTimesableIcon from '@/assets/icons/withoutSvgOmg/control-timetable-60.svg?react';
import BoxesMenuIcon from '@/assets/icons/withoutSvgOmg/boxes-menu-60.svg?react';
import ApplicationIcon from '@/assets/icons/withoutSvgOmg/application-60.svg?react';
import AfishaIcon from '@/assets/icons/withoutSvgOmg/afisha-60.svg?react';

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
