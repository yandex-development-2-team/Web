import { cn } from '@/utils/index';
import { TooltipProvider } from '@/components/ui/Tooltip/Tooltip';
import {
  useCallback,
  useEffect,
  useState,
  type ComponentProps,
  type CSSProperties,
} from 'react';
import {
  SidebarContext,
  type SidebarContextValue,
} from '@/app/providers/Sidebar/sidebar-context';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '328px';
const SIDEBAR_WIDTH_ICON = '120px';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen: SidebarContextValue['setOpen'] = useCallback(
    (value) => {
      const openState = typeof value === 'function' ? value(open) : value;

      if (setOpenProp) setOpenProp(openState);
      else _setOpen(openState);

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  const toggleSidebar = useCallback(() => setOpen((prev) => !prev), [setOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const state: SidebarContextValue['state'] = open ? 'expanded' : 'collapsed';

  const contextValue: SidebarContextValue = {
    state,
    open,
    setOpen,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}
