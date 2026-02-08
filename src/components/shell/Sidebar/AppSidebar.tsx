import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  useSidebar,
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

import ExitIcon from '@/assets/icons/exit.svg';
import SupportIcon from '@/assets/icons/support.svg';
import ArrowIcon from '@/assets/icons/arrow-down.svg';
import { menu_items } from './menu.config';
import { NavLink } from 'react-router';

export type Role = 'ADMIN' | 'MANAGER';

export default function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const role: Role = 'MANAGER';
  const items = menu_items[role];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div>
          <div className="flex items-center justify-between">
            <div>{collapsed ? 'Ev' : 'Event'}</div>
            <SidebarTrigger />
          </div>
        </div>

        <SidebarSeparator />

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="user" />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div>
              <div>Анастасия</div>
              <div>Администратор</div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            if ('items' in item) {
              return (
                <SidebarMenuItem key={item.title}>
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <img src={item.icon} alt="" />
                        {!collapsed && <span>{item.title}</span>}
                        {!collapsed && (
                          <img
                            src={ArrowIcon}
                            alt=""
                            className="ml-auto rotate-180"
                          />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {!collapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((sub) => (
                            <SidebarMenuSubItem key={sub.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink to={sub.url}>{sub.title}</NavLink>
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
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink to={item.url}>
                    <img src={item.icon} alt="" className="h-6 w-6" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <img src={SupportIcon} alt="" className="h-6 w-6" />
              {!collapsed && <span>Поддержка</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <img src={ExitIcon} alt="" className="h-6 w-6" />
              {!collapsed && <span>Выход</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
