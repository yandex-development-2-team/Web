import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  SidebarMenuSub,
} from '@/components/shell/Sidebar';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/Avatar/Avatar';
import {
  Collapsible,
  CollapsibleContent,
} from '@/components/ui/Collapsible/Collapsible';
import { Input } from '@/components/ui/Input/Input';
import { cn } from '@/utils';
import { menu_items } from './menu.config';
import { userInfo } from '@/mock/mock-user-info';

import ExitIcon from '@/assets/icons/exit.svg';
import SupportIcon from '@/assets/icons/support.svg';
import ArrowIcon from '@/assets/icons/arrow-down.svg';
import MockIcon from '@/mock/mock-avatar.jpg';
import SidebarArrowIcon from '@/assets/icons/exit-arrow-right-20.svg';
import UploadUserImage from '@/assets/icons/upload-24.svg';
import { sidebarStyles } from './AppSidebar.styles';
import { useSidebar } from '@/hooks/use-sidebar';

export default function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';
  const items = menu_items[userInfo.role];
  const [openGroup, setOpenGroup] = useState<Record<string, boolean>>({});

  const isActiveUrl = (url: string) => {
    if (!url) return false;
    return location.pathname === url || location.pathname.startsWith(url + '/');
  };

  const isActiveGroupChild = (group: { items?: { url: string }[] }) => {
    return (group.items ?? []).some((s) => isActiveUrl(s.url));
  };

  return (
    <Sidebar
      collapsible="icon"
      className="h-full overflow-x-hidden border-r-(--color-border-variant) bg-(--color-card)"
    >
      <SidebarHeader className={sidebarStyles.header.root}>
        <div>
          <div className={sidebarStyles.header.row}>
            <div className={sidebarStyles.header.brand}>
              {collapsed ? 'Ev' : 'Event'}
            </div>
            <SidebarSeparator
              className={cn(sidebarStyles.separator.iconStyle)}
            />

            <SidebarTrigger className={sidebarStyles.header.trigger}>
              <img
                src={SidebarArrowIcon}
                className={sidebarStyles.header.triggerIcon}
              />
            </SidebarTrigger>
          </div>
          <SidebarSeparator className={cn(sidebarStyles.separator.line)} />
        </div>

        <div className={sidebarStyles.user.row}>
          <label className="cursor-pointer">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={() => {}}
            />
            <Avatar className={cn(sidebarStyles.user.avatar, 'group/avatar')}>
              <AvatarImage
                src={MockIcon}
                alt="user"
                className={sidebarStyles.user.avatarImage}
              />
              <AvatarFallback>AN</AvatarFallback>
              <div className={sidebarStyles.user.avatarMask}>
                <img src={UploadUserImage} className="h-3 w-3" />
              </div>
            </Avatar>
          </label>

          {!collapsed && (
            <div className="ml-1">
              <div className={sidebarStyles.user.name}>{userInfo.name}</div>
              <div className={sidebarStyles.user.role}>{userInfo.roleName}</div>
            </div>
          )}
        </div>
        <SidebarSeparator className={sidebarStyles.separator.line} />
      </SidebarHeader>

      <SidebarContent className="pt-2 group-data-[collapsible=icon]:pt-0">
        <SidebarMenu>
          {items.map((item) => {
            const key = item.title;
            const childActive = isActiveGroupChild(item);
            const selfActive = isActiveUrl(item.url);
            const sectionActive = selfActive || childActive;
            const open = openGroup[key] ?? sectionActive;
            const highlightParent = sectionActive;

            if ('items' in item) {
              return (
                <SidebarMenuItem
                  key={item.title}
                  className={sidebarStyles.menu.groupItem}
                >
                  <Collapsible
                    defaultOpen
                    open={open}
                    onOpenChange={(o) =>
                      setOpenGroup((p) => ({ ...p, [key]: o }))
                    }
                  >
                    <div className="relative">
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          sidebarStyles.menu.groupButton,
                          highlightParent
                            ? sidebarStyles.menu.groupButtonActive
                            : sidebarStyles.menu.groupButtonIdle,
                          'pr-10',
                        )}
                      >
                        <NavLink
                          to={item.url}
                          onClick={() =>
                            setOpenGroup((p) => ({ ...p, [key]: true }))
                          }
                          className="flex w-full items-center gap-3 pl-1"
                        >
                          <img
                            src={item.icon}
                            alt=""
                            className="ml-2 group-data-[collapsible=icon]:ml-0 active:bg-(--color-primary)"
                          />

                          {!collapsed && (
                            <span className="ml-2">{item.title}</span>
                          )}
                        </NavLink>
                      </SidebarMenuButton>

                      {!collapsed && (
                        <button
                          type="button"
                          className="absolute top-1/2 right-0.5 -translate-y-1/2 p-2"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenGroup((p) => ({ ...p, [key]: !open }));
                          }}
                          aria-label={open ? 'Свернуть' : 'Развернуть'}
                          aria-expanded={open}
                        >
                          <img
                            src={ArrowIcon}
                            className={cn(
                              sidebarStyles.menu.groupArrowIcon,
                              open ? 'rotate-180' : 'rotate-0',
                            )}
                          />
                        </button>
                      )}
                    </div>

                    {!collapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub className={sidebarStyles.menu.subMenu}>
                          {item.items?.map((sub) => (
                            <SidebarMenuSubItem
                              key={sub.title}
                              className={sidebarStyles.menu.subMenuList}
                            >
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActiveUrl(sub.url)}
                                className={sidebarStyles.menu.subButton}
                              >
                                <NavLink
                                  to={sub.url}
                                  className={sidebarStyles.menu.subLink}
                                >
                                  {sub.title}
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </SidebarMenuItem>
              );
            }

            return (
              <SidebarMenuItem
                key={item.title}
                className={sidebarStyles.menu.item}
              >
                <SidebarMenuButton
                  asChild
                  isActive={isActiveUrl(item.url)}
                  className={sidebarStyles.menu.linkButton}
                >
                  <NavLink to={item.url}>
                    <img
                      src={item.icon}
                      alt=""
                      className="h-15! w-15! group-data-[collapsible=icon]:mt-1 group-data-[collapsible=icon]:ml-1"
                    />
                    {!collapsed && (
                      <span className="whitespace-pre-line!">{item.title}</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="pb-8 group-data-[collapsible=icon]:pb-4.75">
        <SidebarSeparator className={sidebarStyles.separator.line} />
        <SidebarMenu className="group-data-[collapsible=icon]:ml-0.5 group-data-[collapsible=icon]:gap-3.25">
          <SidebarMenuItem className={cn(sidebarStyles.footer.item, 'h-10!')}>
            <SidebarMenuButton className={sidebarStyles.footer.supportButton}>
              <img src={SupportIcon} className="h-6 w-6 pt-0" />
              {!collapsed && <span className="pl-2">Поддержка</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className={cn(sidebarStyles.footer.item, 'h-10!')}>
            <SidebarMenuButton className={sidebarStyles.footer.exitButton}>
              <img src={ExitIcon} className="h-6 w-6" />
              {!collapsed && <span className="pl-2">Выход</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
