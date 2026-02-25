import type { ROLE } from '@/mock/mock-user-info';
import type { ComponentType, SVGProps } from 'react';

export type MenuIcon = ComponentType<SVGProps<SVGSVGElement>>;

type MenuSubItems = {
  title: string;
  url: string;
};
type MenuItemBase = {
  title: string;
  icon?: MenuIcon;
};
type MenuItemLeaf = MenuItemBase & {
  url: string;
  items?: never;
};
type MenuItemGroup = MenuItemBase & {
  items: MenuSubItems[];
  url: string;
};
type MenuItem = MenuItemLeaf | MenuItemGroup;
export type MenuItems = Record<ROLE, MenuItem[]>;
