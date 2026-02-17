import {
  adminPermissionSettings,
  managerFirtsPermissionSettings,
  managerSecondPermissionSettings,
  managerThirdPermissionSettings,
  type PermissinGoupType,
} from '@/mock/systemSettingsPage.mock';

// ********************************************** TABS
export type TabId = 'access' | 'content';

export const TABS_ID: Record<TabId, TabId> = {
  access: 'access',
  content: 'content',
};

export interface TabItem {
  id: TabId;
  label: string;
}

export const TABS: TabItem[] = [
  { id: 'access', label: 'Настройка уровня доступа' },
  { id: 'content', label: 'Настройка текстов' },
];

// ********************************************** SECTION TOOGGLE
export interface AccessItem {
  id: 'admin' | 'manager1' | 'manager2' | 'manager3';
  title: string;
  subTitle: string;
  content?: PermissinGoupType[];
}
export const ACCESS_ITEMS: AccessItem[] = [
  {
    id: 'admin',
    title: 'администратор',
    subTitle: 'высший уровень доступа',
    content: adminPermissionSettings,
  },
  {
    id: 'manager1',
    title: 'менеджер 1 звена',
    subTitle: 'полный уровень доступа',
    content: managerFirtsPermissionSettings,
  },
  {
    id: 'manager2',
    title: 'менеджер 2 звена',
    subTitle: 'средний уровень доступа',
    content: managerSecondPermissionSettings,
  },
  {
    id: 'manager3',
    title: 'менеджер 3 звена',
    subTitle: 'низкий уровень доступа',
    content: managerThirdPermissionSettings,
  },
];
// **********************************************
