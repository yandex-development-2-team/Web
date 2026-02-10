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
  useSidebar,
  SidebarMenuSub,
} from '@/components/ui/Sidebar/Sidebar';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/Avatar/Avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
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
    <Sidebar collapsible="icon" className="bg-(--color-card) h-full overflow-x-hidden border-r-(--color-border-variant)">
      <SidebarHeader className={sidebarStyles.header.root}>
        <div>
          <div className={sidebarStyles.header.row}>
            <div className={sidebarStyles.header.brand}>
              {collapsed ? 'Ev' : 'Event'}
            </div>

            <SidebarTrigger className={sidebarStyles.header.trigger}>
              <img
                src={SidebarArrowIcon}
                alt="Закрыть сайдбар"
                className={sidebarStyles.header.triggerIcon}
              />
            </SidebarTrigger>
          </div>
        </div>

        <SidebarSeparator />

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
                <img
                  src={UploadUserImage}
                  alt="Изменить изображение пользователя"
                  className="h-3 w-3"
                />
              </div>
              <SidebarSeparator />
            </Avatar>
          </label>

          {!collapsed && (
            <div className="ml-1">
              <div className={sidebarStyles.user.name}>{userInfo.name}</div>
              <div className={sidebarStyles.user.role}>{userInfo.roleName}</div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const key = item.title;
            const childActive = isActiveGroupChild(item);
            const open = openGroup[key] ?? childActive;
            const highlightParent = open && childActive;

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
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={cn(
                          sidebarStyles.menu.groupButton,
                          highlightParent
                            ? sidebarStyles.menu.groupButtonActive
                            : sidebarStyles.menu.groupButtonIdle,
                        )}
                      >
                        <img src={item.icon} alt="" className='ml-1'/>
                        {!collapsed && <span>{item.title}</span>}
                        {!collapsed && (
                          <img
                            src={ArrowIcon}
                            alt=""
                            className={cn(
                              sidebarStyles.menu.groupArrowIcon,
                              open ? 'rotate-180' : 'rotate-0',
                            )}
                          />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

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
                    <img src={item.icon} alt="" className="h-15 w-15" />
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className={sidebarStyles.footer.item}>
            <SidebarMenuButton className={sidebarStyles.footer.supportButton}>
              <img src={SupportIcon} alt="" className="h-6 w-6" />
              {!collapsed && <span className="pl-2">Поддержка</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className={sidebarStyles.footer.exitItem}>
            <SidebarMenuButton className={sidebarStyles.footer.exitButton}>
              <img src={ExitIcon} alt="" className="h-6 w-6" />
              {!collapsed && <span className="pl-2">Выход</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
