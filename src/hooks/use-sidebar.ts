import { createContext, useContext } from 'react';

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

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return ctx;
}
