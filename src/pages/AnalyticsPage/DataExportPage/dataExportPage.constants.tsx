import {
  UserIcon as EmployeesIcon,
  BoxIcon,
  UserPlusIcon,
} from '@/assets/icons';
import { FILES_LIST } from '@/mock/exporting-files-page.mock';
import { UploadList } from './UploadList/UploadList';

export const TABS_ID = {
  employees: 'employees',
  analytics: 'analytics',
  boxes: 'boxes',
  users: 'users',
  defaultTab: 'employees',
};

export const EXPORT_PAGE_TABS = {
  tabsTriggers: [
    {
      id: TABS_ID.employees,
      value: 'employees',
      label: 'Сотрудники',
      icon: <EmployeesIcon className="size-6" />,
    },
    {
      id: TABS_ID.analytics,
      value: 'analytics',
      label: 'Посещаемость',
      icon: <BoxIcon className="size-6" />,
    },
    {
      id: TABS_ID.boxes,
      value: 'boxes',
      label: 'Коробки',
      icon: <BoxIcon className="size-6" />,
    },
    {
      id: TABS_ID.users,
      value: 'users',
      label: 'Пользователи',
      icon: <UserPlusIcon className="size-6" />,
    },
  ],
  tabsContent: [
    {
      id: TABS_ID.employees,
      value: 'employees',
      content: <UploadList items={FILES_LIST} />,
    },
    {
      id: TABS_ID.analytics,
      value: 'analytics',
      content: <div>ANALYTICS</div>,
    },
    {
      id: TABS_ID.boxes,
      value: 'boxes',
      content: <div>BOXES</div>,
    },
    {
      id: TABS_ID.users,
      value: 'users',
      content: <div>USERS</div>,
    },
  ],
};
