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

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar/Avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible/Collapsible';

import { ChevronRight } from 'lucide-react';
import ExitIcon from '@/assets/icons/exit.svg';
import SupportIcon from '@/assets/icons/support.svg';
import { menu_items } from './menu.config';

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
                        {!collapsed && <span>{item.title}</span>}
                        {!collapsed && <ChevronRight className="ml-auto" />}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {!collapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((sub) => (
                            <SidebarMenuSubItem key={sub.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={sub.url}>{sub.title}</a>
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
                  <a href={item.url}>
                    <img src={item.icon} alt="" className='h-6 w-6'/>
                    {!collapsed && <span>{item.title}</span>}
                  </a>
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
              <img src={SupportIcon} alt="" className='w-6 h-6'/>
              {!collapsed && <span>Поддержка</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <img src={ExitIcon} alt="" className='w-6 h-6'/>
              {!collapsed && <span>Выход</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
