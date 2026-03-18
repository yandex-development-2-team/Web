import { cn } from '@/utils';
import { Button } from '@/components/ui/Button';
import { PencilIcon, PhoneIcon, ThreeDotsIcon } from '@/assets/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import type { ReactNode } from 'react';

type ActionItemType = {
  title: string;
  icon: ReactNode;
};

const DEFAULT_DROPDOWN_DATA = {
  mainIcon: <ThreeDotsIcon className="size-5" />,
  list: [
    {
      title: 'Написать',
      icon: <PencilIcon className="size-5" />,
    },
    {
      title: 'Позвонить',
      icon: <PhoneIcon className="size-5" />,
    },
  ],
};

interface ActionDropdownProps {
  mainIcon?: ReactNode;
  actionItems?: ActionItemType[];
}

export function ActionDropdown({
  mainIcon = DEFAULT_DROPDOWN_DATA.mainIcon,
  actionItems = DEFAULT_DROPDOWN_DATA.list,
}: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon-md'} variant={'ghost'} className="size-5">
          {mainIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        {actionItems.map((item) => (
          <DropdownMenuItem asChild>
            <div className={cn('flex justify-between')}>
              {item.title}
              {item.icon}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
