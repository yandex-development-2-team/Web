import { cn } from '@/utils';

const iconOnlyItem = cn(
  'group-data-[collapsible=icon]:h-15',
  'group-data-[collapsible=icon]:w-20',
  'group-data-[collapsible=icon]:flex',
  'group-data-[collapsible=icon]:justify-center',
);

const iconOnlyItemWithCenter = cn(
  iconOnlyItem,
  'group-data-[collapsible=icon]:place-items-center!',
);

const footerButtonBase = cn(
  'h-10 text-[16px]',
  'p-0! pl-1.5!',
  'transition-(--default-transition-timing-function) duration-150 data-[active=false]:hover:bg-(--color-background)',
  'group-data-[collapsible=icon]:w-15!',
  'group-data-[collapsible=icon]:h-10!',
  'group-data-[collapsible=icon]:p-0!',
  'group-data-[collapsible=icon]:flex',
  'group-data-[collapsible=icon]:justify-center',
);

export const sidebarStyles = {
  header: {
    root: cn('pb-8.5 group-data-[collapsible=icon]:pb-5'),
    row: cn(
      'flex items-center justify-between',
      'group-data-[collapsible=icon]:flex-col',
      'pt-0!',
    ),
    brand: cn(
      'text-(--color-accent-strong)',
      'font-arsenal text-[36px] font-bold',
      'h-11.25 content-center pb-1.5',
    ),
    trigger: cn(
      'h-12 w-12',
      'border-1 border-solid border-(--color-muted)',
      'bg-(--color-card)',
      'group-data-[collapsible=icon]:w-20',
      'group-data-[collapsible=icon]:h-12',
      'group-data-[collapsible=icon]:mt-4',
      'duration-150 hover:!bg-transparent hover:bg-(--color-background)',
      'pl-0.5',
      'duration-150 hover:bg-(--color-background)!',
    ),
    triggerIcon: cn('h-5 w-5', 'group-data-[collapsible=icon]:rotate-0'),
  },

  user: {
    row: cn(
      'flex content-start gap-3',
      'h-12',
      'mt-8.75 mb-0.25 ml-1',
      'group-data-[collapsible=icon]:w-20!',
      'group-data-[collapsible=icon]:h-16!',
      'group-data-[collapsible=icon]:flex',
      'group-data-[collapsible=icon]:justify-center',
      'group-data-[collapsible=icon]:mt-2',
      'group-data-[collapsible=icon]:pr-2',
      'group-data-[collapsible=icon]:mb-0',
      'group-data-[state=collapsed]:pt-1.5',
    ),
    avatar: cn(
      'h-10 w-10',
      'ring-1 ring-(--color-primary) ring-offset-3 ring-offset-(--color-card)',
      'mt-0.75',
    ),
    avatarImage: cn('object-cover'),
    name: cn('font-sans text-[16px] font-semibold'),
    role: cn('mt-1 text-[14px]'),
    avatarMask: cn(
      'pointer-events-none absolute inset-0 z-10 grid place-items-center',
      'bg-black/50 opacity-0 transition-opacity duration-150 group-hover/avatar:opacity-100',
      'shadow-[0_1px_4px_0_rgba(12, 12, 13, 0.005)]',
    ),
  },

  menu: {
    item: cn(iconOnlyItem, 'group-data-[collapsible=icon]:mb-3!'),
    groupItem: iconOnlyItem,
    linkButton: cn(
      'p-0! pl-2!',
      'mt-3 mb-1 ml-1 h-15 content-center text-[16px]',
      'rounded-xl data-[active=true]:bg-(--color-accent)',
      'transition-(--default-transition-timing-function) duration-150 data-[active=false]:hover:bg-(--color-background)',
      'group-data-[collapsible=icon]:w-20!',
      'group-data-[collapsible=icon]:h-15!',
      'pl-2 group-data-[collapsible=icon]:m-0',
      'group-data-[collapsible=icon]:p-0!',
      'group-data-[collapsible=icon]:pl-1.5!',
      'group-data-[collapsible=icon]:pb-1!',
    ),
    groupButton: cn(
      'mt-0 h-15 content-center gap-0! pt-5 pb-5 text-[16px]',
      'group-data-[collapsible=icon]:w-20!',
      'group-data-[collapsible=icon]:h-15!',
    ),
    groupButtonActive: cn('rounded-[12px] bg-(--color-accent)'),
    groupButtonIdle: cn('hover:bg-muted'),
    groupArrowIcon: cn('h-[25px] w-[25px] rotate-180 duration-150'),
    subMenu: cn('w-full pt-3.5 pl-21.25', 'm-0.25 gap-3.5', 'border-l-0'),
    subMenuList: cn('flex'),
    subButton: cn(
      'pt-2 pr-2 pb-2 pl-3',
      'relative h-13.5 w-full justify-start',
      'transition-colors duration-150 data-[active=false]:hover:bg-(--color-background)',
      'data-[active=true]:rounded-none',
      "after:absolute after:bottom-0 after:left-0 after:content-['']",
      'after:h-[1px] after:w-full after:bg-(--color-accent-strong)',
      'after:origin-left after:scale-x-0',
      'after:transition-transform after:duration-150 after:ease-out',
      'data-[active=true]:after:scale-x-100',
    ),
    subLink: cn(
      'group-data-[collapsible=icon]:w-20',
      'group-data-[collapsible=icon]:h-15',
    ),
  },

  footer: {
    item: iconOnlyItemWithCenter,

    supportButton: cn(
      'ml-3.5',
      footerButtonBase,
      'group-data-[collapsible=icon]:m-0',
    ),
    exitItem: cn(
      iconOnlyItemWithCenter,
      'group-data-[collapsible=icon]:mt-4!',
      'group-data-[collapsible=icon]:m-0!',
    ),
    exitButton: cn(
      'mt-3 ml-3.5',
      footerButtonBase,
      'group-data-[collapsible=icon]:m-0!',
    ),
  },

  separator: {
    line: cn('block', 'bg-(--color-background)', '!m-0'),
    iconStyle: cn(
      'hidden',
      'group-data-[state=collapsed]:block',
      'group-data-[collapsible=icon]:group-data-[state=collapsed]:bg-(--color-background)',
      '!m-0',
    ),
  },
};
