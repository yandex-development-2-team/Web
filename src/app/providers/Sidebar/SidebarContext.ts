import { createContext } from 'react';

export type SidebarState = 'expanded' | 'collapsed';

export type SidebarContextValue = {
  state: SidebarState;
  open: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined,
);
