import { ROUTES } from '@/app/router';
import {
  Box1Icon,
  BoxWithStarIcon,
  ListWithPencilIcon,
  MagicStickIcon,
  UploadIcon,
  UserPlusIcon,
  UsersGroupIcon,
} from '@/assets/icons';
import { StatisticsList } from '@/components/ui/StatiscticsList';
import { STATISTIC_OF_DAY, STATISTIC_OF_WEEK } from '@/mock/analyticsPage.mock';

export const CREATE_BUTTONS = [
  {
    id: 'create_box',
    title: 'Создать коробку',
    icon: <Box1Icon />,
  },
  {
    id: 'create_spec_project',
    title: 'Создать спецпроект',
    icon: <MagicStickIcon />,
  },
  {
    id: 'add_user',
    title: 'Добавить пользователя',
    icon: <UserPlusIcon />,
    to: '/user-permissions',
  },
];

export const ANALITICS_PAGES_DATA = [
  {
    id: ROUTES.AVERAGE_BOX_ATTENDANCE,
    title: 'Средняя посещаемость на коробку',
    subTitle: 'Статистика за выбранный период',
    icon: <UsersGroupIcon />,
    link: ROUTES.AVERAGE_BOX_ATTENDANCE,
  },
  {
    id: ROUTES.APPLICATIONS_WORK,
    title: 'Работа с заявками',
    subTitle: 'Модерация заявок',
    icon: <ListWithPencilIcon />,
    link: ROUTES.APPLICATIONS_WORK,
  },
  {
    id: ROUTES.BOX_SOLUTIONS_POPULARITY,
    title: 'Популярность коробочных решений',
    subTitle: 'Рейтинг использования коробок',
    icon: <BoxWithStarIcon />,
    link: ROUTES.BOX_SOLUTIONS_POPULARITY,
  },
  {
    id: ROUTES.DATA_EXPORT,
    title: 'Экспорт данных',
    subTitle: 'Экспорт аналитики и списков',
    icon: <UploadIcon />,
    link: ROUTES.DATA_EXPORT,
  },
  {
    id: ROUTES.USERS_ANALYTICS,
    title: 'Аналитика пользователей',
    subTitle: 'Обзор ключевых пользовательских данных',
    icon: <UserPlusIcon />,
    link: ROUTES.USERS_ANALYTICS,
  },
];

export const TABS_ID = {
  oneDay: 'day',
  oneWeek: 'week',
  defaultTab: 'day',
};

export const ANALYTICS_PAGE_TABS = {
  tabTriggers: [
    { id: TABS_ID.oneDay, label: 'День', value: 'day' },
    { id: TABS_ID.oneWeek, label: 'Неделя', value: 'week' },
  ],
  tabContents: [
    {
      id: TABS_ID.oneDay,
      content: <StatisticsList items={STATISTIC_OF_DAY} />,
      value: 'day',
    },
    {
      id: TABS_ID.oneWeek,
      content: <StatisticsList items={STATISTIC_OF_WEEK} />,
      value: 'week',
    },
  ],
};
